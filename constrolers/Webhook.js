const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/e-wallet/update-status", async (req, res) => {
  try {
    const updateData = Order.findOneAndUpdate(
      { id: req.body.id },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.status(200).json(updateData);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
