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
        const { RetailOutlet } = xendit_instance;
        const retailOutletSpecificOptions = {};
        const ro = new RetailOutlet(retailOutletSpecificOptions);
        const xendit_resp = await ro.createFixedPaymentCode({
          expectedAmt: data.expectedAmt,
          externalID: uuidv4(),
          name: data.name,
          retailOutletName: data.retailOutletName,
          paymentCode: "WKST",
          isSingleUse: true,
        });
        resolve(xendit_resp);
      } catch (error) {
        reject(error);
      }
    });
  },
};
