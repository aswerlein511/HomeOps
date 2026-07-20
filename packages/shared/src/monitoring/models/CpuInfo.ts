import { HealthMetric } from '../types';

export interface CpuInfo extends HealthMetric {
    manufacturer: string;
    model: string;

    physicalCores: number;
    logicalCores: number;

    baseClockGHz: number;
    maxClockGHz: number;
    currentClockGHz: number;

    usagePercent: number;

    temperatureC?: number;

    loadPerCore: number[];

    processes: number;
    threads: number;
}
