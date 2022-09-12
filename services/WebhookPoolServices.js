const WebhookPool = require("../models/WebhookPools");
module.exports = {
  async createEWalletOVO(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const newWP = new WebhookPool({
          callbackDto: JSON.stringify(data.callbackDto),
          id: data.id,
          type: "EW_OVO",
        });
        const response = await newWP.save();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  async createEWallet(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const newWP = new WebhookPool({
          callbackDto: JSON.stringify(data.callbackDto),
          id: data.data.id,
          type: "EW",
        });
        const response = await newWP.save();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
};
