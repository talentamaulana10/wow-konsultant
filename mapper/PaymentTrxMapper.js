const VirtualAccServices = require("../services/VirtualAccountServices");
const EWalletServices = require("../services/EWalletServices");
const RetailOutletServices = require("../services/RetailOutletServices");
const QrisServices = require("../services/QrisService");

const PaymentTrxMapper = new Map([
  [
    "va",
    {
      createPayment: (payload) => {
        VirtualAccServices.create(payload);
      },
      fetchDetailTrx: (payload) => {
        return VirtualAccServices.getOne(payload);
      },
    },
  ],
  [
    "ew",
    {
      createPayment: (payload, type) => {
        if (type === "ID_OVO") {
          return EWalletServices.createOtpOVO(payload);
        }
        return EWalletServices.createOtp(payload);
      },
      fetchDetailTrx: (payload) => {
        return EWalletServices.getOne(payload);
      },
    },
  ],
  [
    "ro",
    {
      createPayment: (payload) => {
        RetailOutletServices.create(payload);
      },
      fetchDetailTrx: (payload) => {
        return RetailOutletServices.getOne(payload);
      },
    },
  ],
  [
    "qris",
    {
      createPayment: (payload) => {
        QrisServices.create(payload);
      },
      fetchDetailTrx: (payload) => {
        return QrisServices.getOne(payload);
      },
    },
  ],
]);

module.exports = {
  PaymentTrxMapper,
};
