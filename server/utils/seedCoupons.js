const Coupon = require("../models/Coupon");

const coupons = [
  { code: "SAVE1000", discountAmount: 1000, minOrderValue: 15000 },
  { code: "SAVE1500", discountAmount: 1500, minOrderValue: 18000 },
  { code: "SAVE2000", discountAmount: 2000, minOrderValue: 20000 },
  { code: "SAVE2500", discountAmount: 2500, minOrderValue: 23000 },
  { code: "SAVE3000", discountAmount: 3000, minOrderValue: 25000 },
  { code: "SAVE3500", discountAmount: 3500, minOrderValue: 28000 },
  { code: "SAVE4000", discountAmount: 4000, minOrderValue: 30000 },
  { code: "SAVE4500", discountAmount: 4500, minOrderValue: 33000 },
  { code: "SAVE5000", discountAmount: 5000, minOrderValue: 35000 },
  { code: "SAVE5500", discountAmount: 5500, minOrderValue: 38000 },
  { code: "SAVE6000", discountAmount: 6000, minOrderValue: 40000 },
  { code: "SAVE6500", discountAmount: 6500, minOrderValue: 43000 },
  { code: "SAVE7000", discountAmount: 7000, minOrderValue: 45000 },
  { code: "SAVE7500", discountAmount: 7500, minOrderValue: 48000 },
  { code: "SAVE8000", discountAmount: 8000, minOrderValue: 50000 },
];

module.exports = async function seedCoupons() {
  const count = await Coupon.countDocuments();
  if (count === 0) {
    await Coupon.insertMany(coupons);
    console.log("✅ Coupons seeded");
  }
};