/**
 * Ошибки SDK. Любой неуспешный ответ API v2 приходит в одном виде
 * `{"success": false, "error": {code, message, details}, "request_id"}` и превращается в WazzapoError
 * или его наследника: ловите по классу или проверяйте `error.code`.
 */

/** Поле запроса, не прошедшее проверку (details у VALIDATION_ERROR). */
export interface FieldError {
  field: string;
  message: string;
}

export type ErrorDetails = Record<string, unknown> | FieldError[] | null;

export interface WazzapoErrorInit {
  status: number;
  code: string;
  message: string;
  details?: ErrorDetails;
  requestId?: string | null;
  headers?: Headers;
  cause?: unknown;
}

/** Ответ API с ошибкой (или сбой без ответа, тогда status 0). */
export class WazzapoError extends Error {
  /** HTTP-статус; 0, если ответа не было. */
  readonly status: number;
  /** Машинный код: на него ориентируйтесь в коде, например outside_24h_window. */
  readonly code: string;
  /** Подробности: у VALIDATION_ERROR список полей, у остальных объект. */
  readonly details: ErrorDetails;
  /** id запроса: сообщите его в поддержку. */
  readonly requestId: string | null;
  /** Заголовки ответа. */
  readonly headers: Headers;

  constructor(init: WazzapoErrorInit) {
    super(init.message, init.cause === undefined ? undefined : { cause: init.cause });
    this.name = new.target.name;
    this.status = init.status;
    this.code = init.code;
    this.details = init.details ?? null;
    this.requestId = init.requestId ?? null;
    this.headers = init.headers ?? new Headers();
  }
}

/** 400: неверный запрос. */
export class BadRequestError extends WazzapoError {}
/** 401: нет ключа, ключ неверный или отозван. */
export class AuthenticationError extends WazzapoError {}
/** 402: тариф Wazzapo не оплачен или Meta не может списать оплату. */
export class PaymentRequiredError extends WazzapoError {}
/** 403: у ключа нет права, IP не разрешён или исчерпан лимит тарифа. */
export class PermissionDeniedError extends WazzapoError {}
/** details у USAGE_LIMIT_EXCEEDED: что за лимит, сколько потрачено и где перейти на тариф выше. */
export type UsageLimitDetails = {
  /** Какой лимит исчерпан, например messages. */
  param?: string | null;
  /** Сколько уже потрачено за месяц. */
  current?: number | null;
  /** Лимит тарифа. */
  limit?: number | null;
  /** Текущий тариф. */
  plan_id?: string | null;
  /** Тариф, на котором лимит больше. */
  upgrade_plan?: string | null;
  /** Страница выбора тарифа, например /pricing. */
  upgrade_url?: string | null;
};

/** 403 USAGE_LIMIT_EXCEEDED: исчерпан лимит тарифа; в details current, limit, upgrade_url. */
export class UsageLimitError extends PermissionDeniedError {
  declare readonly details: UsageLimitDetails | null;
}
/** 404: объекта нет в этом аккаунте. */
export class NotFoundError extends WazzapoError {}
/** 409: объект уже есть или запрос с этим Idempotency-Key ещё выполняется. */
export class ConflictError extends WazzapoError {}
/** 422: запрос не прошёл проверку или Meta не приняла параметры. */
export class UnprocessableEntityError extends WazzapoError {}
/** 422 VALIDATION_ERROR: поля с ошибками в fields. */
export class ValidationError extends UnprocessableEntityError {
  /** Поля, не прошедшие проверку. */
  get fields(): FieldError[] {
    return Array.isArray(this.details) ? this.details : [];
  }
}
/** 422 outside_24h_window: клиент писал больше 24 часов назад, отправьте шаблон. */
export class OutsideWindowError extends UnprocessableEntityError {}
/** 422 template_*: шаблон не найден, не одобрен, приостановлен или отключён. */
export class TemplateError extends UnprocessableEntityError {}
/** 429: слишком много запросов. SDK уже повторил запрос maxRetries раз. */
export class RateLimitError extends WazzapoError {
  /** Через сколько секунд можно повторить (заголовок Retry-After), если сервер его прислал. */
  get retryAfter(): number | null {
    return parseRetryAfter(this.headers.get("retry-after"));
  }
}
/** 5xx: сбой Wazzapo или Meta. SDK уже повторил запрос maxRetries раз. */
export class ServerError extends WazzapoError {}
/** Ответа нет: сбой сети, DNS, соединение оборвано. */
export class ConnectionError extends WazzapoError {}
/** Ответа нет за timeout миллисекунд. */
export class TimeoutError extends ConnectionError {}

type ErrorClass = new (init: WazzapoErrorInit) => WazzapoError;

const BY_CODE: Record<string, ErrorClass> = {
  USAGE_LIMIT_EXCEEDED: UsageLimitError,
  VALIDATION_ERROR: ValidationError,
  outside_24h_window: OutsideWindowError,
  template_not_found: TemplateError,
  template_not_approved: TemplateError,
  template_paused: TemplateError,
  template_disabled: TemplateError,
};

const BY_STATUS: Record<number, ErrorClass> = {
  400: BadRequestError,
  401: AuthenticationError,
  402: PaymentRequiredError,
  403: PermissionDeniedError,
  404: NotFoundError,
  409: ConflictError,
  422: UnprocessableEntityError,
  429: RateLimitError,
};

/** Код по статусу, когда тело не в формате API (например, ответ прокси). */
const STATUS_CODE: Record<number, string> = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  405: "METHOD_NOT_ALLOWED",
  409: "CONFLICT",
  413: "PAYLOAD_TOO_LARGE",
  415: "UNSUPPORTED_MEDIA_TYPE",
  422: "VALIDATION_ERROR",
  429: "RATE_LIMITED",
  500: "INTERNAL_ERROR",
  501: "NOT_IMPLEMENTED",
  502: "BAD_GATEWAY",
  503: "SERVICE_UNAVAILABLE",
  504: "GATEWAY_TIMEOUT",
};

/** Секунды из Retry-After: число или HTTP-дата. */
export function parseRetryAfter(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds);
  const date = Date.parse(value);
  return Number.isNaN(date) ? null : Math.max(0, (date - Date.now()) / 1000);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function details(value: unknown): ErrorDetails {
  if (Array.isArray(value)) {
    return value.filter(isRecord).map((item) => ({
      field: String(item["field"] ?? ""),
      message: String(item["message"] ?? ""),
    }));
  }
  return isRecord(value) ? value : null;
}

/** Ошибка из ответа: тело в формате API или любое другое (тогда код по статусу). */
export function errorFromResponse(status: number, headers: Headers, body: unknown): WazzapoError {
  const error = isRecord(body) && isRecord(body["error"]) ? body["error"] : null;
  const code =
    error && typeof error["code"] === "string"
      ? error["code"]
      : STATUS_CODE[status] ?? `HTTP_${status}`;
  const message =
    error && typeof error["message"] === "string"
      ? error["message"]
      : typeof body === "string" && body.trim() !== ""
        ? body.slice(0, 500)
        : `HTTP ${status}`;
  const requestId =
    (isRecord(body) && typeof body["request_id"] === "string" ? body["request_id"] : null) ??
    headers.get("x-request-id");
  const Class = BY_CODE[code] ?? BY_STATUS[status] ?? (status >= 500 ? ServerError : WazzapoError);
  return new Class({
    status,
    code,
    message,
    details: error ? details(error["details"]) : null,
    requestId,
    headers,
  });
}
