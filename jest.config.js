
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  reporters: [["jest-silent-reporter", { "showWarnings": true }]],
  verbose: false,
  globals: {
    'ts-jest': {
      "tsconfig": "tsconfig.json",
      diagnostics: {
        ignoreCodes: [2339, 2345]
      }
    }
  },
  "moduleNameMapper": {
    "^@app/(.*)": "<rootDir>/src/ts/main/$1"
  },
};
