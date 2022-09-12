const xendit = require("xendit-node");
const { xendit_secret } = require("../config/configration");
const xendit_instance = new xendit({
  secretKey: xendit_secret,
});
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createOtpOVO(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { EWallet } = xendit_instance;
        const eWalletSpecificOpt = {};
        const ew = new EWallet(eWalletSpecificOpt);
        const xendit_resp = await ew.createEWalletCharge({
          referenceID: uuidv4(),
          currency: "IDR",
          amount: data.amount,
          checkoutMethod: "ONE_TIME_PAYMENT",
          channelCode: "ID_OVO",
          channelProperties: {
            mobileNumber: data.mobileNumber,
          },
        });
        resolve(xendit_resp);
      } catch (error) {
        reject(error);
      }
    });
  },
  async createOtp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { EWallet } = xendit_instance;
        const eWalletSpecificOpt = {};
        const ew = new EWallet(eWalletSpecificOpt);
        const xendit_resp = await ew.createEWalletCharge({
          referenceID: uuidv4(),
          currency: "IDR",
          amount: data.amount,
          checkoutMethod: "ONE_TIME_PAYMENT",
          channelCode: data.channelCode,
          channelProperties: {
            successRedirectURL: "https://www.google.com",
          },
        });
        resolve(xendit_resp);
      } catch (error) {
        reject(error);
      }
    });
  },
};
