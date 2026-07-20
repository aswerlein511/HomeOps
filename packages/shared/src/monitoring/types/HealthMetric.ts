import { HealthStatus } from './HealthStatus';

export interface HealthMetric {
    status: HealthStatus;
    lastUpdated: Date;
}
