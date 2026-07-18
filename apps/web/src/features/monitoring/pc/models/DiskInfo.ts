import { HealthMetric } from '../types/HealthMetric';

export interface DiskInfo extends HealthMetric {
    id: string;

    mountPoint: string;

    label: string;

    fileSystem: string;

    type: 'SSD' | 'HDD' | 'NVMe' | 'Network';

    totalBytes: number;

    usedBytes: number;

    freeBytes: number;

    usagePercent: number;

    readSpeedMBps?: number;

    writeSpeedMBps?: number;

    temperatureC?: number;

    healthPercent?: number;
}
