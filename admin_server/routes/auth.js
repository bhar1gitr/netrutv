const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// SIGNUP LOGIC
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Netrutv account created successfully" });
  } catch (err) {
    res.status(500).send("Server error during signup");
  }
});

// LOGIN LOGIC
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, name: user.fullName } });
  } catch (err) {
    res.status(500).send("Server error during login");
  }
});

// GET /api/auth/all-users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    const Product = require('../models/Product');

    // For each user, find products where they've left a review
    const usersWithReviews = await Promise.all(users.map(async (user) => {
      const reviewedProducts = await Product.find(
        { "reviews.user": user._id },
        { name: 1, _id: 1 } // Only fetch name and id for performance
      );
      
      return {
        ...user,
        reviewedProducts // This will be an array of {name, _id}
      };
    }));

    res.json(usersWithReviews);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;