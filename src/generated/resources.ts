// Сгенерировано из sdk/openapi.json командой `cd sdk && python -m codegen typescript`. Не править руками.

import { splitOptions, type RequestOptions, type Transport } from "../core.js";
import { paginate } from "../pagination.js";
import type {
  AddNoteIn,
  AssignConversationIn,
  BusinessProfileIn,
  BusinessProfileOut,
  BusinessProfileUpdateOut,
  ContactCreateIn,
  ContactListOut,
  ContactUpdateIn,
  ContactV2Out,
  ConversationItemOut,
  ConversationListOut,
  ConversationMessageListOut,
  ConversationMessageOut,
  CreateTemplateIn,
  DealCreateIn,
  DealListOut,
  DealMoveIn,
  DealOut,
  DealUpdateIn,
  MarkReadIn,
  MediaUploadForm,
  MediaUploadOut,
  PhoneNumberListOut,
  PhoneNumberOut,
  PipelineListOut,
  PipelineOut,
  ReactionIn,
  ReactionOut,
  RegisterPhoneNumberIn,
  RegisterPhoneNumberOut,
  SendMessageIn,
  SendMessageOut,
  SetConversationStatusIn,
  SetLabelsIn,
  SuccessOut,
  TaskCreateIn,
  TaskListOut,
  TaskOut,
  TaskUpdateIn,
  TeamListOut,
  TeamMemberOut,
  TemplateListOut,
  TemplateOut,
  UpdateTemplateIn,
  WebhookCreateIn,
  WebhookDeliveryListOut,
  WebhookDeliveryOut,
  WebhookEventTypeListOut,
  WebhookEventTypeOut,
  WebhookListOut,
  WebhookOut,
  WebhookRetryOut,
  WebhookSecretOut,
  WebhookTestOut,
  WebhookUpdateIn,
  WebhookWithSecretOut,
} from "./types.js";

/** Параметры запроса contacts.list. */
export interface ContactsListQuery {
  /**
   * Поиск без учёта регистра по части имени (Айгуль) или номера от 3 цифр (7071234, 8 707 123 45 67, +7 707 123-45-67)
   */
  search?: string | null;
  /**
   * Только контакты с этой меткой, например vip
   */
  tag?: string | null;
  /**
   * Только изменённые с этого времени, ISO 8601: 2026-10-01T00:00:00Z. Удобно для обмена с вашей CRM: запоминайте время прошлого запроса
   */
  updated_since?: string | null;
  /**
   * Только контакты с этим external_id (вашим id из своей CRM), например 1c-00042
   */
  external_id?: string | null;
  /**
   * Сколько контактов на странице, от 1 до 200
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Параметры запроса conversations.list. */
export interface ConversationsListQuery {
  /**
   * Только диалоги этого номера WhatsApp: phone_number_id из GET /api/v2/external/phone-numbers, например 103799815708451. Если передан, channel не учитывается
   */
  phone_number_id?: string | null;
  /**
   * Только диалоги канала: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel?: "whatsapp" | "telegram" | "instagram" | "olx" | "satu" | "email" | "webchat" | null;
  /**
   * Только диалоги в статусе: open (открыт, нужно ответить), pending (ожидает), snoozed (отложен), resolved (решён)
   */
  status?: "open" | "pending" | "snoozed" | "resolved" | null;
  /**
   * Только диалоги ответственного: id из GET /api/v2/external/team, например 7; none: диалоги без ответственного
   */
  assignee_user_id?: string | null;
  /**
   * true: есть непрочитанные сообщения клиента, false: всё прочитано
   */
  unread?: boolean | null;
  /**
   * Только диалоги, изменённые после этого момента, ISO 8601, например 2026-10-01T00:00:00Z. Для синхронизации: updated_at последнего диалога прошлой выгрузки
   */
  updated_since?: string | null;
  /**
   * Диалогов на странице, от 1 до 200
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Параметры запроса conversations.list_messages. */
export interface ConversationsListMessagesQuery {
  /**
   * true: добавить заметки сотрудников (is_note: true), клиент их не видит
   */
  include_notes?: boolean;
  /**
   * Только сообщения после этого времени, ISO 8601, например 2026-10-18T09:15:00Z: timestamp последнего полученного сообщения
   */
  since?: string | null;
  /**
   * Сообщений на странице, от 1 до 200
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Параметры запроса deals.list. */
export interface DealsListQuery {
  /**
   * Только сделки воронки: id из GET /pipelines
   */
  pipeline_id?: string | null;
  /**
   * Только сделки на этапе: stages[].id из GET /pipelines
   */
  stage_id?: string | null;
  /**
   * Только сделки клиента: id контакта из GET /contacts
   */
  contact_id?: string | null;
  /**
   * Найти сделку по вашему id (external_id при создании), например site-order-4521: так проверяют дубль перед POST /deals
   */
  external_id?: string | null;
  /**
   * Только изменённые начиная с этого времени, ISO 8601, например 2026-10-18T00:00:00Z
   */
  updated_since?: string | null;
  /**
   * Сколько сделок на странице, от 1 до 200, по умолчанию 50
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; для первой страницы не передавайте
   */
  cursor?: string | null;
}

/** Параметры запроса media.download. */
export interface MediaDownloadQuery {
  /**
   * id номера: phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
}

/** Параметры запроса media.upload. */
export interface MediaUploadQuery {
  /**
   * id номера: phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
}

/** Параметры запроса phone_numbers.list. */
export interface PhoneNumbersListQuery {
  /**
   * Только этот канал: whatsapp, telegram, instagram, olx, satu, email, webchat. Для отправки сообщений и шаблонов нужен whatsapp
   */
  channel?: "whatsapp" | "telegram" | "instagram" | "olx" | "satu" | "email" | "webchat" | null;
}

/** Параметры запроса pipelines.list. */
export interface PipelinesListQuery {
  /**
   * Сколько воронок на странице, от 1 до 200, по умолчанию 50
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; для первой страницы не передавайте
   */
  cursor?: string | null;
}

/** Параметры запроса tasks.list. */
export interface TasksListQuery {
  /**
   * Сколько задач на странице, от 1 до 200, по умолчанию 50
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; для первой страницы не передавайте
   */
  cursor?: string | null;
}

/** Параметры запроса team.list. */
export interface TeamListQuery {
  /**
   * Сотрудников на странице, от 1 до 200
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Параметры запроса templates.list. */
export interface TemplatesListQuery {
  /**
   * id номера из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
  /**
   * Сколько шаблонов на странице, от 1 до 200
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа
   */
  cursor?: string | null;
  /**
   * Только с этим статусом: PENDING, APPROVED, REJECTED, PAUSED, DISABLED
   */
  status?: "PENDING" | "APPROVED" | "REJECTED" | "DISABLED" | "PAUSED" | null;
  /**
   * Только этой категории: MARKETING, UTILITY, AUTHENTICATION
   */
  category?: "MARKETING" | "UTILITY" | "AUTHENTICATION" | null;
  /**
   * Часть имени без учёта регистра, например zapis
   */
  name?: string | null;
  /**
   * Только этого языка, например ru или kk
   */
  language?: string | null;
}

/** Параметры запроса webhook_event_types.list. */
export interface WebhookEventTypesListQuery {
  /**
   * Сколько записей на странице
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Параметры запроса webhooks.list. */
export interface WebhooksListQuery {
  /**
   * Сколько записей на странице
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Параметры запроса webhooks.list_deliveries. */
export interface WebhooksListDeliveriesQuery {
  /**
   * Сколько записей на странице
   */
  limit?: number;
  /**
   * next_cursor из прошлого ответа; без него первая страница
   */
  cursor?: string | null;
}

/** Методы contacts: `client.contacts`. */
export class ContactsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Создать контакт
   *
   * Добавляет клиента в контакты: номер обязателен, имя, почта, метки, свои поля и external_id по желанию.
   *
   * Номер приводится к виду 77071234567: плюс можно, 8 в начале заменяется на 7. Удалённый ранее
   * контакт с этим номером восстанавливается с новыми данными. Свои поля сначала создайте в кабинете,
   * раздел «Поля контакта». Заголовок Idempotency-Key защищает от двойного создания при повторе запроса.
   * Ошибки: 409 contact_exists (номер уже есть: id в error.details.contact_id, измените его через
   * PATCH /contacts/{contact_id}), 422 invalid_phone, 422 unknown_custom_field, 403 USAGE_LIMIT_EXCEEDED
   * (лимит контактов тарифа).
   *
   * `POST /api/v2/external/contacts`
   */
  create(body: ContactCreateIn, params: RequestOptions = {}): Promise<ContactV2Out> {
    const options = params;
    return this.transport.request<ContactV2Out>({ method: "POST", path: `/contacts`, body, options });
  }

