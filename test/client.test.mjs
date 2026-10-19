import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inspect } from "node:util";
import { test } from "node:test";

import {
  AuthenticationError,
  ConnectionError,
  NotFoundError,
  OutsideWindowError,
  RateLimitError,
  ServerError,
  TemplateError,
  TimeoutError,
  UsageLimitError,
  ValidationError,
  Wazzapo,
  WazzapoError,
} from "../dist/esm/index.js";
import { KEY, json, mockFetch, noSleep } from "./helpers.mjs";

const client = (fetch, extra = {}) => new Wazzapo({ apiKey: KEY, fetch, sleep: noSleep, ...extra });
const spec = JSON.parse(readFileSync(new URL("../../openapi.json", import.meta.url), "utf8"));

test("запрос: адрес, ключ, User-Agent, тело и параметры", async () => {
  const { fetch, calls } = mockFetch([json(200, { message_id: "m1", provider_message_id: "wamid.X", status: "sent" })]);
  const out = await client(fetch).messages.send({
    phone_number_id: "123",
    to: "77071234567",
    type: "text",
    text: { body: "Привет" },
  });
  assert.equal(out.provider_message_id, "wamid.X");
  const [call] = calls;
  assert.equal(call.url, "https://wazzapo.kz/api/v2/external/messages/send");
  assert.equal(call.init.method, "POST");
  assert.equal(call.headers["X-API-Key"], KEY);
  assert.match(call.headers["User-Agent"], /^wazzapo-sdk-node\/\d+\.\d+\.\d+$/);
  assert.equal(JSON.parse(call.init.body).text.body, "Привет");
  assert.match(call.headers["Idempotency-Key"], /^[0-9a-f-]{36}$/);
});

test("фильтры и настройки вызова в одном объекте: настройки не уходят в адрес", async () => {
  const { fetch, calls } = mockFetch([json(200, { data: [] })]);
  await client(fetch).phoneNumbers.list({ channel: "whatsapp", timeout: 5000, headers: { "X-Request-Id": "r1" } });
  assert.equal(calls[0].url, "https://wazzapo.kz/api/v2/external/phone-numbers?channel=whatsapp");
  assert.equal(calls[0].headers["X-Request-Id"], "r1");
});

test("параметры запроса: пустые пропускаются, путь кодируется", async () => {
  const { fetch, calls } = mockFetch([json(200, { data: [], has_more: false, next_cursor: null })]);
  await client(fetch).conversations.listMessages("a/b", { include_notes: true, since: null, limit: 10 });
  assert.equal(
    calls[0].url,
    "https://wazzapo.kz/api/v2/external/conversations/a%2Fb/messages?include_notes=true&limit=10",
  );
  assert.equal(calls[0].headers["Idempotency-Key"], undefined);
});

test("повторы при 503 и 429 с Retry-After, один Idempotency-Key", async () => {
  const waits = [];
  const { fetch, calls } = mockFetch([
    json(503, { success: false, error: { code: "SERVICE_UNAVAILABLE", message: "нет" } }),
    json(429, { success: false, error: { code: "RATE_LIMIT_EXCEEDED", message: "часто" } }, { "retry-after": "3" }),
    json(201, { id: "c1" }),
  ]);
  const c = new Wazzapo({ apiKey: KEY, fetch, sleep: async (ms) => void waits.push(ms) });
  const out = await c.contacts.create({ phone: "77071234567" });
  assert.equal(out.id, "c1");
  assert.equal(calls.length, 3);
  const keys = new Set(calls.map((x) => x.headers["Idempotency-Key"]));
  assert.equal(keys.size, 1);
  assert.ok(waits[0] >= 375 && waits[0] <= 625, `первая задержка ${waits[0]}`);
  assert.equal(waits[1], 3000);
});

test("Retry-After больше 60 с режется до 60", async () => {
  const waits = [];
  const { fetch } = mockFetch([json(429, {}, { "retry-after": "600" }), json(200, { data: [] })]);
  await new Wazzapo({ apiKey: KEY, fetch, sleep: async (ms) => void waits.push(ms) }).phoneNumbers.list();
  assert.deepEqual(waits, [60_000]);
});

