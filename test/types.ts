// Проверка типов (tsc --noEmit): так SDK выглядит для разработчика в редакторе
import { Wazzapo, type SendMessageIn, type WebhookEvent } from "../src/index.js";
import { Webhooks } from "../src/webhooks.js";

async function example(client: Wazzapo): Promise<void> {
  const message: SendMessageIn = {
    phone_number_id: "123",
    to: "77071234567",
    type: "template",
    template: { name: "zapis_napominanie", language: { code: "ru" } },
  };
  const sent = await client.messages.send(message, { idempotencyKey: "order-1" });
  const id: string = sent.message_id;
  void id;
  for await (const deal of client.deals.listAll({ pipeline_id: "p1" })) {
    const amount: number | null | undefined = deal.amount;
    void amount;
  }
  const removed: null = await client.contacts.delete("c1");
  void removed;
  const file: ArrayBuffer = await client.media.download("m1", { phone_number_id: "123" });
  void file;
  const templates = await client.templates.list({ phone_number_id: "123", status: "APPROVED" });
  void templates.data;
}

function onWebhook(raw: string, headers: Record<string, string>): void {
  const event: WebhookEvent = Webhooks.verify(raw, headers, "secret");
  if (event.event === "deal.stage_changed") {
    const stage: string | undefined = event.data.to_stage?.name;
    void stage;
  }
}

void example;
void onWebhook;

// Примеры из README должны компилироваться
async function readme(client: Wazzapo, phoneNumberId: string, conversationId: string): Promise<void> {
  await client.deals.create(
    { pipeline_id: "p1", contact: { phone: "77071234567" }, external_id: "order-4521" },
    { idempotencyKey: "order-4521" },
  );
  for await (const contact of client.contacts.listAll({ tag: "vip" })) void [contact.name, contact.phone];
  for await (const message of client.conversations.listMessagesAll(conversationId)) void [message.direction, message.text];
  const file = new File([new Uint8Array([1])], "menu.jpg", { type: "image/jpeg" });
  const { media_id } = await client.media.upload({ file }, { phone_number_id: phoneNumberId });
  await client.messages.send({ phone_number_id: phoneNumberId, to: "77071234567", type: "image", image: { id: media_id } });
  const webhook = await client.webhooks.create({ url: "https://example.kz/wazzapo", event_types: ["message.incoming"] });
  void webhook.secret;
  await client.webhooks.test(webhook.id);
  const event = Webhooks.verify("{}", {}, "s");
  if (event.event === "message.incoming") void [event.data.contact.phone, event.data.message.text];
}
void readme;

// Фильтры-перечисления литералами: опечатка "APPROVD" не компилируется
import type { TemplatesListQuery, UsageLimitError } from "../src/index.js";
type TemplateStatus = NonNullable<TemplatesListQuery["status"]>;
const statusIsLiteral: string extends TemplateStatus ? false : true = true;
const approved: TemplateStatus = "APPROVED";
void [statusIsLiteral, approved];

// details лимита читаются без приведения типов
function usage(error: UsageLimitError): string {
  const limit: number | null | undefined = error.details?.limit;
  const url: string | null | undefined = error.details?.upgrade_url;
  return `${limit ?? "?"} ${url ?? ""}`;
}
void usage;

// Первое сообщение из README: компилируется и с noUncheckedIndexedAccess
async function firstMessage(client: Wazzapo): Promise<void> {
  const { data: numbers } = await client.phoneNumbers.list();
  const whatsapp = numbers.find((n) => n.provider_type === "meta_cloud" && n.status === "connected");
  if (!whatsapp) throw new Error("Нет подключённого номера WhatsApp");
  const phoneNumberId = whatsapp.phone_number_id;
  await client.messages.send({ phone_number_id: phoneNumberId, to: "77071234567", type: "text", text: { body: "Привет" } });
}
void firstMessage;
