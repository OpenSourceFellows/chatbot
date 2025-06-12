// Pre-testing setup that runs before any Jest hooks or tests
const { execSync } = require('child_process');

const logger = require('../src/config/logger');

// This function will create a test db with the latest schema of your branch.
// This happens at the start of every test run to prevent db pollution.
function globalSetup() {
  execSync('pnpm db:drop:test');
  logger.info('Test db dropped...');
  execSync('pnpm db:create:test');
  logger.info('Test db re-created...');
  execSync('pnpm db:migrate:test');
  logger.info('Test db migrated to current schema!');
}

module.exports = globalSetup;