test("свой Idempotency-Key и отказ от повторов", async () => {
  const { fetch, calls } = mockFetch([json(500, { success: false, error: { code: "INTERNAL_ERROR", message: "x" } })]);
  await assert.rejects(
    client(fetch).contacts.create({ phone: "1" }, { idempotencyKey: "order-1", maxRetries: 0 }),
    ServerError,
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].headers["Idempotency-Key"], "order-1");
});

test("сбой сети повторяется, потом ConnectionError", async () => {
  const { fetch, calls } = mockFetch([new TypeError("fetch failed"), new TypeError("fetch failed"), new TypeError("fetch failed")]);
  const err = await client(fetch).phoneNumbers.list().catch((e) => e);
  assert.ok(err instanceof ConnectionError);
  assert.equal(err.status, 0);
  assert.equal(calls.length, 3);
});

test("таймаут: TimeoutError", async () => {
  const hang = (_url, init) =>
    new Promise((_, reject) => init.signal.addEventListener("abort", () => reject(new DOMException("abort", "AbortError"))));
  const { fetch } = mockFetch([hang]);
  await assert.rejects(client(fetch, { timeout: 20, maxRetries: 0 }).phoneNumbers.list(), TimeoutError);
});

test("4xx не повторяется", async () => {
  const { fetch, calls } = mockFetch([json(404, { success: false, error: { code: "contact_not_found", message: "нет" } })]);
  await assert.rejects(client(fetch).contacts.get("x"), NotFoundError);
  assert.equal(calls.length, 1);
});

test("204 → null, файл → ArrayBuffer", async () => {
  const { fetch } = mockFetch([new Response(null, { status: 204 }), new Response(new Uint8Array([1, 2, 3]), { status: 200 })]);
  const c = client(fetch);
  assert.equal(await c.contacts.delete("c1"), null);
  const file = await c.media.download("m1", { phone_number_id: "123" });
  assert.deepEqual([...new Uint8Array(file)], [1, 2, 3]);
});

test("загрузка файла multipart", async () => {
  const { fetch, calls } = mockFetch([json(200, { media_id: "m9" })]);
  const file = new File([new Uint8Array([1])], "menu.jpg", { type: "image/jpeg" });
  const out = await client(fetch).media.upload({ file }, { phone_number_id: "123" });
  assert.equal(out.media_id, "m9");
  assert.ok(calls[0].init.body instanceof FormData);
  assert.equal(calls[0].init.body.get("file").name, "menu.jpg");
  assert.equal(calls[0].headers["Content-Type"], undefined);
  assert.equal(calls[0].url, "https://wazzapo.kz/api/v2/external/media?phone_number_id=123");
});

test("ошибки по примерам из описания API: класс по статусу", async () => {
  const classes = {
    401: AuthenticationError,
    404: NotFoundError,
    422: ValidationError,
    429: RateLimitError,
    500: ServerError,
    502: ServerError,
  };
  const responses = spec.paths["/api/v2/external/messages/send"].post.responses;
  let checked = 0;
  for (const [status, resp] of Object.entries(responses)) {
    if (status.startsWith("2")) continue;
    const example = resp.content["application/json"].example;
    const { fetch } = mockFetch([json(Number(status), example)]);
    const err = await client(fetch, { maxRetries: 0 }).messages.send({ phone_number_id: "1", to: "1", type: "text" }).catch((e) => e);
    assert.ok(err instanceof WazzapoError, status);
    assert.equal(err.status, Number(status));
    assert.equal(err.code, example.error.code);
    assert.equal(err.message, example.error.message);
    assert.equal(err.requestId, example.request_id);
    if (classes[status]) assert.ok(err instanceof classes[status], `${status}: ${err.name}`);
    checked++;
  }
  assert.ok(checked >= 10, `проверено ${checked}`);
});

