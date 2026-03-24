const Product = require('../models/Product');

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      // Ensure the image path uses forward slashes for URL compatibility
      image: req.file ? req.file.path.replace(/\\/g, "/") : ""
    };

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Only update the image if a new file was uploaded
    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Invalid Product ID or Server Error" });
  }
};

// Fetch products by category (type)
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    console.log(`Fetching products for category: ${categoryName}`);
    // We use a case-insensitive search to be safe
    const products = await Product.find({ 
      type: { $regex: new RegExp(`^${categoryName}$`, 'i') } 
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};