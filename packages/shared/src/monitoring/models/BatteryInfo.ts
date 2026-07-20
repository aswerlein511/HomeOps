import { HealthMetric } from '../types';

export interface BatteryInfo extends HealthMetric {
    percentage: number;

    charging: boolean;

    cycleCount?: number;

    healthPercent?: number;

    estimatedRemainingMinutes?: number;
}
