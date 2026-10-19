// Приёмник всех событий Wazzapo: проверяет подпись, сразу отвечает 200 и разбирает событие по типу.
// Запуск: WAZZAPO_WEBHOOK_SECRET=... node webhooks-receiver.mjs
import { createServer } from "node:http";
import { DELIVERY_ID_HEADER, Webhooks, WebhookVerificationError } from "@wazzapo/sdk/webhooks";

const secret = process.env.WAZZAPO_WEBHOOK_SECRET ?? "";

function describe(event) {
  const d = event.data;
  switch (event.event) {
    case "deal.stage_changed":
      return `Сделка ${d.deal?.number ?? d.deal?.id}: этап «${d.from_stage?.name}» → «${d.to_stage?.name}»`;
    case "message.status":
      return `Сообщение ${d.message_id}: ${d.status}`;
    case "message.incoming":
      return `Новое сообщение от ${d.message?.from}: ${d.message?.text ?? ""}`;
    case "deal.created":
      return `Новая сделка ${d.deal?.number ?? d.deal?.id}`;
    default:
      return `Событие ${event.event}`;
  }
}

createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let event;
  try {
    event = Webhooks.verify(Buffer.concat(chunks), req.headers, secret);
  } catch (error) {
    if (error instanceof WebhookVerificationError) return res.writeHead(400).end(error.message);
    throw error;
  }
  // Отвечаем сразу: долгая обработка до ответа приводит к повторной доставке
  res.writeHead(200, { "Content-Type": "application/json" }).end('{"ok":true}');
  setImmediate(() => console.log(`[wazzapo ${req.headers[DELIVERY_ID_HEADER.toLowerCase()] ?? "-"}]`, describe(event)));
}).listen(Number(process.env.PORT ?? 8082), () => console.log("Приёмник вебхуков на порту", process.env.PORT ?? 8082));
