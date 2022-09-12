const express = require("express");
const router = express.Router();
const VirtualAccountServices = require("../services/VirtualAccountServices");
const QrisService = require("../services/QrisService");
const RetailOutletServices = require("../services/RetailOutletServices");
const EWalletServices = require("../services/EWalletServices");

router.post("/virtual-account", async (req, res) => {
  try {
    const data = req.body;
    const resp = await VirtualAccountServices.create(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/qris", async (req, res) => {
  try {
    const data = req.body;
    const resp = await QrisService.createDynamicQRIS(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/retail-outlet", async (req, res) => {
  try {
    const data = req.body;
    const resp = await RetailOutletServices.create(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/wallet/one-time-payment-ovo", async (req, res) => {
  try {
    const { data } = req.body;
    const resp = await EWalletServices.createOtpOVO(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/wallet/one-time-payment", async (req, res) => {
  try {
    const { data } = req.body;
    const resp = await EWalletServices.createOtp(data);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