  /**
   * Удалить контакт
   *
   * Удаляет контакт мягко, как в кабинете: он пропадает из списка и поиска, переписка остаётся.
   *
   * Восстановить: клиент напишет с этого номера или вызовите POST /contacts с тем же номером.
   * Ответ 204 без тела. Ошибки: 404 contact_not_found (уже удалён или чужой).
   *
   * `DELETE /api/v2/external/contacts/{contact_id}`
   *
   * @param contactId id контакта: поле id из GET /contacts или из ответа POST /contacts, например 6712f0c4a1b2c3d4e5f60718
   */
  delete(contactId: string, params: RequestOptions = {}): Promise<null> {
    const options = params;
    return this.transport.request<null>({ method: "DELETE", path: `/contacts/${encodeURIComponent(contactId)}`, options });
  }

  /**
   * Получить контакт
   *
   * Карточка одного контакта: номер, имя, метки, свои поля, источник (attribution).
   *
   * id берите из GET /contacts (найти по номеру: ?search=77071234567) или из ответа создания.
   * Ошибки: 404 contact_not_found, если контакта нет в этом аккаунте или он удалён.
   *
   * `GET /api/v2/external/contacts/{contact_id}`
   *
   * @param contactId id контакта: поле id из GET /contacts или из ответа POST /contacts, например 6712f0c4a1b2c3d4e5f60718
   */
  get(contactId: string, params: RequestOptions = {}): Promise<ContactV2Out> {
    const options = params;
    return this.transport.request<ContactV2Out>({ method: "GET", path: `/contacts/${encodeURIComponent(contactId)}`, options });
  }

  /**
   * Список контактов
   *
   * Контакты аккаунта постранично, старые первыми. Удалённые и объединённые не показываются.
   *
   * Фильтры складываются: ?search=Айгуль&tag=vip. Найти клиента своей CRM: ?external_id=1c-00042.
   * Следующая страница: передайте next_cursor из ответа в ?cursor=, пока has_more=true.
   * Ошибки: 401 неверный ключ, 422 неверный cursor или updated_since.
   *
   * `GET /api/v2/external/contacts`
   */
  list(params: ContactsListQuery & RequestOptions = {}): Promise<ContactListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<ContactListOut>({ method: "GET", path: `/contacts`, query, options });
  }

  /**
   * Все записи contacts.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.contacts.listAll(...))`
   */
  listAll(params: Omit<ContactsListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<ContactV2Out> {
    return paginate<ContactV2Out>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }

  /**
   * Изменить контакт
   *
   * Меняет только переданные поля, остальные остаются как были. Номер не меняется.
   *
   * tags заменяют весь список меток. custom_fields дополняют сохранённые: переданный ключ
   * перезаписывается, null очищает поле, непереданные не трогаются. Изменение видно менеджерам
   * сразу и запускает сценарии на изменение полей, как правка в кабинете.
   * Ошибки: 404 contact_not_found, 422 unknown_custom_field.
   *
   * `PATCH /api/v2/external/contacts/{contact_id}`
   *
   * @param contactId id контакта: поле id из GET /contacts или из ответа POST /contacts, например 6712f0c4a1b2c3d4e5f60718
   */
  update(contactId: string, body: ContactUpdateIn, params: RequestOptions = {}): Promise<ContactV2Out> {
    const options = params;
    return this.transport.request<ContactV2Out>({ method: "PATCH", path: `/contacts/${encodeURIComponent(contactId)}`, body, options });
  }
}

/** Методы conversations: `client.conversations`. */
export class ConversationsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Добавить заметку
   *
   * Добавляет заметку сотрудника в диалог: её видят только сотрудники в кабинете, клиенту она не уходит. Упомянутым в `mention_user_ids` (id из GET /team) приходит уведомление в кабинете. Автор заметки сотрудник, чей ключ. Уходит вебхук `conversation.note_added` (только по явной подписке).
   *
   * Передайте заголовок `Idempotency-Key`: повтор запроса с тем же ключом не создаст вторую заметку. В переписке заметка видна с `include_notes=true`.
   *
   * Ошибки: 403 `FORBIDDEN`, 404 `conversation_not_found`, 422 `VALIDATION_ERROR` (пустой текст или id не из GET /team). Право ключа: `conversations:write`.
   *
   * `POST /api/v2/external/conversations/{conversation_id}/notes`
   *
   * @param conversationId id диалога: поле id из GET /api/v2/external/conversations или conversation_id из вебхука message.incoming, например 6a7d5d3712f8e1a5c19f40c4
   */
  addNote(conversationId: string, body: AddNoteIn, params: RequestOptions = {}): Promise<ConversationMessageOut> {
    const options = params;
    return this.transport.request<ConversationMessageOut>({ method: "POST", path: `/conversations/${encodeURIComponent(conversationId)}/notes`, body, options });
  }

  /**
   * Назначить ответственного
   *
   * Назначает ответственного менеджера (`user_id`) или снимает его (`null`). id сотрудника возьмите из GET /team: поле `id`, сотрудник должен быть активным (`is_active: true`) и не VIEWER.
   *
   * Права как в чате: назначить на другого может владелец, администратор команды или текущий ответственный; взять себе чужой диалог менеджер может, если владелец это разрешил. Новому ответственному приходит уведомление в кабинете, в диалог пишется служебная заметка, уходит вебхук `conversation.assigned`.
   *
   * Ошибки: 403 `FORBIDDEN` (у сотрудника ключа нет права назначать или выбран наблюдатель VIEWER), 404 `conversation_not_found`, 409 `CONFLICT` (сотрудник отключён, `is_active: false`, или его нет в команде аккаунта; или диалог одновременно назначили из кабинета: перечитайте и повторите), 422 `VALIDATION_ERROR` (в user_id не только цифры, например «abc»: передайте id строкой из GET /team, например «7»). В сделках и задачах тот же отключённый сотрудник даёт 422 `responsible_user_not_found`: там ответственный проверяется как поле тела запроса. Право ключа: `conversations:write`.
   *
   * `POST /api/v2/external/conversations/{conversation_id}/assign`
   *
   * @param conversationId id диалога: поле id из GET /api/v2/external/conversations или conversation_id из вебхука message.incoming, например 6a7d5d3712f8e1a5c19f40c4
   */
  assign(conversationId: string, body: AssignConversationIn, params: RequestOptions = {}): Promise<ConversationItemOut> {
    const options = params;
    return this.transport.request<ConversationItemOut>({ method: "POST", path: `/conversations/${encodeURIComponent(conversationId)}/assign`, body, options });
  }

  /**
   * Диалог
   *
   * Один диалог по id: контакт, канал, статус, ответственный, метки, непрочитанные и последнее сообщение. id берут из GET /conversations или из поля `conversation_id` вебхука `message.incoming`.
   *
   * Ошибка 404 `conversation_not_found`: диалога нет в этом аккаунте или он скрыт от сотрудника, чей ключ. Право ключа: `conversations:read`.
   *
   * `GET /api/v2/external/conversations/{conversation_id}`
   *
   * @param conversationId id диалога: поле id из GET /api/v2/external/conversations или conversation_id из вебхука message.incoming, например 6a7d5d3712f8e1a5c19f40c4
   */
  get(conversationId: string, params: RequestOptions = {}): Promise<ConversationItemOut> {
    const options = params;
    return this.transport.request<ConversationItemOut>({ method: "GET", path: `/conversations/${encodeURIComponent(conversationId)}`, options });
  }

