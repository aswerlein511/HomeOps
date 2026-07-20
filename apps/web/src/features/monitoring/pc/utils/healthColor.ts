import type { HealthStatus } from '@homeops/shared';
import type { ChipProps } from '@mui/material';

export function getHealthColor(status: HealthStatus): ChipProps['color'] {
    switch (status) {
        case 'Healthy':
            return 'success';

        case 'Warning':
            return 'warning';

        case 'Critical':
            return 'error';

        default:
            return 'default';
    }
}
