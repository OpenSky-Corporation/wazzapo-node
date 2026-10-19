# Изменения

Версии по semver: 0.x может менять методы между минорными версиями, с 1.0 только добавляем.

## 0.1.0 (19.10.2026)

Первый выпуск для API v2 Wazzapo.

- Все 49 методов API v2: номера, сообщения, шаблоны, медиа, контакты, воронки, сделки, задачи,
  диалоги, команда, вебхуки. Типы и подсказки по-русски из описания API.
- Повторы при 429, 5xx и сбое сети с учётом Retry-After, Idempotency-Key на каждый POST.
- Ошибки по классам: OutsideWindowError, TemplateError, UsageLimitError, RateLimitError и другие.
- Списки через `for await`: `listAll`, `listMessagesAll`, `listDeliveriesAll`.
- Проверка подписи вебхуков: `@wazzapo/sdk/webhooks` (Node.js). Пустой секрет и тело не JSON дают
  `WebhookVerificationError`, несколько подписей через запятую, константа `DELIVERY_ID_HEADER`.
- `signal` отменяет и запрос, и паузу между повторами; `timeout` действует до конца чтения ответа.
- Фильтры-перечисления (`status`, `category` у шаблонов) типизированы литералами, `details` у
  `UsageLimitError` с типом; повтор `next_cursor` останавливает обход с кодом `PAGINATION_LOOP`.
- ESM и CommonJS, Node.js 20+, без зависимостей.
