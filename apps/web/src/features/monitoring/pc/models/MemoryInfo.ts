import { HealthMetric } from '../types/HealthMetric';

export interface MemoryInfo extends HealthMetric {
    totalBytes: number;

    usedBytes: number;

    availableBytes: number;

    freeBytes: number;

    usagePercent: number;

    swapTotalBytes: number;

    swapUsedBytes: number;

    swapUsagePercent: number;
}
