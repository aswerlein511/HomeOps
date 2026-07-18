import { HealthMetric } from '../types/HealthMetric';

export interface BatteryInfo extends HealthMetric {
    percentage: number;

    charging: boolean;

    cycleCount?: number;

    healthPercent?: number;

    estimatedRemainingMinutes?: number;
}
