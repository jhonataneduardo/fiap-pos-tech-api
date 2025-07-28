const path = require('path'); // 1. Importe o módulo 'path'

module.exports = {
    // --- Outras configurações do Webpack ---
    entry: './src/server.ts', // Ponto de entrada da sua aplicação (ajuste conforme necessário)
    mode: 'development', // Ou 'production'
    module: {
        rules: [
            // Regra para processar arquivos TypeScript
            {
                test: /\.tsx?$/, // Processa arquivos .ts e .tsx
                use: 'ts-loader', // Usa o ts-loader (certifique-se de que está instalado: npm install --save-dev ts-loader)
                exclude: /node_modules/,
            },
            // ... outras regras (para CSS, imagens, etc.)
        ],
    },
    output: {
        filename: 'bundle.js', // Nome do arquivo de saída
        path: path.resolve(__dirname, 'dist'), // Pasta de saída (geralmente 'dist')
    },
    // --- Fim das outras configurações ---

    // --- Configuração da Resolução de Módulos ---
    resolve: {
        // 2. Adicione ou modifique a propriedade 'resolve'
        extensions: ['.tsx', '.ts', '.js'], // Importante: Permite importar arquivos .ts, .tsx e .js sem a extensão

        alias: {
            // 3. Configure os aliases aqui
            // Mapeia o alias para o caminho absoluto da pasta correspondente
            '@': path.resolve(__dirname, 'src/'),
            '@core': path.resolve(__dirname, 'src/core/'),
            '@modules': path.resolve(__dirname, 'src/modules/'),
            '@config': path.resolve(__dirname, 'src/config/'),
            // Adicione outros aliases se tiver
        },
    },
    // --- Fim da Configuração da Resolução ---
};