  /**
   * Список диалогов
   *
   * Диалоги аккаунта из всех каналов (WhatsApp, Telegram, Instagram, чат на сайте, OLX, Satu, почта), отсортированные по `updated_at` от давно изменённых к недавним.
   *
   * **Синхронизация.** Первый раз выгрузите всё, листая по `next_cursor`, пока `has_more` не станет false. Запомните `updated_at` последнего диалога и в следующий раз передайте его в `updated_since`: придут только диалоги, изменённые после (новое сообщение, статус, ответственный, метки). Диалог, изменённый во время листания, придёт ещё раз в конце, изменения не теряются. Чтобы узнавать сразу, подпишитесь на вебхуки `message.incoming` и `conversation.*`.
   *
   * Фильтры складываются: `status=open&assignee_user_id=none` даёт открытые диалоги без ответственного. Ключ сотрудника видит и меняет то же, что сотрудник в чате кабинета: диалоги по правилам видимости команды и только в доступных ему каналах.
   *
   * Ошибки: 404 `phone_number_not_found` (чужой или неверный phone_number_id), 422 `VALIDATION_ERROR` (неверный assignee_user_id или cursor). Право ключа: `conversations:read`.
   *
   * `GET /api/v2/external/conversations`
   */
  list(params: ConversationsListQuery & RequestOptions = {}): Promise<ConversationListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<ConversationListOut>({ method: "GET", path: `/conversations`, query, options });
  }

  /**
   * Все записи conversations.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.conversations.listAll(...))`
   */
  listAll(params: Omit<ConversationsListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<ConversationItemOut> {
    return paginate<ConversationItemOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }

  /**
   * Переписка диалога
   *
   * Переписка диалога от старых сообщений к новым: клиент, менеджеры, сценарии, боты, рассылки и API (кто написал, в `sender.type`). Листайте по `next_cursor`, на последней странице `next_cursor: null`.
   *
   * **Только новые сообщения.** Передайте в `since` поле `timestamp` последнего полученного сообщения: придут сообщения после него. Сразу узнавать о новых удобнее вебхуком `message.incoming`.
   *
   * Заметки сотрудников (клиент их не видит) приходят только с `include_notes=true`, у них `is_note: true`. Ошибка 404 `conversation_not_found`. Право ключа: `conversations:read`.
   *
   * `GET /api/v2/external/conversations/{conversation_id}/messages`
   *
   * @param conversationId id диалога: поле id из GET /api/v2/external/conversations или conversation_id из вебхука message.incoming, например 6a7d5d3712f8e1a5c19f40c4
   */
  listMessages(conversationId: string, params: ConversationsListMessagesQuery & RequestOptions = {}): Promise<ConversationMessageListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<ConversationMessageListOut>({ method: "GET", path: `/conversations/${encodeURIComponent(conversationId)}/messages`, query, options });
  }

  /**
   * Все записи conversations.list_messages по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.conversations.listMessagesAll(...))`
   */
  listMessagesAll(conversationId: string, params: Omit<ConversationsListMessagesQuery, "cursor"> & RequestOptions = {}): AsyncIterable<ConversationMessageOut> {
    return paginate<ConversationMessageOut>((cursor) =>
      this.listMessages(conversationId, { ...params, cursor }),
    );
  }

  /**
   * Задать метки диалога
   *
   * Задаёт метки диалога. Список **заменяет прежний целиком**: чтобы добавить метку, прочитайте текущие `tags` из GET /conversations/{conversation_id} и передайте их вместе с новой; `[]` убирает все. Метки копируются в карточку контакта, как в чате. В ответе метки в поле `tags`.
   *
   * Отдельного вебхука о метках нет: изменение видно по `updated_at` диалога. Ошибки: 403 `FORBIDDEN`, 404 `conversation_not_found`. Право ключа: `conversations:write`.
   *
   * `POST /api/v2/external/conversations/{conversation_id}/labels`
   *
   * @param conversationId id диалога: поле id из GET /api/v2/external/conversations или conversation_id из вебхука message.incoming, например 6a7d5d3712f8e1a5c19f40c4
   */
  setLabels(conversationId: string, body: SetLabelsIn, params: RequestOptions = {}): Promise<ConversationItemOut> {
    const options = params;
    return this.transport.request<ConversationItemOut>({ method: "POST", path: `/conversations/${encodeURIComponent(conversationId)}/labels`, body, options });
  }

  /**
   * Сменить статус диалога
   *
   * Меняет статус диалога: `open` (открыт, нужно ответить), `pending` (ожидает: например, ответа клиента или решения коллеги), `snoozed` (отложен до `snoozed_until`), `resolved` (решён).
   *
   * Закрыть диалог: `{"status": "resolved"}`. Как в чате, клиенту уходит запрос оценки качества, если он включён в настройках, и бот снова отвечает в этом диалоге. Новое сообщение клиента откроет решённый или отложенный диалог само. Уходит вебхук `conversation.status_changed` (если статус действительно изменился).
   *
   * Ошибки: 403 `FORBIDDEN` (у сотрудника только просмотр), 404 `conversation_not_found`. Право ключа: `conversations:write`.
   *
   * `POST /api/v2/external/conversations/{conversation_id}/status`
   *
   * @param conversationId id диалога: поле id из GET /api/v2/external/conversations или conversation_id из вебхука message.incoming, например 6a7d5d3712f8e1a5c19f40c4
   */
  setStatus(conversationId: string, body: SetConversationStatusIn, params: RequestOptions = {}): Promise<ConversationItemOut> {
    const options = params;
    return this.transport.request<ConversationItemOut>({ method: "POST", path: `/conversations/${encodeURIComponent(conversationId)}/status`, body, options });
  }
}

/** Методы deals: `client.deals`. */
export class DealsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Создать сделку
   *
   * Создаёт сделку, например из заявки с сайта, так же, как окно «Новая сделка» в кабинете.
   *
   * До вызова: pipeline_id и stage_id из GET /pipelines, ответственный из GET /team. Клиент:
   * contact_id из GET /contacts или contact {phone, name}: найдём контакт по номеру или создадим.
   * Сумма amount целым в тиынах, не в тенге: 150 000 ₸ = 15000000 (в шаблоне WhatsApp
   * сумма другая: amount_1000 = 150000000). custom_fields по id полей воронки.
   * Без дублей: передайте свой external_id. Повтор формы с тем же external_id, который уже
   * есть у сделки аккаунта, сделку не создаёт: 409 deal_exists, id существующей в
   * details.deal_id. Два одновременных запроса закрывает ещё и заголовок Idempotency-Key:
   * шлите тот же ключ при повторе после сбоя сети.
   * responsible_user_id ставит ответственного только сделки: ответственный переписки не
   * меняется, для него POST /conversations/{conversation_id}/assign.
   * Срабатывают действия этапа и уходит вебхук deal.created. Право deals:write.
   * Частые ошибки: 404 pipeline_not_found, 422 stage_not_found, unknown_custom_field,
   * amount_field_missing (в воронке нет поля суммы), responsible_user_not_found (нет такого
   * сотрудника или он отключён: is_active false в GET /team), VALIDATION_ERROR (нет ни
   * contact_id, ни contact), 404 contact_not_found, 409 deal_exists. Код open_deal_exists
   * (у переписки уже есть открытая сделка) этот метод не возвращает: сделка из API не
   * проверяет переписку и создаётся, даже если у клиента есть открытая в этой воронке.
   *
   * `POST /api/v2/external/deals`
   */
  create(body: DealCreateIn, params: RequestOptions = {}): Promise<DealOut> {
    const options = params;
    return this.transport.request<DealOut>({ method: "POST", path: `/deals`, body, options });
  }

  /**
   * Сделка
   *
   * Одна сделка: этап, сумма в тиынах, клиент, ответственный, свои поля.
   *
   * Сделка чужого аккаунта или скрытая от сотрудника, которому выдан ключ: 404 deal_not_found.
   * Право deals:read.
   *
   * `GET /api/v2/external/deals/{deal_id}`
   *
   * @param dealId id сделки: поле id из GET /deals или из ответа POST /deals, например 6713b1d5f2c3d4e5f6071829
   */
  get(dealId: string, params: RequestOptions = {}): Promise<DealOut> {
    const options = params;
    return this.transport.request<DealOut>({ method: "GET", path: `/deals/${encodeURIComponent(dealId)}`, options });
  }

  /**
   * Список сделок
   *
   * Сделки аккаунта по времени изменения, старые первыми, страницами по cursor.
   *
   * Синхронизация с вашей системой: запомните updated_at последней сделки и в следующий раз
   * передайте его в updated_since. Дубль перед созданием ищут по external_id.
   * Сумма amount и денежные custom_fields в тиынах (150 000 ₸ = 15000000).
   * Ключ сотрудника видит те же сделки, что сотрудник в кабинете. Право deals:read.
   *
   * `GET /api/v2/external/deals`
   */
  list(params: DealsListQuery & RequestOptions = {}): Promise<DealListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<DealListOut>({ method: "GET", path: `/deals`, query, options });
  }

