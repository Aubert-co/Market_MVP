// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  preset:'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub"
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
