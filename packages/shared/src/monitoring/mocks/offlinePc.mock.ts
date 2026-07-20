import type { PcHealth } from '../models';

import { healthyPc } from './healthyPc.mock';

export const offlinePc: PcHealth = {
    ...healthyPc,

    overallStatus: 'Offline',

    cpu: {
        ...healthyPc.cpu,
        usagePercent: 0,
        temperatureC: 0,
        status: 'Offline',
    },

    memory: {
        ...healthyPc.memory,
        usagePercent: 0,
        status: 'Offline',
    },

    disks: [],

    network: {
        ...healthyPc.network,
        uploadMbps: 0,
        downloadMbps: 0,
        latencyMs: 0,
        status: 'Offline',
    },
};
