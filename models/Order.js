const mongoose = require("mongoose");
const schema = mongoose.Schema;

const OrderSchema = new schema({
  id: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  paymentType : {
    type : String,
    required : true
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
