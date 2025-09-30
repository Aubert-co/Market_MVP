// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  preset:'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$":[ "ts-jest",
    {
       tsconfig: 'tsconfig.test.json',
    }
    ]
  },
  moduleNameMapper: {
  "\\.png$": "jest-transform-stub",
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  '<rootDir>/src/test/mock/fileMock.cjs',
  "^@/(.*)$": "<rootDir>/src/$1"
},

collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",  
    "!src/**/*.d.ts",            
    "!src/**/index.{ts,tsx}"     
  ],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
