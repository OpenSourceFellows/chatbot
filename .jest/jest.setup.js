// 'Global' test setup and teardown functionality

const { connectDB, closeDB } = require('../src/config/database');
const logger = require('../src/config/logger');

// Unfortunately, it is difficult to move this into globalSetup and globalTeardown
// because Jest doesn't have access to our project config in a nice way.
beforeAll(async () => {
  global.sequelize = await connectDB();

  logger.info('Established db connection for testing!');
});

afterAll(async () => {
  await closeDB(global.sequelize);

  logger.info('Dropping db connection!');
});