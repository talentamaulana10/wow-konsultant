const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");
const { PaymentTrxMapper } = require("../mapper/PaymentTrxMapper");
module.exports = {
  create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const newOrder = new Order({
          id: data.customId ? data.customId : uuidv4(),
          paymentId: data.paymentId,
          paymentType: data.paymentType,
          totalOrder: data.totalOrder,
        });
        const response = await newOrder.save();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  changePaymentMethod(data, id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.paymentType === "ew") {
          const createNewPayment = await PaymentTrxMapper.get(
            data.paymentType
          ).createPayment(data.paymentDto, data.ewChannelCode);
          const order = await Order.findOneAndUpdate(
            { id },
            {
              $set: {
                id:
                  data.ewChannelCode !== "ID_OVO"
                    ? createNewPayment.reference_id
                    : id,
                paymentId: createNewPayment.id,
                paymentType: data.paymentType,
                totalOrder: data.totalOrder,
              },
            }
          );
          resolve({ orderResp: order, xenditResp: createNewPayment });
          return;
        }
        const createNewPayment = await PaymentTrxMapper.get(
          data.paymentType
        ).createPayment(data.paymentDto);
        const order = await Order.findOneAndUpdate(
          { id },
          {
            $set: {
              id: id,
              paymentId: createNewPayment.id,
              paymentType: data.paymentType,
              totalOrder: data.totalOrder,
            },
          }
        );
        resolve({ orderResp: order, xenditResp: createNewPayment });
      } catch (error) {
        console.log(error);
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
