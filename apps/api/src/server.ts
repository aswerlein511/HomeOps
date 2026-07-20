import 'dotenv/config';

import app from './app';

const PORT = Number(process.env.PORT ?? 3001);

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
    console.log(`PC Health Provider: ${process.env.PC_HEALTH_PROVIDER ?? 'mock'}`);
});
