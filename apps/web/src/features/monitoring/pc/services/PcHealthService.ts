import { PcHealth } from '../models';
import { MockPcHealthProvider, PcHealthProvider } from './providers';

export class PcHealthService {
    constructor(private readonly provider: PcHealthProvider = new MockPcHealthProvider()) {}

    async getHealth(): Promise<PcHealth> {
        return this.provider.getHealth();
    }
}

export const pcHealthService = new PcHealthService();
