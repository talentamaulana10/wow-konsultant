const xendit = require("xendit-node");
const { xendit_secret } = require("../config/configration");
const nodefetch = require("node-fetch");
const xendit_instance = new xendit({
  secretKey: xendit_secret,
});

module.exports = {
  createCustomer(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const opts = {
          method: "post",
          headers: {
            "Content-Type": " application/json",
            Authorization:
              "Basic " +
              Buffer.from(xendit_secret + ":" + "").toString("base64"),
          },
          body: JSON.stringify(data),
          redirect: "follow",
        };
        const response = await nodefetch(
          "https://api.xendit.co/customers",
          opts
        );
        const resp_data = await response.json();
        resolve(resp_data);
      } catch (e) {
        console.log(e);
        reject(e.error);
      }
    });
  },
  autoDebitWallet(data) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(null);
      } catch (error) {
        reject(null);
      }
    });
  },
  redirectDebitWallet(data) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error) {}
    });
  },
  callbackRedirectDebitWallet(data) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error) {}
    });
  },
};
