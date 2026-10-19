/** Общие типы ядра: ими пользуются сгенерированные ресурсы (src/generated/resources.ts). */

/** Настройки одного вызова. */
export interface RequestOptions {
  /**
   * Свой Idempotency-Key для POST. Без него SDK создаёт ключ сам, один на все повторы:
   * повтор после сбоя сети не отправит сообщение второй раз.
   */
  idempotencyKey?: string;
  /** Таймаут этого вызова в миллисекундах, вместо timeout клиента. */
  timeout?: number;
  /** Сколько раз повторять этот вызов при 429, 5xx и сбое сети, вместо maxRetries клиента. */
  maxRetries?: number;
  /** Отмена запроса. */
  signal?: AbortSignal;
  /** Дополнительные заголовки. */
  headers?: Record<string, string>;
}

export type QueryValue = string | number | boolean | null | undefined;

/** Описание запроса, который строит сгенерированный метод. */
export interface RequestSpec {
  method: string;
  /** Путь без /api/v2/external, например /messages/send. */
  path: string;
  query?: object;
  body?: unknown;
  /** Тело отправить как multipart/form-data (загрузка файла). */
  multipart?: boolean;
  /** Ответ это файл: вернуть ArrayBuffer. */
  binary?: boolean;
  options?: RequestOptions;
}

/** То, через что ресурсы делают запросы: клиент Wazzapo. */
export interface Transport {
  request<T>(spec: RequestSpec): Promise<T>;
}
