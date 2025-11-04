/* eslint-disable */
const { readFileSync } = require('fs');
const { resolve } = require('path');

// Read SWC config - __dirname works in CommonJS
const swcSpecPath = resolve(__dirname, '.spec.swcrc');
const swcJestConfig = JSON.parse(readFileSync(swcSpecPath, 'utf-8'));
swcJestConfig.swcrc = false;

module.exports = {
  displayName: '@rp-hris/api-e2e',
  preset: '../../jest.preset.js',
  globalSetup: '<rootDir>/src/support/global-setup.ts',
  globalTeardown: '<rootDir>/src/support/global-teardown.ts',
  setupFiles: ['<rootDir>/src/support/test-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
};
