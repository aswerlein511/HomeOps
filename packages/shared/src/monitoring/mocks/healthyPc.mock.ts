import type { PcHealth } from '../models';

export const healthyPc: PcHealth = {
    hostname: 'HomeOps-Dev',

    operatingSystem: 'Windows 11 Pro',

    platform: 'win32',

    architecture: 'x64',

    uptime: 432000,

    bootTime: new Date('2026-07-14T08:00:00'),

    overallStatus: 'Healthy',

    lastUpdated: new Date(),

    cpu: {
        manufacturer: 'Intel',
        model: 'Core Ultra 9 285K',
        physicalCores: 24,
        logicalCores: 24,
        baseClockGHz: 3.7,
        maxClockGHz: 5.7,
        currentClockGHz: 4.8,
        usagePercent: 18,
        temperatureC: 46,
        loadPerCore: new Array(24).fill(18),
        processes: 214,
        threads: 3815,
        status: 'Healthy',
        lastUpdated: new Date(),
    },

    memory: {
        totalBytes: 34359738368,
        usedBytes: 14931722240,
        availableBytes: 19428016128,
        freeBytes: 19428016128,
        usagePercent: 43,
        swapTotalBytes: 0,
        swapUsedBytes: 0,
        swapUsagePercent: 0,
        status: 'Healthy',
        lastUpdated: new Date(),
    },

    disks: [
        {
            id: 'C',
            mountPoint: 'C:\\',
            label: 'Samsung 9100 Pro',
            fileSystem: 'NTFS',
            type: 'NVMe',
            totalBytes: 2000398934016,
            usedBytes: 754239012864,
            freeBytes: 1246159921152,
            usagePercent: 38,
            healthPercent: 100,
            status: 'Healthy',
            lastUpdated: new Date(),
        },
    ],

    network: {
        hostname: 'HomeOps-Dev',
        ipAddress: '192.168.1.150',
        macAddress: '00:11:22:33:44:55',
        interfaceName: 'Intel 2.5Gb Ethernet',
        gateway: '192.168.1.1',
        dnsServers: ['1.1.1.1', '8.8.8.8'],
        uploadMbps: 42,
        downloadMbps: 935,
        latencyMs: 8,
        packetsSent: 154000,
        packetsReceived: 318000,
        status: 'Healthy',
        lastUpdated: new Date(),
    },
};
