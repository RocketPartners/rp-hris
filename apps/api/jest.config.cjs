/* eslint-disable */
const { readFileSync } = require('fs');
const { resolve } = require('path');

// Read SWC config - __dirname works in CommonJS
const swcSpecPath = resolve(__dirname, '.spec.swcrc');
const swcJestConfig = JSON.parse(readFileSync(swcSpecPath, 'utf-8'));
swcJestConfig.swcrc = false;

module.exports = {
  displayName: '@rp-hris/api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
};
