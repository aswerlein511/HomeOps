import { useCallback, useEffect, useState } from 'react';

import type { PcHealth } from '@homeops/shared';
import { pcHealthService } from '../services';

export function usePcHealth() {
    const [health, setHealth] = useState<PcHealth>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    const loadHealth = useCallback(async () => {
        try {
            setLoading(true);
            setError(undefined);

            const result = await pcHealthService.getHealth();

            setHealth(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadHealth();
    }, [loadHealth]);

    return {
        health,
        loading,
        error,
        refresh: loadHealth,
    };
}
