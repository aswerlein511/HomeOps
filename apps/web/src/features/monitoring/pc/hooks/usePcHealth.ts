import { useEffect, useState } from 'react';

import { PcHealth } from '../models';
import { pcHealthService } from '../services';

export function usePcHealth() {
    const [health, setHealth] = useState<PcHealth | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);

            const data = await pcHealthService.getHealth();

            setHealth(data);
            setLoading(false);
        }

        load();
    }, []);

    return {
        health,
        loading,
    };
}
