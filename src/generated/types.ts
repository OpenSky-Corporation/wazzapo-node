// Сгенерировано из sdk/openapi.json командой `cd sdk && python -m codegen typescript`. Не править руками.

export interface AddNoteIn {
  /**
   * Кого упомянуть: id сотрудников из GET /api/v2/external/team, например ["7"], до 50. Им придёт уведомление в кабинете; имя в тексте (@Ерлан) уведомление не отправляет
   */
  mention_user_ids?: Array<string>;
  /**
   * Текст заметки до 4096 символов, например «Перезвонить после 18:00». Клиент её не видит
   */
  text: string;
}

export interface AssignConversationIn {
  /**
   * id сотрудника строкой из цифр: поле id из GET /api/v2/external/team, например "7" (можно и числом 7). Поле обязательно: чтобы снять ответственного, передайте {"user_id": null}. Сотрудник отключён или не из команды: 409 CONFLICT, наблюдатель: 403 FORBIDDEN
   */
  user_id: string | null;
}

/**
 * Один источник клиента. Набор полей зависит от kind: заполнены только известные.
 */
export interface AttributionSourceOut {
  /**
   * id объявления Meta, по которому клиент написал, например 120210000000000001
   */
  ad_id?: string | null;
  /**
   * Название объявления в рекламном кабинете Meta
   */
  ad_name?: string | null;
  /**
   * Что открыл клиент по данным Meta: ad или post
   */
  ad_type?: string | null;
  /**
   * Название группы объявлений в рекламном кабинете Meta
   */
  adset?: string | null;
  /**
   * Когда источник записан, ISO 8601 UTC
   */
  at?: string | null;
  /**
   * Текст объявления, которое видел клиент
   */
  body?: string | null;
  /**
   * Кампания: utm_campaign, название рекламной кампании Meta или название ссылки с меткой
   */
  campaign?: string | null;
  /**
   * id рекламной кампании Meta
   */
  campaign_id?: string | null;
  /**
   * Метка клика: ctwa_clid рекламы WhatsApp, gclid Google, yclid Яндекса или fbclid Facebook
   */
  click_id?: string | null;
  /**
   * utm_content из адреса или запроса
   */
  content?: string | null;
  /**
   * Заголовок объявления, которое видел клиент
   */
  headline?: string | null;
  /**
   * Вид источника: ad (реклама Meta «Написать в WhatsApp» или Instagram), utm (метки в адресе сайта), referrer (переход с другого сайта), link (ссылка с меткой из раздела «Ссылки с меткой»), api (метки utm_* переданы через API или форму сайта)
   */
  kind?: string | null;
  /**
   * Код ссылки с меткой из раздела «Ссылки с меткой», только у kind=link
   */
  link_code?: string | null;
  /**
   * Название ссылки с меткой, только у kind=link
   */
  link_name?: string | null;
  /**
   * Тип трафика: utm_medium (cpc, email), ad у рекламы, link у ссылки с меткой
   */
  medium?: string | null;
  /**
   * Страница сайта, с которой пришёл клиент, например /implant
   */
  page?: string | null;
  /**
   * Адрес сайта, с которого перешли на вашу страницу
   */
  referrer?: string | null;
  /**
   * Откуда: для рекламы instagram, facebook или meta; для меток значение utm_source (google, yandex); для перехода адрес сайта, например 2gis.kz; для ссылки её канал
   */
  source?: string | null;
  /**
   * utm_term из адреса или запроса
   */
  term?: string | null;
  /**
   * Ссылка на объявление или пост
   */
  url?: string | null;
  [key: string]: unknown;
}

/**
 * Поля профиля компании; переданные заменяют текущие, не переданные не меняются.
 */
export interface BusinessProfileIn {
  /**
   * Статус под именем в WhatsApp, до 139 знаков
   */
  about?: string | null;
  /**
   * Адрес, до 256 знаков, например «Астана, пр. Абая, 15»
   */
  address?: string | null;
  /**
   * Описание компании, до 512 знаков
   */
  description?: string | null;
  /**
   * Почта для клиентов, до 128 знаков
   */
  email?: string | null;
  /**
   * Отрасль из списка Meta: BEAUTY, RETAIL, EDU, HEALTH, RESTAURANT, PROF_SERVICES, OTHER и другие
   */
  vertical?: string | null;
  /**
   * Сайты компании, до 2 адресов с http:// или https://
   */
  websites?: Array<string> | null;
}

/**
 * Профиль компании в WhatsApp, поля как в Cloud API.
 */
export interface BusinessProfileOut {
  /**
   * Статус под именем в WhatsApp
   */
  about?: string | null;
  /**
   * Адрес компании
   */
  address?: string | null;
  /**
   * Описание компании
   */
  description?: string | null;
  /**
   * Почта для клиентов
   */
  email?: string | null;
  /**
   * Ссылка на фото профиля; ссылка временная, не храните её
   */
  profile_picture_url?: string | null;
  /**
   * Отрасль из списка Meta, например BEAUTY
   */
  vertical?: string | null;
  /**
   * Сайты компании
   */
  websites?: Array<string> | null;
  [key: string]: unknown;
}

export interface BusinessProfileUpdateOut {
  /**
   * true: Meta сохранила профиль
   */
  success: boolean;
  [key: string]: unknown;
}

export interface ContactAttributionOut {
  /**
   * Первый источник: откуда клиент пришёл впервые. Не меняется после записи
   */
  first?: AttributionSourceOut | null;
  /**
   * Последний источник: откуда пришёл в последний раз (при одном источнике совпадает с first)
   */
  last?: AttributionSourceOut | null;
}

/**
 * Карточка контакта Cloud API. Остальные поля Meta (emails, org, urls, addresses,
 * birthday) принимаются и передаются как есть.
 */
export interface ContactCard {
  /**
   * Имя контакта
   */
  name: ContactCardName;
  /**
   * Номера контакта
   */
  phones?: Array<ContactCardPhone>;
  [key: string]: unknown;
}

export interface ContactCardName {
  /**
   * Имя, например Ерлан
   */
  first_name?: string | null;
  /**
   * Имя, как его покажет WhatsApp, например «Ерлан Сапаров»
   */
  formatted_name: string;
  /**
   * Фамилия, например Сапаров
   */
  last_name?: string | null;
  [key: string]: unknown;
}

export interface ContactCardPhone {
  /**
   * Номер в любом виде, например +7 707 123 45 67
   */
  phone: string;
  /**
   * Вид номера: CELL, MAIN, IPHONE, HOME или WORK
   */
  type?: string | null;
  /**
   * Номер WhatsApp цифрами без +, например 77071234567: у клиента появится кнопка «Написать»
   */
  wa_id?: string | null;
  [key: string]: unknown;
}

export interface ContactCreateIn {
  /**
   * Свои поля контакта из раздела «Поля контакта» в кабинете. Ключ: имя переменной поля (колонка «Переменная», например city или birthday; у поля без переменной его id). Значение по типу поля: текст и список строкой, число числом, флажок true/false, дата строкой ГГГГ-ММ-ДД. Пример: {"city": "Алматы", "orders_count": 3}. Поля, которых нет в кабинете: ошибка 422 unknown_custom_field
   */
  custom_fields?: Record<string, unknown>;
  /**
   * Почта клиента, например aigul@example.kz
   */
  email?: string | null;
  /**
   * Ваш id этого клиента в своей CRM или учётной системе, например 1c-00042. Wazzapo его не проверяет и не требует уникальности; найти контакт по нему: GET /contacts?external_id=1c-00042. До 200 символов
   */
  external_id?: string | null;
  /**
   * Имя клиента, как его видят менеджеры в диалогах и сделках, например Айгуль Серикова. До 200 символов
   */
  name?: string | null;
  /**
   * Номер клиента: цифры с кодом страны, плюс в начале можно: 77071234567 или +77071234567. Пробелы, скобки и дефисы не принимаются (422 VALIDATION_ERROR). 8 в начале казахстанского номера заменяется на 7 (87071234567 сохранится как 77071234567). Номер не похож на настоящий: 422 invalid_phone. Номер уже есть у контакта: 409 contact_exists
   */
  phone: string;
  /**
   * Метки контакта: любые строки, например vip или опт; по ним фильтрует ?tag= и сегменты рассылок. До 100 меток
   */
  tags?: Array<string>;
}

export interface ContactListOut {
  /**
   * Контакты страницы, старые первыми
   */
  data: Array<ContactV2Out>;
  /**
   * true, если есть следующая страница
   */
  has_more: boolean;
  /**
   * Передайте в ?cursor=, чтобы получить следующую страницу; null на последней
   */
  next_cursor?: string | null;
}

/**
 * Меняются только переданные поля. custom_fields дополняют сохранённые, null убирает поле.
 */
export interface ContactUpdateIn {
  /**
   * Меняются только переданные ключи, остальные поля остаются; значение null очищает поле. Свои поля контакта из раздела «Поля контакта» в кабинете. Ключ: имя переменной поля (колонка «Переменная», например city или birthday; у поля без переменной его id). Значение по типу поля: текст и список строкой, число числом, флажок true/false, дата строкой ГГГГ-ММ-ДД. Пример: {"city": "Алматы", "orders_count": 3}. Поля, которых нет в кабинете: ошибка 422 unknown_custom_field
   */
  custom_fields?: Record<string, unknown> | null;
  /**
   * Почта клиента, например aigul@example.kz
   */
  email?: string | null;
  /**
   * Ваш id этого клиента в своей CRM или учётной системе, например 1c-00042. Wazzapo его не проверяет и не требует уникальности; найти контакт по нему: GET /contacts?external_id=1c-00042
   */
  external_id?: string | null;
  /**
   * Имя клиента, как его видят менеджеры в диалогах и сделках, например Айгуль Серикова. До 200 символов
   */
  name?: string | null;
  /**
   * Новый список меток целиком: заменяет старый. [] или null убирают все метки. Чтобы добавить метку, передайте старые метки вместе с новой
   */
  tags?: Array<string> | null;
}

/**
 * Контакт (клиент) аккаунта.
 */
export interface ContactV2Out {
  /**
   * Откуда пришёл клиент: реклама Meta, метки сайта (UTM), ссылка с меткой. null, если неизвестно
   */
  attribution?: ContactAttributionOut | null;
  /**
   * Когда создан, ISO 8601 UTC
   */
  created_at?: string | null;
  /**
   * Свои поля контакта из раздела «Поля контакта» в кабинете. Ключ: имя переменной поля (колонка «Переменная», например city или birthday; у поля без переменной его id). Значение по типу поля: текст и список строкой, число числом, флажок true/false, дата строкой ГГГГ-ММ-ДД. Пример: {"city": "Алматы", "orders_count": 3}. Поля, которых нет в кабинете: ошибка 422 unknown_custom_field
   */
  custom_fields?: Record<string, unknown>;
  /**
   * Почта клиента, например aigul@example.kz
   */
  email?: string | null;
  /**
   * Ваш id этого клиента в своей CRM или учётной системе, например 1c-00042. Wazzapo его не проверяет и не требует уникальности; найти контакт по нему: GET /contacts?external_id=1c-00042
   */
  external_id?: string | null;
  /**
   * id контакта в Wazzapo, например 6712f0c4a1b2c3d4e5f60718: для GET, PATCH и DELETE /contacts/{contact_id}
   */
  id: string;
  /**
   * Имя клиента, как его видят менеджеры в диалогах и сделках, например Айгуль Серикова
   */
  name?: string | null;
  /**
   * Номер цифрами с кодом страны, без плюса и пробелов, например 77071234567
   */
  phone?: string | null;
  /**
   * Как контакт появился: manual (добавили в кабинете), whatsapp (сам написал в мессенджер), import (загрузили из файла), api (создан через API), email (пришло письмо)
   */
  source: string;
  /**
   * Метки контакта: любые строки, например vip или опт; по ним фильтрует ?tag= и сегменты рассылок. До 100 меток
   */
  tags?: Array<string>;
  /**
   * Когда изменён в последний раз, ISO 8601 UTC
   */
  updated_at?: string | null;
}

export interface ConversationContactOut {
  /**
   * Адрес клиента в канале без телефона: id чата Telegram, почта, id в Instagram или OLX. У WhatsApp null
   */
  external_id?: string | null;
  /**
   * id контакта Wazzapo, как в GET /api/v2/external/contacts; null у участника группы
   */
  id?: string | null;
  /**
   * Имя клиента в Wazzapo или из профиля канала, например Айгуль; null, если неизвестно
   */
  name?: string | null;
  /**
   * Телефон клиента цифрами с кодом страны без +, например 77071234567. Есть у WhatsApp и чата на сайте, у остальных каналов null (адрес в external_id)
   */
  phone?: string | null;
}

/**
 * Диалог с клиентом в одном канале: контакт, ответственный, статус, метки.
 */
