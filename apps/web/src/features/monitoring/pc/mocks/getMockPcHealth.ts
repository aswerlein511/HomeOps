import type { PcHealth } from '../models';

import { criticalPc } from './criticalPc.mock';
import { healthyPc } from './healthyPc.mock';
import type { MockScenario } from './mockScenario';
import { offlinePc } from './offlinePc.mock';
import { warningPc } from './warningPc.mock';

export function getMockPcHealth(scenario: MockScenario): PcHealth {
    switch (scenario) {
        case 'warning':
            return warningPc;

        case 'critical':
            return criticalPc;

        case 'offline':
            return offlinePc;

        case 'healthy':
        default:
            return healthyPc;
    }
}
