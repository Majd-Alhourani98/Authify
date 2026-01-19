const express = require('express');
const morgan = require('morgan');

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

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
