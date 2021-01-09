const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
  testMatch: ['**/*.test.js'],
  transform: {
    '\\.(jsx?|tsx?)$': '<rootDir>/jest/transformer.js',
  },
};
