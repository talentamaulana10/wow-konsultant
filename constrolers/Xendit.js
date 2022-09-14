const express = require("express");
const router = express.Router();
const VirtualAccountServices = require("../services/VirtualAccountServices");
const QrisService = require("../services/QrisService");
const RetailOutletServices = require("../services/RetailOutletServices");
const EWalletServices = require("../services/EWalletServices");
const OrderServices = require("../services/OrderServices");

router.post("/virtual-account", async (req, res) => {
  try {
    const data = req.body;
    const xenditResp = await VirtualAccountServices.create(data);
    const orderResp = await OrderServices.create({
      paymentId: xenditResp.id,
      paymentType: "va",
      totalOrder: data.totalOrder,
    });
    res.status(200).json({ orderResp, xenditResp });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/qris", async (req, res) => {
  try {
    const data = req.body;
    const xenditResp = await QrisService.createDynamicQRIS(data);
    const orderResp = await OrderServices.create({
      paymentId: xenditResp.external_id,
      paymentType: "qris",
      totalOrder: data.totalOrder,
    });
    res.status(200).json({ xenditResp, orderResp });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/retail-outlet", async (req, res) => {
  try {
    const data = req.body;
    const xenditResp = await RetailOutletServices.create(data);
    const orderResp = await OrderServices.create({
      paymentId: xenditResp.id,
      paymentType: "ro",
      totalOrder: data.totalOrder,
    });
    res.status(200).json({ orderResp, xenditResp });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/wallet/one-time-payment-ovo", async (req, res) => {
  try {
    const data = req.body;
    const xenditResp = await EWalletServices.createOtpOVO(data);
    const orderResp = await OrderServices.create({
      paymentId: xenditResp.id,
      paymentType: "ew",
      totalOrder: data.totalOrder,
    });
    res.status(200).json({ orderResp, xenditResp });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/wallet/one-time-payment", async (req, res) => {
  try {
    const data = req.body;
    const xenditResp = await EWalletServices.createOtp(data);
    const orderResp = await OrderServices.create({
      customId: xenditResp.reference_id,
      paymentId: xenditResp.id,
      paymentType: "ew",
      totalOrder: data.totalOrder,
    });
    res.status(200).json({ orderResp, xenditResp });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
