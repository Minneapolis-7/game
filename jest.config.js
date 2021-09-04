/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const settings = require('./webpack/settings');
const { compilerOptions } = require('./tsconfig.json');

const path = require('path');

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: {
        ...compilerOptions,
        jsx: 'react',
      },
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^assets(.*)$': `${path
      .join('<rootDir>', settings.paths.static.base, settings.paths.static.assets)
      .replace(new RegExp(`\${path.sep}$`), '')}$1`,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
