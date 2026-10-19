// Заявка с сайта в сделку: форма шлёт POST name, phone, comment, пример создаёт сделку
// и отправляет клиенту приветственный шаблон WhatsApp.
// Запуск: WAZZAPO_API_KEY=... WAZZAPO_PHONE_NUMBER_ID=... WAZZAPO_TEMPLATE_NAME=... node lead-to-deal.mjs
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { ConflictError, Wazzapo, WazzapoError } from "@wazzapo/sdk";

const client = new Wazzapo({ baseUrl: process.env.WAZZAPO_BASE_URL });
const env = (name, fallback = "") => process.env[name] || fallback;

// Сделка без дублей: повтор той же заявки (двойной клик, перезагрузка страницы) вернёт уже созданную
async function dealFor(lead) {
  const pipelineId = env("WAZZAPO_PIPELINE_ID") || (await client.pipelines.list()).data[0].id;
  // Свой id заявки из формы или CRM; без него считаем по телефону и тексту, чтобы повтор совпал
  const externalId = lead.lead_id || "site-" + createHash("sha1").update(`${lead.phone}|${lead.comment}`).digest("hex");
  try {
    const deal = await client.deals.create({
      pipeline_id: pipelineId,
      title: "Заявка с сайта: " + (lead.name || lead.phone),
      // Контакт по телефону: Wazzapo найдёт его или создаст
      contact: { phone: lead.phone, name: lead.name || null },
      external_id: externalId,
    });
    return { deal, created: true };
  } catch (error) {
    if (!(error instanceof ConflictError) || error.code !== "deal_exists") throw error;
    return { deal: await client.deals.get(String(error.details.deal_id)), created: false };
  }
}

function greet(lead) {
  const template = { name: env("WAZZAPO_TEMPLATE_NAME"), language: { code: env("WAZZAPO_TEMPLATE_LANG", "ru") } };
  // Шаблон с {{1}} в тексте: подставляем имя клиента
  if (env("WAZZAPO_TEMPLATE_NAME_PARAM") === "1") {
    template.components = [{ type: "body", parameters: [{ type: "text", text: lead.name || "клиент" }] }];
  }
  return client.messages.send({ phone_number_id: env("WAZZAPO_PHONE_NUMBER_ID"), to: lead.phone, type: "template", template });
}

async function readLead(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  const input = (req.headers["content-type"] ?? "").includes("json") ? JSON.parse(raw || "{}") : Object.fromEntries(new URLSearchParams(raw));
  return {
    name: String(input.name ?? "").trim(),
    phone: String(input.phone ?? "").replace(/\D+/g, ""),
    comment: String(input.comment ?? "").trim(),
    lead_id: String(input.lead_id ?? "").trim(),
  };
}

const send = (res, status, body) => res.writeHead(status, { "Content-Type": "application/json" }).end(JSON.stringify(body));

createServer(async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Нужен POST с полями name, phone, comment" });
  const lead = await readLead(req);
  if (lead.phone.length < 10) return send(res, 422, { error: "Укажите телефон" });
  try {
    const { deal, created } = await dealFor(lead);
    const out = { ok: true, deal_id: deal.id, deal_number: deal.number, duplicate: !created };
    // Приветствие только новой заявке: повтор формы не шлёт клиенту второй шаблон
    if (created && env("WAZZAPO_TEMPLATE_NAME")) out.message_id = (await greet(lead)).message_id;
    send(res, 200, out);
  } catch (error) {
    if (!(error instanceof WazzapoError)) throw error;
    send(res, 502, { ok: false, code: error.code, message: error.message });
  }
}).listen(Number(process.env.PORT ?? 8081), () => console.log("Приём заявок на порту", process.env.PORT ?? 8081));
