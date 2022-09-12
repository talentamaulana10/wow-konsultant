const xendit = require("xendit-node");
const { xendit_secret } = require("../config/configration");
const xendit_instance = new xendit({
  secretKey: xendit_secret,
});
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createDynamicQRIS(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { QrCode } = xendit_instance;
        const qrcodeSpecificOptions = {};
        const q = new QrCode(qrcodeSpecificOptions);
        const xendit_resp = await q.createCode({
          externalID: uuidv4(),
          amount: data.amount,
          type: "DYNAMIC",
          callbackURL: "https://yourwebsite.com/callback",
        });
        resolve(xendit_resp);
      } catch (error) {
        reject(error);
      }
    });
  },
};