export interface ConversationItemOut {
  /**
   * Ответственный менеджер; null, если не назначен. Назначить: POST .../assign
   */
  assignee?: StaffRefOut | null;
  /**
   * Канал диалога: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string;
  /**
   * Клиент, с которым идёт диалог
   */
  contact: ConversationContactOut;
  /**
   * Когда диалог появился, UTC в формате ISO 8601, например 2026-10-18T09:15:00Z
   */
  created_at?: string | null;
  /**
   * Номер диалога в кабинете, как #5 в списке чатов
   */
  display_id: number;
  /**
   * id диалога, например 6a7d5d3712f8e1a5c19f40c4: conversation_id в остальных методах и вебхуках
   */
  id: string;
  /**
   * true: групповой чат WhatsApp, а не переписка с одним клиентом
   */
  is_group: boolean;
  /**
   * Последнее сообщение диалога для списка
   */
  last_message: ConversationLastMessageOut;
  /**
   * Номер WhatsApp, через который идёт диалог: phone_number_id из GET /api/v2/external/phone-numbers. У других каналов null
   */
  phone_number_id?: string | null;
  /**
   * Подключение (канал) диалога в Wazzapo, например meta_103799815708451; то же поле в вебхуках
   */
  session_id: string;
  /**
   * До какого времени отложен (статус snoozed), UTC в формате ISO 8601, например 2026-10-18T09:15:00Z; иначе null
   */
  snoozed_until?: string | null;
  /**
   * Статус диалога: open (открыт, менеджеру нужно ответить), pending (ожидает: ответ дан, ждём клиента или другой отдел), snoozed (отложен до snoozed_until), resolved (решён, закрыт). Новое сообщение клиента снова открывает решённый и отложенный диалог
   */
  status: "open" | "pending" | "snoozed" | "resolved";
  /**
   * Метки диалога, например ["VIP", "доставка"]. Задать: POST .../labels
   */
  tags?: Array<string>;
  /**
   * Сколько сообщений клиента ещё не прочитали в кабинете
   */
  unread_count: number;
  /**
   * Когда диалог последний раз менялся (сообщение, статус, ответственный, метки), UTC в формате ISO 8601, например 2026-10-18T09:15:00Z. По нему работает updated_since в GET /conversations
   */
  updated_at?: string | null;
}

export interface ConversationLastMessageOut {
  /**
   * Начало последнего сообщения, как в списке чатов; пустая строка, если сообщений нет
   */
  text: string;
  /**
   * Когда пришло или ушло последнее сообщение, UTC в формате ISO 8601, например 2026-10-18T09:15:00Z
   */
  timestamp?: string | null;
  /**
   * Тип последнего сообщения: text, image, video, audio, voice, document, location, contact, sticker, call; null, если сообщений нет
   */
  type?: string | null;
}

export interface ConversationListOut {
  /**
   * Диалоги страницы от давно изменённых к недавним
   */
  data: Array<ConversationItemOut>;
  /**
   * true: есть следующая страница, запросите её с next_cursor
   */
  has_more: boolean;
  /**
   * Курсор следующей страницы: передайте его в параметр cursor. null, если это последняя страница
   */
  next_cursor?: string | null;
}

export interface ConversationMessageListOut {
  /**
   * Сообщения страницы от старых к новым
   */
  data: Array<ConversationMessageOut>;
  /**
   * true: есть следующая страница, запросите её с next_cursor
   */
  has_more: boolean;
  /**
   * Курсор следующей страницы: передайте его в параметр cursor. null, если это последняя страница
   */
  next_cursor?: string | null;
}

/**
 * Сообщение диалога или заметка сотрудника.
 */
export interface ConversationMessageOut {
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string;
  /**
   * Клиент диалога; в группе участник, который написал
   */
  contact: ConversationContactOut;
  /**
   * id диалога из GET /api/v2/external/conversations
   */
  conversation_id?: string | null;
  /**
   * in: от клиента, out: от вас (менеджер, бот, API)
   */
  direction: "in" | "out";
  /**
   * id сообщения: у WhatsApp wamid, например wamid.HBgLNzcwNzEyMzQ1NjcVAgARGBI1
   */
  id: string;
  /**
   * Только у входящего: клиент нажал кнопку или выбрал пункт списка, как message.interactive в вебхуке message.incoming. Кнопка сообщения type=interactive: type=button_reply и id = reply.id; быстрая кнопка шаблона: type=button, id и payload = payload кнопки. У остальных сообщений null
   */
  interactive?: InteractiveResponseOut | null;
  /**
   * true: сообщение удалено, text и media_url пустые
   */
  is_deleted: boolean;
  /**
   * true: заметка сотрудника, клиент её не видит
   */
  is_note: boolean;
  /**
   * Ссылка на файл (картинка, документ, голосовое); null у текста
   */
  media_url?: string | null;
  /**
   * Кто написал сообщение
   */
  sender: MessageSenderOut;
  /**
   * Подключение, через которое прошло сообщение, например meta_103799815708451
   */
  session_id: string;
  /**
   * Доставка исходящего: pending (в очереди), sent (отправлено), delivered (доставлено), read (прочитано), failed (ошибка). Изменения приходят вебхуком message.status
   */
  status?: string | null;
  /**
   * Шаблон WhatsApp, если сообщение шаблонное; иначе null
   */
  template?: MessageTemplateRefOut | null;
  /**
   * Текст или подпись к файлу; пустая строка у удалённого сообщения
   */
  text: string;
  /**
   * Время сообщения, UTC в формате ISO 8601, например 2026-10-18T09:15:00Z. Его передают в since
   */
  timestamp?: string | null;
  /**
   * Тип: text, image, video, audio, voice, document, location, contact, sticker, call. Шаблон приходит как text, его имя и значения в template. Нажатие кнопки клиентом тоже text: текст кнопки в text, сама кнопка в interactive
   */
  type: string;
}

/**
 * Новый шаблон: уходит на проверку Meta, обычно ответ за минуты, иногда до 24 часов.
 */
export interface CreateTemplateIn {
  /**
   * UTILITY: служебное по заказу или записи клиента (подтверждение, напоминание, статус), дешевле рекламного. MARKETING: реклама, акции, скидки, приглашения. AUTHENTICATION: код подтверждения входа. Meta сама переносит в MARKETING служебный шаблон с рекламой, об этом придёт событие template.category_changed
   */
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  /**
   * Части шаблона: BODY обязателен, HEADER, FOOTER и BUTTONS по желанию, каждая не больше одной. Вид части выбирается полем type, у шапки ещё полем format
   */
  components: Array<TemplateHeaderText | TemplateHeaderMedia | TemplateHeaderLocation | TemplateBody | TemplateFooter | TemplateButtons>;
  /**
   * Код языка Meta: ru, kk, en, en_US, uz и др. Полный список: developers.facebook.com, раздел WhatsApp, Templates, Supported languages
   */
  language: string;
  /**
   * Имя шаблона: латиница в нижнем регистре, цифры и _, до 512 символов, например zapis_napominanie. Уникально для номера и языка. Имя удалённого одобренного шаблона занято 30 дней
   */
  name: string;
  /**
   * id номера WhatsApp: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
}

export interface CtaUrlParameters {
  /**
   * Надпись на кнопке, до 20 знаков
   */
  display_text: string;
  /**
   * Адрес, который откроется по нажатию, начинается с http:// или https://
   */
  url: string;
}

export interface DealContactIn {
  /**
   * Имя для нового контакта, например «Айгуль Сейткали»
   */
  name?: string | null;
  /**
   * Телефон клиента: цифры с кодом страны, плюс в начале можно: 77071234567 или +77071234567. Здесь можно и с пробелами, скобками и дефисами (+7 707 123-45-67), 8 в начале казахстанского номера заменяется на 7 (8 707 123 45 67). Номер, который не похож на настоящий: 422 VALIDATION_ERROR. Если контакт с этим номером есть, сделка привяжется к нему, иначе создадим новый
   */
  phone: string;
}

export interface DealContactOut {
  /**
   * id контакта Wazzapo: его можно передать в contact_id новой сделки
   */
  id: string;
  /**
   * Имя клиента, например «Айгуль Сейткали»
   */
  name?: string | null;
  /**
   * Телефон цифрами с кодом страны, без плюса и пробелов, например 77071234567
   */
  phone?: string | null;
}

export interface DealCreateIn {
  /**
   * Сумма сделки. Целое число в тиынах: 1 ₸ = 100 тиынов, 150 000 ₸ = 15000000. Целым, чтобы сумма не искажалась при округлении дробей. Пишется в поле суммы воронки (is_amount). Внимание: в тиынах (× 100), а не в тенге: 150 000 ₸ = 15000000. В шаблоне WhatsApp (messages.send, currency.amount_1000) множитель другой, × 1000: 150 000 ₸ = 150000000
   */
  amount?: number | null;
  /**
   * Клиент по телефону, если id контакта не знаете: найдём по номеру или создадим
   */
  contact?: DealContactIn | null;
  /**
   * id существующего контакта из GET /contacts. Передайте его или contact с телефоном
   */
  contact_id?: string | null;
  /**
   * Валюта суммы, должна совпасть с currency поля суммы воронки (обычно KZT), иначе 422 currency_mismatch
   */
  currency?: string | null;
  /**
   * Свои поля сделки: ключ: id поля из GET /pipelines (custom_fields[].id воронки), значение по типу поля: text и multiline строкой, number числом, money целым в тиынах, select одной строкой из options, date строкой ГГГГ-ММ-ДД, checkbox true или false. Например {"9c8b7a6d5e4f": "Сайт", "3e4f5a6b7c8d": "Астана", "7d8e9f0a1b2c": "2026-10-21"}. Поля не из этой воронки: 422 unknown_custom_field
   */
  custom_fields?: Record<string, unknown>;
  /**
   * id этой сделки в вашей системе (CRM, сайт, 1С), до 200 знаков, например site-order-4521. Повтор POST /deals с тем же external_id (например, клиент дважды отправил форму) сделку не создаёт: 409 deal_exists, id существующей сделки в details.deal_id. Одновременные запросы закрывает ещё и заголовок Idempotency-Key. Найти сделку: GET /deals?external_id=...
   */
  external_id?: string | null;
  /**
   * id воронки: поле id из GET /pipelines, например 6712a0c4e1b2c3d4e5f60718
   */
  pipeline_id: string;
  /**
   * Ответственный: id сотрудника строкой: поле id из GET /team, например "12". Не передали: без ответственного (у ключа сотрудника с ограниченным доступом: сам сотрудник)
   */
  responsible_user_id?: string | null;
  /**
   * id этапа: stages[].id нужной воронки из GET /pipelines, например a1b2c3d4e5f6a7b8c9d0e1f2. Не передали: первый рабочий этап воронки
   */
  stage_id?: string | null;
  /**
   * Название, до 300 знаков. Не передали: номер сделки, например #0128
   */
  title?: string | null;
}

export interface DealListOut {
  /**
   * Сделки на этой странице
   */
  data: Array<DealOut>;
  /**
   * true: есть ещё страницы, запросите их с cursor=next_cursor
   */
  has_more: boolean;
  /**
   * next_cursor для следующей страницы; null: это последняя страница
   */
  next_cursor?: string | null;
}

export interface DealMoveIn {
  /**
   * Причина отказа при переносе на этап с is_lost, до 500 знаков, например «Дорого»
   */
  lost_reason?: string | null;
  /**
   * Воронка этапа; можно не передавать. Другая воронка пока не поддерживается: 422 pipeline_change_not_supported
   */
  pipeline_id?: string | null;
  /**
   * id этапа: stages[].id нужной воронки из GET /pipelines, например a1b2c3d4e5f6a7b8c9d0e1f2 (этап той же воронки, где сделка)
   */
  stage_id: string;
}

