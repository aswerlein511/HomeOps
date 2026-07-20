import type { Request, Response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PcHealthController } from '../../src/features/monitoring/pc-health/controllers/PcHealthController';

describe('PcHealthController', () => {
    let mockService: {
        getHealth: ReturnType<typeof vi.fn>;
    };

    let controller: PcHealthController;

    beforeEach(() => {
        mockService = {
            getHealth: vi.fn(),
        };

        controller = new PcHealthController(mockService as any);
    });

    it('returns the health payload', async () => {
        const payload = {
            hostname: 'Aaron-PC',
            overallStatus: 'Healthy',
        };

        mockService.getHealth.mockResolvedValue(payload);

        const json = vi.fn();
        const status = vi.fn().mockReturnThis();

        const res = {
            json,
            status,
        } as unknown as Response;

        await controller.getPcHealth({} as Request, res);

        expect(mockService.getHealth).toHaveBeenCalledOnce();
        expect(json).toHaveBeenCalledWith(payload);
        expect(status).not.toHaveBeenCalled();
    });

    it('returns HTTP 500 when the service throws', async () => {
        mockService.getHealth.mockRejectedValue(new Error('Something failed'));

        const json = vi.fn();
        const status = vi.fn().mockReturnThis();

        const res = {
            json,
            status,
        } as unknown as Response;

        await controller.getPcHealth({} as Request, res);

        expect(status).toHaveBeenCalledWith(500);

        expect(json).toHaveBeenCalledWith({
            message: 'Unable to retrieve PC health.',
        });
    });
});
