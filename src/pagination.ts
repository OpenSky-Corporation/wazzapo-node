/** Страница списка API v2: {data, next_cursor, has_more}. */
export interface Page<T> {
  data: T[];
  next_cursor?: string | null;
  has_more?: boolean;
}

/**
 * Обходит все страницы: запрашивает следующую по next_cursor, пока has_more.
 * Следующая страница запрашивается только когда цикл дошёл до конца текущей.
 */
export function paginate<T>(
  fetchPage: (cursor: string | undefined) => Promise<Page<T>>,
): AsyncIterable<T> {
  return {
    async *[Symbol.asyncIterator]() {
      let cursor: string | undefined;
      for (;;) {
        const page = await fetchPage(cursor);
        yield* page.data;
        const next = page.next_cursor;
        if (!page.has_more || !next || next === cursor) return;
        cursor = next;
      }
    },
  };
}
