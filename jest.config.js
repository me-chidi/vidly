const { createDefaultPreset } = require('ts-jest');

const presetConfig = createDefaultPreset();

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    ...presetConfig,
    testEnvironment: "node",
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.test.json' 
        }],
    },
    moduleNameMapper: {
        '^#src/(.*)(?:\\.js)?$': '<rootDir>/src/$1',
        '^#models/(.*)(?:\\.js)?$': '<rootDir>/src/models/$1',
        '^#middleware/(.*)(?:\\.js)?$': '<rootDir>/src/middleware/$1',
        '^#types/(.*)(?:\\.js)?$': '<rootDir>/src/types/$1',
        '^#queues/(.*)(?:\\.js)?$': '<rootDir>/src/queues/$1',
        '^#workers/(.*)(?:\\.js)?$': '<rootDir>/src/workers/$1',
        '^#startup/(.*)(?:\\.js)?$': '<rootDir>/src/startup/$1',
        '^#auth/(.*)(?:\\.js)?$': '<rootDir>/src/auth/$1',
        '^#movie/(.*)(?:\\.js)?$': '<rootDir>/src/movie/$1',
        '^#genre/(.*)(?:\\.js)?$': '<rootDir>/src/genre/$1',
        '^#customer/(.*)(?:\\.js)?$': '<rootDir>/src/customer/$1',
        '^#rental/(.*)(?:\\.js)?$': '<rootDir>/src/rental/$1',
        '^#return/(.*)(?:\\.js)?$': '<rootDir>/src/return/$1',
        '^#user/(.*)(?:\\.js)?$': '<rootDir>/src/user/$1',
    },
    setupFiles: ['<rootDir>/tests/setup.ts'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    detectOpenHandles: true,
};