import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetHealth = vi.fn();

const MockPcHealthProvider = vi.fn(function MockPcHealthProvider(this: any) {
    this.getHealth = mockGetHealth;
});

const SystemInformationProvider = vi.fn(function SystemInformationProvider(this: any) {
    this.getHealth = mockGetHealth;
});

vi.mock('../../src/features/monitoring/pc-health/providers/MockPcHealthProvider', () => ({
    MockPcHealthProvider,
}));

vi.mock('../../src/features/monitoring/pc-health/providers/SystemInformationProvider', () => ({
    SystemInformationProvider,
}));

describe('PcHealthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete process.env.PC_HEALTH_PROVIDER;
    });

    it('defaults to the mock provider', async () => {
        const { PcHealthService } =
            await import('../../src/features/monitoring/pc-health/services/PcHealthService');

        new PcHealthService();

        expect(MockPcHealthProvider).toHaveBeenCalledTimes(1);
        expect(SystemInformationProvider).not.toHaveBeenCalled();
    });

    it('uses the mock provider', async () => {
        process.env.PC_HEALTH_PROVIDER = 'mock';

        const { PcHealthService } =
            await import('../../src/features/monitoring/pc-health/services/PcHealthService');

        new PcHealthService();

        expect(MockPcHealthProvider).toHaveBeenCalledTimes(1);
        expect(SystemInformationProvider).not.toHaveBeenCalled();
    });

    it('uses the system provider', async () => {
        process.env.PC_HEALTH_PROVIDER = 'system';

        const { PcHealthService } =
            await import('../../src/features/monitoring/pc-health/services/PcHealthService');

        new PcHealthService();

        expect(SystemInformationProvider).toHaveBeenCalledTimes(1);
        expect(MockPcHealthProvider).not.toHaveBeenCalled();
    });

    it('handles uppercase provider names', async () => {
        process.env.PC_HEALTH_PROVIDER = 'SYSTEM';

        const { PcHealthService } =
            await import('../../src/features/monitoring/pc-health/services/PcHealthService');

        new PcHealthService();

        expect(SystemInformationProvider).toHaveBeenCalledTimes(1);
    });

    it('falls back to the mock provider', async () => {
        process.env.PC_HEALTH_PROVIDER = 'banana';

        const { PcHealthService } =
            await import('../../src/features/monitoring/pc-health/services/PcHealthService');

        new PcHealthService();

        expect(MockPcHealthProvider).toHaveBeenCalledTimes(1);
    });

    it('delegates getHealth()', async () => {
        process.env.PC_HEALTH_PROVIDER = 'mock';

        mockGetHealth.mockResolvedValue({
            hostname: 'Aaron-PC',
        });

        const { PcHealthService } =
            await import('../../src/features/monitoring/pc-health/services/PcHealthService');

        const service = new PcHealthService();

        const result = await service.getHealth();

        expect(mockGetHealth).toHaveBeenCalledTimes(1);

        expect(result).toEqual({
            hostname: 'Aaron-PC',
        });
    });
});
