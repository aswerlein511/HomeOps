import { HealthMetric } from '../types';

export interface GpuInfo extends HealthMetric {
    manufacturer: string;

    model: string;

    memoryTotalMB: number;

    memoryUsedMB: number;

    usagePercent: number;

    temperatureC?: number;

    fanSpeedPercent?: number;

    powerDrawWatts?: number;
}