  /**
   * Все записи deals.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.deals.listAll(...))`
   */
  listAll(params: Omit<DealsListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<DealOut> {
    return paginate<DealOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }

  /**
   * Перенести сделку на этап
   *
   * Переносит сделку на другой этап её воронки, как перетаскивание карточки в кабинете.
   *
   * stage_id берите из stages[] воронки в GET /pipelines. Перенос на этап с is_won закрывает
   * сделку успехом, на этап с is_lost отказом (причину передайте в lost_reason).
   * После переноса срабатывает то же, что в кабинете: сценарии «Событие в воронке», действия
   * этапа (поставить или закрыть задачи), вебхуки deal.stage_changed и при закрытии deal.closed, передача
   * продажи или заявки в Meta, если клиент пришёл с рекламы «Написать в WhatsApp».
   * Поля, обязательные с этого этапа (custom_fields[].required_from_stage_id в GET /pipelines),
   * заполните заранее через PATCH /deals/{deal_id}, иначе
   * 422 required_fields со списком полей в details. Другая воронка: 422 pipeline_change_not_supported.
   * Право deals:write.
   *
   * `POST /api/v2/external/deals/{deal_id}/move`
   *
   * @param dealId id сделки: поле id из GET /deals или из ответа POST /deals, например 6713b1d5f2c3d4e5f6071829
   */
  move(dealId: string, body: DealMoveIn, params: RequestOptions = {}): Promise<DealOut> {
    const options = params;
    return this.transport.request<DealOut>({ method: "POST", path: `/deals/${encodeURIComponent(dealId)}/move`, body, options });
  }

  /**
   * Изменить сделку
   *
   * Меняет название, сумму, ответственного, свои поля и external_id сделки.
   *
   * Меняются только переданные поля, остальные не трогаются. Сумма amount целым в тиынах.
   * В custom_fields передавайте только меняемые поля, null очищает поле. Снять ответственного
   * нельзя: responsible_user_id=null значит «не менять». Ответственный меняется только у
   * сделки, не у переписки (её: POST /conversations/{conversation_id}/assign); если в
   * кабинете включено правило, новому ответственному ставится задача. Этап этим методом не меняется:
   * для этого POST /deals/{deal_id}/move. В ленте сделки появится «было → стало», уходит
   * вебхук deal.changed. Право deals:write.
   * Частые ошибки: 404 deal_not_found, 422 unknown_custom_field, responsible_user_not_found
   * (нет такого сотрудника или он отключён), currency_mismatch.
   *
   * `PATCH /api/v2/external/deals/{deal_id}`
   *
   * @param dealId id сделки: поле id из GET /deals или из ответа POST /deals, например 6713b1d5f2c3d4e5f6071829
   */
  update(dealId: string, body: DealUpdateIn, params: RequestOptions = {}): Promise<DealOut> {
    const options = params;
    return this.transport.request<DealOut>({ method: "PATCH", path: `/deals/${encodeURIComponent(dealId)}`, body, options });
  }
}

/** Методы media: `client.media`. */
export class MediaResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Скачать файл
   *
   * Скачивает файл по media_id: тело ответа сам файл, тип в заголовке Content-Type.
   *
   * Так забирают фото, голосовые и документы, которые прислал клиент. Сохраните файл у себя:
   * Meta хранит его ограниченное время. Ошибки: 404 phone_number_not_found или NOT_FOUND (номер не
   * найден; файла с таким id нет в Meta: удалён, срок хранения вышел или id неверный; id sandbox_…
   * от тестового ключа, такие файлы не хранятся), 400 BAD_REQUEST (номер не через Cloud API),
   * 502 provider_error (сбой Meta, повторите позже).
   *
   * `GET /api/v2/external/media/{media_id}`
   *
   * @param mediaId id файла: media.id из входящего сообщения (вебхук message.incoming) или из POST /media
   */
  download(mediaId: string, params: MediaDownloadQuery & RequestOptions): Promise<ArrayBuffer> {
    const [query, options] = splitOptions(params);
    return this.transport.request<ArrayBuffer>({ method: "GET", path: `/media/${encodeURIComponent(mediaId)}`, query, binary: true, options });
  }

  /**
   * Загрузить файл
   *
   * Загружает файл в WhatsApp и возвращает media_id для отправки в POST /messages/send.
   *
   * Нужен, когда у файла нет публичной ссылки, и для голосовых OGG/OPUS (по ссылке Meta их
   * не доставляет). Пример: curl -F "file=@schet_1024.pdf" "…/media?phone_number_id=123456789012345".
   * media_id действует 30 дней. Повтор с тем же Idempotency-Key
   * не загружает файл второй раз. Ошибки: 400 BAD_REQUEST (номер не через Cloud API),
   * 413 PAYLOAD_TOO_LARGE, 422 media_unavailable (формат не подходит).
   *
   * `POST /api/v2/external/media`
   */
  upload(body: MediaUploadForm, params: MediaUploadQuery & RequestOptions): Promise<MediaUploadOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<MediaUploadOut>({ method: "POST", path: `/media`, query, body, multipart: true, options });
  }
}

/** Методы messages: `client.messages`. */
export class MessagesResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Отметить прочитанными
   *
   * Отмечает входящие сообщения прочитанными: клиент увидит синие галочки.
   *
   * Передайте wamid входящих из вебхука message.incoming. Отметка в WhatsApp не меняет
   * счётчик непрочитанных в кабинете. Тестовый ключ ничего не отправляет.
   * Ошибки: 404 phone_number_not_found, 501 not_supported (номер не через Cloud API).
   *
   * `POST /api/v2/external/messages/mark-read`
   */
  markRead(body: MarkReadIn, params: RequestOptions = {}): Promise<SuccessOut> {
    const options = params;
    return this.transport.request<SuccessOut>({ method: "POST", path: `/messages/mark-read`, body, options });
  }

  /**
   * Поставить реакцию
   *
   * Ставит эмодзи-реакцию на сообщение клиента или своё; пустой emoji снимает реакцию.
   *
   * Meta принимает реакцию на сообщения не старше 30 дней. Тестовый ключ ничего не отправляет.
   * Ошибки: 404 phone_number_not_found, 422 invalid_parameters (неверный message_id), 501 not_supported.
   *
   * `POST /api/v2/external/messages/reaction`
   */
  react(body: ReactionIn, params: RequestOptions = {}): Promise<ReactionOut> {
    const options = params;
    return this.transport.request<ReactionOut>({ method: "POST", path: `/messages/reaction`, body, options });
  }

  /**
   * Отправить сообщение
   *
   * Отправляет клиенту сообщение с номера phone_number_id (GET /api/v2/external/phone-numbers).
   *
   * **Окно 24 часа.** Обычное сообщение (текст, файл, кнопки, место) можно отправить, только если клиент писал вам за последние 24 часа. Первое сообщение и всё вне окна: только одобренный шаблон (type=template, имена в GET /api/v2/external/templates).
   *
   * **Файлы.** Передайте link (публичная ссылка https) или id: сначала загрузите файл в POST /api/v2/external/media и возьмите media_id из ответа.
   *
   * **Повтор.** Заголовок Idempotency-Key: повтор с тем же ключом не отправит второе сообщение, а вернёт первый ответ.
   *
   * **Тестовый ключ** wz_test_… ничего не отправляет и отвечает id вида wamid.SANDBOX….
   *
   * **После отправки** сообщение появляется в переписке кабинета, а на ваш адрес приходит вебхук message.outgoing; статусы доставки и прочтения приходят вебхуком message.status с тем же message_id.
   *
   * **Лимиты.** Каждое сообщение расходует лимит тарифа (403 USAGE_LIMIT_EXCEEDED); частоту запросов показывают заголовки X-RateLimit-*. Meta тоже ограничивает частоту (429 rate_limited).
   *
   * **Как узнать, открыто ли окно.** Окно 24 часа отсчитывается от последнего входящего сообщения клиента: возьмите timestamp последнего сообщения с direction=in из GET /api/v2/external/conversations/{conversation_id}/messages (или время вебхука message.incoming) и прибавьте 24 часа. Позже этого времени отправляйте шаблон.
   *
   * **Сумма в шаблоне** (type=currency): amount_1000 = тенге × 1000, 150 000 ₸ = 150000000. В сделках сумма в тиынах (× 100): 150 000 ₸ = 15000000.
   *
   * **Частые ошибки:** 422 outside_24h_window (окно закрыто, отправьте шаблон), 422 template_not_found (нет одобренного шаблона с таким именем и языком; именно 422, а не 404: адрес /messages/send существует, не подходит значение в теле. GET /templates/{template_id} с неизвестным id отвечает 404), 422 invalid_parameters (type не совпадает с блоком, например type=text вместе с template, или файл без id и link), 422 recipient_unavailable (у номера нет WhatsApp), 422 media_unavailable (Meta не скачала файл по ссылке), 404 phone_number_not_found.
   *
   * `POST /api/v2/external/messages/send`
   */
  send(body: SendMessageIn, params: RequestOptions = {}): Promise<SendMessageOut> {
    const options = params;
    return this.transport.request<SendMessageOut>({ method: "POST", path: `/messages/send`, body, options });
  }
}

/** Методы phone_numbers: `client.phoneNumbers`. */
export class PhoneNumbersResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Подключить номер
   *
   * Начинает подключение нового номера WhatsApp.
   *
   * В ответе может быть embedded_signup_url: откройте его во всплывающем окне, владелец
   * номера войдёт в Facebook и подтвердит номер в Meta. Пока подключение не завершено,
   * status=pending. Номер расходует лимит устройств тарифа.
   * Ошибки: 402 DEVICE_QUOTA_EXCEEDED (лимит номеров), 503 SERVICE_UNAVAILABLE
   * (подключение через API недоступно, подключите номер в кабинете).
   *
   * `POST /api/v2/external/phone-numbers`
   */
  create(body: RegisterPhoneNumberIn, params: RequestOptions = {}): Promise<RegisterPhoneNumberOut> {
    const options = params;
    return this.transport.request<RegisterPhoneNumberOut>({ method: "POST", path: `/phone-numbers`, body, options });
  }

