const mongoose = require('mongoose');
const { buildDatabaseURL } = require('../utils/buildDatabaseURL');

// Localhost MongoDB connection
// const DB_URL = 'mongodb://localhost:27017/authify';

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_URL } = process.env;

const DB_URL = buildDatabaseURL(DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_URL);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`\n${'━'.repeat(20)} 🔥 DATABASE ${'━'.repeat(20)}`);
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`${'━'.repeat(53)}\n`);
  } catch (error) {
    console.error(`\n${'━'.repeat(20)} ❌ DATABASE ERROR ${'━'.repeat(20)}`);
    console.error('🚨 MongoDB connection failed');
    console.error(`📛 Error: ${error.message}`);
    console.error(`🔍 Error Code: ${error.code || 'N/A'}`);
    console.error(`📍 Connection String: ${DB_URL}`);
    console.error(`${'━'.repeat(60)}\n`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
