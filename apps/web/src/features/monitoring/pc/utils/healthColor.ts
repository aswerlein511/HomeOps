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
