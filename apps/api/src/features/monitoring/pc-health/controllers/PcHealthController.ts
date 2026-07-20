import type { Request, Response } from 'express';

import { PcHealthService } from '../services/PcHealthService';

export class PcHealthController {
    constructor(private readonly service: PcHealthService = new PcHealthService()) {}

    async getPcHealth(_req: Request, res: Response): Promise<void> {
        try {
            const health = await this.service.getHealth();

            res.json(health);
        } catch (error) {
            console.error('Failed to retrieve PC health.', error);

            res.status(500).json({
                message: 'Unable to retrieve PC health.',
            });
        }
    }
}
