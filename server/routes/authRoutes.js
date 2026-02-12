








const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Admin = require("../models/Admin");

const router = express.Router();
const sendEmail=require("../utils/sendEmail");

/* =========================
   USER SIGNUP
========================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      signupAt: new Date(),
    });
// 📧 SEND WELCOME EMAIL
await sendEmail({
  to: email,
  subject: "Welcome to FurniLux 🎉",
  html: `
    <h2>Welcome to FurniLux, ${name}!</h2>
    <p>Your account has been created successfully.</p>

    <p>You can now log in and start shopping premium furniture.</p>

    <br/>
    <p><b>Happy Shopping!</b></p>
    <p>— FurniLux Team</p>
  `,
});
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   LOGIN (USER + ADMIN)
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    let account;

    if (role === "admin") {
      account = await Admin.findOne({ email });
    } else {
      account = await User.findOne({ email });
    }

    if (!account) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* =========================
       🔥 USER ACTIVITY TRACKING
    ========================= */
    if (role === "user") {
      const userAgent = req.headers["user-agent"] || "Unknown";

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        "Unknown";

      let geo = null;
      try {
        const geoip = require("geoip-lite");
        geo = geoip.lookup(ip);
      } catch (e) {
        geo = null;
      }

      account.loginCount += 1;
      account.lastLoginAt = new Date();

      account.loginHistory.push({
        time: new Date(),
        ip,
        deviceType: /mobile/i.test(userAgent) ? "Mobile" : "Desktop",
        os: userAgent.includes("Android")
          ? "Android"
          : userAgent.includes("Windows")
          ? "Windows"
          : userAgent.includes("Mac")
          ? "Mac"
          : "Other",
        browser: userAgent.includes("Chrome")
          ? "Chrome"
          : userAgent.includes("Edg")
          ? "Edge"
          : userAgent.includes("Firefox")
          ? "Firefox"
          : "Other",
        location: geo
          ? {
              country: geo.country,
              city: geo.city,
            }
          : {},
        userAgent,
      });

      await account.save();
    }

    const token = jwt.sign(
      {
        id: account._id,
        role: account.role || role,
      },
      process.env.JWT_SECRET || "secret123",
      
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: account._id,
        name: account.name || "Admin",
        email: account.email,
        role: account.role || role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   ADMIN → USER LOGIN STATS
========================= */
router.get("/admin/user-login-stats", async (req, res) => {
  try {
    const users = await User.find().select(
      "name email signupAt loginCount lastLoginAt loginHistory"
    );

    res.json(users);
  } catch (err) {
    console.error("USER LOGIN STATS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});















/* =========================
   UPDATE USER PROFILE
========================= */
router.put("/update-profile", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone required" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});







router.post("/forgot-password", async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    if (!emailOrPhone) {
      return res.status(400).json({ message: "Email or phone required" });
    }

    // email ya phone detect
    const isEmail = emailOrPhone.includes("@");

    const user = isEmail
      ? await User.findOne({ email: emailOrPhone })
      : await User.findOne({ phone: emailOrPhone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    // ✅ EMAIL USER
    if (isEmail) {
      await sendEmail({
        to: user.email,
        subject: "Password Reset OTP - FurniLux",
        html: `
          <h2>Password Reset Request</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
          <br/>
          <b>FurniLux Team</b>
        `,
      });
    } else {
      // 📱 TEMP: phone users ke liye console
      console.log("OTP for", user.phone, ":", otp);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});





router.post("/reset-password", async (req, res) => {
  try {
    const { emailOrPhone, otp, newPassword } = req.body;

    if (!emailOrPhone || !otp || !newPassword) {
      return res.status(400).json({ message: "Missing data" });
    }

    const isEmail = emailOrPhone.includes("@");

    const user = isEmail
      ? await User.findOne({ email: emailOrPhone })
      : await User.findOne({ phone: emailOrPhone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
