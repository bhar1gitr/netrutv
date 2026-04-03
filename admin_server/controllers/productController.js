const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    // ✅ Added .populate('discount') to show discount details in the list
    const products = await Product.find()
      .populate('discount')
      .sort({ createdAt: -1 });
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
      // ✅ Ensure empty discount strings are stored as null
      discount: req.body.discount || null, 
      image: req.file ? req.file.path : "" 
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

    // ✅ Handle sizes update
    if (req.body.sizes) {
      updateData.sizes = JSON.parse(req.body.sizes);
      updateData.totalStock = Object.values(updateData.sizes)
        .reduce((a, b) => a + Number(b), 0);
    }

    // ✅ Handle image update
    if (req.file) {
      updateData.image = req.file.path; 
    }

    // ✅ Handle Discount link (if "None" is selected, set to null)
    if (updateData.discount === "" || updateData.discount === "null") {
      updateData.discount = null;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('discount'); // ✅ Populate on return so frontend gets the new values

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
    // ✅ Populate discount for the single product view/page
    const product = await Product.findById(req.params.id).populate('discount');
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

    // ✅ Populate discount for category-specific views
    const products = await Product.find({
      type: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    }).populate('discount').sort({ createdAt: -1 });

    res.status(200).json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};