import type { PcHealth } from '../models';

import { healthyPc } from './healthyPc.mock';

export const criticalPc: PcHealth = {
    ...healthyPc,

    overallStatus: 'Critical',

    cpu: {
        ...healthyPc.cpu,
        usagePercent: 99,
        temperatureC: 98,
        status: 'Critical',
    },

    memory: {
        ...healthyPc.memory,
        usagePercent: 96,
        status: 'Critical',
    },

    disks: healthyPc.disks.map((disk) => ({
        ...disk,
        usagePercent: 97,
        healthPercent: 42,
        status: 'Critical',
    })),

    network: {
        ...healthyPc.network,
        latencyMs: 240,
        uploadMbps: 2,
        downloadMbps: 12,
        status: 'Critical',
    },
};
