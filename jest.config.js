module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/*.ts', 'src/**/*.ts'],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
  coverageReporters: ['text', 'text-summary'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
};