  /**
   * Отключить номер
   *
   * Отключает номер от Wazzapo: сообщения с него больше не отправляются и не приходят.
   *
   * Переписка в кабинете сохраняется. Тестовый ключ номер не отключает.
   * Ошибка: 404 NOT_FOUND, если номера нет в этом аккаунте.
   *
   * `DELETE /api/v2/external/phone-numbers/{phone_number_id}`
   *
   * @param phoneNumberId id номера: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  delete(phoneNumberId: string, params: RequestOptions = {}): Promise<null> {
    const options = params;
    return this.transport.request<null>({ method: "DELETE", path: `/phone-numbers/${encodeURIComponent(phoneNumberId)}`, options });
  }

  /**
   * Номер
   *
   * Возвращает один номер: статус подключения, имя компании, оценку качества Meta.
   *
   * Проверяйте status=connected перед рассылкой. Ошибка: 404 NOT_FOUND, если номера
   * нет в этом аккаунте.
   *
   * `GET /api/v2/external/phone-numbers/{phone_number_id}`
   *
   * @param phoneNumberId id номера: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  get(phoneNumberId: string, params: RequestOptions = {}): Promise<PhoneNumberOut> {
    const options = params;
    return this.transport.request<PhoneNumberOut>({ method: "GET", path: `/phone-numbers/${encodeURIComponent(phoneNumberId)}`, options });
  }

  /**
   * Профиль компании
   *
   * Возвращает профиль компании в WhatsApp: описание, адрес, почту, сайты, фото.
   *
   * Клиенты видят его, открыв карточку номера. Только для номеров WhatsApp Cloud API.
   * Ошибки: 404 NOT_FOUND, 501 not_supported.
   *
   * `GET /api/v2/external/phone-numbers/{phone_number_id}/business-profile`
   *
   * @param phoneNumberId id номера: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  getBusinessProfile(phoneNumberId: string, params: RequestOptions = {}): Promise<BusinessProfileOut> {
    const options = params;
    return this.transport.request<BusinessProfileOut>({ method: "GET", path: `/phone-numbers/${encodeURIComponent(phoneNumberId)}/business-profile`, options });
  }

  /**
   * Список номеров
   *
   * Возвращает номера WhatsApp и другие каналы, подключённые к аккаунту ключа.
   *
   * С этого метода начинают: phone_number_id из ответа нужен для отправки сообщений,
   * загрузки файлов и шаблонов. Номера WhatsApp идут первыми, за ними остальные каналы
   * (поле channel); только WhatsApp: ?channel=whatsapp. Номер подключают в кабинете Wazzapo
   * или методом POST /phone-numbers. Отключённые номера в списке не показываются.
   *
   * `GET /api/v2/external/phone-numbers`
   */
  list(params: PhoneNumbersListQuery & RequestOptions = {}): Promise<PhoneNumberListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<PhoneNumberListOut>({ method: "GET", path: `/phone-numbers`, query, options });
  }

  /**
   * Изменить профиль компании
   *
   * Меняет профиль компании в WhatsApp. Передайте только поля, которые меняете.
   *
   * Фото профиля этим методом не меняется. Тестовый ключ ничего не меняет.
   * Ошибки: 404 NOT_FOUND, 422 invalid_parameters (Meta не приняла значение, например
   * неизвестная отрасль vertical), 501 not_supported.
   *
   * `PATCH /api/v2/external/phone-numbers/{phone_number_id}/business-profile`
   *
   * @param phoneNumberId id номера: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  updateBusinessProfile(phoneNumberId: string, body: BusinessProfileIn, params: RequestOptions = {}): Promise<BusinessProfileUpdateOut> {
    const options = params;
    return this.transport.request<BusinessProfileUpdateOut>({ method: "PATCH", path: `/phone-numbers/${encodeURIComponent(phoneNumberId)}/business-profile`, body, options });
  }
}

/** Методы pipelines: `client.pipelines`. */
export class PipelinesResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Список воронок
   *
   * Воронки аккаунта с этапами по порядку и своими полями сделки.
   *
   * С этого метода начинают работу со сделками: отсюда берут pipeline_id (data[].id),
   * stage_id (stages[].id) и id своих полей для custom_fields (custom_fields[].id, тип и
   * варианты options). Поле с is_amount=true хранит сумму сделки amount.
   * Ключ сотрудника видит только доступные ему воронки. Право ключа deals:read, без него 403.
   * Воронки меняются редко: можно кешировать на час и перечитывать при 422 stage_not_found.
   *
   * `GET /api/v2/external/pipelines`
   */
  list(params: PipelinesListQuery & RequestOptions = {}): Promise<PipelineListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<PipelineListOut>({ method: "GET", path: `/pipelines`, query, options });
  }

  /**
   * Все записи pipelines.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.pipelines.listAll(...))`
   */
  listAll(params: Omit<PipelinesListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<PipelineOut> {
    return paginate<PipelineOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }
}

/** Методы tasks: `client.tasks`. */
export class TasksResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Поставить задачу по сделке
   *
   * Ставит задачу по сделке: перезвонить, встретиться, отправить смету.
   *
   * due_at в ISO 8601: Казахстан живёт по UTC+5, «завтра в 10:00 по Астане» это 05:00Z
   * (2026-10-19T05:00:00Z) или 2026-10-19T10:00:00+05:00. Исполнитель по умолчанию
   * ответственный сделки, другой: id из GET /team. Исполнитель получит уведомление и
   * напоминание, уходит вебхук task.created. Повтор с тем же Idempotency-Key задачу не дублирует.
   * Право tasks:write. Ошибки: 404 deal_not_found, 422 responsible_user_not_found.
   *
   * `POST /api/v2/external/deals/{deal_id}/tasks`
   *
   * @param dealId id сделки: поле id из GET /deals или из ответа POST /deals, например 6713b1d5f2c3d4e5f6071829
   */
  create(dealId: string, body: TaskCreateIn, params: RequestOptions = {}): Promise<TaskOut> {
    const options = params;
    return this.transport.request<TaskOut>({ method: "POST", path: `/deals/${encodeURIComponent(dealId)}/tasks`, body, options });
  }

  /**
   * Задачи сделки
   *
   * Задачи сделки по сроку, ближайшие первыми, вместе с выполненными (done=true).
   *
   * Срок due_at в UTC с Z: 05:00Z это 10:00 по Астане. Ключ сотрудника без права видеть чужие
   * задачи получит только свои. Право tasks:read. Нет сделки: 404 deal_not_found.
   *
   * `GET /api/v2/external/deals/{deal_id}/tasks`
   *
   * @param dealId id сделки: поле id из GET /deals или из ответа POST /deals, например 6713b1d5f2c3d4e5f6071829
   */
  list(dealId: string, params: TasksListQuery & RequestOptions = {}): Promise<TaskListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<TaskListOut>({ method: "GET", path: `/deals/${encodeURIComponent(dealId)}/tasks`, query, options });
  }

  /**
   * Все записи tasks.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.tasks.listAll(...))`
   */
  listAll(dealId: string, params: Omit<TasksListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<TaskOut> {
    return paginate<TaskOut>((cursor) =>
      this.list(dealId, { ...params, cursor }),
    );
  }

  /**
   * Изменить задачу
   *
   * Меняет название, срок или исполнителя задачи, отмечает её выполненной.
   *
   * Меняются только переданные поля. done=true отмечает выполненной, как кнопка «Выполнено»
   * в кабинете, done=false возвращает в работу. id задачи из GET /deals/{deal_id}/tasks.
   * Право tasks:write. Ошибки: 404 task_not_found, 422 responsible_user_not_found.
   *
   * `PATCH /api/v2/external/tasks/{task_id}`
   *
   * @param taskId id задачи: поле id из GET /deals/{deal_id}/tasks или из ответа POST /deals/{deal_id}/tasks
   */
  update(taskId: string, body: TaskUpdateIn, params: RequestOptions = {}): Promise<TaskOut> {
    const options = params;
    return this.transport.request<TaskOut>({ method: "PATCH", path: `/tasks/${encodeURIComponent(taskId)}`, body, options });
  }
}

