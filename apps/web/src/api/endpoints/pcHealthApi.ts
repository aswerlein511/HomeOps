import type { PcHealth } from '@homeops/shared';

const BASE_URL = 'http://localhost:3001/api';

export const pcHealthApi = {
    async getHealth(): Promise<PcHealth> {
        const response = await fetch(`${BASE_URL}/pc-health`);

        if (!response.ok) {
            throw new Error('Failed to fetch PC Health');
        }

        return response.json();
    },
};
