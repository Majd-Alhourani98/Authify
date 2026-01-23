const express = require('express');
const morgan = require('morgan');

// Routers
const authRouter = require('./routes/auth.routes');
const { AppError } = require('./errors/AppError');
const notFound = require('./errors/notFound');
const globalError = require('./errors/globalError');

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

app.all('*', notFound);

app.use(globalError);

module.exports = app;
