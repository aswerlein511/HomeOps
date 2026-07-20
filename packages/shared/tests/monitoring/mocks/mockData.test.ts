import { describe, expect, it } from 'vitest';

import { criticalPc, healthyPc, offlinePc, warningPc } from '../../../src/monitoring/mocks';

describe('Shared PC Health Mock Data', () => {
    const mocks = [
        ['healthy', healthyPc],
        ['warning', warningPc],
        ['critical', criticalPc],
        ['offline', offlinePc],
    ] as const;

    it.each(mocks)('%s mock is defined', (_, mock) => {
        expect(mock).toBeDefined();
    });

    it.each(mocks)('%s contains required top-level properties', (_, mock) => {
        expect(mock.hostname).toBeTruthy();
        expect(mock.operatingSystem).toBeTruthy();
        expect(mock.platform).toBeTruthy();
        expect(mock.architecture).toBeTruthy();

        expect(mock.cpu).toBeDefined();
        expect(mock.memory).toBeDefined();
        expect(mock.network).toBeDefined();
        expect(mock.disks).toBeDefined();

        expect(Array.isArray(mock.disks)).toBe(true);
    });

    it.each(mocks)('%s contains valid cpu information', (_, mock) => {
        expect(mock.cpu).toBeDefined();
    });

    it.each(mocks)('%s contains valid memory information', (_, mock) => {
        expect(mock.memory.totalBytes).toBeGreaterThan(0);
        expect(mock.memory.usedBytes).toBeGreaterThanOrEqual(0);
        expect(mock.memory.freeBytes).toBeGreaterThanOrEqual(0);
    });

    it.each(mocks)('%s contains valid disk information', (name, mock) => {
        if (name === 'offline') {
            expect(mock.disks).toEqual([]);
            return;
        }

        expect(mock.disks.length).toBeGreaterThan(0);

        mock.disks.forEach((disk) => {
            expect(disk.id).toBeTruthy();
            expect(disk.mountPoint).toBeTruthy();
            expect(disk.fileSystem).toBeTruthy();

            expect(disk.totalBytes).toBeGreaterThan(0);
            expect(disk.usedBytes).toBeGreaterThanOrEqual(0);
            expect(disk.freeBytes).toBeGreaterThanOrEqual(0);

            expect(disk.usagePercent).toBeGreaterThanOrEqual(0);
            expect(disk.usagePercent).toBeLessThanOrEqual(100);
        });
    });

    it.each(mocks)('%s contains valid network information', (_, mock) => {
        expect(mock.network.hostname).toBeTruthy();
        expect(mock.network.ipAddress).toBeTruthy();
        expect(mock.network.interfaceName).toBeTruthy();

        expect(Array.isArray(mock.network.dnsServers)).toBe(true);

        expect(mock.network.uploadMbps).toBeGreaterThanOrEqual(0);
        expect(mock.network.downloadMbps).toBeGreaterThanOrEqual(0);
        expect(mock.network.latencyMs).toBeGreaterThanOrEqual(0);
    });
});
