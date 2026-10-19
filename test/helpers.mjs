// Подставной fetch: отдаёт заготовленные ответы по очереди и запоминает запросы
export function mockFetch(responses) {
  const calls = [];
  const queue = [...responses];
  const fetch = async (url, init) => {
    calls.push({ url: String(url), init, headers: init.headers });
    const next = queue.shift();
    if (!next) throw new Error("нет заготовленного ответа");
    if (next instanceof Error) throw next;
    return typeof next === "function" ? next(url, init) : next;
  };
  return { fetch, calls };
}

export function json(status, body, headers = {}) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

export const noSleep = async () => {};
export const KEY = "wz_live_0123456789abcdef";
