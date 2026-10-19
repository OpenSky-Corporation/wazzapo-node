/**
 * Проверка подписи вебхуков Wazzapo: `import { Webhooks } from "@wazzapo/sdk/webhooks"`.
 *
 * Подпись: `X-Wazzapo-Signature-V2: v2=<hex HMAC-SHA256(secret, "{X-Wazzapo-Timestamp}.{сырое тело}")>`.
 * Проверяйте сырое тело запроса, до JSON.parse: другие пробелы или порядок ключей меняют подпись.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

import type { WebhookEvent } from "./generated/webhooks.js";

export type { WebhookEvent, WebhookEventMap, WebhookEventType } from "./generated/webhooks.js";
export { WEBHOOK_EVENT_TYPES } from "./generated/webhooks.js";

export const SIGNATURE_HEADER = "X-Wazzapo-Signature-V2";
export const TIMESTAMP_HEADER = "X-Wazzapo-Timestamp";
export const DELIVERY_ID_HEADER = "X-Wazzapo-Delivery-Id";
/** Допуск по времени по умолчанию: 5 минут. */
export const DEFAULT_TOLERANCE_S = 300;

/** Подпись не сошлась, нет заголовков или метка времени старая. */
export class WebhookVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookVerificationError";
  }
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
    const expected = Buffer.from(`v2=${hmac(secret, timestamp, body)}`);
    const given = Buffer.from(signature.trim());
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
      throw new WebhookVerificationError("Подпись не совпала: проверьте секрет и что тело не менялось");
    }
    return JSON.parse(text(body)) as WebhookEvent;
  },

  /** Заголовки подписи для тела: для тестов своего приёмника. */
  sign(body: string | Uint8Array, secret: string, timestamp: number = Math.floor(Date.now() / 1000)): Record<string, string> {
    const ts = String(timestamp);
    return { [TIMESTAMP_HEADER]: ts, [SIGNATURE_HEADER]: `v2=${hmac(secret, ts, body)}` };
  },
};