export interface DealOut {
  /**
   * Сумма сделки. Целое число в тиынах: 1 ₸ = 100 тиынов, 150 000 ₸ = 15000000. Целым, чтобы сумма не искажалась при округлении дробей
   */
  amount: number;
  /**
   * Когда закрыта (успехом или отказом). Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  closed_at?: string | null;
  /**
   * Клиент сделки
   */
  contact: DealContactOut;
  /**
   * Диалог с клиентом, к которому привязана сделка: GET /conversations/{conversation_id}
   */
  conversation_id?: string | null;
  /**
   * Когда создана. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  created_at?: string | null;
  /**
   * Валюта суммы, например KZT
   */
  currency: string;
  /**
   * Свои поля сделки: ключ: id поля из GET /pipelines (custom_fields[].id воронки), значение по типу поля: text и multiline строкой, number числом, money целым в тиынах, select одной строкой из options, date строкой ГГГГ-ММ-ДД, checkbox true или false. Например {"9c8b7a6d5e4f": "Сайт", "3e4f5a6b7c8d": "Астана", "7d8e9f0a1b2c": "2026-10-21"}. Поля не из этой воронки: 422 unknown_custom_field. Поле суммы воронки (is_amount) тоже здесь, с тем же значением, что amount: это не вторая сумма
   */
  custom_fields?: Record<string, unknown>;
  /**
   * id сделки в вашей системе, если передавали
   */
  external_id?: string | null;
  /**
   * id сделки: нужен для GET, PATCH, move и задач
   */
  id: string;
  /**
   * Когда перенесена на этап отказа. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  lost_at?: string | null;
  /**
   * Причина отказа, если сделка проиграна
   */
  lost_reason?: string | null;
  /**
   * Номер сделки в воронке, как в кабинете (#0128)
   */
  number: number;
  /**
   * id воронки из GET /pipelines
   */
  pipeline_id: string;
  /**
   * Ответственный: id сотрудника строкой: поле id из GET /team, например "12"
   */
  responsible_user_id?: string | null;
  /**
   * Откуда сделка: api: создана через API, workflow: сценарием, manual: вручную в кабинете, rule: правилом по входящему
   */
  source?: string | null;
  /**
   * id текущего этапа из stages[] воронки
   */
  stage_id: string;
  /**
   * Название текущего этапа
   */
  stage_name: string;
  /**
   * open: в работе, won: успешно реализована, lost: закрыта и не реализована
   */
  status: "open" | "won" | "lost";
  /**
   * Название сделки
   */
  title: string;
  /**
   * Когда изменена. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  updated_at?: string | null;
  /**
   * Когда перенесена на успешный этап. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  won_at?: string | null;
}

export interface DealUpdateIn {
  /**
   * Новая сумма. Целое число в тиынах: 1 ₸ = 100 тиынов, 150 000 ₸ = 15000000. Целым, чтобы сумма не искажалась при округлении дробей. Внимание: в тиынах (× 100), а не в тенге: 150 000 ₸ = 15000000. В шаблоне WhatsApp (messages.send, currency.amount_1000) множитель другой, × 1000: 150 000 ₸ = 150000000
   */
  amount?: number | null;
  /**
   * Валюта суммы, как у поля суммы воронки, обычно KZT
   */
  currency?: string | null;
  /**
   * Свои поля сделки: ключ: id поля из GET /pipelines (custom_fields[].id воронки), значение по типу поля: text и multiline строкой, number числом, money целым в тиынах, select одной строкой из options, date строкой ГГГГ-ММ-ДД, checkbox true или false. Например {"9c8b7a6d5e4f": "Сайт", "3e4f5a6b7c8d": "Астана", "7d8e9f0a1b2c": "2026-10-21"}. Поля не из этой воронки: 422 unknown_custom_field. Меняются только переданные поля, null очищает поле
   */
  custom_fields?: Record<string, unknown> | null;
  /**
   * id этой сделки в вашей системе (CRM, сайт, 1С), до 200 знаков, например site-order-4521. При правке на повтор не проверяется. null очищает
   */
  external_id?: string | null;
  /**
   * Новый ответственный: id сотрудника строкой: поле id из GET /team, например "12". null не снимает ответственного
   */
  responsible_user_id?: string | null;
  /**
   * Новое название, 1–300 знаков
   */
  title?: string | null;
}

export interface ErrorBody {
  /**
   * Машинный код ошибки, на него ориентируйтесь в коде, например outside_24h_window. Список в описании API
   */
  code: string;
  /**
   * Подробности, если есть. Для VALIDATION_ERROR это список полей, не прошедших проверку (field, message), для остальных кодов объект: у INSUFFICIENT_SCOPE required_scope, у USAGE_LIMIT_EXCEEDED current, limit и upgrade_url
   */
  details?: Array<ErrorField> | Record<string, unknown> | null;
  /**
   * Причина по-русски, для человека; текст может меняться
   */
  message: string;
}

/**
 * Поле запроса, не прошедшее проверку (details у VALIDATION_ERROR).
 */
export interface ErrorField {
  /**
   * Где ошибка: body.to, query.limit и т.п.
   */
  field: string;
  /**
   * Что не так с этим полем
   */
  message: string;
}

/**
 * Тело любой ошибки API v2.
 */
export interface ErrorOut {
  /**
   * Что случилось
   */
  error: ErrorBody;
  /**
   * id запроса (или ваш заголовок X-Request-Id): сообщите его в поддержку, чтобы мы нашли запрос в журнале
   */
  request_id?: string | null;
  /**
   * Всегда false
   */
  success?: boolean;
}

/**
 * Что под текстом: кнопки (button), список (list), ссылка (cta_url) или запрос места.
 */
export interface InteractiveAction {
  /**
   * Для type=list: надпись кнопки, открывающей список, до 20 знаков, например «Выбрать»
   */
  button?: string | null;
  /**
   * Для type=button: от 1 до 3 кнопок с разными id и надписями
   */
  buttons?: Array<InteractiveReplyButton> | null;
  /**
   * cta_url для type=cta_url, send_location для type=location_request_message
   */
  name?: "cta_url" | "send_location" | null;
  /**
   * Для type=cta_url: надпись и адрес кнопки
   */
  parameters?: CtaUrlParameters | null;
  /**
   * Для type=list: разделы списка, до 10
   */
  sections?: Array<InteractiveListSection> | null;
}

/**
 * Объект interactive Cloud API: button, list, cta_url или location_request_message.
 */
export interface InteractiveContent {
  /**
   * Кнопки, список, ссылка или запрос места
   */
  action: InteractiveAction;
  /**
   * Основной текст сообщения
   */
  body: InteractiveText;
  /**
   * Серая подпись внизу, до 60 знаков
   */
  footer?: InteractiveFooterText | null;
  /**
   * Заголовок; у запроса места не передаётся
   */
  header?: InteractiveHeader | null;
  /**
   * button: до 3 кнопок быстрого ответа; list: список до 10 строк; cta_url: кнопка-ссылка; location_request_message: кнопка «Отправить местоположение»
   */
  type: "button" | "list" | "cta_url" | "location_request_message";
}

export interface InteractiveFooterText {
  /**
   * Серая подпись внизу, до 60 знаков, например «Цены в тенге»
   */
  text: string;
}

/**
 * Заголовок над текстом: строка или файл. У списка только текстом.
 */
export interface InteractiveHeader {
  /**
   * Документ для type=document
   */
  document?: InteractiveMedia | null;
  /**
   * Картинка для type=image
   */
  image?: InteractiveMedia | null;
  /**
   * Текст заголовка для type=text, до 60 знаков
   */
  text?: string | null;
  /**
   * Вид заголовка; нужно поле с тем же именем
   */
  type: "text" | "image" | "video" | "document";
  /**
   * Видео для type=video
   */
  video?: InteractiveMedia | null;
}

export interface InteractiveListRow {
  /**
   * Пояснение под названием, до 72 знаков
   */
  description?: string | null;
  /**
   * Ваш код строки, вернётся во входящем сообщении в interactive.id, например massage_60
   */
  id: string;
  /**
   * Название строки, до 24 знаков
   */
  title: string;
}

export interface InteractiveListSection {
  /**
   * Строки раздела; во всех разделах вместе до 10
   */
  rows: Array<InteractiveListRow>;
  /**
   * Название раздела до 24 знаков; обязательно, если разделов больше одного
   */
  title?: string | null;
}

/**
 * Файл: id из POST /media или публичная ссылка, ровно одно из двух.
 */
export interface InteractiveMedia {
  /**
   * Имя файла у клиента, только для документа, например price.pdf
   */
  filename?: string | null;
  /**
   * media_id из POST /api/v2/external/media, например 1013859600285441
   */
  id?: string | null;
  /**
   * Публичная ссылка https на файл, Meta скачает его сама, например https://example.kz/price.pdf
   */
  link?: string | null;
}

export interface InteractiveReply {
  /**
   * Ваш код кнопки, вернётся во входящем сообщении в interactive.id, например confirm
   */
  id: string;
  /**
   * Надпись на кнопке, до 20 знаков, например «Да, приду»
   */
  title: string;
}

export interface InteractiveReplyButton {
  /**
   * Код и надпись кнопки
   */
  reply: InteractiveReply;
  /**
   * Всегда reply: кнопка быстрого ответа
   */
  type?: "reply";
}

/**
 * Нажатие кнопки или выбор пункта списка клиентом.
 */
export interface InteractiveResponseOut {
  /**
   * Описание пункта списка (только list_reply, если оно было задано)
   */
  description: string | null;
  /**
   * Что вы задали кнопке при отправке. button_reply: reply.id кнопки, list_reply: id строки списка, button: payload кнопки шаблона (если payload не задан, WhatsApp присылает текст кнопки)
   */
  id: string;
  /**
   * Только у type=button: payload быстрой кнопки шаблона, то же значение, что в id. У остальных типов поля нет
   */
  payload: string | null;
  /**
   * Текст нажатой кнопки или пункта, как его видел клиент, например «Записаться»
   */
  title: string;
  /**
   * Что нажал клиент. button_reply: кнопка сообщения type=interactive (interactive.type=button), list_reply: пункт списка (interactive.type=list), button: быстрая кнопка шаблона (QUICK_REPLY), nfm_reply: отправленная форма WhatsApp Flow. В Telegram, Instagram и чате на сайте всегда button_reply
   */
  type: string;
}

export interface InteractiveText {
  /**
   * Основной текст: до 1024 знаков у кнопок, ссылки и запроса места, до 4096 у списка (type=list). Длиннее: 422
   */
  text: string;
}

/**
 * Точка на карте.
 */
export interface LocationContent {
  /**
   * Адрес строкой, например «Астана, пр. Абая, 15»
   */
  address?: string | null;
  /**
   * Широта, например 51.1282 (Астана)
   */
  latitude: number;
  /**
   * Долгота, например 71.4304 (Астана)
   */
  longitude: number;
  /**
   * Название места, например «Салон Айгуль»
   */
  name?: string | null;
}

