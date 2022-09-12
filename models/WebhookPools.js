const mongoose = require("mongoose");
const schema = mongoose.Schema;

const WebhookPoolSchema = new schema({
  id: {
    type: String,
    required: true,
  },
  callbackDto: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = WebhookPool = mongoose.model(
  "webhook_pool",
  WebhookPoolSchema
);
