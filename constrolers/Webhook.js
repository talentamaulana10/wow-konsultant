const express = require("express");
const WebhookPoolServices = require("../services/WebhookPoolServices");
const router = express.Router();

router.post("/e-wallet-ovo", async (req, res) => {
  try {
    const data = req.body;
    const resp = WebhookPoolServices.createEWalletOVO(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/e-wallet", async (req, res) => {
  try {
    const data = req.body;
    const resp = WebhookPoolServices.createEWallet(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
