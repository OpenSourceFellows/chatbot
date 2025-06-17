// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
      
  // Test file patterns
  testMatch: ['**/__tests__/**/*.test.js'], 
  watchPlugins: [],
      
  // Setup files
  globalSetup: '<rootDir>/.jest/jest.global-setup.js',
  setupFilesAfterEnv: ['<rootDir>/.jest/jest.setup.js'],
  globalTeardown: '<rootDir>/.jest/jest.global-teardown.js',
      
  // Module aliases (using Jest's native moduleNameMapper)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1'
  },
      
  // Ignore patterns
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/dist/'
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
      
  // Additional options
  testTimeout: 10000,
  clearMocks: true,
  resetMocks: true
};