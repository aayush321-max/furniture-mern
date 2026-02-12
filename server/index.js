
// // require("dotenv").config();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const seedCoupons = require("./utils/seedCoupons");
// // seedCoupons();


// // const app = express();
// // if (process.env.NODE_ENV === "production") {
// //   console.log = () => {};
// //   console.error = () => {};
// //   console.warn = () => {};
// // }

// // /* ================= MIDDLEWARE ================= */

// // // ✅ CORS (Frontend → Backend allow)
// // app.use(
// //   cors({
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true,
// //   })
// // );

// // // ✅ JSON Body Parser
// // app.use(express.json());

// // /* ================= DATABASE ================= */

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log("MongoDB connected ✅"))
// //   .catch((err) => console.error("MongoDB error ❌", err));

// // /* ================= ROUTES ================= */

// // const authRoutes = require("./routes/authRoutes");
// // const orderRoutes = require("./routes/orderRoutes");
// // const contactRoutes = require("./routes/contactRoutes");
// // const productRoutes = require("./routes/productRoutes");
// // app.use("/api/contact", contactRoutes);

// // app.use("/api/coupons", require("./routes/couponRoutes"));
// // app.use("/api/auth", authRoutes);
// // app.use("/api/orders", orderRoutes);
// // app.use("/api/products", productRoutes);

// // /* ================= SERVER ================= */

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });























// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const seedCoupons = require("./utils/seedCoupons");

// const app = express();

// // ================= MIDDLEWARE =================

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ================= DATABASE =================

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log("MongoDB connected ✅");

//     // 👇 IMPORTANT — DB connect hone ke baad seed run hoga
//     await seedCoupons();
//   })
//   .catch((err) => {
//     console.error("MongoDB error ❌", err);
//   });

// // ================= ROUTES =================

// const authRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const productRoutes = require("./routes/productRoutes");

// app.use("/api/contact", contactRoutes);
// app.use("/api/coupons", require("./routes/couponRoutes"));
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);

// // ================= SERVER =================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const seedCoupons = require("./utils/seedCoupons");

const app = express();

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://furniture-mern-tsaf.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ================= DATABASE =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected ✅");
    await seedCoupons();
  })
  .catch((err) => {
    console.error("MongoDB error ❌", err);
  });

// ================= ROUTES =================

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/contact", contactRoutes);
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

// ================= SERVE REACT BUILD =================

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/build")));

// React routing support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});