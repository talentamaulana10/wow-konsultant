const express = require("express");
const router = express.Router();
const WebhookStorage = require("../models/WebhookStorage");

router.post("/e-wallet", async (req, res) => {
  try {
    const newWebhookStorage = new WebhookStorage({
      id: req.body.id,
      callbackDto: JSON.stringify(req.body),
      type: "ewallet",
    });
    const response = await newWebhookStorage.save();
    console.log(response);
    res.status(200).json("success");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
