






// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    phone: { type: String, required: true },

    role: { type: String, default: "user" },

    signupAt: { type: Date, default: Date.now },

    loginCount: { type: Number, default: 0 },

    lastLoginAt: { type: Date },

    loginHistory: [
      {
        time: { type: Date, default: Date.now },
        ip: String,
        deviceType: String,
        os: String,
        browser: String,
        location: {
          country: String,
          city: String,
        },
        userAgent: String,
      },
    ],

    // 🔑 PASSWORD RESET
    resetOtp: { type: String },
    resetOtpExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);