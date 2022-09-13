const VirtualAccServices = require("../services/VirtualAccountServices");
const EWalletServices = require("../services/EWalletServices");
const RetailOutletServices = require("../services/RetailOutletServices");
const QrisServices = require("../services/QrisService");

const PaymentTrxMapper = new Map([
  [
    "va",
    {
      fetchDetailTrx: (payload) => {
        return VirtualAccServices.getOne(payload);
      },
    },
  ],
  [
    "ew",
    {
      fetchDetailTrx: (payload) => {
        return EWalletServices.getOne(payload);
      },
    },
  ],
  [
    "ro",
    {
      fetchDetailTrx: (payload) => {
        return RetailOutletServices.getOne(payload);
      },
    },
  ],
  [
    "qris",
    {
      fetchDetailTrx: (payload) => {
        return QrisServices.getOne(payload);
      },
    },
  ],
]);

module.exports = {
  PaymentTrxMapper,
};
