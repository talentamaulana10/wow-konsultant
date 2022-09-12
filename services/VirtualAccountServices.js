const xendit = require("xendit-node");
const { xendit_secret } = require("../config/configration");
const xendit_instance = new xendit({
  secretKey: xendit_secret,
});
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { VirtualAcc } = xendit_instance;
        const vaSpecificOptions = {};
        const va = new VirtualAcc(vaSpecificOptions);
        const xendit_resp = await va.createFixedVA({
          bankCode: data.bankCode,
          externalID: uuidv4(),
          expectedAmt: data.expectedAmt,
          name: data.name,
          isSingleUse: true,
        });
        resolve(xendit_resp);
      } catch (error) {
        reject(error);
      }
    });
  },
};
