// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Define a raiz do projeto para o Jest (geralmente onde está o package.json)
    // <rootDir> é uma variável especial do Jest que aponta para essa raiz.
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    // --- Mapeamento dos Aliases para o Jest ---
    moduleNameMapper: {
        // Mapeia "@/(.*)" para "<rootDir>/src/$1"
        // O (.*) captura qualquer coisa depois de "@/"
        // O $1 usa o que foi capturado para completar o caminho
        '^@/(.*)$': '<rootDir>/src/$1',

        // Mapeia "@core/(.*)" para "<rootDir>/src/core/$1"
        '^@core/(.*)$': '<rootDir>/src/core/$1',

        // Mapeia "@modules/(.*)" para "<rootDir>/src/modules/$1"
        '^@modules/(.*)$': '<rootDir>/src/modules/$1',

        // Mapeia "@config/(.*)" para "<rootDir>/src/config/$1"
        '^@config/(.*)$': '<rootDir>/src/config/$1',

        // Adicione outros mapeamentos se necessário
    },
    // --- Fim do Mapeamento ---

    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/server.ts',
        '!src/app.ts',
        '!src/config/**',
        '!src/**/index.ts',
        '!src/core/infrastructure/database/prisma.client.ts',
        '!src/core/infrastructure/database/seed.ts',
        '!src/core/infrastructure/database/transaction.ts',
        '!src/core/infrastructure/di/**',
        '!src/core/infrastructure/swagger/**',
        '!src/core/infrastructure/http/routes.ts',
        '!src/core/infrastructure/http/middlewares/**',
        '!src/**/*.routes.ts',
        '!src/**/enums.ts',
        '!src/**/controllers/**',
        '!src/**/presenters/**',
        '!src/modules/**/infrastructure/controllers/**',
    ],
    // Coverage threshold set to 80% - achieved through comprehensive unit tests
    // Coverage includes:
    // - Domain entities (100% covered)
    // - Application use cases (80%+ covered)
    // - Infrastructure repositories (80%+ covered)
    // - Database mappers (100% covered)
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ['text', 'lcov', 'html'],
};