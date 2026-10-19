/**
 * Проверка подписи вебхуков Wazzapo: `import { Webhooks } from "@wazzapo/sdk/webhooks"`.
 *
 * Подпись: `X-Wazzapo-Signature-V2: v2=<hex HMAC-SHA256(secret, "{X-Wazzapo-Timestamp}.{сырое тело}")>`.
 * Проверяйте сырое тело запроса, до JSON.parse: другие пробелы или порядок ключей меняют подпись.
 * Работает в Node.js (node:crypto); в браузере вебхуки не принимают, клиент API там работает.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

import { WazzapoError } from "./errors.js";

import type { WebhookEvent } from "./generated/webhooks.js";

export type { WebhookEvent, WebhookEventMap, WebhookEventType } from "./generated/webhooks.js";
export { WEBHOOK_EVENT_TYPES } from "./generated/webhooks.js";

export const SIGNATURE_HEADER = "X-Wazzapo-Signature-V2";
export const TIMESTAMP_HEADER = "X-Wazzapo-Timestamp";
export const DELIVERY_ID_HEADER = "X-Wazzapo-Delivery-Id";
/** Допуск по времени по умолчанию: 5 минут. */
export const DEFAULT_TOLERANCE_S = 300;

/** Подпись не сошлась, нет заголовков, метка времени старая, нет секрета или тело не JSON. Отвечайте 400. */
export class WebhookVerificationError extends WazzapoError {
  constructor(message: string) {
    super({ status: 0, code: "WEBHOOK_VERIFICATION_FAILED", message });
  }
}

function requireSecret(secret: unknown): string {
  if (typeof secret !== "string" || secret.trim() === "") {
    // пустой секрет: подпись пустым ключом сошлась бы у любого, кто его угадает
    throw new WebhookVerificationError("Нет секрета вебхука: передайте секрет из ответа POST /webhooks");
  }
  return secret;
}

function sameSignature(given: string, expected: string): boolean {
  const want = Buffer.from(expected);
  // несколько подписей через запятую (на время смены секрета): хватает совпадения одной
  return given
    .split(",")
    .map((part) => Buffer.from(part.trim()))
    .some((part) => part.length === want.length && timingSafeEqual(part, want));
}

export type HeaderSource =
  | Headers
  | Record<string, string | string[] | undefined>
  | { get(name: string): string | null };

export interface VerifyOptions {
  /** Допустимое расхождение времени в секундах, по умолчанию 300. */
  tolerance?: number;
  /** Текущее время в секундах (для тестов). */
  now?: number;
}

function header(headers: HeaderSource, name: string): string | null {
  if (typeof (headers as { get?: unknown }).get === "function") {
    return (headers as { get(name: string): string | null }).get(name);
  }
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(headers as Record<string, string | string[] | undefined>)) {
    if (key.toLowerCase() === lower) return Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
  }
  return null;
}

function text(body: string | Uint8Array): string {
  return typeof body === "string" ? body : new TextDecoder().decode(body);
}

function hmac(secret: string, timestamp: string, body: string | Uint8Array): string {
  return createHmac("sha256", secret).update(`${timestamp}.`).update(body).digest("hex");
}

export const Webhooks = {
  /**
   * Проверяет подпись и время и возвращает событие. Неверно: WebhookVerificationError, отвечайте 400.
   *
   * @param body сырое тело запроса (строка или байты), не разобранный JSON
   * @param headers заголовки запроса (Headers, req.headers из node:http или Express)
   * @param secret секрет вебхука из ответа POST /webhooks
   */
  verify(body: string | Uint8Array, headers: HeaderSource, secret: string, options: VerifyOptions = {}): WebhookEvent {
    const key = requireSecret(secret);
    const timestamp = header(headers, TIMESTAMP_HEADER);
    const signature = header(headers, SIGNATURE_HEADER);
    if (!timestamp || !signature) {
      throw new WebhookVerificationError(`Нет заголовков ${TIMESTAMP_HEADER} и ${SIGNATURE_HEADER}`);
    }
    const sent = Number(timestamp);
    if (!Number.isInteger(sent)) throw new WebhookVerificationError(`${TIMESTAMP_HEADER} не число: ${timestamp}`);
    const now = options.now ?? Math.floor(Date.now() / 1000);
    const tolerance = options.tolerance ?? DEFAULT_TOLERANCE_S;
    if (Math.abs(now - sent) > tolerance) {
      throw new WebhookVerificationError(`Метка времени старше ${tolerance} с: возможен повтор чужого запроса`);
    }
    if (!sameSignature(signature, `v2=${hmac(key, timestamp, body)}`)) {
      throw new WebhookVerificationError("Подпись не совпала: проверьте секрет и что тело не менялось");
    }
    try {
      return JSON.parse(text(body)) as WebhookEvent;
    } catch {
      throw new WebhookVerificationError("Тело вебхука не JSON");
    }
  },

  /** Заголовки подписи для тела: для тестов своего приёмника. */
  sign(body: string | Uint8Array, secret: string, timestamp: number = Math.floor(Date.now() / 1000)): Record<string, string> {
    const ts = String(timestamp);
    return { [TIMESTAMP_HEADER]: ts, [SIGNATURE_HEADER]: `v2=${hmac(requireSecret(secret), ts, body)}` };
  },
};
