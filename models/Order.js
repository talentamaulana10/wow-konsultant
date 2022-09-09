const mongoose = require("mongoose");
const schema = mongoose.Schema;

const OrderSchema = new schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
