const express = require("express");
const OrderServices = require("../services/OrderServices");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const order = await OrderServices.getById(req.params.id);
    const xenditResp = await OrderServices.paymentTrxDetail({
      paymentId: order.paymentId,
      paymentType: order.paymentType,
    });
    res.status(200).json({ order, xenditResp });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id/change-payment", async (req, res) => {
  try {
    const resp = await OrderServices.changePaymentMethod(
      req.body,
      req.params.id
    );
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
