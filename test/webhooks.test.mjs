import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";

import { WEBHOOK_EVENT_TYPES, WebhookVerificationError, Webhooks } from "../dist/esm/webhooks.js";

const SECRET = "whsec_test";
const BODY = JSON.stringify({ event: "message.incoming", timestamp: "2026-10-18T09:15:02Z", data: { message: { text: "Привет" } } });
const NOW = 1760000000;

test("верная подпись: событие разобрано", () => {
  const headers = Webhooks.sign(BODY, SECRET, NOW);
  const event = Webhooks.verify(BODY, headers, SECRET, { now: NOW + 10 });
  assert.equal(event.event, "message.incoming");
  assert.equal(event.data.message.text, "Привет");
});

test("подпись совпадает с описанием: HMAC-SHA256(secret, timestamp.body)", () => {
  const expected = "v2=" + createHmac("sha256", SECRET).update(`${NOW}.${BODY}`).digest("hex");
  assert.equal(Webhooks.sign(BODY, SECRET, NOW)["X-Wazzapo-Signature-V2"], expected);
});

test("заголовки без учёта регистра, тело байтами, Headers", () => {
  const signed = Webhooks.sign(BODY, SECRET, NOW);
  const lower = Object.fromEntries(Object.entries(signed).map(([k, v]) => [k.toLowerCase(), v]));
  assert.equal(Webhooks.verify(Buffer.from(BODY), lower, SECRET, { now: NOW }).event, "message.incoming");
  assert.equal(Webhooks.verify(BODY, new Headers(signed), SECRET, { now: NOW }).event, "message.incoming");
});

test("чужой секрет и изменённое тело: отказ", () => {
  const headers = Webhooks.sign(BODY, SECRET, NOW);
  assert.throws(() => Webhooks.verify(BODY, headers, "other", { now: NOW }), WebhookVerificationError);
  assert.throws(() => Webhooks.verify(BODY + " ", headers, SECRET, { now: NOW }), WebhookVerificationError);
});

test("старая метка времени: отказ, допуск настраивается", () => {
  const headers = Webhooks.sign(BODY, SECRET, NOW);
  assert.throws(() => Webhooks.verify(BODY, headers, SECRET, { now: NOW + 301 }), /старше 300/);
  assert.equal(Webhooks.verify(BODY, headers, SECRET, { now: NOW + 301, tolerance: 600 }).event, "message.incoming");
});

test("нет заголовков: отказ", () => {
  assert.throws(() => Webhooks.verify(BODY, {}, SECRET), WebhookVerificationError);
});

test("список событий из описания API", () => {
  assert.ok(WEBHOOK_EVENT_TYPES.includes("deal.stage_changed"));
  assert.ok(WEBHOOK_EVENT_TYPES.includes("test"));
});
