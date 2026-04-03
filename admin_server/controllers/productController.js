const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const sizes = req.body.sizes
      ? JSON.parse(req.body.sizes)
      : { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };

    const totalStock = Object.values(sizes).reduce(
      (a, b) => a + Number(b), 0
    );

    const productData = {
      ...req.body,
      sizes,
      totalStock,
      image: req.file ? req.file.path : "" // ✅ Cloudinary URL
    };

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.sizes) {
      updateData.sizes = JSON.parse(req.body.sizes);
      updateData.totalStock = Object.values(updateData.sizes)
        .reduce((a, b) => a + Number(b), 0);
    }

    if (req.file) {
      updateData.image = req.file.path; // ✅ Cloudinary URL
    }

    console.log("Update Data:", req.file.path);

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
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);

  } catch (err) {
    res.status(500).json({ error: "Invalid Product ID" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const products = await Product.find({
      type: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    }).sort({ createdAt: -1 });

    res.status(200).json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};