import type { QueryValue, RequestSpec, Transport } from "./core.js";
import {
  ConnectionError,
  TimeoutError,
  WazzapoError,
  errorFromResponse,
  parseRetryAfter,
} from "./errors.js";
import { Resources } from "./generated/resources.js";
import { VERSION } from "./version.js";

export const DEFAULT_BASE_URL = "https://wazzapo.kz";
const API_PREFIX = "/api/v2/external";
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRY_AFTER_S = 60;

export interface ClientOptions {
  /** API-ключ из раздела «API» в кабинете. Без него берётся переменная WAZZAPO_API_KEY. */
  apiKey?: string;
  /** Адрес API, по умолчанию https://wazzapo.kz. */
  baseUrl?: string;
  /** Таймаут запроса в миллисекундах, по умолчанию 30 000. */
  timeout?: number;
  /** Сколько раз повторять при 429, 5xx и сбое сети, по умолчанию 2. */
  maxRetries?: number;
  /** Свой fetch (прокси, тесты). По умолчанию глобальный fetch. */
  fetch?: typeof fetch;
  /** Куда писать строки отладки (метод, путь, статус, время; ключ скрыт), например console.debug. */
  debug?: (line: string) => void;
  /** Ожидание между повторами; подменяется в тестах. */
  sleep?: (ms: number) => Promise<void>;
}

function envKey(): string | undefined {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.["WAZZAPO_API_KEY"];
}

/** Ключ для логов: первые 8 знаков, например wz_live_…. */
export function maskKey(key: string): string {
  return key.length <= 8 ? "…" : `${key.slice(0, 8)}…`;
}

function uuid(): string {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  const hex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16));
  hex[12] = "4";
  hex[16] = ((parseInt(hex[16] ?? "0", 16) & 0x3) | 0x8).toString(16);
  const s = hex.join("");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isQueryValue(value: unknown): value is QueryValue {
  return value === null || value === undefined || ["string", "number", "boolean"].includes(typeof value);
}

