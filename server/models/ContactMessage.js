const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    subject: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactSchema);
