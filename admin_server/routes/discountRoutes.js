const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

// Create a new discount code
router.post('/', async (req, res) => {
  try {
    const exists = await Discount.findOne({ code: req.body.code.toUpperCase() });
    if (exists) return res.status(400).json({ msg: "Code already exists" });

    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get all discounts for the dropdown
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Delete a discount
router.delete('/:id', async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    res.json({ msg: "Discount deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;