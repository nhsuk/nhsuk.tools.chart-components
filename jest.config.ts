import { createRequire } from 'module';
import { pathsToModuleNameMapper } from 'ts-jest';

const require = createRequire(import.meta.url);
const { compilerOptions } = require('./tsconfig.json');

export default {
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'jsdom',
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.after-env.ts'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: [
    'node_modules',
    'dist',
    '.test-d.',
    '__helpers__',
    '__mocks__',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
    useESM: true,
  }),
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { useESM: true }],
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$':
      '<rootDir>/src/__tests__/__helpers__/file-transformer.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'json', 'png'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules', 'dist', '__helpers__'],
  coverageReporters: ['clover', 'json', 'lcov', 'cobertura', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'React Chart Components Unit Tests',
        suiteNameTemplate: 'nhsuk.tools.chart-components: {title}',
        outputDirectory: './jest-reports',
        outputName: 'report.xml',
      },
    ],
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testTimeout: 20000,
};
