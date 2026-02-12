
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const User = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
const generateInvoice = require("../utils/generateInvoice");
const calculateBill = require("../utils/billingCalculator");

// ==========================
// CREATE ORDER
// ==========================
router.post("/", verifyToken, async (req, res) => {
  try {
    const { customer, items, couponCode, paymentMethod } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Customer details missing" });
    }

    // ✅ SAFELY calculate bill
    const bill = await calculateBill(items, couponCode);

    if (!bill || !bill.subtotal) {
      return res.status(400).json({ message: "Billing failed" });
    }

    const order = new Order({
      userId: req.user.id,
      customer,
      items,

      // ✅ REQUIRED FIELDS (Mongoose safe)
      subtotal: bill.subtotal,
      coupon: bill.coupon || null,
      discount: bill.discount || 0,
      cgst: bill.cgst,
      sgst: bill.sgst,
      platformFee: bill.platformFee,
      totalAmount: bill.grandTotal,

      paymentMethod,
      status: "Processing",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      order: savedOrder,
    });

    // ==========================
    // BACKGROUND EMAIL TASK
    // ==========================
    (async () => {
      try {
        const user = await User.findById(req.user.id);
        const invoicePath = await generateInvoice(savedOrder, user);

        // CUSTOMER MAIL
       
// CUSTOMER MAIL
// CUSTOMER MAIL
if (user && user.email) {

  const invoicePath = await generateInvoice(savedOrder, user);

  console.log("Sending invoice to:", user.email);
  console.log("Invoice path:", invoicePath);

  await sendEmail({
    to: user.email,
    subject: "Your FurniLux Order Invoice",
    html: `
      <h3>Order Confirmed</h3>
      <p>Order ID: ${savedOrder._id}</p>
      <p>Total: ₹${savedOrder.totalAmount}</p>
    `,
    attachments: [
      {
        filename: `invoice-${savedOrder._id}.pdf`,
        path: invoicePath,
      },
    ],
  });
}

        // ADMIN MAIL
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: "🛒 New Order Placed - FurniLux",
          html: `
            <h2>New Order Received</h2>
            <p><b>Order ID:</b> ${savedOrder._id}</p>
            <p><b>Customer:</b> ${user.name}</p>
            <p><b>Email:</b> ${user.email}</p>
            <h3>Total Amount: ₹${savedOrder.totalAmount}</h3>
              <p>Please login to admin panel to process this order.</p>
          `,
        });
      } catch (err) {
        console.error("EMAIL / INVOICE ERROR (ignored):", err.message);
      }
    })();

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

// ==========================
// USER ORDERS
// ==========================
router.get("/my", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// ==========================
// ADMIN ALL ORDERS
// ==========================
router.get("/", verifyToken, isAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// ==========================
// USER CANCEL ORDER
// ==========================
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (order.status === "Delivered" || order.status === "Cancelled") {
      return res.status(400).json({ message: "Order cannot be cancelled" });
    }

    order.status = "Cancelled";
    order.cancelledBy = "customer";

    await order.save();

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (err) {
    console.error("CANCEL ORDER ERROR:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
});

// ==========================
// ADMIN STATUS UPDATE
// ==========================
router.put("/admin/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    if (status === "Cancelled") {
      order.cancelledBy = "admin";
    }

    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    console.error("ADMIN UPDATE ERROR:", err);
    res.status(500).json({ message: "Failed to update order" });
  }
});

// ==========================
// ADMIN CANCEL
// ==========================
router.put("/admin/cancel/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Cancelled";
    order.cancelledBy = "admin";

    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error("ADMIN CANCEL ERROR:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});

// ==========================
// ADMIN SALES STATS
// ==========================
router.get("/stats", verifyToken, isAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const processingOrders = await Order.countDocuments({ status: "Processing" });
    const shippedOrders = await Order.countDocuments({ status: "Shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    const cancelledByCustomer = await Order.countDocuments({
      status: "Cancelled",
      cancelledBy: "customer",
    });

    const cancelledByAdmin = await Order.countDocuments({
      status: "Cancelled",
      cancelledBy: "admin",
    });

    const revenueAgg = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    res.json({
      totalOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledByCustomer,
      cancelledByAdmin,
      totalRevenue,
    });
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({ message: "Failed to load stats" });
  }
});

module.exports = router;