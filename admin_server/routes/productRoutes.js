const express = require('express');
const router = express.Router();
const multer = require('multer');
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

module.exports = router;