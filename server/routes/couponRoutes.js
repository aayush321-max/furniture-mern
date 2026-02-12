const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

// GET ALL ACTIVE COUPONS
router.get("/", async (req, res) => {
  const coupons = await Coupon.find({ isActive: true }).sort({
    discountAmount: 1,
  });
  res.json(coupons);
});

module.exports = router;