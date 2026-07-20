import type { PcHealth } from '@homeops/shared/monitoring/models';

export interface PcHealthProvider {
    getHealth(): Promise<PcHealth>;
}
