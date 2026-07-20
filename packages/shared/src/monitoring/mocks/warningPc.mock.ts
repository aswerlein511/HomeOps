import type { PcHealth } from '../models';

import { healthyPc } from './healthyPc.mock';

export const warningPc: PcHealth = {
    ...healthyPc,

    overallStatus: 'Warning',

    cpu: {
        ...healthyPc.cpu,
        usagePercent: 74,
        temperatureC: 81,
        status: 'Warning',
    },

    memory: {
        ...healthyPc.memory,
        usagePercent: 84,
        status: 'Warning',
    },

    disks: healthyPc.disks.map((disk) => ({
        ...disk,
        usagePercent: disk.id === 'C' ? 82 : disk.usagePercent,
        status: 'Warning',
    })),
};
