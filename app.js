const express = require('express');
const morgan = require('morgan');

// Routers
const authRouter = require('./routes/auth.routes');

// Express application
const app = express();

// Parse incoming JSON request
app.use(express.json());

// log HTTP requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

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

app.use('/api/v1/auth', authRouter);

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

app.all('*', (req, res, next) => {
  const message = `Can't find ${req.originalUrl} on this server`;

  const error = {
    statusCode: 404,
    status: 'fail',
    message,
  };

  next(error);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
