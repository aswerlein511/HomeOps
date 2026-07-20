import { PcHealthProvider } from './providers';

export class PcHealthService {
    private readonly provider = new PcHealthProvider();

    async getHealth() {
        return this.provider.getHealth();
    }
}

/**
 * Shared singleton instance used by the React hook and unit tests.
 */
export const pcHealthService = new PcHealthService();
