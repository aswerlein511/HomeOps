import si from 'systeminformation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SystemInformationProvider } from '../../src/features/monitoring/pc-health/providers/SystemInformationProvider';

vi.mock('systeminformation', () => ({
    default: {
        osInfo: vi.fn(),
        cpu: vi.fn(),
        currentLoad: vi.fn(),
        processes: vi.fn(),
        mem: vi.fn(),
        fsSize: vi.fn(),
        battery: vi.fn(),
        graphics: vi.fn(),
        networkInterfaces: vi.fn(),
        time: vi.fn(),
    },
}));

describe('SystemInformationProvider', () => {
    const provider = new SystemInformationProvider();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(si.osInfo).mockResolvedValue({
            hostname: 'Aaron-PC',
            distro: 'Windows',
            release: '11',
            platform: 'win32',
            arch: 'x64',
        } as any);

        vi.mocked(si.cpu).mockResolvedValue({
            manufacturer: 'Intel',
            brand: 'Core Ultra',
            physicalCores: 8,
            cores: 16,
            speedMin: 1.2,
            speedMax: 5.0,
            speed: 3.6,
        } as any);

        vi.mocked(si.currentLoad).mockResolvedValue({
            currentLoad: 23.4,
            cpus: [{ load: 20 }, { load: 24 }],
        } as any);

        vi.mocked(si.processes).mockResolvedValue({
            all: 215,
            running: 8,
        } as any);

        vi.mocked(si.mem).mockResolvedValue({
            total: 32000000000,
            used: 12000000000,
            available: 20000000000,
            free: 18000000000,
            swaptotal: 0,
            swapused: 0,
        } as any);

        vi.mocked(si.fsSize).mockResolvedValue([
            {
                fs: 'C:',
                mount: 'C:\\',
                type: 'SSD',
                size: 1000,
                used: 500,
                available: 500,
                use: 50,
            },
        ] as any);

        vi.mocked(si.battery).mockResolvedValue({
            hasBattery: false,
        } as any);

        vi.mocked(si.graphics).mockResolvedValue({
            controllers: [
                {
                    vendor: 'NVIDIA',
                    model: 'RTX 4070',
                    vram: 12000,
                },
            ],
        } as any);

        vi.mocked(si.networkInterfaces).mockResolvedValue([
            {
                internal: false,
                ip4: '192.168.1.20',
                mac: '00:11:22:33:44:55',
                iface: 'Ethernet',
            },
        ] as any);

        vi.mocked(si.time).mockResolvedValue({
            uptime: 3600,
        } as any);
    });

    it('builds a complete PcHealth object', async () => {
        const result = await provider.getHealth();

        expect(result.hostname).toBe('Aaron-PC');
        expect(result.operatingSystem).toBe('Windows 11');
        expect(result.platform).toBe('win32');
        expect(result.architecture).toBe('x64');

        expect(result.cpu.manufacturer).toBe('Intel');
        expect(result.cpu.model).toContain('Core');

        expect(result.memory.totalBytes).toBe(32000000000);

        expect(result.disks).toHaveLength(1);
        expect(result.network.hostname).toBe('Aaron-PC');

        expect(result.gpu).toHaveLength(1);
    });

    it('returns Healthy status for low utilization', async () => {
        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Healthy');
    });

    it('returns Warning for high cpu', async () => {
        vi.mocked(si.currentLoad).mockResolvedValue({
            currentLoad: 80,
            cpus: [{ load: 80 }],
        } as any);

        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Warning');
    });

    it('returns Critical for very high cpu', async () => {
        vi.mocked(si.currentLoad).mockResolvedValue({
            currentLoad: 96,
            cpus: [{ load: 96 }],
        } as any);

        const result = await provider.getHealth();

        expect(result.overallStatus).toBe('Critical');
    });

    it('filters unsupported disks', async () => {
        vi.mocked(si.fsSize).mockResolvedValue([
            {
                fs: 'none',
                mount: '/usr',
                type: 'SSD',
                size: 1,
                used: 1,
                available: 0,
                use: 100,
            },
            {
                fs: 'C:',
                mount: 'C:\\',
                type: 'SSD',
                size: 100,
                used: 50,
                available: 50,
                use: 50,
            },
        ] as any);

        const result = await provider.getHealth();

        expect(result.disks).toHaveLength(1);
    });

    it('returns no battery when the machine has none', async () => {
        const result = await provider.getHealth();

        expect(result.battery).toBeUndefined();
    });

    it('maps battery information', async () => {
        vi.mocked(si.battery).mockResolvedValue({
            hasBattery: true,
            percent: 80,
            isCharging: true,
            cycleCount: 200,
            timeRemaining: 120,
        } as any);

        const result = await provider.getHealth();

        expect(result.battery).toBeDefined();
        expect(result.battery?.percentage).toBe(80);
        expect(result.battery?.charging).toBe(true);
    });
});
