const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  pid: String,
  name: String,
  price: Number,
  type: String,
  sub: String,
  image: String,
  description: String,
  modelUrl: String,
  // New Sizes Schema
  sizes: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    XXL: { type: Number, default: 0 }
  },
  // We can calculate total stock automatically
  totalStock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);