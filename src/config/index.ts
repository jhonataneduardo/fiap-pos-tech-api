import dotenv from 'dotenv';

dotenv.config();

export const systemConfig = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
};

export const frontendConfig = {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000']
};

export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET || 'your-very-secret-key',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret',
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};

export const smtpConfig = {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    user: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASSWORD as string
};

export const keycloakConfig = {
    url: process.env.KEYCLOAK_URL || 'http://localhost:8080',
    realm: process.env.KEYCLOAK_REALM || 'fiap-pos-tech',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'pos-tech-api',
};