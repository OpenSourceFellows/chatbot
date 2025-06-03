const express = require('express');
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');


const authRoutes = require('./routes/auth.routes')
const chatbotRoutes = require('./routes/chatbot.routes')
const edxRoutes = require('./routes/edx.routes')
const messagingRoutes = require('./routes/messaging.routes')
const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/chatbot',chatbotRoutes);
app.use('/edx', edxRoutes);
app.use('/messaging', messagingRoutes);


app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
  