function queryString(query: object | undefined): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) if (isQueryValue(item) && item !== null && item !== undefined) params.append(key, String(item));
    } else if (isQueryValue(value) && value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

function formData(body: unknown): FormData {
  const form = new FormData();
  if (typeof body !== "object" || body === null) return form;
  for (const [key, value] of Object.entries(body)) {
    if (value instanceof Blob) {
      const name = "name" in value && typeof value.name === "string" && value.name ? value.name : key;
      form.append(key, value, name);
    } else if (value !== undefined && value !== null) {
      form.append(key, String(value));
    }
  }
  return form;
}

interface Reply {
  response: Response;
  bytes: ArrayBuffer;
}

/** Тело ответа: JSON, иначе текст (страница прокси), пустое: null. */
function decode(bytes: ArrayBuffer): unknown {
  const text = new TextDecoder().decode(bytes);
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

// Ресурсы (client.messages, client.phoneNumbers…) создаются в конструкторе из Resources
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unsafe-declaration-merging
export interface Wazzapo extends Resources {}

/**
 * Клиент API v2 Wazzapo.
 *
 * ```ts
 * const client = new Wazzapo({ apiKey: process.env.WAZZAPO_API_KEY });
 * const { data } = await client.phoneNumbers.list();
 * ```
 */
export class Wazzapo implements Transport {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly maxRetries: number;
  readonly #apiKey: string;
  readonly #fetch: typeof fetch;
  readonly #debug: ((line: string) => void) | null;
  readonly #sleep: (ms: number) => Promise<void>;

  constructor(options: ClientOptions = {}) {
    const apiKey = options.apiKey ?? envKey();
    if (!apiKey) {
      throw new WazzapoError({
        status: 0,
        code: "INVALID_API_KEY",
        message: "Нет API-ключа: передайте apiKey или задайте переменную WAZZAPO_API_KEY",
      });
    }
    this.#apiKey = apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.timeout = options.timeout ?? 30_000;
    this.maxRetries = options.maxRetries ?? 2;
    const f = options.fetch ?? globalThis.fetch;
    if (typeof f !== "function") {
      throw new WazzapoError({ status: 0, code: "NO_FETCH", message: "Нет fetch: нужен Node.js 18+ или передайте fetch" });
    }
    this.#fetch = f.bind(globalThis);
    this.#debug = options.debug ?? null;
    this.#sleep = options.sleep ?? defaultSleep;
    Object.assign(this, new Resources(this));
  }

  /** Тестовый ключ wz_test_: ничего не отправляет и не меняет, отвечает как настоящий. */
  get isTest(): boolean {
    return this.#apiKey.startsWith("wz_test_");
  }

  /** Скрытый ключ для логов. */
  get maskedApiKey(): string {
    return maskKey(this.#apiKey);
  }

  toJSON(): Record<string, unknown> {
    return { baseUrl: this.baseUrl, apiKey: this.maskedApiKey, timeout: this.timeout, maxRetries: this.maxRetries };
  }

  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return `Wazzapo ${JSON.stringify(this.toJSON())}`;
  }

  /** Запрос к любому методу API v2; обычно вызывается из client.<ресурс>.<метод>(). */
  async request<T>(spec: RequestSpec): Promise<T> {
    const options = spec.options ?? {};
    const method = spec.method.toUpperCase();
    const url = `${this.baseUrl}${API_PREFIX}${spec.path}${queryString(spec.query)}`;
    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": `wazzapo-sdk-node/${VERSION}`,
      ...options.headers,
      "X-API-Key": this.#apiKey,
    };
    if (method === "POST") headers["Idempotency-Key"] = options.idempotencyKey ?? uuid();
    let body: BodyInit | undefined;
    if (spec.body !== undefined) {
      if (spec.multipart) {
        body = formData(spec.body);
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(spec.body);
      }
    }
    const retries = options.maxRetries ?? this.maxRetries;
    const signal = options.signal;
    for (let attempt = 0; ; attempt++) {
      // уже отменённый сигнал: запрос не отправляем совсем
      signal?.throwIfAborted();
      const started = Date.now();
      let reply: Reply;
      try {
        reply = await this.#send(url, { method, headers, body }, options.timeout ?? this.timeout, signal);
      } catch (error) {
        if (signal?.aborted || !(error instanceof ConnectionError) || attempt >= retries) throw error;
        this.#log(`${method} ${spec.path} сбой сети, повтор ${attempt + 1}`);
        await this.#wait(this.#delay(attempt, null), signal);
        continue;
      }
      const { response, bytes } = reply;
      this.#log(`${method} ${spec.path} ${response.status} ${Date.now() - started} мс key=${this.maskedApiKey}`);
      if (response.ok) return this.#parse<T>(response, bytes, spec);
      if (RETRY_STATUSES.has(response.status) && attempt < retries) {
        await this.#wait(this.#delay(attempt, response.headers.get("retry-after")), signal);
        continue;
      }
      throw errorFromResponse(response.status, response.headers, decode(bytes));
    }
  }

  /** Запрос и чтение тела целиком: таймаут действует до конца тела, не только до заголовков. */
  async #send(url: string, init: RequestInit, timeout: number, signal?: AbortSignal): Promise<Reply> {
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeout);
    const onAbort = (): void => controller.abort();
    signal?.addEventListener("abort", onAbort, { once: true });
    if (signal?.aborted) controller.abort();
    try {
      const response = await this.#fetch(url, { ...init, signal: controller.signal });
      const bytes = await response.arrayBuffer();
      return { response, bytes };
    } catch (cause) {
      if (signal?.aborted) throw signal.reason ?? cause;
      if (timedOut) {
        throw new TimeoutError({ status: 0, code: "TIMEOUT", message: `Нет ответа за ${timeout} мс`, cause });
      }
      const reason = cause instanceof Error ? cause.message : String(cause);
      throw new ConnectionError({ status: 0, code: "CONNECTION_ERROR", message: `Сбой сети: ${reason}`, cause });
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    }
  }

  /** Пауза между повторами; отмена сигнала прерывает её сразу. */
  #wait(ms: number, signal?: AbortSignal): Promise<void> {
    if (!signal) return this.#sleep(ms);
    signal.throwIfAborted();
    return new Promise<void>((resolve, reject) => {
      const onAbort = (): void => reject(signal.reason);
      signal.addEventListener("abort", onAbort, { once: true });
      this.#sleep(ms).then(
        () => {
          signal.removeEventListener("abort", onAbort);
          resolve();
        },
        (error: unknown) => {
          signal.removeEventListener("abort", onAbort);
          reject(error);
        },
      );
    });
  }

  #parse<T>(response: Response, bytes: ArrayBuffer, spec: RequestSpec): T {
    if (spec.binary) return bytes as T;
    if (response.status === 204) return null as T;
    return decode(bytes) as T;
  }

  /** Задержка повтора: Retry-After (не больше 60 с) или min(0.5 × 2^n, 8) с ± 25 %. */
  #delay(attempt: number, retryAfter: string | null): number {
    const seconds = parseRetryAfter(retryAfter);
    if (seconds !== null) return Math.min(seconds, MAX_RETRY_AFTER_S) * 1000;
    const base = Math.min(0.5 * 2 ** attempt, 8);
    return base * (0.75 + Math.random() * 0.5) * 1000;
  }

  #log(line: string): void {
    this.#debug?.(`[wazzapo] ${line}`);
  }
}
