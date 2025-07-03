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
};