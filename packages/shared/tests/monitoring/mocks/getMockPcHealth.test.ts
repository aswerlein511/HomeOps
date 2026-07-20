import { describe, expect, it } from 'vitest';

import {
    criticalPc,
    getMockPcHealth,
    healthyPc,
    offlinePc,
    warningPc,
} from '../../../src/monitoring/mocks';

describe('getMockPcHealth', () => {
    it('returns healthy mock', () => {
        expect(getMockPcHealth('healthy')).toBe(healthyPc);
    });

    it('returns warning mock', () => {
        expect(getMockPcHealth('warning')).toBe(warningPc);
    });

    it('returns critical mock', () => {
        expect(getMockPcHealth('critical')).toBe(criticalPc);
    });

    it('returns offline mock', () => {
        expect(getMockPcHealth('offline')).toBe(offlinePc);
    });

    it('defaults to healthy', () => {
        expect(getMockPcHealth('invalid' as never)).toBe(healthyPc);
    });
});
