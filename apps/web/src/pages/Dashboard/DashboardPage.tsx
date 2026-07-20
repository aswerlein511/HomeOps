import { Alert, CircularProgress } from '@mui/material';
import React from 'react';

import { PcHealthCard } from '@/features/monitoring/pc';
import { usePcHealth } from '@/features/monitoring/pc/hooks';

const DashboardPage = (): React.JSX.Element => {
    const { health, loading, error } = usePcHealth();

    return (
        <main style={{ padding: '48px' }}>
            <h1>Dashboard</h1>

            {loading && <CircularProgress />}

            {error && <Alert severity='error'>Failed to load PC Health.</Alert>}

            {health && <PcHealthCard health={health} />}
        </main>
    );
};

export default DashboardPage;
