import { getMockPcHealth, type MockScenario, type PcHealth } from '@homeops/shared';

export class MockPcHealthProvider {
    async getHealth(): Promise<PcHealth> {
        const scenario = (process.env.PC_HEALTH_SCENARIO ?? 'healthy') as MockScenario;

        return getMockPcHealth(scenario);
    }
}
