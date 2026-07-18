import { HealthStatus } from '../types';
import { BatteryInfo } from './BatteryInfo';
import { CpuInfo } from './CpuInfo';
import { DiskInfo } from './DiskInfo';
import { GpuInfo } from './GpuInfo';
import { MemoryInfo } from './MemoryInfo';
import { NetworkInfo } from './NetworkInfo';

export interface PcHealth {
    hostname: string;
    operatingSystem: string;
    platform: string;
    architecture: string;

    uptime: number;
    bootTime: Date;

    overallStatus: HealthStatus;

    lastUpdated: Date;

    cpu: CpuInfo;
    memory: MemoryInfo;
    disks: DiskInfo[];
    network: NetworkInfo;
    gpu?: GpuInfo[];
    battery?: BatteryInfo;
}
