const express = require('express');

const app = express();
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
const { errorHandler, errorConverter } = require('./middlewares/error');
const chatbotRouter = require('./routes/chatbot.routes');

const authRoutes = require('./routes/auth.routes');
const edxRoutes = require('./routes/edx.routes');

const messagingRouter = require('./routes/messaging.routes');
const ApiError = require('./utils/ApiError');

app.use(express.urlencoded({ extended: false }));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Chatbot server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/auth', authRoutes);
app.use('/chatbot', chatbotRouter);
app.use('/edx', edxRoutes);
app.use('/messaging', messagingRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