test("ошибки по коду: окно 24 часа, шаблон, лимит, поля проверки", async () => {
  const body = (code, details) => ({ success: false, error: { code, message: "m", details }, request_id: "r1" });
  const { fetch } = mockFetch([
    json(422, body("outside_24h_window")),
    json(422, body("template_paused")),
    json(403, body("USAGE_LIMIT_EXCEEDED", { current: 1000, limit: 1000, upgrade_url: "/pricing" })),
    json(422, body("VALIDATION_ERROR", [{ field: "body.to", message: "Field required" }])),
  ]);
  const c = client(fetch, { maxRetries: 0 });
  const send = () => c.messages.send({ phone_number_id: "1", to: "1", type: "text" }).catch((e) => e);
  assert.ok((await send()) instanceof OutsideWindowError);
  assert.ok((await send()) instanceof TemplateError);
  const limit = await send();
  assert.ok(limit instanceof UsageLimitError);
  assert.equal(limit.details.limit, 1000);
  const invalid = await send();
  assert.ok(invalid instanceof ValidationError);
  assert.deepEqual(invalid.fields, [{ field: "body.to", message: "Field required" }]);
});

test("ответ не в формате API: код по статусу, request_id из заголовка", async () => {
  const { fetch } = mockFetch([new Response("<html>Bad Gateway</html>", { status: 502, headers: { "x-request-id": "abc" } })]);
  const err = await client(fetch, { maxRetries: 0 }).phoneNumbers.list().catch((e) => e);
  assert.ok(err instanceof ServerError);
  assert.equal(err.code, "BAD_GATEWAY");
  assert.equal(err.requestId, "abc");
});

test("RateLimitError.retryAfter", async () => {
  const { fetch } = mockFetch([json(429, { success: false, error: { code: "rate_limited", message: "m" } }, { "retry-after": "7" })]);
  const err = await client(fetch, { maxRetries: 0 }).phoneNumbers.list().catch((e) => e);
  assert.equal(err.retryAfter, 7);
});

test("пагинация: все страницы по next_cursor", async () => {
  const { fetch, calls } = mockFetch([
    json(200, { data: [{ id: "1" }, { id: "2" }], has_more: true, next_cursor: "c2" }),
    json(200, { data: [{ id: "3" }], has_more: true, next_cursor: "c3" }),
    json(200, { data: [{ id: "4" }], has_more: false, next_cursor: null }),
  ]);
  const ids = [];
  for await (const contact of client(fetch).contacts.listAll({ tag: "vip", limit: 2 })) ids.push(contact.id);
  assert.deepEqual(ids, ["1", "2", "3", "4"]);
  assert.equal(calls.length, 3);
  assert.ok(!calls[0].url.includes("cursor="));
  assert.ok(calls[1].url.endsWith("tag=vip&limit=2&cursor=c2"));
  assert.ok(calls[2].url.endsWith("cursor=c3"));
});

test("пагинация вложенного списка: listDeliveriesAll", async () => {
  const { fetch, calls } = mockFetch([json(200, { data: [{ id: "d1" }], has_more: false, next_cursor: null })]);
  const items = [];
  for await (const d of client(fetch).webhooks.listDeliveriesAll("w1")) items.push(d.id);
  assert.deepEqual(items, ["d1"]);
  assert.equal(calls[0].url, "https://wazzapo.kz/api/v2/external/webhooks/w1/deliveries");
});

test("ключ скрыт в логах, inspect и JSON", async () => {
  const lines = [];
  const { fetch } = mockFetch([json(200, { data: [] })]);
  const c = client(fetch, { debug: (line) => lines.push(line) });
  await c.phoneNumbers.list();
  const shown = [inspect(c), JSON.stringify(c), ...lines].join("\n");
  assert.ok(!shown.includes(KEY), shown);
  assert.ok(shown.includes("wz_live_…"));
  assert.equal(c.maskedApiKey, "wz_live_…");
});

test("тестовый ключ и ключ из окружения", () => {
  assert.equal(new Wazzapo({ apiKey: "wz_test_abc" }).isTest, true);
  assert.equal(new Wazzapo({ apiKey: KEY }).isTest, false);
  const old = process.env.WAZZAPO_API_KEY;
  process.env.WAZZAPO_API_KEY = "wz_test_env";
  try {
    assert.equal(new Wazzapo().isTest, true);
    delete process.env.WAZZAPO_API_KEY;
    assert.throws(() => new Wazzapo(), WazzapoError);
  } finally {
    if (old === undefined) delete process.env.WAZZAPO_API_KEY;
    else process.env.WAZZAPO_API_KEY = old;
  }
});

