const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const chatbotRouter = require('./routes/chatbot.route');
const messagingRouter = require('./routes/messaging.routes')
const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const morgan = require('./config/morgan');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());
app.use(chatbotRouter);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
  