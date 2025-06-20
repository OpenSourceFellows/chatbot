const express = require('express');

const app = express();
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
const { errorHandler, errorConverter } = require('./middlewares/error');
const chatbotRouter = require('./routes/chatbot.route');
const messagingRouter = require('./routes/messaging.routes');
const ApiError = require('./utils/ApiError');

app.use(express.urlencoded({ extended: false }));

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());
app.use(chatbotRouter);
app.use(messagingRouter);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
  