export interface MarkReadIn {
  /**
   * wamid входящих сообщений, которые отметить прочитанными. wamid сообщения: из вебхука message.incoming или из списка сообщений переписки, например wamid.HBgLNzcwNzEyMzQ1Njc...
   */
  message_ids: Array<string>;
  /**
   * id номера WhatsApp, с которого работаете: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
}

/**
 * Файл по ссылке или id из POST /media: ровно одно из двух, как в Cloud API.
 */
export interface MediaContent {
  /**
   * Подпись под файлом, до 1024 знаков; у аудио и стикера не показывается
   */
  caption?: string | null;
  /**
   * Имя файла у клиента, только для document, например schet_1024.pdf
   */
  filename?: string | null;
  /**
   * media_id из POST /api/v2/external/media, например 1013859600285441
   */
  id?: string | null;
  /**
   * Публичная ссылка https на файл, Meta скачает его сама
   */
  link?: string | null;
}

export interface MediaUploadForm {
  /**
   * Файл формой multipart/form-data, поле file, до 100 МБ: картинка, видео, аудио, документ или стикер
   */
  file: Blob;
}

export interface MediaUploadOut {
  /**
   * id файла в WhatsApp: передайте его в POST /api/v2/external/messages/send как image.id, document.id и т.д. Действует 30 дней
   */
  media_id: string;
}

export interface MessageContext {
  /**
   * wamid сообщения, на которое отвечаете: из вебхука message.incoming или GET /api/v2/external/conversations/{id}/messages, например wamid.HBgLNzcwNzEyMzQ1Njc...
   */
  message_id: string;
}

export interface MessageSenderOut {
  /**
   * id сотрудника у manager, как в GET /api/v2/external/team, например "7"
   */
  id?: string | null;
  /**
   * Имя сотрудника, название сценария или бота
   */
  name?: string | null;
  /**
   * Кто написал: contact (клиент), manager (сотрудник), workflow (сценарий), chatbot (бот или ИИ-ассистент), broadcast (рассылка), api (ваша программа через API или MCP), system (служебное)
   */
  type: string;
  /**
   * Откуда отправлено: external_api (API), mcp, amocrm и другие интеграции; null из кабинета
   */
  via?: string | null;
  /**
   * id сценария у workflow: тот же id, что в списке сценариев кабинета
   */
  workflow_id?: string | null;
}

/**
 * Какой шаблон WhatsApp отправлен: текст шаблона уже в поле text сообщения.
 */
export interface MessageTemplateRefOut {
  /**
   * Язык шаблона: ru, kk, en или другой код WhatsApp
   */
  language?: string | null;
  /**
   * Имя шаблона, как в GET /api/v2/external/templates, например zapis_napominanie
   */
  name: string;
  /**
   * Откуда отправлен шаблон, если не из чата: mcp, cliniccards_reminder и другие; иначе null
   */
  source?: string | null;
  /**
   * Значения переменных {{1}}, {{2}} по порядку, например ["Айгуль", "20 октября"]; пустой список, если переменных нет или они не сохранились
   */
  variables?: Array<string>;
}

export interface PhoneNumberListOut {
  /**
   * Номера аккаунта; отключённые не показываются
   */
  data: Array<PhoneNumberOut>;
  /**
   * total: сколько номеров в списке
   */
  meta?: Record<string, unknown>;
}

/**
 * Подключённый номер WhatsApp.
 */
export interface PhoneNumberOut {
  /**
   * Подтверждён ли номер кодом из SMS или звонка
   */
  code_verification_status?: "VERIFIED" | "NOT_VERIFIED" | "EXPIRED" | null;
  /**
   * Сам номер, как его видят клиенты, например +7 707 123 45 67
   */
  display_phone_number?: string | null;
  /**
   * id номера: передавайте его в phone_number_id при отправке сообщений, загрузке файлов и работе с шаблонами, например 123456789012345
   */
  phone_number_id: string;
  /**
   * Как подключён номер: meta_cloud (WhatsApp Cloud API) или evolution_api (старое подключение)
   */
  provider_type: string;
  /**
   * Качество номера по оценке Meta: GREEN хорошо, YELLOW внимание, RED риск блокировки
   */
  quality_rating?: "GREEN" | "YELLOW" | "RED" | "UNKNOWN" | null;
  /**
   * connected: можно отправлять; pending и connecting: подключение не завершено; disconnected, failed: не работает
   */
  status: "pending" | "connecting" | "connected" | "disconnected" | "failed";
  /**
   * Имя компании в WhatsApp, одобренное Meta, например «Салон Айгуль»
   */
  verified_name?: string | null;
}

export interface PipelineFieldOut {
  /**
   * Валюта денежного поля, например KZT; у других типов null
   */
  currency?: string | null;
  /**
   * id поля: ключ в custom_fields сделки, например 9c8b7a6d5e4f
   */
  id: string;
  /**
   * true: это поле суммы воронки, его значение и есть amount сделки
   */
  is_amount: boolean;
  /**
   * Название поля, как в кабинете, например «Источник»
   */
  name: string;
  /**
   * Допустимые значения для select, для других типов пусто
   */
  options?: Array<string>;
  /**
   * Поле отмечено обязательным (звёздочка в кабинете). Само по себе перенос не запрещает: запрещает required_from_stage_id
   */
  required: boolean;
  /**
   * С какого этапа поле обязательно: stages[].id этой воронки. Перенос на этот этап и дальше (и на успешный этап) без значения: 422 required_fields; на этап отказа можно. null: перенос не проверяет это поле
   */
  required_from_stage_id?: string | null;
  /**
   * Тип значения: text и multiline (строка), number (число), money (целое в тиынах), select (строка из options), date (ГГГГ-ММ-ДД), checkbox (true или false)
   */
  type: string;
}

export interface PipelineListOut {
  /**
   * Воронки на этой странице
   */
  data: Array<PipelineOut>;
  /**
   * true: есть ещё страницы, запросите их с cursor=next_cursor
   */
  has_more: boolean;
  /**
   * next_cursor для следующей страницы; null: это последняя страница
   */
  next_cursor?: string | null;
}

export interface PipelineOut {
  /**
   * Когда создана. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  created_at?: string | null;
  /**
   * Свои поля сделок этой воронки: их id: ключи в custom_fields сделки
   */
  custom_fields: Array<PipelineFieldOut>;
  /**
   * id воронки: передавайте в pipeline_id сделки
   */
  id: string;
  /**
   * Основная воронка аккаунта
   */
  is_default: boolean;
  /**
   * Название воронки, например «Продажи»
   */
  name: string;
  /**
   * Этапы по порядку (sort)
   */
  stages: Array<PipelineStageOut>;
  /**
   * Когда изменена. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  updated_at?: string | null;
}

export interface PipelineStageOut {
  /**
   * Цвет этапа в кабинете, HEX, например #3B82F6
   */
  color: string;
  /**
   * id этапа: его передают в stage_id сделки и в POST /deals/{deal_id}/move
   */
  id: string;
  /**
   * Этап «Закрыто и не реализовано»: перенос сюда закрывает сделку как проигранную
   */
  is_lost: boolean;
  /**
   * Этап «Успешно реализовано»: перенос сюда закрывает сделку как выигранную
   */
  is_won: boolean;
  /**
   * Название этапа, как в кабинете, например «Переговоры»
   */
  name: string;
  /**
   * Порядок этапа в воронке, по возрастанию, с 0
   */
  sort: number;
}

export interface ReactionIn {
  /**
   * Один эмодзи, например 👍. Пустая строка снимает реакцию
   */
  emoji: string;
  /**
   * На какое сообщение реакция. wamid сообщения: из вебхука message.incoming или из списка сообщений переписки, например wamid.HBgLNzcwNzEyMzQ1Njc...
   */
  message_id: string;
  /**
   * id номера WhatsApp, с которого работаете: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
  /**
   * Номер клиента, которому принадлежит сообщение: цифры с кодом страны, плюс в начале можно, например 77071234567. Уходит в Meta как есть: без пробелов, 8 в начале на 7 не заменяется
   */
  to: string;
}

export interface ReactionOut {
  /**
   * wamid сообщения-реакции
   */
  message_id?: string | null;
  /**
   * accepted: WhatsApp принял реакцию
   */
  status: string;
}

export interface RegisterPhoneNumberIn {
  /**
   * Название подключения в кабинете, видно только вам, например «Отдел продаж»
   */
  display_name: string;
  /**
   * Номер, который подключаете, в международном формате, например +77071234567
   */
  phone_e164?: string | null;
}

export interface RegisterPhoneNumberOut {
  /**
   * Подтверждён ли номер кодом из SMS или звонка
   */
  code_verification_status?: "VERIFIED" | "NOT_VERIFIED" | "EXPIRED" | null;
  /**
   * Сам номер, как его видят клиенты, например +7 707 123 45 67
   */
  display_phone_number?: string | null;
  /**
   * Ссылка на подключение номера в Meta (Embedded Signup): откройте её во всплывающем окне, владелец номера войдёт в Facebook и подтвердит номер. Пусто, если подтверждение не нужно
   */
  embedded_signup_url?: string | null;
  /**
   * id номера: передавайте его в phone_number_id при отправке сообщений, загрузке файлов и работе с шаблонами, например 123456789012345
   */
  phone_number_id: string;
  /**
   * Как подключён номер: meta_cloud (WhatsApp Cloud API) или evolution_api (старое подключение)
   */
  provider_type: string;
  /**
   * Качество номера по оценке Meta: GREEN хорошо, YELLOW внимание, RED риск блокировки
   */
  quality_rating?: "GREEN" | "YELLOW" | "RED" | "UNKNOWN" | null;
  /**
   * connected: можно отправлять; pending и connecting: подключение не завершено; disconnected, failed: не работает
   */
  status: "pending" | "connecting" | "connected" | "disconnected" | "failed";
  /**
   * Имя компании в WhatsApp, одобренное Meta, например «Салон Айгуль»
   */
  verified_name?: string | null;
}

/**
 * Сообщение в форме Cloud API: заполните ровно один блок с именем из type.
 */
export interface SendMessageIn {
  /**
   * Для type=audio: MP3, M4A, AAC или OGG до 16 МБ; голосовое OGG/OPUS только по id
   */
  audio?: MediaContent | null;
  /**
   * Для type=contacts: одна или несколько карточек
   */
  contacts?: Array<ContactCard> | null;
  /**
   * Ответ на сообщение клиента: цитата над пузырём. С шаблоном не передаётся
   */
  context?: MessageContext | null;
  /**
   * Для type=document: PDF, Word, Excel и другие до 100 МБ
   */
  document?: MediaContent | null;
  /**
   * Для type=image: JPG или PNG до 5 МБ
   */
  image?: MediaContent | null;
  /**
   * Для type=interactive: кнопки, список, кнопка-ссылка или запрос местоположения
   */
  interactive?: InteractiveContent | null;
  /**
   * Для type=location: точка на карте
   */
  location?: LocationContent | null;
  /**
   * id номера WhatsApp, с которого работаете: поле phone_number_id из GET /api/v2/external/phone-numbers, например 123456789012345
   */
  phone_number_id: string;
  /**
   * Для type=sticker: WEBP 512×512, до 100 КБ (анимированный до 500 КБ)
   */
  sticker?: MediaContent | null;
  /**
   * Для type=template: одобренный шаблон; единственный вид, который можно отправить вне окна 24 часа
   */
  template?: TemplateMessageIn | null;
  /**
   * Для type=text
   */
  text?: TextContent | null;
  /**
   * Номер клиента: цифры с кодом страны, плюс в начале можно: 77071234567 или +77071234567. Пробелы, скобки и дефисы не принимаются (422 VALIDATION_ERROR). 8 в начале на 7 НЕ заменяется: 87071234567 уйдёт в Meta как номер с кодом страны 8 и не дойдёт, пишите 77071234567
   */
  to: string;
  /**
   * Вид сообщения; рядом нужен блок с тем же именем, например type=text и text={...}
   */
  type: "text" | "image" | "video" | "audio" | "document" | "template" | "interactive" | "location" | "contacts" | "sticker";
  /**
   * Для type=video: MP4 или 3GP до 16 МБ
   */
  video?: MediaContent | null;
}

export interface SendMessageOut {
  /**
   * id сообщения (wamid): по нему вебхук message.status сообщит о доставке и прочтении
   */
  message_id: string;
  /**
   * id сообщения у WhatsApp; для номеров Cloud API совпадает с message_id
   */
  provider_message_id?: string | null;
  /**
   * accepted: WhatsApp принял сообщение; дальнейшие статусы приходят вебхуком message.status
   */
  status: "accepted" | "sent" | "delivered" | "read" | "failed";
}

export interface SetConversationStatusIn {
  /**
   * До какого времени отложить, ISO 8601 с часовым поясом, например 2026-10-20T09:00:00+05:00. Если передано, статус становится snoozed
   */
  snoozed_until?: string | null;
  /**
   * Новый статус. Статус диалога: open (открыт, менеджеру нужно ответить), pending (ожидает: ответ дан, ждём клиента или другой отдел), snoozed (отложен до snoozed_until), resolved (решён, закрыт). Новое сообщение клиента снова открывает решённый и отложенный диалог
   */
  status: "open" | "pending" | "snoozed" | "resolved";
}

export interface SetLabelsIn {
  /**
   * Все метки диалога после изменения, до 100, например ["VIP", "доставка"]. Список заменяет прежний целиком: чтобы добавить метку, передайте старые и новую. [] убирает все. Повторы и пустые строки отбрасываются
   */
  labels: Array<string>;
}

export interface StaffRefOut {
  /**
   * id сотрудника строкой, как в GET /api/v2/external/team, например "7"
   */
  id: string;
  /**
   * Имя сотрудника, например Ерлан; null, если не заполнено
   */
  name?: string | null;
}

export interface SuccessOut {
  /**
   * true: действие выполнено
   */
  success: boolean;
}

export interface TaskCreateIn {
  /**
   * Подробности, до 5000 знаков
   */
  description?: string;
  /**
   * Срок в ISO 8601. Лучше в UTC с Z: Казахстан живёт по UTC+5, поэтому «завтра в 10:00 по Астане» = 05:00Z, например 2026-10-19T05:00:00Z. Можно с поясом: 2026-10-19T10:00:00+05:00. Время без пояса считается UTC
   */
  due_at: string;
  /**
   * Исполнитель: id сотрудника строкой: поле id из GET /team, например "12". Не передали: ответственный сделки
   */
  responsible_user_id?: string | null;
  /**
   * Тип задачи: системные call (звонок), meeting (встреча), email (письмо), task (дело) или ключ своего типа вида c_6713d0a1b2c3. Списка своих типов в API нет: их заводят и видят в кабинете, «Настройки задач», а ключ виден в task_type задач этого типа (GET /deals/{deal_id}/tasks). Неизвестный или скрытый тип: 400 BAD_REQUEST
   */
  task_type?: string;
  /**
   * Что сделать, 1–300 знаков
   */
  title: string;
}

export interface TaskListOut {
  /**
   * Задачи на этой странице
   */
  data: Array<TaskOut>;
  /**
   * true: есть ещё страницы, запросите их с cursor=next_cursor
   */
  has_more: boolean;
  /**
   * next_cursor для следующей страницы; null: это последняя страница
   */
  next_cursor?: string | null;
}

export interface TaskOut {
  /**
   * Когда выполнена. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  completed_at?: string | null;
  /**
   * Когда создана. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  created_at?: string | null;
  /**
   * Сделка, к которой относится задача
   */
  deal_id?: string | null;
  /**
   * Подробности задачи
   */
  description: string;
  /**
   * true: задача выполнена
   */
  done: boolean;
  /**
   * Срок. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z (10:00 по Астане = 05:00Z)
   */
  due_at?: string | null;
  /**
   * id задачи: нужен для PATCH /tasks/{task_id}
   */
  id: string;
  /**
   * Исполнитель: id сотрудника строкой: поле id из GET /team, например "12"
   */
  responsible_user_id?: string | null;
  /**
   * open: в работе, done: выполнена, cancelled: отменена в кабинете
   */
  status: "open" | "done" | "cancelled";
  /**
   * Тип задачи: системные call (звонок), meeting (встреча), email (письмо), task (дело) или ключ своего типа вида c_6713d0a1b2c3. Списка своих типов в API нет: их заводят и видят в кабинете, «Настройки задач», а ключ виден в task_type задач этого типа (GET /deals/{deal_id}/tasks). Неизвестный или скрытый тип: 400 BAD_REQUEST
   */
  task_type: string;
  /**
   * Что сделать, например «Перезвонить Айгуль по замеру»
   */
  title: string;
  /**
   * Когда изменена. Время ISO 8601 в UTC с Z, например 2026-10-18T06:30:00Z
   */
  updated_at?: string | null;
}

export interface TaskUpdateIn {
  /**
   * true: отметить выполненной (как кнопка «Выполнено»), false: вернуть в работу
   */
  done?: boolean | null;
  /**
   * Новый срок. Срок в ISO 8601. Лучше в UTC с Z: Казахстан живёт по UTC+5, поэтому «завтра в 10:00 по Астане» = 05:00Z, например 2026-10-19T05:00:00Z. Можно с поясом: 2026-10-19T10:00:00+05:00. Время без пояса считается UTC
   */
  due_at?: string | null;
  /**
   * Новый исполнитель: id сотрудника строкой: поле id из GET /team, например "12"
   */
  responsible_user_id?: string | null;
  /**
   * Новое название, 1–300 знаков
   */
  title?: string | null;
}

export interface TeamListOut {
  /**
   * Сотрудники страницы: первым владелец аккаунта
   */
  data: Array<TeamMemberOut>;
  /**
   * true: есть следующая страница, запросите её с next_cursor
   */
  has_more: boolean;
  /**
   * Курсор следующей страницы: передайте его в параметр cursor. null на последней странице
   */
  next_cursor?: string | null;
}

export interface TeamMemberOut {
  /**
   * id сотрудника строкой, например "7": его передают в user_id метода POST /conversations/{conversation_id}/assign и в mention_user_ids заметки
   */
  id: string;
  /**
   * false: сотрудник отключён: назначить на него диалог (409 CONFLICT), сделку или задачу (422 responsible_user_not_found) нельзя
   */
  is_active: boolean;
  /**
   * Имя сотрудника в Wazzapo, например Ерлан; null, если не заполнено
   */
  name?: string | null;
  /**
   * Номера WhatsApp (phone_number_id из GET /api/v2/external/phone-numbers), в которых сотрудник работает; null: все номера аккаунта
   */
  phone_number_ids?: Array<string> | null;
  /**
   * Роль. owner приходит строчными буквами, остальные заглавными: так исторически, значения не изменятся, сравнивайте строки как есть. owner (владелец аккаунта), ADMIN (управляет командой, видит всё), AGENT (менеджер: чаты, контакты, сделки), VIEWER (только просмотр, назначить диалог на него нельзя)
   */
  role: "owner" | "ADMIN" | "AGENT" | "VIEWER";
}

export interface TemplateBody {
  /**
   * Только AUTHENTICATION: добавить «Не сообщайте этот код никому»
   */
  add_security_recommendation?: boolean | null;
  /**
   * Примеры значений переменных: обязательны, если в text есть {{1}}
   */
  example?: TemplateBodyExample | null;
  /**
   * Текст до 1024 символов с переменными {{1}}, {{2}} по порядку. Переменная не может стоять в самом начале или в самом конце текста: Meta отклонит шаблон. Для AUTHENTICATION не передаётся: текст задаёт Meta
   */
  text?: string | null;
  /**
   * BODY: основной текст, обязателен и только один
   */
  type: "BODY";
}

/**
 * Примеры значений переменных текста.
 */
export interface TemplateBodyExample {
  /**
   * Один список значений по порядку переменных: для «{{1}}, ваша запись {{2}}» это [["Айгуль", "20 октября в 15:00"]]
   */
  body_text: Array<Array<string>>;
  [key: string]: unknown;
}

export interface TemplateButtonCopyCode {
  /**
   * Пример кода до 15 символов, например OSEN25
   */
  example: string;
  /**
   * COPY_CODE: копирует промокод (рекламные шаблоны), не больше 1. Надпись задаёт WhatsApp
   */
  type: "COPY_CODE";
  [key: string]: unknown;
}

/**
 * Другие кнопки Meta (FLOW, CATALOG, MPM, SPM, VOICE_CALL, ORDER_DETAILS) передаются в Meta как есть.
 */
export interface TemplateButtonOther {
  /**
   * Надпись на кнопке до 25 символов
   */
  text?: string | null;
  /**
   * Тип кнопки Meta, кроме перечисленных выше: FLOW, CATALOG, MPM, SPM, VOICE_CALL или ORDER_DETAILS. Другой тип (например, опечатка QUICK_REPLAY): 422
   */
  type: string;
  [key: string]: unknown;
}

export interface TemplateButtonOtp {
  /**
   * ONE_TAP: надпись кнопки автозаполнения
   */
  autofill_text?: string | null;
  /**
   * COPY_CODE: «Копировать код», работает везде. ONE_TAP и ZERO_TAP: код сам подставляется в ваше Android-приложение, нужны supported_apps
   */
  otp_type: "COPY_CODE" | "ONE_TAP" | "ZERO_TAP";
  /**
   * ONE_TAP и ZERO_TAP: ваши Android-приложения, до 5
   */
  supported_apps?: Array<TemplateOtpApp> | null;
  /**
   * Надпись «Копировать код» по-своему, до 25 символов
   */
  text?: string | null;
  /**
   * OTP: кнопка кода подтверждения, только для AUTHENTICATION и одна
   */
  type: "OTP";
  /**
   * ZERO_TAP: согласие с условиями Meta, true
   */
  zero_tap_terms_accepted?: boolean | null;
  [key: string]: unknown;
}

export interface TemplateButtonPhoneNumber {
  /**
   * Номер с кодом страны до 20 символов, например +77071234567
   */
  phone_number: string;
  /**
   * Надпись на кнопке до 25 символов, например «Позвонить»
   */
  text: string;
  /**
   * PHONE_NUMBER: звонок по номеру, не больше 1
   */
  type: "PHONE_NUMBER";
  [key: string]: unknown;
}

export interface TemplateButtonQuickReply {
  /**
   * Надпись на кнопке до 25 символов, например «Подтверждаю»
   */
  text: string;
  /**
   * QUICK_REPLY: ответ одним нажатием, до 10 штук
   */
  type: "QUICK_REPLY";
  [key: string]: unknown;
}

export interface TemplateButtonUrl {
  /**
   * Если в url есть {{1}}: полный пример адреса, например ["https://shop.kz/order/1024"]
   */
  example?: Array<string> | null;
  /**
   * Надпись на кнопке до 25 символов, например «Открыть каталог»
   */
  text: string;
  /**
   * URL: открывает сайт, не больше 2 в шаблоне
   */
  type: "URL";
  /**
   * Адрес https до 2000 символов; переменная {{1}} только в конце, например https://shop.kz/order/{{1}}
   */
  url: string;
  [key: string]: unknown;
}

export interface TemplateButtons {
  /**
   * До 10 кнопок: QUICK_REPLY до 10, URL до 2, PHONE_NUMBER и COPY_CODE по 1. Кнопки QUICK_REPLY ставьте подряд, не вперемешку с другими. Для AUTHENTICATION одна кнопка OTP
   */
  buttons: Array<TemplateButtonQuickReply | TemplateButtonUrl | TemplateButtonPhoneNumber | TemplateButtonCopyCode | TemplateButtonOtp | TemplateButtonOther>;
  /**
   * BUTTONS: блок кнопок под сообщением, не больше одного
   */
  type: "BUTTONS";
}

/**
 * Часть шаблона, в которую подставляются значения: шапка, текст или кнопка.
 */
export interface TemplateComponentIn {
  /**
   * Только для type=button: номер кнопки в шаблоне, считая с 0 (от 0 до 9)
   */
  index?: number | null;
  /**
   * Значения переменных по порядку: первое вместо {{1}}, второе вместо {{2}}
   */
  parameters?: Array<TemplateParameter>;
  /**
   * Только для type=button: quick_reply (быстрый ответ), url (кнопка-ссылка), copy_code (промокод)
   */
  sub_type?: string | null;
  /**
   * header: шапка, body: основной текст, button: кнопка (нужны sub_type и index)
   */
  type: "header" | "body" | "footer" | "button";
}

export interface TemplateCurrency {
  /**
   * Сумма в тенге, умноженная на 1000 (так требует Meta): 150 000 ₸ = 150000000, 15 000 ₸ = 15000000. Внимание: в сделках (POST /deals, amount) та же сумма в тиынах, то есть × 100: 150 000 ₸ = 15000000. Не путайте, иначе клиент увидит сумму в 10 раз меньше
   */
  amount_1000: number;
  /**
   * Код валюты ISO 4217 заглавными буквами: KZT, RUB, USD
   */
  code: string;
  /**
   * Сумма текстом, её увидит клиент, если телефон не сможет показать формат, например «150 000 ₸»
   */
  fallback_value: string;
}

export interface TemplateDateTime {
  /**
   * Дата и время текстом, как их увидит клиент, например «25 октября, 15:00»
   */
  fallback_value: string;
}

export interface TemplateFooter {
  /**
   * Только AUTHENTICATION: срок действия кода в минутах, от 1 до 90
   */
  code_expiration_minutes?: number | null;
  /**
   * Подпись до 60 символов без переменных, например «Wazzapo, Астана»
   */
  text?: string | null;
  /**
   * FOOTER: строка мелким шрифтом под текстом
   */
  type: "FOOTER";
}

export interface TemplateHeaderLocation {
  /**
   * LOCATION: карта с точкой, координаты передаются при отправке. Примера не нужно
   */
  format: "LOCATION";
  /**
   * HEADER: шапка над текстом, не больше одной
   */
  type: "HEADER";
}

export interface TemplateHeaderMedia {
  /**
   * Образец файла для модерации: обязателен, проще всего media_url
   */
  example?: TemplateMediaExample | null;
  /**
   * IMAGE: картинка, VIDEO: видео, DOCUMENT: файл PDF. Сам файл передаётся при отправке
   */
  format: "IMAGE" | "VIDEO" | "DOCUMENT";
  /**
   * HEADER: шапка над текстом, не больше одной
   */
  type: "HEADER";
}

export interface TemplateHeaderText {
  /**
   * Пример для {{1}}: обязателен, если в text есть переменная
   */
  example?: TemplateHeaderTextExample | null;
  /**
   * TEXT: шапка текстом
   */
  format: "TEXT";
  /**
   * Текст шапки до 60 символов, можно одну переменную {{1}}, например «Запись на {{1}}»
   */
  text: string;
  /**
   * HEADER: шапка над текстом, не больше одной
   */
  type: "HEADER";
}

/**
 * Пример значения переменной {{1}} в текстовой шапке.
 */
export interface TemplateHeaderTextExample {
  /**
   * Ровно одно значение для {{1}} в шапке, например ["Айгуль"]
   */
  header_text: Array<string>;
  [key: string]: unknown;
}

export interface TemplateLanguage {
  /**
   * Язык шаблона, как в GET /api/v2/external/templates (поле language): ru, kk, en_US. Шаблон в Meta определяется парой имя + язык
   */
  code: string;
}

export interface TemplateListOut {
  /**
   * Шаблоны на этой странице
   */
  data: Array<TemplateOut>;
  /**
   * true, если есть следующая страница
   */
  has_more: boolean;
  /**
   * total: всего шаблонов с учётом фильтров
   */
  meta?: Record<string, unknown>;
  /**
   * Передайте в cursor, чтобы получить следующую страницу
   */
  next_cursor?: string | null;
}

/**
 * Файл шапки шаблона: id из POST /media или публичная ссылка, ровно одно из двух.
 */
export interface TemplateMedia {
  /**
   * Имя файла у клиента, только для документа, например price.pdf
   */
  filename?: string | null;
  /**
   * media_id из POST /api/v2/external/media, например 1013859600285441
   */
  id?: string | null;
  /**
   * Публичная ссылка https на файл, Meta скачает его сама, например https://example.kz/price.pdf
   */
  link?: string | null;
}

/**
 * Образец файла шапки: Meta проверяет шаблон вместе с ним.
 */
export interface TemplateMediaExample {
  /**
   * Уже загруженный в Meta образец (Resumable Upload API), если вы загрузили его сами
   */
  header_handle?: Array<string> | null;
  /**
   * Ссылка https на образец файла, например https://example.kz/promo.jpg. Wazzapo скачает файл и загрузит его в Meta сам. Картинка JPG/PNG до 5 МБ, видео MP4 до 16 МБ, документ PDF до 100 МБ
   */
  media_url?: string | null;
  [key: string]: unknown;
}

/**
 * Одобренный Meta шаблон и значения его переменных.
 */
export interface TemplateMessageIn {
  /**
   * Значения переменных. Шаблону без переменных и без файла в шапке не нужны. Если в шапке картинка, видео или документ, передайте файл в каждой отправке
   */
  components?: Array<TemplateComponentIn>;
  /**
   * Язык шаблона
   */
  language: TemplateLanguage;
  /**
   * Имя одобренного шаблона из GET /api/v2/external/templates (поле name, статус APPROVED): латиница в нижнем регистре, цифры и _, до 512 символов, например zapis_napominanie. Нет одобренного шаблона с таким именем и языком: 422 template_not_found
   */
  name: string;
}

export interface TemplateOtpApp {
  /**
   * Имя пакета Android-приложения, например kz.shop.app
   */
  package_name: string;
  /**
   * Хеш ключа подписи приложения (11 символов), например K8a/AINcGX7
   */
  signature_hash: string;
  [key: string]: unknown;
}

/**
 * Шаблон и его статус проверки в Meta.
 */
export interface TemplateOut {
  /**
   * Кнопки шаблона, те же, что в части BUTTONS
   */
  buttons?: Array<TemplateButtonQuickReply | TemplateButtonUrl | TemplateButtonPhoneNumber | TemplateButtonCopyCode | TemplateButtonOtp | TemplateButtonOther> | null;
  /**
   * Категория, от неё зависит цена сообщения в Meta
   */
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  /**
   * Части шаблона в том же виде, что при создании. Пусто, если содержимое неизвестно
   */
  components?: Array<TemplateHeaderText | TemplateHeaderMedia | TemplateHeaderLocation | TemplateBody | TemplateFooter | TemplateButtons> | null;
  /**
   * Когда шаблон появился в Wazzapo, UTC
   */
  created_at?: string | null;
  /**
   * Вид шапки: при отправке для IMAGE, VIDEO, DOCUMENT нужен файл, для LOCATION координаты
   */
  header_format?: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION" | null;
  /**
   * Код языка, его передают в messages.send как template.language.code
   */
  language: string;
  /**
   * Имя шаблона, его передают в messages.send как template.name
   */
  name: string;
  /**
   * Качество по оценке Meta: при LOW шаблон могут приостановить
   */
  quality_score?: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN" | null;
  /**
   * Причина отказа Meta, если status=REJECTED
   */
  rejected_reason?: string | null;
  /**
   * PENDING: на проверке. APPROVED: можно отправлять. REJECTED: отклонён, причина в rejected_reason. PAUSED: Meta приостановила из-за жалоб. DISABLED: отключён
   */
  status: "PENDING" | "APPROVED" | "REJECTED" | "DISABLED" | "PAUSED";
  /**
   * id шаблона в Meta, например 1252715608684590: для get, update, delete
   */
  template_id: string;
  /**
   * Когда шаблон последний раз менялся, UTC
   */
  updated_at?: string | null;
  /**
   * Сколько переменных {{n}} в тексте и шапке: столько значений передать при отправке
   */
  variables_count?: number | null;
}

/**
 * Значение одной переменной шаблона. Поле с именем из type обязательно.
 */
export interface TemplateParameter {
  /**
   * Для type=coupon_code: промокод, который клиент скопирует кнопкой, до 20 знаков
   */
  coupon_code?: string | null;
  /**
   * Сумма для type=currency
   */
  currency?: TemplateCurrency | null;
  /**
   * Дата для type=date_time
   */
  date_time?: TemplateDateTime | null;
  /**
   * Документ шапки для type=document: PDF до 100 МБ, filename задаёт имя файла у клиента
   */
  document?: TemplateMedia | null;
  /**
   * Картинка шапки для type=image: JPG или PNG до 5 МБ
   */
  image?: TemplateMedia | null;
  /**
   * Место в шапке для type=location
   */
  location?: LocationContent | null;
  /**
   * Имя переменной для шаблонов с именованными переменными {{name}}, например first_name. Для нумерованных {{1}}, {{2}} не передавайте: значения идут по порядку
   */
  parameter_name?: string | null;
  /**
   * Для type=payload в кнопке быстрого ответа: строка, которая вернётся вам во входящем сообщении, когда клиент нажмёт кнопку
   */
  payload?: string | null;
  /**
   * Значение для type=text: подставится вместо {{1}} или {{name}}, в кнопке-ссылке окончание адреса
   */
  text?: string | null;
  /**
   * Вид значения. В тексте и заголовке: text, currency, date_time. В шапке с файлом: image, video, document, location. В кнопке: payload (быстрый ответ), text (окончание ссылки), coupon_code (кнопка «Скопировать код»)
   */
  type?: "text" | "currency" | "date_time" | "image" | "video" | "document" | "location" | "payload" | "coupon_code";
  /**
   * Видео шапки для type=video: MP4 до 16 МБ
   */
  video?: TemplateMedia | null;
}

export interface TextContent {
  /**
   * Текст сообщения, до 4096 знаков; *жирный*, _курсив_
   */
  body: string;
  /**
   * Показать превью первой ссылки в тексте
   */
  preview_url?: boolean | null;
}

/**
 * Правка шаблона в Meta: компоненты заменяются целиком, имя и язык не меняются.
 */
export interface UpdateTemplateIn {
  /**
   * Новая категория: только у отклонённого или приостановленного шаблона. UTILITY: служебное по заказу или записи клиента (подтверждение, напоминание, статус), дешевле рекламного. MARKETING: реклама, акции, скидки, приглашения. AUTHENTICATION: код подтверждения входа. Meta сама переносит в MARKETING служебный шаблон с рекламой, об этом придёт событие template.category_changed
   */
  category?: "MARKETING" | "UTILITY" | "AUTHENTICATION" | null;
  /**
   * Все части шаблона заново: Meta заменяет их целиком, по одной части не правится. Части шаблона: BODY обязателен, HEADER, FOOTER и BUTTONS по желанию, каждая не больше одной. Вид части выбирается полем type, у шапки ещё полем format
   */
  components?: Array<TemplateHeaderText | TemplateHeaderMedia | TemplateHeaderLocation | TemplateBody | TemplateFooter | TemplateButtons> | null;
}

export interface WebhookCardName {
  /**
   * Имя, если WhatsApp его прислал
   */
  first_name: string | null;
  /**
   * Имя в карточке, например «Ерлан Сапаров»
   */
  formatted_name: string;
  /**
   * Фамилия, если WhatsApp её прислал
   */
  last_name: string | null;
}

export interface WebhookCardPhone {
  /**
   * Номер, как он записан в карточке, например +7 707 123 45 67
   */
  phone: string | null;
  /**
   * Вид номера: CELL, MAIN, HOME, WORK
   */
  type: string | null;
  /**
   * Номер WhatsApp цифрами, если он есть в WhatsApp
   */
  wa_id: string | null;
}

export interface WebhookContact {
  /**
   * Категория контакта
   */
  category: string | null;
  /**
   * Компания
   */
  company: string | null;
  /**
   * Создан, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  created_at: string | null;
  /**
   * Дополнительные поля: ключ и значение
   */
  custom_fields?: Record<string, unknown>;
  /**
   * Почта
   */
  email: string | null;
  /**
   * id контакта, как в GET /api/v2/external/contacts
   */
  id: string;
  /**
   * true: контакт заблокирован
   */
  is_blocked: boolean;
  /**
   * Имя, например Айгуль
   */
  name: string | null;
  /**
   * Заметки в карточке
   */
  notes: string | null;
  /**
   * Телефон цифрами без +, например 77071234567
   */
  phone: string | null;
  /**
   * Должность
   */
  position: string | null;
  /**
   * Откуда контакт: whatsapp, manual, api, import и другие
   */
  source: string | null;
  /**
   * Теги, например ["vip"]
   */
  tags?: Array<string>;
  /**
   * Изменён, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  updated_at: string | null;
}

/**
 * Карточка контакта, присланная клиентом. Из WhatsApp приходит как у Meta (могут быть emails, org).
 */
export interface WebhookContactCard {
  /**
   * Имя в карточке
   */
  name: WebhookCardName;
  /**
   * Номера из карточки (WhatsApp)
   */
  phones: Array<WebhookCardPhone> | null;
  /**
   * Карточка в формате vCard (другие каналы)
   */
  vcard: string | null;
}

export interface WebhookContactCreated {
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email; null, если создан вручную или через API
   */
  channel: string | null;
  /**
   * Карточка контакта
   */
  contact: WebhookContact;
  /**
   * contact.created
   */
  event: string;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id; null, если не из сообщения
   */
  session_id: string | null;
  /**
   * Когда создан, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

export interface WebhookContactRef {
  /**
   * Только у каналов без телефона: id чата Telegram, почта, id в Instagram или OLX. У WhatsApp поля нет
   */
  external_id: string | null;
  /**
   * id контакта Wazzapo, как в GET /api/v2/external/contacts; null у участника группы
   */
  id: string | null;
  /**
   * Имя клиента, например Айгуль; null, если неизвестно
   */
  name: string | null;
  /**
   * Телефон цифрами с кодом страны без +, например 77071234567. Есть у WhatsApp и чата на сайте, у других каналов null (адрес в external_id)
   */
  phone: string | null;
}

export interface WebhookContactUpdated {
  /**
   * Кто изменил: manager, workflow, api или system
   */
  changed_by: WebhookPerson;
  /**
   * Что поменялось
   */
  changes: Array<WebhookFieldChange>;
  /**
   * Карточка после правки
   */
  contact: WebhookContact;
  /**
   * contact.updated
   */
  event: string;
  /**
   * Когда изменён, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

export interface WebhookConversationAssigned {
  /**
   * Кто назначил: сотрудник, сценарий или система
   */
  assigned_by: WebhookPerson;
  /**
   * Новый ответственный; null, если назначение сняли
   */
  assignee: WebhookPerson | null;
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string | null;
  /**
   * Клиент диалога; в группе участник, который написал
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Имя события, как поле event оболочки
   */
  event: string;
  /**
   * Прежний ответственный; null, если не было
   */
  previous_assignee: WebhookPerson | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
  /**
   * Когда произошло событие, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

export interface WebhookConversationStatusChanged {
  /**
   * Кто сменил: сотрудник, сценарий или система
   */
  changed_by: WebhookPerson;
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string | null;
  /**
   * Клиент диалога; в группе участник, который написал
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Имя события, как поле event оболочки
   */
  event: string;
  /**
   * Новый статус: open, pending, snoozed, resolved
   */
  new_status: string | null;
  /**
   * Прежний статус: open, pending, snoozed, resolved
   */
  old_status: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
  /**
   * Когда произошло событие, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

export interface WebhookCreateIn {
  /**
   * Подпись для себя, чтобы отличать приёмники, например «CRM: заявки». До 100 символов
   */
  description?: string | null;
  /**
   * На какие события подписаться, хотя бы одно; список с описаниями: GET /webhook-event-types. Сейчас: message.incoming, message.outgoing, message.status, conversation.assigned, conversation.status_changed, conversation.note_added, session.connected, session.disconnected, deal.stage_changed, deal.closed, deal.created, deal.changed, contact.created, contact.updated, template.status_updated, template.quality_changed, template.category_changed, invoice.status_changed, task.created
   */
  event_types: Array<"message.incoming" | "message.outgoing" | "message.status" | "conversation.assigned" | "conversation.status_changed" | "conversation.note_added" | "session.connected" | "session.disconnected" | "deal.stage_changed" | "deal.closed" | "deal.created" | "deal.changed" | "contact.created" | "contact.updated" | "template.status_updated" | "template.quality_changed" | "template.category_changed" | "invoice.status_changed" | "task.created">;
  /**
   * Адрес вашего сервера, куда Wazzapo отправляет события запросом POST: только https:// и только публичный адрес (localhost и внутренние сети нельзя), до 2048 символов. Пример: https://crm.example.kz/hooks/wazzapo
   */
  url: string;
}

export interface WebhookDeal {
  /**
   * Сумма сделки в тиынах, как amount в GET /api/v2/external/deals: 1 ₸ = 100 тиынов, 300 000 ₸ = 30000000
   */
  amount: number;
  /**
   * Ответственный {id, name, email}, id числом; null, если нет. Тот же сотрудник строкой: responsible_user_id
   */
  assignee: WebhookPerson | null;
  /**
   * Клиент сделки
   */
  contact: WebhookDealContact;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Создана, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  created_at: string | null;
  /**
   * Валюта суммы, как currency в REST, обычно KZT
   */
  currency: string | null;
  /**
   * id сделки в вашей системе, как external_id в REST (если передавали в POST /deals)
   */
  external_id: string | null;
  /**
   * id сделки, как в GET /api/v2/external/deals
   */
  id: string;
  /**
   * Проиграна, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z; иначе null
   */
  lost_at: string | null;
  /**
   * Причина отказа текстом у проигранной
   */
  lost_reason: string | null;
  /**
   * id причины отказа из настроек воронки
   */
  lost_reason_id: string | null;
  /**
   * Номер сделки в кабинете, например 152
   */
  number: number | null;
  /**
   * Сколько оплачено, в тенге
   */
  paid_amount: number | null;
  /**
   * Воронка сделки {id, name}; id тот же, что pipeline_id
   */
  pipeline: WebhookPipelineRef;
  /**
   * id воронки, как pipeline_id в REST (GET /api/v2/external/pipelines)
   */
  pipeline_id: string | null;
  /**
   * Ответственный, как responsible_user_id в REST: id из GET /api/v2/external/team строкой, например "12"; null, если нет
   */
  responsible_user_id: string | null;
  /**
   * Откуда сделка, то же значение, что source в REST: api (через API), manual (вручную в кабинете), rule (правилом по входящему), amocrm, form, канал (whatsapp, instagram, telegram, webchat, email, olx); null, если неизвестно
   */
  source: string | null;
  /**
   * Текущий этап {id, name, is_won, is_lost}; id тот же, что stage_id
   */
  stage: WebhookStage | null;
  /**
   * id текущего этапа, как stage_id в REST (stages[].id воронки)
   */
  stage_id: string | null;
  /**
   * open (в работе), won (выиграна), lost (проиграна)
   */
  status: string;
  /**
   * Название сделки
   */
  title: string | null;
  /**
   * Изменена, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  updated_at: string | null;
  /**
   * Сумма в целых тенге (не тиыны), например 300000: оставлено для совместимости; используйте amount в тиынах, как в REST
   */
  value: number | null;
  /**
   * Выиграна, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z; иначе null
   */
  won_at: string | null;
}

export interface WebhookDealChanged {
  /**
   * Когда изменили, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  changed_at: string | null;
  /**
   * Сотрудник {id, name, email}; null, если действие сделал не сотрудник
   */
  changed_by: WebhookPerson | null;
  /**
   * id сценария, если действие сделал сценарий; иначе null
   */
  changed_by_workflow: string | null;
  /**
   * Что поменялось, кроме этапа
   */
  changes: Array<WebhookFieldChange>;
  /**
   * Сделка после правки
   */
  deal: WebhookDeal;
  /**
   * deal.changed
   */
  event: string;
}

export interface WebhookDealClosed {
  /**
   * Когда закрыли, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  closed_at: string | null;
  /**
   * Сотрудник {id, name, email}; null, если действие сделал не сотрудник
   */
  closed_by: WebhookPerson | null;
  /**
   * id сценария, если действие сделал сценарий; иначе null
   */
  closed_by_workflow: string | null;
  /**
   * Закрытая сделка
   */
  deal: WebhookDeal;
  /**
   * deal.closed
   */
  event: string;
  /**
   * Причина отказа у lost
   */
  lost_reason: string | null;
  /**
   * won (выиграна) или lost (проиграна)
   */
  outcome: string;
}

export interface WebhookDealContact {
  /**
   * id контакта, как в GET /api/v2/external/contacts
   */
  id: string | null;
  /**
   * Имя клиента
   */
  name: string | null;
  /**
   * Телефон, как в карточке, например +77071234567
   */
  phone: string | null;
}

export interface WebhookDealCreated {
  /**
   * Когда создана, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  created_at: string | null;
  /**
   * Сотрудник {id, name, email}; null, если действие сделал не сотрудник
   */
  created_by: WebhookPerson | null;
  /**
   * id сценария, если действие сделал сценарий; иначе null
   */
  created_by_workflow: string | null;
  /**
   * Новая сделка
   */
  deal: WebhookDeal;
  /**
   * deal.created
   */
  event: string;
}

export interface WebhookDealStageChanged {
  /**
   * Сделка после перевода
   */
  deal: WebhookDeal;
  /**
   * deal.stage_changed
   */
  event: string;
  /**
   * С какого этапа
   */
  from_stage: WebhookStage | null;
  /**
   * Когда перевели, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  moved_at: string | null;
  /**
   * Сотрудник {id, name, email}; null, если действие сделал не сотрудник
   */
  moved_by: WebhookPerson | null;
  /**
   * id сценария, если действие сделал сценарий; иначе null
   */
  moved_by_workflow: string | null;
  /**
   * На какой этап
   */
  to_stage: WebhookStage | null;
}

export interface WebhookDeliveryListOut {
  /**
   * Доставки на этой странице, новые первыми
   */
  data: Array<WebhookDeliveryOut>;
  /**
   * true, если есть следующая страница
   */
  has_more: boolean;
  /**
   * Передайте в ?cursor=, чтобы получить следующую страницу; null на последней
   */
  next_cursor?: string | null;
}

/**
 * Одна доставка события на ваш адрес вместе со всеми её попытками.
 */
export interface WebhookDeliveryOut {
  /**
   * Номер последней попытки: 1 первая, всего до 6
   */
  attempt: number;
  /**
   * Когда произошло событие, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  created_at?: string | null;
  /**
   * Причина неудачи последней попытки, например HTTP 500
   */
  error_message?: string | null;
  /**
   * Событие, например message.incoming
   */
  event_type: string;
  /**
   * id доставки, тот же, что в заголовке X-Wazzapo-Delivery-Id запроса на ваш адрес; нужен для POST /webhooks/{webhook_id}/deliveries/{delivery_id}/retry
   */
  id: string;
  /**
   * Когда следующая попытка, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  next_retry_at?: string | null;
  /**
   * HTTP-код последнего ответа вашего адреса, например 500
   */
  response_status?: number | null;
  /**
   * Когда отправлена последняя попытка, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  sent_at?: string | null;
  /**
   * pending (ждёт отправки), sending (отправляется), success (ваш адрес ответил 2xx), retry_scheduled (не дошло, следующая попытка в next_retry_at), failed (не дошло за все 6 попыток)
   */
  status: string;
}

export interface WebhookEventTypeListOut {
  /**
   * События на этой странице
   */
  data: Array<WebhookEventTypeOut>;
  /**
   * true, если есть следующая страница
   */
  has_more: boolean;
  /**
   * Передайте в ?cursor=, чтобы получить следующую страницу; null на последней
   */
  next_cursor?: string | null;
}

export interface WebhookEventTypeOut {
  /**
   * Когда приходит событие и что в нём
   */
  description: string;
  /**
   * Пример поля data в теле запроса на ваш адрес
   */
  example?: Record<string, unknown> | null;
  /**
   * Имя события для event_types, например deal.created
   */
  name: string;
}

export interface WebhookFieldChange {
  /**
   * Что поменялось: имя поля (value, title, assignee_id, tags, name...) или custom_fields.<ключ> у контакта и custom_attributes.<id поля> у сделки. У value old и new в целых тенге, как deal.value
   */
  field: string;
  /**
   * Стало; null, если поле очистили
   */
  new: unknown;
  /**
   * Было: значение того же типа, что поле; null, если было пусто
   */
  old: unknown;
}

export interface WebhookIncomingMessage {
  /**
   * Только у type=contact: карточки
   */
  contacts: Array<WebhookContactCard> | null;
  /**
   * Адрес отправителя: у WhatsApp телефон цифрами, например 77071234567
   */
  from: string | null;
  /**
   * id сообщения: у WhatsApp wamid, например wamid.HBgLNzcwNzEy...
   */
  id: string | null;
  /**
   * Клиент нажал кнопку или выбрал пункт списка; иначе null
   */
  interactive: InteractiveResponseOut | null;
  /**
   * Старое поле, то же, что interactive.id: оставлено для совместимости
   */
  interactive_reply_id: string | null;
  /**
   * Только у type=location: точка на карте
   */
  location: WebhookLocation | null;
  /**
   * Ссылка на файл (картинка, документ, голосовое); null у текста
   */
  media_url: string | null;
  /**
   * Имя клиента из профиля WhatsApp или из Wazzapo
   */
  name: string | null;
  /**
   * Текст сообщения, подпись к файлу или текст нажатой кнопки
   */
  text: string;
  /**
   * Когда клиент отправил сообщение, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
  /**
   * text, image, video, audio, voice, document, location, contact, sticker. Нажатие кнопки приходит как text: текст кнопки в text, сама кнопка в interactive
   */
  type: string | null;
}

export interface WebhookInvoice {
  /**
   * Сумма в тиынах: 30000000 = 300 000 тенге
   */
  amount: number;
  /**
   * id счёта в ApiPay
   */
  apipay_invoice_id: string | null;
  /**
   * Имя плательщика из Kaspi
   */
  client_name: string | null;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Выставлен, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  created_at: string | null;
  /**
   * Всегда KZT
   */
  currency: string;
  /**
   * id сделки счёта
   */
  deal_id: string | null;
  /**
   * Назначение платежа
   */
  description: string;
  /**
   * Код ошибки у status=error
   */
  error_code: string | null;
  /**
   * Текст ошибки у status=error
   */
  error_text: string | null;
  /**
   * Срок оплаты, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  expires_at: string | null;
  /**
   * id счёта в Wazzapo
   */
  id: string;
  /**
   * true: тестовый счёт
   */
  is_sandbox: boolean;
  /**
   * Состав счёта
   */
  items?: Array<WebhookInvoiceItem>;
  /**
   * Номер Kaspi клиента у method=phone
   */
  kaspi_phone: string | null;
  /**
   * Как выставлен: phone (на номер Kaspi) или link (ссылка)
   */
  method: string | null;
  /**
   * Оплачен, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z; иначе null
   */
  paid_at: string | null;
  /**
   * Ссылка на оплату у method=link
   */
  payment_url: string | null;
  /**
   * Откуда выставлен: chat, deal, workflow, api
   */
  source: string | null;
  /**
   * processing, pending, paid, cancelled, expired, error, partially_refunded
   */
  status: string | null;
  /**
   * Сколько возвращено, в тиынах; null без возврата
   */
  total_refunded: number | null;
}

export interface WebhookInvoiceItem {
  /**
   * id товара в каталоге кассы ApiPay, если есть
   */
  catalog_item_id: unknown;
  /**
   * Количество
   */
  count: number | null;
  /**
   * Название позиции
   */
  name: string | null;
  /**
   * Цена за единицу в тенге, как её прислал Kaspi (ApiPay)
   */
  price: number | null;
}

export interface WebhookInvoiceStatusChanged {
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email; null без диалога
   */
  channel: string | null;
  /**
   * Клиент
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Имя события
   */
  event: string;
  /**
   * Счёт на момент смены статуса
   */
  invoice: WebhookInvoice;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * Прежний статус
   */
  previous_status: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id; null без диалога
   */
  session_id: string | null;
  /**
   * Новый статус, как invoice.status
   */
  status: string | null;
  /**
   * Когда произошло, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

export interface WebhookListOut {
  /**
   * Вебхуки аккаунта на этой странице, без секретов
   */
  data: Array<WebhookOut>;
  /**
   * true, если есть следующая страница
   */
  has_more: boolean;
  /**
   * Передайте в ?cursor=, чтобы получить следующую страницу; null на последней
   */
  next_cursor?: string | null;
}

export interface WebhookLocation {
  /**
   * Адрес места, если есть
   */
  address: string | null;
  /**
   * Широта, например 51.128207
   */
  latitude: number | null;
  /**
   * Долгота, например 71.430411
   */
  longitude: number | null;
  /**
   * Название места, если клиент выбрал место, а не точку
   */
  name: string | null;
}

/**
 * message.incoming: клиент написал или нажал кнопку.
 */
export interface WebhookMessageIncoming {
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string | null;
  /**
   * Клиент диалога; в группе участник, который написал
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Имя события, как поле event оболочки
   */
  event: string;
  /**
   * Входящее сообщение
   */
  message: WebhookIncomingMessage;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
  /**
   * Когда произошло событие, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

/**
 * message.outgoing: любое сообщение клиенту.
 */
export interface WebhookMessageOutgoing {
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string | null;
  /**
   * Клиент диалога; в группе участник, который написал
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Имя события, как поле event оболочки
   */
  event: string;
  /**
   * Исходящее сообщение
   */
  message: WebhookOutgoingMessage;
  /**
   * Кто отправил
   */
  sender: WebhookPerson;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
  /**
   * Статус в момент записи: pending, sent, delivered, read
   */
  status: string | null;
  /**
   * Когда произошло событие, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

export interface WebhookMessageStatus {
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Причина у failed; иначе null
   */
  error: WebhookStatusError | null;
  /**
   * message.status
   */
  event: string;
  /**
   * wamid исходящего: message.id из message.outgoing или ответа отправки
   */
  message_id: string | null;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
  /**
   * sent (отправлено), delivered (доставлено), read (прочитано), failed (ошибка)
   */
  status: string;
}

export interface WebhookMessageTemplate {
  /**
   * Текст шаблона, если сохранён
   */
  body: string | null;
  /**
   * id загруженного файла шапки, если он был
   */
  header_media_id: string | null;
  /**
   * Ссылка на файл шапки шаблона, если он был
   */
  header_media_url: string | null;
  /**
   * Язык шаблона: ru, kk, en
   */
  language: string | null;
  /**
   * Имя шаблона, как в GET /api/v2/external/templates
   */
  name: string | null;
  /**
   * Откуда отправлен, если не из чата: mcp, cliniccards_reminder
   */
  source: string | null;
  /**
   * Значения {{1}}, {{2}} по порядку
   */
  variables: Array<unknown> | null;
}

export interface WebhookNote {
  /**
   * id заметки
   */
  id: string | null;
  /**
   * Текст заметки, клиент его не видит
   */
  text: string;
}

/**
 * conversation.note_added: заметка сотрудника.
 */
export interface WebhookNoteAdded {
  /**
   * Кто оставил заметку
   */
  author: WebhookPerson;
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email
   */
  channel: string | null;
  /**
   * Клиент диалога; в группе участник, который написал
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Имя события, как поле event оболочки
   */
  event: string;
  /**
   * Заметка
   */
  note: WebhookNote;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
  /**
   * Когда произошло событие, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

/**
 * Подписка на события: адрес, события и состояние доставки.
 */
export interface WebhookOut {
  /**
   * Сколько доставок подряд не дошли за все 6 попыток. Обнуляется при успешной доставке и при включении; на 10 вебхук выключается
   */
  consecutive_failures: number;
  /**
   * Когда создан, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  created_at?: string | null;
  /**
   * Ваша подпись к вебхуку, например «CRM: заявки»
   */
  description?: string | null;
  /**
   * События подписки, например ["message.incoming", "deal.stage_changed"]
   */
  event_types: Array<string>;
  /**
   * id вебхука: из ответа POST /webhooks или GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  id: string;
  /**
   * true: события доставляются. false: выключен вами или автоматически после 10 доставок подряд, не дошедших за все попытки. Включить: PATCH /webhooks/{webhook_id} с is_active=true
   */
  is_active: boolean;
  /**
   * Последний провал доставки, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  last_failure_at?: string | null;
  /**
   * Последняя успешная доставка, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  last_success_at?: string | null;
  /**
   * Адрес, куда приходят события, например https://crm.example.kz/hooks/wazzapo
   */
  url: string;
}

export interface WebhookOutgoingMessage {
  /**
   * id сообщения: у WhatsApp wamid; по нему придёт message.status
   */
  id: string | null;
  /**
   * Ссылка на файл; null у текста
   */
  media_url: string | null;
  /**
   * Шаблон WhatsApp, если сообщение шаблонное
   */
  template: WebhookMessageTemplate | null;
  /**
   * Текст или подпись; у шаблона его текст с подставленными значениями
   */
  text: string;
  /**
   * text, image, video, audio, document, location, contact, sticker
   */
  type: string | null;
}

/**
 * Кто сделал действие или сотрудник. type есть у отправителя и автора, у ответственного его нет.
 */
export interface WebhookPerson {
  /**
   * Почта сотрудника
   */
  email: string | null;
  /**
   * id сотрудника, как в GET /api/v2/external/team (там строкой)
   */
  id: number | null;
  /**
   * Имя сотрудника, название сценария или бота
   */
  name: string | null;
  /**
   * manager (сотрудник), workflow (сценарий), chatbot (бот или ИИ-ассистент), broadcast (рассылка), api (ваша программа через API или MCP), contact (клиент), system (служебное)
   */
  type: string | null;
  /**
   * Откуда отправлено: external_api, mcp, amocrm и другие интеграции
   */
  via: string | null;
  /**
   * id сценария у type=workflow
   */
  workflow_id: string | null;
}

export interface WebhookPipelineRef {
  /**
   * id воронки, как в GET /api/v2/external/pipelines
   */
  id: string | null;
  /**
   * Название воронки, например Продажи
   */
  name: string | null;
}

export interface WebhookRetryOut {
  /**
   * true, если на этот раз ваш адрес ответил 2xx
   */
  delivered: boolean;
  /**
   * id повторённой доставки
   */
  delivery_id: string;
}

export interface WebhookSecretOut {
  /**
   * id вебхука: из ответа POST /webhooks или GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  id: string;
  /**
   * Новый секрет подписи, показывается один раз. Старый перестаёт действовать сразу: обновите секрет на своём сервере
   */
  secret: string;
}

export interface WebhookSession {
  /**
   * session.connected или session.disconnected
   */
  event: string;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * Только у session.disconnected: user_disconnected (отключили в кабинете)
   */
  reason: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id
   */
  session_id: string | null;
}

export interface WebhookStage {
  /**
   * id этапа из stages[] в GET /api/v2/external/pipelines
   */
  id: string;
  /**
   * true: этап «Отказ» (сделка проиграна)
   */
  is_lost: boolean;
  /**
   * true: этап «Успешно» (сделка выиграна)
   */
  is_won: boolean;
  /**
   * Название этапа, например «Отправлено КП»
   */
  name: string;
}

export interface WebhookStatusError {
  /**
   * Код ошибки WhatsApp (Meta), например 131047
   */
  code: string;
  /**
   * Подробности от Meta, если есть
   */
  details: string;
  /**
   * Текст ошибки от Meta
   */
  message: string;
}

export interface WebhookTask {
  /**
   * true: на весь день, без времени
   */
  all_day: boolean;
  /**
   * Исполнитель {id, name, email}
   */
  assignee: WebhookPerson | null;
  /**
   * id контакта
   */
  contact_id: string | null;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * Создана, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  created_at: string | null;
  /**
   * Автор {id, name, email}
   */
  created_by: WebhookPerson | null;
  /**
   * id сделки задачи, как deal_id в REST: GET /api/v2/external/deals/{deal_id}; null у задачи без сделки
   */
  deal_id: string | null;
  /**
   * Описание
   */
  description: string;
  /**
   * Срок, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  due_at: string | null;
  /**
   * id задачи, как id в TaskOut: по нему задачу меняют и закрывают через PATCH /api/v2/external/tasks/{task_id}. Отдельного GET /tasks нет: задачи сделки отдаёт GET /api/v2/external/deals/{deal_id}/tasks
   */
  id: string;
  /**
   * low, normal, high
   */
  priority: string | null;
  /**
   * open или done
   */
  status: string | null;
  /**
   * Тип задачи, те же значения, что task_type в REST (TaskCreateIn, TaskOut): call (звонок), meeting (встреча), email (письмо), task (дело) или ключ своего типа вида c_6713d0a1b2c3
   */
  task_type: string | null;
  /**
   * Название задачи
   */
  title: string | null;
  /**
   * Тип задачи, то же значение, что task_type (старое имя поля)
   */
  type: string | null;
}

export interface WebhookTaskCreated {
  /**
   * Канал: whatsapp, telegram, instagram, webchat (чат на сайте), olx, satu, email; null без диалога
   */
  channel: string | null;
  /**
   * Клиент
   */
  contact: WebhookContactRef;
  /**
   * id диалога: тот же id, что в GET /api/v2/external/conversations
   */
  conversation_id: string | null;
  /**
   * id сценария, если действие сделал сценарий; иначе null
   */
  created_by_workflow: string | null;
  /**
   * Имя события
   */
  event: string;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * Подключение (канал) в Wazzapo, например meta_103799815708451: у WhatsApp это meta_ + phone_number_id; null без диалога
   */
  session_id: string | null;
  /**
   * Новая задача
   */
  task: WebhookTask;
  /**
   * Когда произошло, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
}

/**
 * template.status_updated, template.quality_changed, template.category_changed.
 */
export interface WebhookTemplateEvent {
  /**
   * Имя события
   */
  event: string;
  /**
   * category_changed: true, если только предупреждение
   */
  is_warning: boolean | null;
  /**
   * category_changed: стало MARKETING, UTILITY
   */
  new_category: string | null;
  /**
   * quality_changed: стало, в формате Meta GREEN (хорошо), YELLOW (внимание), RED (низкое, шаблон могут приостановить), UNKNOWN. То же в формате REST: quality_score
   */
  new_quality: string | null;
  /**
   * id номера WhatsApp, как phone_number_id в GET /api/v2/external/phone-numbers; null у других каналов
   */
  phone_number_id: string | null;
  /**
   * category_changed: было MARKETING, UTILITY
   */
  previous_category: string | null;
  /**
   * quality_changed: было, в формате Meta GREEN, YELLOW, RED, UNKNOWN. То же в формате REST: previous_quality_score
   */
  previous_quality: string | null;
  /**
   * quality_changed: previous_quality в формате REST (TemplateOut.quality_score): GREEN = HIGH, YELLOW = MEDIUM, RED = LOW, остальное UNKNOWN
   */
  previous_quality_score: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN" | null;
  /**
   * quality_changed: new_quality в формате REST, как quality_score в GET /api/v2/external/templates: GREEN = HIGH, YELLOW = MEDIUM, RED = LOW, остальное UNKNOWN
   */
  quality_score: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN" | null;
  /**
   * status_updated: причина отказа, например INVALID_FORMAT
   */
  reason: string | null;
  /**
   * status_updated: APPROVED, REJECTED, PAUSED, DISABLED
   */
  status: string | null;
  /**
   * Шаблон
   */
  template: WebhookTemplateRef;
  /**
   * Когда пришло уведомление Meta, UTC в формате ISO 8601, например 2026-10-18T09:15:02Z
   */
  timestamp: string | null;
  /**
   * id бизнес-аккаунта WhatsApp (WABA) шаблона
   */
  waba_id: string | null;
}

export interface WebhookTemplateRef {
  /**
   * id шаблона в Meta, как id в GET /api/v2/external/templates
   */
  id: string | null;
  /**
   * Язык шаблона: ru, kk, en
   */
  language: string | null;
  /**
   * Имя шаблона, например invoice_ready
   */
  name: string | null;
  /**
   * id шаблона в Meta, то же значение, что id: имя как template_id в GET /api/v2/external/templates и в путях /templates/{template_id}
   */
  template_id: string | null;
}

/**
 * Тело data тестового события test из POST /api/v2/external/webhooks/{webhook_id}/test.
 */
export interface WebhookTestEvent {
  /**
   * Всегда «This is a test webhook event from Wazzapo.»: проверка адреса и подписи, обрабатывать как событие не нужно
   */
  message: string;
}

export interface WebhookTestOut {
  /**
   * true, если ваш адрес ответил кодом 2xx за 10 секунд
   */
  delivered: boolean;
  /**
   * Почему не доставлено: HTTP 500, таймаут, не удалось соединиться; null при успехе
   */
  error?: string | null;
  /**
   * HTTP-код ответа вашего адреса, например 200; null, если ответа не было
   */
  response_status?: number | null;
  /**
   * Сколько миллисекунд ждали ответ, например 184
   */
  response_time_ms?: number | null;
}

/**
 * Меняются только переданные поля.
 */
export interface WebhookUpdateIn {
  /**
   * Подпись для себя, чтобы отличать приёмники, например «CRM: заявки». До 100 символов
   */
  description?: string | null;
  /**
   * Новый список событий целиком: заменяет старый. Чтобы добавить событие, передайте старые вместе с новым. На какие события подписаться, хотя бы одно; список с описаниями: GET /webhook-event-types. Сейчас: message.incoming, message.outgoing, message.status, conversation.assigned, conversation.status_changed, conversation.note_added, session.connected, session.disconnected, deal.stage_changed, deal.closed, deal.created, deal.changed, contact.created, contact.updated, template.status_updated, template.quality_changed, template.category_changed, invoice.status_changed, task.created
   */
  event_types?: Array<"message.incoming" | "message.outgoing" | "message.status" | "conversation.assigned" | "conversation.status_changed" | "conversation.note_added" | "session.connected" | "session.disconnected" | "deal.stage_changed" | "deal.closed" | "deal.created" | "deal.changed" | "contact.created" | "contact.updated" | "template.status_updated" | "template.quality_changed" | "template.category_changed" | "invoice.status_changed" | "task.created"> | null;
  /**
   * false выключает доставку: события за это время не копятся и не придут потом. true включает снова и обнуляет consecutive_failures: так включают вебхук, выключенный автоматически после 10 провалов подряд
   */
  is_active?: boolean | null;
  /**
   * Новый адрес. Адрес вашего сервера, куда Wazzapo отправляет события запросом POST: только https:// и только публичный адрес (localhost и внутренние сети нельзя), до 2048 символов. Пример: https://crm.example.kz/hooks/wazzapo
   */
  url?: string | null;
}

/**
 * Созданный вебхук вместе с секретом подписи: секрет больше нигде не показывается.
 */
export interface WebhookWithSecretOut {
  /**
   * Сколько доставок подряд не дошли за все 6 попыток. Обнуляется при успешной доставке и при включении; на 10 вебхук выключается
   */
  consecutive_failures: number;
  /**
   * Когда создан, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  created_at?: string | null;
  /**
   * Ваша подпись к вебхуку, например «CRM: заявки»
   */
  description?: string | null;
  /**
   * События подписки, например ["message.incoming", "deal.stage_changed"]
   */
  event_types: Array<string>;
  /**
   * id вебхука: из ответа POST /webhooks или GET /webhooks, например 6712f0c4a1b2c3d4e5f60719
   */
  id: string;
  /**
   * true: события доставляются. false: выключен вами или автоматически после 10 доставок подряд, не дошедших за все попытки. Включить: PATCH /webhooks/{webhook_id} с is_active=true
   */
  is_active: boolean;
  /**
   * Последний провал доставки, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  last_failure_at?: string | null;
  /**
   * Последняя успешная доставка, ISO 8601 UTC, например 2026-10-18T09:15:00+00:00
   */
  last_success_at?: string | null;
  /**
   * Секрет подписи HMAC-SHA256, вида whsec_… Показывается только в этом ответе: сохраните его у себя. Им проверяйте заголовок X-Wazzapo-Signature-V2. Потеряли: POST /webhooks/{webhook_id}/rotate-secret выдаст новый
   */
  secret: string;
  /**
   * Адрес, куда приходят события, например https://crm.example.kz/hooks/wazzapo
   */
  url: string;
}
