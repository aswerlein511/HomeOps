import type { HealthStatus } from '@homeops/shared';

interface Props {
    status: HealthStatus;
}

export function StatusBadge({ status }: Props) {
    return <>{status}</>;
}
