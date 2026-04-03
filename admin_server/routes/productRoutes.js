const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const productController = require('../controllers/productController');

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

// Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.get('/category/:categoryName', productController.getProductsByCategory);

router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

// Add a review to a product
// POST /api/products/:id/reviews
router.post('/:id/reviews', async (req, res) => {
  const { rating, comment, userId, name } = req.body;

  try {
    console.log("Adding review for product ID:", req.params.id);
    console.log("Review data:", { rating, comment, userId, name });
    const product = await mongoose.model('Product').findById(req.params.id);

    if (product) {
      // Check if user already reviewed (Optional, but good for Netrutv's exclusivity)
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === userId.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ msg: "Product already reviewed" });
      }

      const review = {
        name,
        rating: Number(rating),
        comment,
        user: userId,
      };

      product.reviews.push(review);
      
      // Update average rating and review count
      product.numReviews = product.reviews.length;
      product.rating = 
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ msg: "Review added", reviews: product.reviews });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while posting review" });
  }
});

module.exports = router;