/** Методы team: `client.team`. */
export class TeamResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Сотрудники
   *
   * Владелец аккаунта и сотрудники команды: отсюда берут `id` для назначения ответственного (`user_id` в POST /conversations/{conversation_id}/assign) и для упоминаний в заметках (`mention_user_ids`). Первым в списке идёт владелец.
   *
   * Отключённые сотрудники тоже в списке (`is_active: false`): по ним видно прежних ответственных, но назначить на них нельзя. `phone_number_ids: null` значит, что сотрудник работает во всех номерах. Почты и телефонов сотрудников в ответе нет. Право ключа: `team:read`.
   *
   * `GET /api/v2/external/team`
   */
  list(params: TeamListQuery & RequestOptions = {}): Promise<TeamListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<TeamListOut>({ method: "GET", path: `/team`, query, options });
  }

  /**
   * Все записи team.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.team.listAll(...))`
   */
  listAll(params: Omit<TeamListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<TeamMemberOut> {
    return paginate<TeamMemberOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }
}

/** Методы templates: `client.templates`. */
export class TemplatesResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Отправить шаблон на проверку
   *
   * Создаёт шаблон и отправляет его на проверку Meta. Первое сообщение клиенту и сообщение после 24 часов
   * тишины можно отправить только одобренным шаблоном.
   *
   * До вызова: возьмите phone_number_id из GET /phone-numbers. Ответ приходит со status=PENDING; итог проверки
   * узнайте через GET /templates/{template_id} или событие вебхука template.status_updated.
   * Картинку, видео или PDF в шапке передайте ссылкой в example.media_url: Wazzapo сам загрузит образец в Meta.
   * Ошибки: 422 VALIDATION_ERROR (нет обязательного поля), 422 media_unavailable (образец файла не скачался),
   * 422 invalid_parameters (Meta не приняла шаблон, например имя уже занято), 404 номер не найден.
   * Повтор с тем же Idempotency-Key не создаёт второй шаблон.
   *
   * `POST /api/v2/external/templates`
   */
  create(body: CreateTemplateIn, params: RequestOptions = {}): Promise<TemplateOut> {
    const options = params;
    return this.transport.request<TemplateOut>({ method: "POST", path: `/templates`, body, options });
  }

  /**
   * Удалить шаблон
   *
   * Удаляет шаблон в Meta (только этот язык) и в Wazzapo. Отменить нельзя.
   *
   * Имя удалённого одобренного шаблона Meta не даёт занять снова 30 дней; отключённый (DISABLED) шаблон
   * Meta не удаляет. Ошибки: 404 шаблон не найден. Тестовый ключ ничего не удаляет.
   *
   * `DELETE /api/v2/external/templates/{template_id}`
   *
   * @param templateId id шаблона в Meta: template_id из POST или GET /api/v2/external/templates, например 1252715608684590
   */
  delete(templateId: string, params: RequestOptions = {}): Promise<null> {
    const options = params;
    return this.transport.request<null>({ method: "DELETE", path: `/templates/${encodeURIComponent(templateId)}`, options });
  }

  /**
   * Шаблон целиком
   *
   * Шаблон со всеми частями (components), числом переменных и кнопками; статус свежий из Meta.
   *
   * Используйте перед отправкой, чтобы знать, сколько значений и какой файл шапки передать.
   * Шаблоны, созданные в WhatsApp Manager, появляются здесь после синхронизации в кабинете Wazzapo,
   * до неё ищите их в GET /templates. Ошибки: 404 NOT_FOUND, шаблона с таким id нет в этом
   * аккаунте. Это 404, потому что не найден сам адрес-объект; при отправке неизвестного шаблона
   * POST /messages/send отвечает 422 template_not_found (не подошло значение в теле запроса).
   *
   * `GET /api/v2/external/templates/{template_id}`
   *
   * @param templateId id шаблона в Meta: template_id из POST или GET /api/v2/external/templates, например 1252715608684590
   */
  get(templateId: string, params: RequestOptions = {}): Promise<TemplateOut> {
    const options = params;
    return this.transport.request<TemplateOut>({ method: "GET", path: `/templates/${encodeURIComponent(templateId)}`, options });
  }

  /**
   * Статус шаблона
   *
   * Свежий статус проверки шаблона в Meta: PENDING, APPROVED, REJECTED, PAUSED или DISABLED.
   *
   * Короткий вариант для опроса статуса: смотрите в ответе status и rejected_reason. Полное
   * содержимое шаблона (части, переменные, кнопки) берите из GET /templates/{template_id}.
   * Опрашивайте после создания или правки, пока статус PENDING (раз в минуту достаточно), или подпишитесь
   * на событие template.status_updated. При REJECTED причина в rejected_reason.
   * Ошибки: 404 NOT_FOUND, шаблона с таким id нет в этом аккаунте (при отправке неизвестного
   * шаблона POST /messages/send отвечает 422 template_not_found).
   *
   * `GET /api/v2/external/templates/{template_id}/status`
   *
   * @param templateId id шаблона в Meta: template_id из POST или GET /api/v2/external/templates, например 1252715608684590
   */
  getStatus(templateId: string, params: RequestOptions = {}): Promise<TemplateOut> {
    const options = params;
    return this.transport.request<TemplateOut>({ method: "GET", path: `/templates/${encodeURIComponent(templateId)}/status`, options });
  }

  /**
   * Список шаблонов
   *
   * Все шаблоны номера прямо из Meta, со статусом и содержимым (components).
   *
   * Нужен, чтобы выбрать шаблон для messages.send: передайте его name и language, а значений переменных
   * столько, сколько variables_count. Фильтры status, category, name, language можно сочетать.
   * Страницы курсором: next_cursor передайте в cursor. У каналов без шаблонов Meta (почта, OLX, Telegram)
   * список пустой. Ошибки: 404 номер не найден, 403 account_restricted.
   *
   * `GET /api/v2/external/templates`
   */
  list(params: TemplatesListQuery & RequestOptions): Promise<TemplateListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<TemplateListOut>({ method: "GET", path: `/templates`, query, options });
  }

  /**
   * Все записи templates.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.templates.listAll(...))`
   */
  listAll(params: Omit<TemplatesListQuery, "cursor"> & RequestOptions): AsyncIterable<TemplateOut> {
    return paginate<TemplateOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }

  /**
   * Изменить шаблон
   *
   * Меняет части шаблона или категорию в Meta, после чего Meta проверяет шаблон заново (status=PENDING).
   *
   * Правила Meta: править можно шаблон в статусе APPROVED, REJECTED или PAUSED; имя и язык не меняются;
   * components заменяются целиком; категорию одобренного шаблона сменить нельзя. Одобренный шаблон можно
   * править 1 раз в сутки и не больше 10 раз за 30 дней, отклонённый без ограничений.
   * Ошибки: 404 шаблон не найден, 409 CONFLICT (статус не даёт править), 422 VALIDATION_ERROR,
   * 422 invalid_parameters (Meta отказала, например исчерпан лимит правок). Тестовый ключ ничего не меняет.
   *
   * `PATCH /api/v2/external/templates/{template_id}`
   *
   * @param templateId id шаблона в Meta: template_id из POST или GET /api/v2/external/templates, например 1252715608684590
   */
  update(templateId: string, body: UpdateTemplateIn, params: RequestOptions = {}): Promise<TemplateOut> {
    const options = params;
    return this.transport.request<TemplateOut>({ method: "PATCH", path: `/templates/${encodeURIComponent(templateId)}`, body, options });
  }
}

