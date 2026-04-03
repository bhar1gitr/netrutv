const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pid: String,
  name: String,
  price: Number,
  type: String,
  sub: String,
  description: String,
  modelUrl: String,
  image: String,
  sizes: {
    S: Number,
    M: Number,
    L: Number,
    XL: Number,
    XXL: Number
  },
  totalStock: Number
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);