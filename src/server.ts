import app from './app';
import { systemConfig, jwtConfig } from '@config/index';

const PORT = systemConfig.port || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Local: http://localhost:${PORT}/api/v1/health`);

    if (!systemConfig.databaseUrl) {
        console.warn('⚠️ DATABASE_URL não está configurada no .env');
    }
});