const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// DELETE product
router.delete("/:id", async (req, res) => {
    try{
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
    }
  catch{
    res.status(500).json({ success: false});
  }
});

module.exports = router;