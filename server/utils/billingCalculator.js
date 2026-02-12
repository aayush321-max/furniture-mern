



const Coupon = require("../models/Coupon");

async function calculateBill(items, couponCode) {

  let subtotal = 0;

  // 1️⃣ Calculate subtotal
  items.forEach(item => {
    subtotal += item.price * item.qty;
  });

  let discount = 0;
  let appliedCoupon = null;   // ✅ FIXED (DECLARED HERE)

  // 2️⃣ Apply coupon if exists
  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (coupon && subtotal >= coupon.minOrderValue) {
      discount = coupon.discountAmount;
      appliedCoupon = coupon.code;
    }
  }

  // 3️⃣ Taxable amount
  const taxableAmount = subtotal - discount;

  const cgst = Math.round(taxableAmount * 0.09);
  const sgst = Math.round(taxableAmount * 0.09);
  const platformFee = subtotal > 0 ? 99 : 0;

  const grandTotal = taxableAmount + cgst + sgst + platformFee;

  return {
    subtotal,
    coupon: appliedCoupon,   // ✅ Now defined properly
    discount,
    cgst,
    sgst,
    platformFee,
    grandTotal,
  };
}

module.exports = calculateBill;