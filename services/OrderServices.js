const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");
const { PaymentTrxMapper } = require("../mapper/PaymentTrxMapper");
module.exports = {
  create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const newOrder = new Order({
          id: uuidv4(),
          paymentId: data.paymentId,
          paymentType: data.paymentType,
        });
        const response = await newOrder.save();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = Order.findOne({
          id,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  paymentTrxDetail({ paymentType, paymentId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await PaymentTrxMapper.get(paymentType).fetchDetailTrx(
          paymentId
        );
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  },
};
