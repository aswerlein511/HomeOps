import { afterEach } from 'vitest';

afterEach(() => {
    delete process.env.PC_HEALTH_PROVIDER;
});