/** Методы webhook_event_types: `client.webhookEventTypes`. */
export class WebhookEventTypesResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Каталог событий
   *
   * Все события, на которые можно подписаться: имя для event_types, описание и пример поля data.
   *
   * Тело запроса на ваш адрес: {"event": "deal.created", "timestamp": "...", "data": {...}};
   * заголовок X-Wazzapo-Event дублирует имя события. Новые события добавляются без смены версии API.
   * Схема каждого поля data, примеры нажатий кнопок и подпись запроса: раздел webhooks в
   * /api/v2/external/openapi.json и описание POST /webhooks.
   *
   * `GET /api/v2/external/webhook-event-types`
   */
  list(params: WebhookEventTypesListQuery & RequestOptions = {}): Promise<WebhookEventTypeListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<WebhookEventTypeListOut>({ method: "GET", path: `/webhook-event-types`, query, options });
  }

  /**
   * Все записи webhook_event_types.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.webhookEventTypes.listAll(...))`
   */
  listAll(params: Omit<WebhookEventTypesListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<WebhookEventTypeOut> {
    return paginate<WebhookEventTypeOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }
}

/** Методы webhooks: `client.webhooks`. */
export class WebhooksResource {
  constructor(private readonly transport: Transport) {}

  /**
   * Подписаться на события
   *
   * Подписывает ваш адрес https на события: Wazzapo шлёт на него POST с JSON.
   *
   * Ответ содержит `secret`: он показывается один раз, сохраните его. Ключ `wz_test_…` вебхук не создаёт, но отдаёт ответ того же вида.
   *
   * Ошибки: 422 `invalid_event_types` (список: GET /webhook-event-types), 422 адрес не https или внутренний, 403 `USAGE_LIMIT_EXCEEDED` (лимит вебхуков тарифа).
   *
   * **Тело**: `{"event": "<имя>", "timestamp": "<когда создана доставка, ISO 8601 UTC>", "data": {...}}`. `timestamp` одинаков во всех повторах; время самого события внутри `data`. Поля `data` у каждого события описаны в разделе Webhooks описания API (openapi.json, ключ `webhooks`).
   *
   * **Единицы сумм** (пример: 150 000 ₸)
   *
   * | Где | Поле | Единица | 150 000 ₸ |
   * |---|---|---|---|
   * | Шаблон, переменная type=currency (messages.send) | `currency.amount_1000` | тенге × 1000 | `150000000` |
   * | Сделка в REST (GET/POST/PATCH /deals) | `amount` | тиыны, тенге × 100 | `15000000` |
   * | Сделка в вебхуках deal.* | `data.deal.amount` | тиыны, тенге × 100, как в REST | `15000000` |
   * | Сделка в вебхуках deal.* | `data.deal.value` | целые тенге, оставлено для совместимости | `150000` |
   * | Счёт в вебхуке invoice.status_changed | `data.invoice.amount` | тиыны, тенге × 100 | `15000000` |
   *
   * ## Заголовки запроса
   *
   * | Заголовок | Что в нём |
   * |---|---|
   * | `X-Wazzapo-Timestamp` | Время отправки этой попытки: Unix-время в секундах, целое число, UTC, например `1760000000`. В каждой попытке новое |
   * | `X-Wazzapo-Signature-V2` | `v2=` и 64 символа hex строчными буквами: HMAC-SHA256 от `{X-Wazzapo-Timestamp}.{тело}`. Проверяйте этот заголовок |
   * | `X-Wazzapo-Signature` | Старая подпись без времени: `sha256=` и hex строчными, HMAC-SHA256 от тела. Оставлена для совместимости, не защищает от повтора перехваченного запроса |
   * | `X-Wazzapo-Delivery-Id` | id доставки, одинаковый во всех повторах: по нему отсеивайте дубли. Его же принимает POST /webhooks/{webhook_id}/deliveries/{delivery_id}/retry |
   * | `X-Wazzapo-Event` | Имя события, то же, что поле `event` тела |
   * | `X-Wazzapo-Attempt` | Номер попытки: 1 у первой, до 6 |
   * | `Content-Type` | `application/json`; `User-Agent: Wazzapo-Webhooks/1.0` |
   *
   * У тестового события (POST /webhooks/{webhook_id}/test, event=test) нет `X-Wazzapo-Delivery-Id` и `X-Wazzapo-Attempt`.
   *
   * **Как проверить подпись**
   *
   * 1. Возьмите тело запроса сырыми байтами, как пришло, до разбора JSON. Не собирайте JSON заново: порядок полей, отсутствие пробелов и кириллица в UTF-8 (без `\u`-экранирования) должны совпасть байт в байт.
   * 2. Строка для подписи: значение `X-Wazzapo-Timestamp`, точка, тело: `{timestamp}.{body}`.
   * 3. Ключ HMAC: секрет вебхука целиком, вместе с `whsec_`, в UTF-8 (из ответа POST /webhooks или rotate-secret).
   * 4. Ожидаемое значение: `v2=` + HMAC-SHA256(ключ, строка) в hex строчными буквами.
   * 5. Сравните с `X-Wazzapo-Signature-V2` сравнением за постоянное время (`hash_equals`, `crypto.timingSafeEqual`, `hmac.compare_digest`). Не совпало: ответьте 401.
   * 6. Отклоните запрос, если `X-Wazzapo-Timestamp` отличается от вашего времени больше чем на 300 секунд.
   *
   * **Пример с готовыми значениями**: секрет `whsec_test`, `X-Wazzapo-Timestamp: 1760000000`, тело `{"event":"message.incoming"}` (28 байт). Строка для подписи `1760000000.{"event":"message.incoming"}`, `X-Wazzapo-Signature-V2: v2=a7e2dad2ec4a0f54d4f46ea51f2c28803b66f4effebb959c6ff8e8cc59f47fca`, старая `X-Wazzapo-Signature: sha256=b8745e4a15618d503f14d3e7fb12aa3c5cf3064a4bbc50b5f515eae87ee76cd7`.
   *
   * **PHP**
   *
   * ```php
   * $body = file_get_contents('php://input');           // сырое тело
   * $ts   = $_SERVER['HTTP_X_WAZZAPO_TIMESTAMP'] ?? '';
   * $sig  = $_SERVER['HTTP_X_WAZZAPO_SIGNATURE_V2'] ?? '';
   * $expected = 'v2=' . hash_hmac('sha256', $ts . '.' . $body, $secret);
   * if (!hash_equals($expected, $sig) || abs(time() - (int)$ts) > 300) { http_response_code(401); exit; }
   * $event = json_decode($body, true);
   * http_response_code(200);
   * ```
   *
   * **Node.js (Express)**
   *
   * ```js
   * app.post('/hooks/wazzapo', express.raw({ type: 'application/json' }), (req, res) => {
   *   const ts = req.get('X-Wazzapo-Timestamp') || '';
   *   const sig = req.get('X-Wazzapo-Signature-V2') || '';
   *   const expected = 'v2=' + crypto.createHmac('sha256', SECRET)
   *     .update(ts + '.').update(req.body).digest('hex');   // req.body: Buffer
   *   const ok = sig.length === expected.length &&
   *     crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
   *   if (!ok || Math.abs(Date.now() / 1000 - Number(ts)) > 300) return res.sendStatus(401);
   *   res.sendStatus(200);                                 // ответ сразу, обработка потом
   *   const event = JSON.parse(req.body.toString('utf8'));
   * });
   * ```
   *
   * **Ответ и повторы.** Ответьте любым 2xx за 10 секунд; тело ответа не важно. Иначе повторы через 1 мин, 5 мин, 30 мин, 2 ч и 6 ч (±20%), всего 6 попыток, с тем же телом и `X-Wazzapo-Delivery-Id`. Доставка «хотя бы один раз»: дубли возможны, отсеивайте их по `X-Wazzapo-Delivery-Id`. Порядок событий не гарантирован: сверяйте поле `timestamp`. После 10 доставок подряд, не дошедших за все попытки, вебхук выключается (`is_active=false`), включить снова: PATCH с `is_active=true`.
   *
   * `POST /api/v2/external/webhooks`
   */
  create(body: WebhookCreateIn, params: RequestOptions = {}): Promise<WebhookWithSecretOut> {
    const options = params;
    return this.transport.request<WebhookWithSecretOut>({ method: "POST", path: `/webhooks`, body, options });
  }

