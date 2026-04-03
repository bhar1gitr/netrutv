const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

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
  totalStock: Number,
  // ADDED: Reviews array
  reviews: [reviewSchema],
  // Optional: Average rating for easier sorting/display
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);