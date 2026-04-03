const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve uploads folder properly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));