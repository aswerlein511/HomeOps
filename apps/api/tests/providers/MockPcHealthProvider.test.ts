import { afterEach, describe, expect, it } from 'vitest';

import { MockPcHealthProvider } from '../../src/features/monitoring/pc-health/providers/MockPcHealthProvider';

describe('MockPcHealthProvider', () => {
    const provider = new MockPcHealthProvider();

    afterEach(() => {
        delete process.env.PC_HEALTH_SCENARIO;
    });

    it('returns the healthy scenario by default', async () => {
        const result = await provider.getHealth();

        expect(result.hostname).toBeTruthy();
        expect(result.overallStatus).toBe('Healthy');
    });

    it('returns the warning scenario', async () => {
        process.env.PC_HEALTH_SCENARIO = 'warning';

        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Warning');
    });

    it('returns the critical scenario', async () => {
        process.env.PC_HEALTH_SCENARIO = 'critical';

        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Critical');
    });

    it('returns the offline scenario', async () => {
        process.env.PC_HEALTH_SCENARIO = 'offline';

        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Offline');
    });

    it('falls back to healthy for an invalid scenario', async () => {
        process.env.PC_HEALTH_SCENARIO = 'invalid' as any;

        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Healthy');
    });

    it('returns a populated PcHealth object', async () => {
        const result = await provider.getHealth();

        expect(result.hostname).toBeTruthy();
        expect(result.operatingSystem).toBeTruthy();
        expect(result.platform).toBeTruthy();
        expect(result.architecture).toBeTruthy();

        expect(result.cpu).toBeDefined();
        expect(result.memory).toBeDefined();
        expect(result.disks.length).toBeGreaterThan(0);

        expect(result.network).toBeDefined();

        expect(result.bootTime).toBeInstanceOf(Date);
        expect(result.lastUpdated).toBeInstanceOf(Date);
    });
});
