


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // 🔥 USER LINK
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 👤 CUSTOMER DETAILS
    customer: {
      fullName: String,
      phone: String,
      email: String,
      address: {
        house: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
      },
    },

    // 🛒 ORDER ITEMS
    items: [
      {
        productId: String,
        name: String,
        price: Number,   // ⚠️ string → number (important for calculation)
        qty: Number,
      },
    ],

    // ============================
    // 💰 BILLING BREAKUP (NEW)
    // ============================
    subtotal: {
      type: Number,
      required: true,
    },

    coupon: {
      type: String,
      default: null,
    },

    discount: {
      type: Number,
      default: 0,
    },

    cgst: {
      type: Number,
      required: true,
    },

    sgst: {
      type: Number,
      required: true,
    },

    platformFee: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // 💳 PAYMENT
    paymentMethod: {
      type: String, // COD / ONLINE
      required: true,
    },

    // 📦 ORDER STATUS
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },

    // ❌ WHO CANCELLED
    cancelledBy: {
      type: String,
      enum: ["customer", "admin"],
      default: null,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

module.exports = mongoose.model("Order", orderSchema);