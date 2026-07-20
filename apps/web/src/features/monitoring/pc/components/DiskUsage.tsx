import type { DiskInfo } from '../../../../../../../packages/shared/src/monitoring/models';

interface Props {
    disks: DiskInfo[];
}

export function DiskUsage({ disks }: Props) {
    return <>Disk Usage: {disks[0].usagePercent}%</>;
}
