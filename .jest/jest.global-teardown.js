// Post-testing cleanup
const { execSync } = require('child_process');

function globalTeardown() {
  execSync('pnpm db:drop:test');
}

module.exports = globalTeardown;