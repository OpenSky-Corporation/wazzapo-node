// Бот с кнопками: на входящее сообщение отвечает тремя кнопками, на нажатие кнопки отвечает текстом.
// Запуск: WAZZAPO_API_KEY=... WAZZAPO_WEBHOOK_SECRET=... node bot-buttons.mjs
// Адрес http(s)://ваш-сервер:8080/ укажите вебхуком на событие message.incoming.
import { createServer } from "node:http";
import { Wazzapo, WazzapoError } from "@wazzapo/sdk";
import { DELIVERY_ID_HEADER, Webhooks, WebhookVerificationError } from "@wazzapo/sdk/webhooks";

const client = new Wazzapo({ baseUrl: process.env.WAZZAPO_BASE_URL });
const secret = process.env.WAZZAPO_WEBHOOK_SECRET ?? "";
const ANSWERS = {
  prices: "Стрижка 5 000 ₸, окрашивание от 15 000 ₸. Записаться можно кнопкой «Записаться».",
  book: "Отлично! Напишите удобный день и время, администратор подтвердит запись.",
  manager: "Позвали администратора, он ответит в этом чате в течение 10 минут.",
};
// Повторы одной доставки: в памяти процесса; в работе храните в Redis или базе
const seen = new Set();

function reply(data) {
  const { message } = data;
  const base = { phone_number_id: data.phone_number_id, to: message.from };
  const pressed = message.interactive_reply_id;
  if (pressed && ANSWERS[pressed]) {
    return client.messages.send({ ...base, type: "text", text: { body: ANSWERS[pressed] } });
  }
  return client.messages.send({
    ...base,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: `Здравствуйте${data.contact?.name ? ", " + data.contact.name : ""}! Чем помочь?` },
      action: {
        buttons: [
          { type: "reply", reply: { id: "prices", title: "Цены" } },
          { type: "reply", reply: { id: "book", title: "Записаться" } },
          { type: "reply", reply: { id: "manager", title: "Администратор" } },
        ],
      },
    },
  });
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" }).end(JSON.stringify(body));
}

createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);
  let event;
  try {
    event = Webhooks.verify(body, req.headers, secret);
  } catch (error) {
    if (error instanceof WebhookVerificationError) return send(res, 400, { error: error.message });
    throw error;
  }
  const deliveryId = req.headers[DELIVERY_ID_HEADER.toLowerCase()];
  if (deliveryId && seen.has(deliveryId)) return send(res, 200, { ok: true, duplicate: true });
  if (deliveryId) seen.add(deliveryId);
  const { data } = event;
  // Только WhatsApp: у Telegram и чата на сайте свои правила кнопок
  if (event.event !== "message.incoming" || (data.channel ?? "whatsapp") !== "whatsapp") {
    return send(res, 200, { ok: true, skipped: true });
  }
  try {
    const sent = await reply(data);
    send(res, 200, { ok: true, message_id: sent.message_id });
  } catch (error) {
    if (!(error instanceof WazzapoError)) throw error;
    // 200, чтобы Wazzapo не повторял доставку: ошибка отправки повтором вебхука не исправится
    console.error("Wazzapo:", error.code, error.message);
    send(res, 200, { ok: false, code: error.code });
  }
}).listen(Number(process.env.PORT ?? 8080), () => console.log("Бот слушает порт", process.env.PORT ?? 8080));
