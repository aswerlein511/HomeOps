import { describe, expect, it } from 'vitest';
import router from '../../src/features/monitoring/pc-health/routes/pcHealthRoutes';

describe('pcHealthRoutes', () => {
    it('exports an Express router', () => {
        expect(router).toBeDefined();
    });

    it('contains a GET / route', () => {
        const stack = (router as any).stack;

        expect(Array.isArray(stack)).toBe(true);

        const routeLayer = stack.find((layer: any) => layer.route && layer.route.path === '/');

        expect(routeLayer).toBeDefined();

        expect(routeLayer.route.methods.get).toBe(true);
    });
});
