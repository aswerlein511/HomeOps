import { getMockPcHealth, type MockScenario } from '../../mocks';
import type { PcHealth } from '../../models';

import type { PcHealthProvider } from './PcHealthProvider';

export class MockPcHealthProvider implements PcHealthProvider {
    async getHealth(): Promise<PcHealth> {
        const scenario = (import.meta.env.VITE_PC_HEALTH_SCENARIO ?? 'healthy') as MockScenario;

        return getMockPcHealth(scenario);
    }
}
