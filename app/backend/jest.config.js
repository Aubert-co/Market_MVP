const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/src/tests/_seed_/"
  ],
   testMatch: [
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/src/**/*.spec.ts"
  ],
   moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalTeardown: '<rootDir>/global-teardown.ts',
  globalSetup:'<rootDir>/global-setup.ts',

};