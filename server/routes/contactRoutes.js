
const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save to DB
    await ContactMessage.create({
      name,
      email,
      message,
    });

    res.json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;