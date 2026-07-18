import type { HealthStatus } from '../types';

interface Props {
    status: HealthStatus;
}

export function StatusBadge({ status }: Props) {
    return <>{status}</>;
}
