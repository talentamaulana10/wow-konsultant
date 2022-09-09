const express = require("express");
const router = express.Router();
const xendit = require("xendit-node");
const { xendit_secret } = require("../config/configration");
const WalletService = require("../services/WalletService");
const { v4: uuidv4 } = require("uuid");

const xendit_instance = new xendit({
  secretKey: xendit_secret,
});

router.post("/create-va", async (req, res) => {
  try {
    const data = req.body;
    const { VirtualAcc } = xendit_instance;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    const xendit_resp = await va.createFixedVA(data);
    res.status(200).json(xendit_resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/create-qris", async (req, res) => {
  try {
    const data = req.body;
    const { QrCode } = xendit_instance;
    const qrcodeSpecificOptions = {};
    const q = new QrCode(qrcodeSpecificOptions);
    const xendit_resp = await q.createCode(data);
    res.status(200).json(xendit_resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/create-retail-outlet", async (req, res) => {
  try {
    const data = req.body;
    const { RetailOutlet } = xendit_instance;
    const retailOutletSpecificOptions = {};
    const ro = new RetailOutlet(retailOutletSpecificOptions);
    const xendit_resp = await ro.createFixedPaymentCode(data);
    res.status(200).json(xendit_resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/create-wallet-charge", async (req, res) => {
  try {
    const data = req.body;
    const custResp = await WalletService.createCustomer({
      reference_id: uuidv4(),
      type: data.customer.type,
      individual_detail: {
        given_names: data.customer.givenNames,
        surname: data.customer.surname,
      },
      email: data.customer.email,
      mobile_number: data.customer.mobileNumber,
    });
    // const paymentResponse = await WalletService.redirectDebitWallet();
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
