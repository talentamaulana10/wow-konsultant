const mongoose = require("mongoose");
const schema = mongoose.Schema;

const WebhookStorageSchema = new schema({
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

module.exports = WebhookStorage = mongoose.model(
  "webhook_storage",
  WebhookStorageSchema
);
