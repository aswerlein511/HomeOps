import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePcHealth } from '@/features/monitoring/pc/hooks';
import { pcHealthService } from '@/features/monitoring/pc/services';

vi.mock('@/features/monitoring/pc/services', () => ({
    pcHealthService: {
        getHealth: vi.fn(),
    },
}));

const mockHealth = {
    hostname: 'Aaron-PC',
    operatingSystem: 'Windows 11',
    platform: 'win32',
    architecture: 'x64',

    uptime: 100,

    bootTime: new Date(),

    overallStatus: 'Healthy',

    lastUpdated: new Date(),

    cpu: {
        manufacturer: 'Intel',
        model: 'i9',
        physicalCores: 8,
        logicalCores: 16,
        baseClockGHz: 3.6,
        maxClockGHz: 5.2,
        currentClockGHz: 4.4,
        usagePercent: 12,
        temperatureC: 45,
        loadPerCore: [],
        processes: 200,
        threads: 1000,
        status: 'Healthy',
        lastUpdated: new Date(),
    },

    memory: {
        totalBytes: 16,
        usedBytes: 8,
        availableBytes: 8,
        freeBytes: 8,
        usagePercent: 50,
        swapTotalBytes: 0,
        swapUsedBytes: 0,
        swapUsagePercent: 0,
        status: 'Healthy',
        lastUpdated: new Date(),
    },

    disks: [],

    network: {
        hostname: 'Aaron-PC',
        ipAddress: '127.0.0.1',
        macAddress: '',
        interfaceName: 'Ethernet',
        gateway: '',
        dnsServers: [],
        uploadMbps: 0,
        downloadMbps: 0,
        latencyMs: 0,
        packetsSent: 0,
        packetsReceived: 0,
        status: 'Healthy',
        lastUpdated: new Date(),
    },
};

describe('usePcHealth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('starts in a loading state', () => {
        vi.mocked(pcHealthService.getHealth).mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => usePcHealth());

        expect(result.current.loading).toBe(true);
        expect(result.current.health).toBeUndefined();
        expect(result.current.error).toBeUndefined();
    });

    it('loads pc health successfully', async () => {
        vi.mocked(pcHealthService.getHealth).mockResolvedValue(mockHealth as never);

        const { result } = renderHook(() => usePcHealth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.health).toEqual(mockHealth);
        expect(result.current.error).toBeUndefined();

        expect(pcHealthService.getHealth).toHaveBeenCalledTimes(1);
    });

    it('stores an error when loading fails', async () => {
        const error = new Error('Network Error');

        vi.mocked(pcHealthService.getHealth).mockRejectedValue(error);

        const { result } = renderHook(() => usePcHealth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.health).toBeUndefined();
        expect(result.current.error).toEqual(error);
    });

    it('refresh reloads health information', async () => {
        vi.mocked(pcHealthService.getHealth).mockResolvedValue(mockHealth as never);

        const { result } = renderHook(() => usePcHealth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.refresh();
        });

        expect(pcHealthService.getHealth).toHaveBeenCalledTimes(2);
    });

    it('clears a previous error after a successful refresh', async () => {
        vi.mocked(pcHealthService.getHealth)
            .mockRejectedValueOnce(new Error('Failed'))
            .mockResolvedValueOnce(mockHealth as never);

        const { result } = renderHook(() => usePcHealth());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeDefined();

        await act(async () => {
            await result.current.refresh();
        });

        expect(result.current.health).toEqual(mockHealth);
        expect(result.current.error).toBeUndefined();
    });
});
