import si from 'systeminformation';

import type {
    BatteryInfo,
    CpuInfo,
    DiskInfo,
    GpuInfo,
    MemoryInfo,
    NetworkInfo,
    PcHealth,
} from '@homeops/shared/monitoring/models';

import type { HealthStatus } from '@homeops/shared/monitoring/types';

import { PcHealthProvider } from './PcHealthProvider';

export class SystemInformationProvider implements PcHealthProvider {
    public async getHealth(): Promise<PcHealth> {
        const [os, cpu, load, processes, memory, disks, battery, graphics, network, time] =
            await Promise.all([
                si.osInfo(),
                si.cpu(),
                si.currentLoad(),
                si.processes(),
                si.mem(),
                si.fsSize(),
                si.battery(),
                si.graphics(),
                si.networkInterfaces(),
                si.time(),
            ]);

        const cpuInfo = this.buildCpu(cpu, load, processes);

        const memoryInfo = this.buildMemory(memory);

        const diskInfo = this.buildDisks(disks);

        const networkInfo = this.buildNetwork(network, os.hostname);

        const gpuInfo = this.buildGpu(graphics);

        const batteryInfo = this.buildBattery(battery);

        return {
            hostname: os.hostname,

            operatingSystem: `${os.distro} ${os.release}`,

            platform: os.platform,

            architecture: os.arch,

            uptime: time.uptime,

            bootTime: new Date(Date.now() - time.uptime * 1000),

            overallStatus: this.calculateOverallStatus(cpuInfo, memoryInfo, diskInfo),

            lastUpdated: new Date(),

            cpu: cpuInfo,

            memory: memoryInfo,

            disks: diskInfo,

            network: networkInfo,

            gpu: gpuInfo,

            battery: batteryInfo,
        };
    }

    private buildCpu(
        cpu: si.Systeminformation.CpuData,
        load: si.Systeminformation.CurrentLoadData,
        processes: si.Systeminformation.ProcessesData,
    ): CpuInfo {
        const usage = Number(load.currentLoad.toFixed(1));

        return {
            manufacturer: cpu.manufacturer,

            model: cpu.brand,

            physicalCores: cpu.physicalCores,

            logicalCores: cpu.cores,

            baseClockGHz: Number(cpu.speedMin),

            maxClockGHz: Number(cpu.speedMax),

            currentClockGHz: Number(cpu.speed),

            usagePercent: usage,

            temperatureC: undefined,

            loadPerCore: load.cpus.map((c) => Number(c.load.toFixed(1))),

            processes: processes.all,

            threads: processes.running,

            status: this.metricStatus(usage),

            lastUpdated: new Date(),
        };
    }

    private buildMemory(memory: si.Systeminformation.MemData): MemoryInfo {
        const usage = Number(((memory.used / memory.total) * 100).toFixed(1));

        const swapUsage =
            memory.swaptotal === 0
                ? 0
                : Number(((memory.swapused / memory.swaptotal) * 100).toFixed(1));

        return {
            totalBytes: memory.total,

            usedBytes: memory.used,

            availableBytes: memory.available,

            freeBytes: memory.free,

            usagePercent: usage,

            swapTotalBytes: memory.swaptotal,

            swapUsedBytes: memory.swapused,

            swapUsagePercent: swapUsage,

            status: this.metricStatus(usage),

            lastUpdated: new Date(),
        };
    }

    private buildDisks(disks: si.Systeminformation.FsSizeData[]): DiskInfo[] {
        return disks

            .filter((d) => {
                if (d.fs === 'none') {
                    return false;
                }

                if (d.mount.startsWith('/usr')) {
                    return false;
                }

                if (d.mount.startsWith('/mnt/wsl')) {
                    return false;
                }

                return true;
            })

            .map((disk, index) => ({
                id: String(index),

                mountPoint: disk.mount,

                label: disk.fs,

                fileSystem: disk.fs,

                type: disk.type === 'NVMe' ? 'NVMe' : disk.type === 'SSD' ? 'SSD' : 'HDD',

                totalBytes: disk.size,

                usedBytes: disk.used,

                freeBytes: disk.available,

                usagePercent: Number(disk.use.toFixed(1)),

                readSpeedMBps: undefined,

                writeSpeedMBps: undefined,

                temperatureC: undefined,

                healthPercent: 100,

                status: this.metricStatus(disk.use),

                lastUpdated: new Date(),
            }));
    }

    private buildNetwork(
        adapters: si.Systeminformation.NetworkInterfacesData[],
        hostname: string,
    ): NetworkInfo {
        const nic = adapters.find((adapter) => !adapter.internal) ?? adapters[0];

        return {
            hostname,

            ipAddress: nic?.ip4 ?? '',

            macAddress: nic?.mac ?? '',

            interfaceName: nic?.iface ?? '',

            gateway: '',

            dnsServers: [],

            uploadMbps: 0,

            downloadMbps: 0,

            latencyMs: 0,

            packetsSent: 0,

            packetsReceived: 0,

            status: 'Healthy',

            lastUpdated: new Date(),
        };
    }

    private buildGpu(graphics: si.Systeminformation.GraphicsData): GpuInfo[] {
        return graphics.controllers.map((controller) => ({
            manufacturer: controller.vendor,

            model: controller.model,

            memoryTotalMB: controller.vram ?? 0,

            memoryUsedMB: 0,

            usagePercent: 0,

            status: 'Healthy',

            lastUpdated: new Date(),
        }));
    }

    private buildBattery(battery: si.Systeminformation.BatteryData): BatteryInfo | undefined {
        if (!battery.hasBattery) {
            return undefined;
        }

        return {
            percentage: battery.percent,

            charging: battery.isCharging,

            cycleCount: battery.cycleCount,

            healthPercent: undefined,

            estimatedRemainingMinutes: battery.timeRemaining ?? undefined,

            status: this.metricStatus(battery.percent),

            lastUpdated: new Date(),
        };
    }

    private calculateOverallStatus(
        cpu: CpuInfo,
        memory: MemoryInfo,
        disks: DiskInfo[],
    ): HealthStatus {
        const diskCritical = disks.some((d) => d.usagePercent >= 95);

        const diskWarning = disks.some((d) => d.usagePercent >= 85);

        if (cpu.usagePercent >= 90 || memory.usagePercent >= 90 || diskCritical) {
            return 'Critical';
        }

        if (cpu.usagePercent >= 75 || memory.usagePercent >= 75 || diskWarning) {
            return 'Warning';
        }

        return 'Healthy';
    }

    private metricStatus(value: number): HealthStatus {
        if (value >= 90) {
            return 'Critical';
        }

        if (value >= 75) {
            return 'Warning';
        }

        return 'Healthy';
    }
}
