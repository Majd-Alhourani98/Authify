const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/database');

// Express application
const app = express();

// Parse incoming JSON request
app.use(express.json());

// log HTTP requests
app.use(morgan('dev'));

// health check route
app.get('/health', (req, res, next) => {
  res.status(200).json({
    status: 'ok',
    // How long the server has been running (in seconds)
    uptime: process.uptime(),
    startedAt: new Date(Date.now() - process.uptime() * 1000).toLocaleString(),
    message: 'API is healthy and running smoothly 🚀',
  });
});

// Database connection
connectDB();

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n${'━'.repeat(21)} 🔥 SERVER ${'━'.repeat(21)}`);
  console.log(`🟢 STATUS      → Running`);
  console.log(`🔗 LINK        → http://localhost:${PORT}`);
  console.log(`🌍 ENVIRONMENT → ${app.get('env')}`);
  console.log(`⏰ STARTED AT  → ${new Date().toLocaleTimeString()}\n`);
});
