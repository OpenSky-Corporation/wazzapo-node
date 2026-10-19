// Сквозная проверка на тестовом ключе wz_test_: ничего не отправляет и не меняет.
// Запуск: WAZZAPO_TEST_API_KEY=wz_test_... npm test
import assert from "node:assert/strict";
import { test } from "node:test";

import { Wazzapo } from "../dist/esm/index.js";

const key = process.env.WAZZAPO_TEST_API_KEY;
const skip = !key && "нет WAZZAPO_TEST_API_KEY";

test("тестовый ключ: номера, отправка текста, контакт", { skip }, async () => {
  const client = new Wazzapo({ apiKey: key, baseUrl: process.env.WAZZAPO_BASE_URL });
  assert.equal(client.isTest, true);
  const numbers = await client.phoneNumbers.list();
  assert.ok(Array.isArray(numbers.data));
  const phone = numbers.data[0];
  if (phone) {
    const sent = await client.messages.send({
      phone_number_id: phone.phone_number_id,
      to: "77070000000",
      type: "text",
      text: { body: "Проверка SDK" },
    });
    assert.match(String(sent.provider_message_id ?? sent.message_id), /SANDBOX|sandbox/i);
  }
  const contact = await client.contacts.create({ phone: "77070000001", name: "Проверка SDK" });
  assert.ok(contact.id);
});
