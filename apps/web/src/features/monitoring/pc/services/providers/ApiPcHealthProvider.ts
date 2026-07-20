import { pcHealthApi } from '@/api/endpoints/pcHealthApi';
import type { PcHealth } from '../../../../../../../../packages/shared/src/monitoring/models';

export class ApiPcHealthProvider {
    async getHealth(): Promise<PcHealth> {
        return pcHealthApi.getHealth();
    }
}
