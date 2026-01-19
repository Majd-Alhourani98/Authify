const mongoose = require('mongoose');

// Localhost MongoDB connection
const DB_URL = 'mongodb://localhost:27017/authify';
const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
  }
};

module.exports = connectDB;
