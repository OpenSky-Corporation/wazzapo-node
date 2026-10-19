// Сборка CommonJS: require работает и отдаёт те же классы
const assert = require("node:assert/strict");
const { test } = require("node:test");

test("require('@wazzapo/sdk') и require('@wazzapo/sdk/webhooks')", () => {
  const { Wazzapo, NotFoundError } = require("../dist/cjs/index.js");
  const { Webhooks } = require("../dist/cjs/webhooks.js");
  assert.equal(typeof new Wazzapo({ apiKey: "wz_test_x" }).messages.send, "function");
  assert.equal(typeof NotFoundError, "function");
  assert.equal(typeof Webhooks.verify, "function");
});
