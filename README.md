# @wazzapo/sdk

Официальная библиотека [API v2 Wazzapo](https://wazzapo.kz/api/v2/external/docs) для Node.js и Bun
(клиент API работает и в браузере, проверка вебхуков только на сервере, через `node:crypto`):
WhatsApp-сообщения и шаблоны, переписки, контакты, сделки, вебхуки. Без зависимостей, типы и подсказки
по-русски, повторы и ошибки уже учтены.

```bash
npm install @wazzapo/sdk
```

Нужен Node.js 20 или новее.

## Первое сообщение за 5 минут

1. В кабинете Wazzapo откройте раздел «API» и создайте ключ. Для пробы берите тестовый ключ `wz_test_…`:
   он ничего не отправляет и не меняет, а отвечает как настоящий.
2. Сохраните ключ в переменную `WAZZAPO_API_KEY`.
3. Узнайте `phone_number_id` своего номера и отправьте сообщение:

```ts
import { Wazzapo } from "@wazzapo/sdk";

const client = new Wazzapo(); // ключ из WAZZAPO_API_KEY, или new Wazzapo({ apiKey: "wz_live_…" })

const { data: numbers } = await client.phoneNumbers.list();
// В списке все каналы аккаунта (WhatsApp, Telegram, OLX…): берём подключённый номер WhatsApp
const whatsapp = numbers.find((n) => n.provider_type === "meta_cloud" && n.status === "connected");
if (!whatsapp) throw new Error("Нет подключённого номера WhatsApp");
const phoneNumberId = whatsapp.phone_number_id;

// Текст: только если клиент писал вам за последние 24 часа
await client.messages.send({
  phone_number_id: phoneNumberId,
  to: "77071234567",
  type: "text",
  text: { body: "Айгуль, здравствуйте! Запись на 25 октября в 15:00 подтверждена." },
});

// Первое сообщение клиенту или после 24 часов: только одобренный шаблон
await client.messages.send({
  phone_number_id: phoneNumberId,
  to: "77071234567",
  type: "template",
  template: {
    name: "zapis_napominanie",
    language: { code: "ru" },
    components: [
      {
        type: "body",
        parameters: [
          { type: "text", text: "Айгуль" },
          { type: "text", text: "25 октября, 15:00" },
        ],
      },
    ],
  },
});
```

CommonJS тоже работает: `const { Wazzapo } = require("@wazzapo/sdk")`.

Все методы повторяют адреса API: `GET /deals` это `client.deals.list()`, `POST /deals/{deal_id}/move` это
`client.deals.move(dealId, body)`. Параметры пути идут первыми, затем тело. Последний аргумент это один
объект: фильтры запроса и настройки вызова вместе, поэтому новый фильтр в API не ломает ваш код.

```ts
await client.templates.list({ phone_number_id: phoneNumberId, status: "APPROVED", timeout: 10_000 });
await client.contacts.create({ phone: "77071234567" }, { idempotencyKey: "lead-1024" });
```

## Ошибки

Любая ошибка API становится исключением с полями `status`, `code`, `message`, `details`, `requestId`.
Ориентируйтесь на класс или `code`, текст `message` может меняться.

```ts
import { OutsideWindowError, TemplateError, UsageLimitError, ValidationError, WazzapoError } from "@wazzapo/sdk";

try {
  await client.messages.send({ phone_number_id: phoneNumberId, to: "77071234567", type: "text", text: { body: "Привет" } });
} catch (error) {
  if (error instanceof OutsideWindowError) {
    // прошло больше 24 часов: отправьте шаблон
  } else if (error instanceof TemplateError) {
    // шаблон не найден, не одобрен, приостановлен или отключён (error.code)
  } else if (error instanceof UsageLimitError) {
    console.log(error.details?.current, error.details?.limit, error.details?.upgrade_url); // типы есть
  } else if (error instanceof ValidationError) {
    console.log(error.fields); // [{ field: "body.to", message: "Field required" }]
  } else if (error instanceof WazzapoError) {
    console.log(error.code, error.message, error.requestId); // requestId сообщите в поддержку
  }
}
```

| Класс | Когда |
|---|---|
| `AuthenticationError` | 401: нет ключа, ключ неверный или отозван |
| `PaymentRequiredError` | 402: тариф не оплачен или Meta не может списать оплату |
| `PermissionDeniedError`, `UsageLimitError` | 403: нет права у ключа, IP не разрешён, исчерпан лимит тарифа |
| `NotFoundError` | 404: объекта нет в этом аккаунте |
| `ConflictError` | 409: объект уже есть, например `contact_exists` с id в `details` |
| `ValidationError`, `OutsideWindowError`, `TemplateError`, `UnprocessableEntityError` | 422 |
| `RateLimitError` | 429, в `retryAfter` секунды до повтора |
| `ServerError` | 5xx |
| `BadRequestError` | 400: неверный запрос |
| `ConnectionError`, `TimeoutError` | ответа нет: `code` равен `CONNECTION_ERROR` или `TIMEOUT` |

Ответ не в формате API (например, страница прокси с 502) получает код по статусу: `BAD_GATEWAY` и т.д.
Если сервер дважды вернёт тот же `next_cursor`, обход списка остановится с кодом `PAGINATION_LOOP`.

Все коды ошибок: `ERROR_CODES` и таблица в [описании API](https://wazzapo.kz/api/v2/external/docs).

## Повторы и Idempotency-Key

При 429, 500, 502, 503, 504 и сбое сети запрос повторяется 2 раза с растущей паузой (или через
`Retry-After`). Каждый POST получает заголовок `Idempotency-Key`, один на все повторы: сообщение не уйдёт
дважды, даже если ответ потерялся по дороге. Свой ключ, например id заказа:

```ts
await client.deals.create({ pipeline_id: "p1", contact: { phone: "77071234567" }, external_id: "order-4521" }, {
  idempotencyKey: "order-4521",
});
```

Настройки клиента: `new Wazzapo({ apiKey, baseUrl, timeout: 30_000, maxRetries: 2, debug: console.debug })`.
Настройки одного вызова: `{ idempotencyKey, timeout, maxRetries, signal, headers }`. `timeout` действует до
конца чтения ответа, `signal` отменяет запрос и паузу между повторами (уже отменённый сигнал: запрос не
уходит, ошибка `AbortError`). Ключ в строках отладки, `console.log(client)` и JSON скрыт: `wz_live_…`.

## Списки

Методы `list…` возвращают одну страницу `{ data, next_cursor, has_more }`. Чтобы пройти все записи,
берите парный метод с `All`: страницы запрашиваются сами.

```ts
for await (const contact of client.contacts.listAll({ tag: "vip" })) {
  console.log(contact.name, contact.phone);
}

for await (const message of client.conversations.listMessagesAll(conversationId)) {
  console.log(message.direction, message.text);
}
```

## Файлы

```ts
import { readFile } from "node:fs/promises";

const file = new File([await readFile("menu.jpg")], "menu.jpg", { type: "image/jpeg" });
const { media_id } = await client.media.upload({ file }, { phone_number_id: phoneNumberId });

await client.messages.send({ phone_number_id: phoneNumberId, to: "77071234567", type: "image", image: { id: media_id } });

const bytes = await client.media.download(mediaId, { phone_number_id: phoneNumberId }); // ArrayBuffer
```

## Вебхуки

Создайте вебхук и сохраните секрет: он приходит только в ответе на создание.

```ts
const webhook = await client.webhooks.create({
  url: "https://example.kz/wazzapo",
  event_types: ["message.incoming", "deal.stage_changed"],
});
console.log(webhook.secret);
```

Проверяйте подпись по **сырому** телу запроса, до разбора JSON. `Webhooks.verify` сверяет подпись
`X-Wazzapo-Signature-V2` и время `X-Wazzapo-Timestamp` (допуск 5 минут) и возвращает событие с типами.
Любой отказ (чужая подпись, старая метка, тело не JSON, пустой секрет) это `WebhookVerificationError`:
отвечайте 400. Без секрета `verify` не работает совсем: подпись пустым ключом подделал бы кто угодно.
Если в заголовке несколько подписей через запятую (смена секрета), хватает совпадения одной.

Express:

```ts
import express from "express";
import { Webhooks, WebhookVerificationError } from "@wazzapo/sdk/webhooks";

const app = express();

app.post("/wazzapo", express.raw({ type: "application/json" }), (req, res) => {
  try {
    const event = Webhooks.verify(req.body, req.headers, process.env.WAZZAPO_WEBHOOK_SECRET!);
    if (event.event === "message.incoming") {
      console.log(event.data.contact.phone, event.data.message.text);
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(error instanceof WebhookVerificationError ? 400 : 500);
  }
});

app.listen(3000);
```

Без фреймворков, на `node:http`:

```ts
import { createServer } from "node:http";
import { Webhooks } from "@wazzapo/sdk/webhooks";

createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  try {
    const event = Webhooks.verify(Buffer.concat(chunks), req.headers, process.env.WAZZAPO_WEBHOOK_SECRET!);
    console.log(event.event, event.timestamp);
    res.writeHead(200).end();
  } catch {
    res.writeHead(400).end();
  }
}).listen(3000);
```

Отвечайте 2xx быстро, тяжёлую работу делайте после ответа. Повторы одной доставки приходят с тем же
заголовком `X-Wazzapo-Delivery-Id` (константа `DELIVERY_ID_HEADER` из `@wazzapo/sdk/webhooks`): по нему
отсеивайте дубли. Проверить приёмник: `client.webhooks.test(webhookId)`,
для своих тестов подпись можно создать: `Webhooks.sign(body, secret)`.

## Тестовый ключ

Ключ `wz_test_…` читает настоящие данные, а отправка, создание и изменение ничего не делают и отвечают как
настоящие: id сообщений вида `wamid.SANDBOX…`. `client.isTest` показывает, какой ключ подключён.

## Ссылки

- [Описание API v2 (Swagger)](https://wazzapo.kz/api/v2/external/docs)
- [Документация](https://wazzapo.kz/docs)
- Поддержка: info@wazzapo.kz

Лицензия MIT.
