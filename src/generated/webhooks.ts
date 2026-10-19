// Сгенерировано из sdk/openapi.json командой `cd sdk && python -m codegen typescript`. Не править руками.

import type {
  WebhookContactCreated,
  WebhookContactUpdated,
  WebhookConversationAssigned,
  WebhookConversationStatusChanged,
  WebhookDealChanged,
  WebhookDealClosed,
  WebhookDealCreated,
  WebhookDealStageChanged,
  WebhookInvoiceStatusChanged,
  WebhookMessageIncoming,
  WebhookMessageOutgoing,
  WebhookMessageStatus,
  WebhookNoteAdded,
  WebhookSession,
  WebhookTaskCreated,
  WebhookTemplateEvent,
  WebhookTestEvent,
} from "./types.js";

/** Событие вебхука → тип поля data. */
export interface WebhookEventMap {
  /**
   * Новый контакт: добавлен вручную, через API, пришёл с сообщением или письмом
   */
  "contact.created": WebhookContactCreated;
  /**
   * В карточке контакта поменялись имя, телефон, почта, компания, теги, заметки, блокировка или дополнительные поля: список changes и кто изменил (changed_by)
   */
  "contact.updated": WebhookContactUpdated;
  /**
   * Диалог назначили менеджеру, передали другому или сняли назначение
   */
  "conversation.assigned": WebhookConversationAssigned;
  /**
   * Менеджер оставил заметку в диалоге (клиент её не видит)
   */
  "conversation.note_added": WebhookNoteAdded;
  /**
   * Статус диалога изменился: open, pending, snoozed, resolved
   */
  "conversation.status_changed": WebhookConversationStatusChanged;
  /**
   * У сделки поменялись сумма, название, ответственный, клиент или поля воронки: список changes «поле, было, стало»
   */
  "deal.changed": WebhookDealChanged;
  /**
   * Сделка выиграна или проиграна: outcome won или lost, причина проигрыша lost_reason, кто закрыл
   */
  "deal.closed": WebhookDealClosed;
  /**
   * Новая сделка: из карточки, правилом по входящему сообщению, сценарием или через API
   */
  "deal.created": WebhookDealCreated;
  /**
   * Сделку перевели на другой этап: из карточки, перетаскиванием, массово, правилом, сценарием или после оплаты
   */
  "deal.stage_changed": WebhookDealStageChanged;
  /**
   * Счёт Kaspi (ApiPay) сменил статус: processing, pending, paid, cancelled, expired, error, partially_refunded
   */
  "invoice.status_changed": WebhookInvoiceStatusChanged;
  /**
   * Клиент написал
   */
  "message.incoming": WebhookMessageIncoming;
  /**
   * Любое сообщение клиенту: менеджер из чата, сценарий или бот, рассылка, шаблон, отправка через API
   */
  "message.outgoing": WebhookMessageOutgoing;
  /**
   * Изменение статуса исходящего сообщения (отправлено, доставлено, прочитано, ошибка)
   */
  "message.status": WebhookMessageStatus;
  /**
   * WhatsApp-сессия успешно подключена
   */
  "session.connected": WebhookSession;
  /**
   * WhatsApp-сессия отключена
   */
  "session.disconnected": WebhookSession;
  /**
   * Новая задача менеджеру: из сделки или чата, через API, сценарием, правилом этапа воронки или следующим шагом после выполненной задачи
   */
  "task.created": WebhookTaskCreated;
  /**
   * Meta сменила категорию шаблона (MARKETING, UTILITY, AUTHENTICATION), от неё зависит цена
   */
  "template.category_changed": WebhookTemplateEvent;
  /**
   * Meta изменила оценку качества шаблона: GREEN, YELLOW, RED
   */
  "template.quality_changed": WebhookTemplateEvent;
  /**
   * Meta проверила шаблон: APPROVED, REJECTED (с причиной reason), PAUSED, DISABLED
   */
  "template.status_updated": WebhookTemplateEvent;
  /**
   * Тестовое событие
   */
  "test": WebhookTestEvent;
}

/** Имя события вебхука. */
export type WebhookEventType = keyof WebhookEventMap;

/** Все события, на которые можно подписаться. */
export const WEBHOOK_EVENT_TYPES: readonly WebhookEventType[] = [
  "contact.created",
  "contact.updated",
  "conversation.assigned",
  "conversation.note_added",
  "conversation.status_changed",
  "deal.changed",
  "deal.closed",
  "deal.created",
  "deal.stage_changed",
  "invoice.status_changed",
  "message.incoming",
  "message.outgoing",
  "message.status",
  "session.connected",
  "session.disconnected",
  "task.created",
  "template.category_changed",
  "template.quality_changed",
  "template.status_updated",
  "test",
];

/**
 * Тело запроса вебхука: `{event, timestamp, data}`. timestamp: когда Wazzapo создал доставку,
 * одинаков во всех повторах; время самого события внутри data.
 */
export type WebhookEvent = {
  [K in WebhookEventType]: { event: K; timestamp: string; data: WebhookEventMap[K] };
}[WebhookEventType];