test("свой адрес API без слеша на конце", async () => {
  const { fetch, calls } = mockFetch([json(200, { data: [] })]);
  await client(fetch, { baseUrl: "http://localhost:8000/" }).phoneNumbers.list();
  assert.equal(calls[0].url, "http://localhost:8000/api/v2/external/phone-numbers");
});

test("уже отменённый signal: запрос не уходит", async () => {
  const { fetch, calls } = mockFetch([json(200, { data: [] })]);
  const ac = new AbortController();
  ac.abort();
  await assert.rejects(client(fetch).phoneNumbers.list({ signal: ac.signal }), { name: "AbortError" });
  assert.equal(calls.length, 0);
});

test("отмена во время паузы между повторами прерывает её", async () => {
  const { fetch, calls } = mockFetch([json(503, {}), json(200, { data: [] })]);
  const ac = new AbortController();
  // пауза «бесконечная»: без учёта сигнала тест бы завис
  const sleep = () => new Promise(() => {});
  const pending = new Wazzapo({ apiKey: KEY, fetch, sleep }).phoneNumbers.list({ signal: ac.signal });
  setTimeout(() => ac.abort(), 20);
  await assert.rejects(pending, { name: "AbortError" });
  assert.equal(calls.length, 1);
});

test("таймаут покрывает чтение тела ответа", async () => {
  const fetch = async (_url, init) => {
    // заголовки сразу, тело не приходит, пока запрос не отменён
    const body = new ReadableStream({
      start(controller) {
        init.signal.addEventListener("abort", () => controller.error(new DOMException("aborted", "AbortError")));
      },
    });
    return new Response(body, { status: 200, headers: { "content-type": "application/json" } });
  };
  await assert.rejects(client(fetch, { timeout: 30, maxRetries: 0 }).phoneNumbers.list(), TimeoutError);
});

test("пагинация: тот же next_cursor останавливает обход ошибкой", async () => {
  const page = { data: [{ id: "c1" }], next_cursor: "same", has_more: true };
  const { fetch } = mockFetch([json(200, page), json(200, page), json(200, page)]);
  const seen = [];
  await assert.rejects(
    (async () => {
      for await (const item of client(fetch).contacts.listAll()) seen.push(item.id);
    })(),
    (error) => error instanceof WazzapoError && error.code === "PAGINATION_LOOP",
  );
  assert.deepEqual(seen, ["c1", "c1"]);
});

test("400 → BadRequestError, 422 без особого кода → UnprocessableEntityError, поля проверки", async () => {
  const { BadRequestError, UnprocessableEntityError } = await import("../dist/esm/index.js");
  const { fetch } = mockFetch([
    json(400, { success: false, error: { code: "BAD_REQUEST", message: "Неверный запрос" } }),
    json(422, { success: false, error: { code: "invalid_parameters", message: "Meta не приняла" } }),
    json(422, { success: false, error: { code: "VALIDATION_ERROR", message: "x", details: [{ field: "body.to", message: "Field required" }] } }),
  ]);
  const c = client(fetch);
  await assert.rejects(c.phoneNumbers.list(), BadRequestError);
  await assert.rejects(c.phoneNumbers.list(), (e) => e instanceof UnprocessableEntityError && !(e instanceof ValidationError));
  await assert.rejects(c.phoneNumbers.list(), (e) => e instanceof ValidationError && e instanceof UnprocessableEntityError && e.fields[0].field === "body.to");
});

test("нет ключа: понятная ошибка до запроса; ключ не виден в ошибках", async () => {
  const saved = process.env.WAZZAPO_API_KEY;
  delete process.env.WAZZAPO_API_KEY;
  try {
    assert.throws(() => new Wazzapo({}), (e) => e instanceof WazzapoError && /Нет API-ключа/.test(e.message));
  } finally {
    if (saved !== undefined) process.env.WAZZAPO_API_KEY = saved;
  }
  const { fetch } = mockFetch([json(401, { success: false, error: { code: "INVALID_API_KEY", message: "Invalid API key" } })]);
  const error = await client(fetch).phoneNumbers.list().catch((e) => e);
  assert.ok(!inspect(error, { depth: 5 }).includes(KEY));
  assert.ok(!JSON.stringify(Object.keys(new Wazzapo({ apiKey: KEY, fetch }))).includes(KEY));
});
