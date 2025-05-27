const http = require('http');
const config = require('./src/config/config');
const { connectDB, closeDB } = require('./src/config/database');
const logger = require('./src/config/logger');
const app = require('./src/server');

try {
  connectDB();
} catch (error) { 
  logger.info(error);
}

const httpServer = http.createServer(app);

const server = httpServer.listen(config.port, () => {
  logger.info(`server listening on port ${config.port}`);
});

const exitHandler = async () => {
  await closeDB();

  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unExpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', async() => {
  await closeDB();
  logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