  /**
   * Удалить вебхук
   *
   * Удаляет вебхук вместе с историей доставок: события на адрес больше не приходят.
   *
   * Чтобы остановить на время, лучше выключите: PATCH с is_active=false. Ответ 204 без тела.
   * Ошибки: 404 webhook_not_found.
   *
   * `DELETE /api/v2/external/webhooks/{webhook_id}`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  delete(webhookId: string, params: RequestOptions = {}): Promise<null> {
    const options = params;
    return this.transport.request<null>({ method: "DELETE", path: `/webhooks/${encodeURIComponent(webhookId)}`, options });
  }

  /**
   * Вебхук
   *
   * Один вебхук: адрес, события, включён ли и сколько доставок подряд не дошли. Без секрета.
   *
   * Ошибки: 404 webhook_not_found.
   *
   * `GET /api/v2/external/webhooks/{webhook_id}`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  get(webhookId: string, params: RequestOptions = {}): Promise<WebhookOut> {
    const options = params;
    return this.transport.request<WebhookOut>({ method: "GET", path: `/webhooks/${encodeURIComponent(webhookId)}`, options });
  }

  /**
   * Список вебхуков
   *
   * Все вебхуки аккаунта: созданные через API v1, v2 и в кабинете. Секреты не показываются.
   *
   * Смотрите is_active и consecutive_failures: так видно вебхук, выключенный после 10 провалов подряд.
   * Ошибки: 401 неверный ключ.
   *
   * `GET /api/v2/external/webhooks`
   */
  list(params: WebhooksListQuery & RequestOptions = {}): Promise<WebhookListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<WebhookListOut>({ method: "GET", path: `/webhooks`, query, options });
  }

  /**
   * Все записи webhooks.list по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.webhooks.listAll(...))`
   */
  listAll(params: Omit<WebhooksListQuery, "cursor"> & RequestOptions = {}): AsyncIterable<WebhookOut> {
    return paginate<WebhookOut>((cursor) =>
      this.list({ ...params, cursor }),
    );
  }

  /**
   * История доставок
   *
   * История доставок вебхука, новые первыми: событие, статус, номер попытки, ответ вашего адреса.
   *
   * Смотрите здесь, почему события не доходят (error_message, response_status) и когда следующая
   * попытка (next_retry_at). Не дошедшую доставку можно отправить ещё раз методом retry.
   * Ошибки: 404 webhook_not_found.
   *
   * `GET /api/v2/external/webhooks/{webhook_id}/deliveries`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  listDeliveries(webhookId: string, params: WebhooksListDeliveriesQuery & RequestOptions = {}): Promise<WebhookDeliveryListOut> {
    const [query, options] = splitOptions(params);
    return this.transport.request<WebhookDeliveryListOut>({ method: "GET", path: `/webhooks/${encodeURIComponent(webhookId)}/deliveries`, query, options });
  }

  /**
   * Все записи webhooks.list_deliveries по очереди: страницы запрашиваются сами по next_cursor.
   *
   * `for await (const item of client.webhooks.listDeliveriesAll(...))`
   */
  listDeliveriesAll(webhookId: string, params: Omit<WebhooksListDeliveriesQuery, "cursor"> & RequestOptions = {}): AsyncIterable<WebhookDeliveryOut> {
    return paginate<WebhookDeliveryOut>((cursor) =>
      this.listDeliveries(webhookId, { ...params, cursor }),
    );
  }

  /**
   * Повторить доставку
   *
   * Сразу отправляет доставку ещё раз, не дожидаясь расписания повторов, и ждёт ответ.
   *
   * Нужен, когда вы починили приёмник и не хотите ждать следующей попытки. Тело и
   * X-Wazzapo-Delivery-Id те же, что раньше: дубль отсеется по нему. Счётчик attempt растёт.
   * Ошибки: 404 webhook_not_found, 404 webhook_delivery_not_found.
   *
   * `POST /api/v2/external/webhooks/{webhook_id}/deliveries/{delivery_id}/retry`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   * @param deliveryId id доставки: поле id из GET /webhooks/{webhook_id}/deliveries или заголовок X-Wazzapo-Delivery-Id запроса, пришедшего на ваш адрес
   */
  retryDelivery(webhookId: string, deliveryId: string, params: RequestOptions = {}): Promise<WebhookRetryOut> {
    const options = params;
    return this.transport.request<WebhookRetryOut>({ method: "POST", path: `/webhooks/${encodeURIComponent(webhookId)}/deliveries/${encodeURIComponent(deliveryId)}/retry`, options });
  }

  /**
   * Сменить секрет подписи
   *
   * Выдаёт новый секрет подписи, старый перестаёт действовать сразу.
   *
   * Нужен, если секрет потерян или мог утечь. Новый секрет показывается один раз: сразу замените
   * его на своём сервере, иначе проверка подписи у вас перестанет проходить. Ошибки: 404 webhook_not_found.
   *
   * `POST /api/v2/external/webhooks/{webhook_id}/rotate-secret`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  rotateSecret(webhookId: string, params: RequestOptions = {}): Promise<WebhookSecretOut> {
    const options = params;
    return this.transport.request<WebhookSecretOut>({ method: "POST", path: `/webhooks/${encodeURIComponent(webhookId)}/rotate-secret`, options });
  }

  /**
   * Отправить тестовое событие
   *
   * Сразу отправляет на адрес вебхука тестовое событие test с настоящей подписью и ждёт ответ.
   *
   * Проверьте так приёмник и проверку подписи до боевых событий. Повторов нет, в историю не пишется.
   * Результат в ответе: delivered, код и время ответа, ошибка. Ошибки: 404 webhook_not_found.
   *
   * `POST /api/v2/external/webhooks/{webhook_id}/test`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  test(webhookId: string, params: RequestOptions = {}): Promise<WebhookTestOut> {
    const options = params;
    return this.transport.request<WebhookTestOut>({ method: "POST", path: `/webhooks/${encodeURIComponent(webhookId)}/test`, options });
  }

  /**
   * Изменить вебхук
   *
   * Меняет адрес, события, подпись или включает и выключает вебхук. Непереданные поля не меняются.
   *
   * event_types заменяют весь список. is_active=false выключает доставку, is_active=true включает
   * снова и обнуляет счётчик провалов (так включают вебхук после автоотключения). Секрет не меняется.
   * Ошибки: 404 webhook_not_found, 422 invalid_event_types, 422 адрес не https.
   *
   * `PATCH /api/v2/external/webhooks/{webhook_id}`
   *
   * @param webhookId id вебхука: поле id из ответа POST /webhooks или из GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  update(webhookId: string, body: WebhookUpdateIn, params: RequestOptions = {}): Promise<WebhookOut> {
    const options = params;
    return this.transport.request<WebhookOut>({ method: "PATCH", path: `/webhooks/${encodeURIComponent(webhookId)}`, body, options });
  }
}

/** Все ресурсы API: свойства клиента Wazzapo. */
export class Resources {
  readonly contacts: ContactsResource;
  readonly conversations: ConversationsResource;
  readonly deals: DealsResource;
  readonly media: MediaResource;
  readonly messages: MessagesResource;
  readonly phoneNumbers: PhoneNumbersResource;
  readonly pipelines: PipelinesResource;
  readonly tasks: TasksResource;
  readonly team: TeamResource;
  readonly templates: TemplatesResource;
  readonly webhookEventTypes: WebhookEventTypesResource;
  readonly webhooks: WebhooksResource;

  constructor(transport: Transport) {
    this.contacts = new ContactsResource(transport);
    this.conversations = new ConversationsResource(transport);
    this.deals = new DealsResource(transport);
    this.media = new MediaResource(transport);
    this.messages = new MessagesResource(transport);
    this.phoneNumbers = new PhoneNumbersResource(transport);
    this.pipelines = new PipelinesResource(transport);
    this.tasks = new TasksResource(transport);
    this.team = new TeamResource(transport);
    this.templates = new TemplatesResource(transport);
    this.webhookEventTypes = new WebhookEventTypesResource(transport);
    this.webhooks = new WebhooksResource(transport);
  }
}
