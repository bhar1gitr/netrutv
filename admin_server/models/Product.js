const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" }, // New Field
  price: { type: Number, required: true },
  type: { type: String, required: true },
  sub: { type: String, required: true },
  stock: { type: Number, default: 0 },       // New Field
  image: { type: String, required: true },
  modelUrl: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);