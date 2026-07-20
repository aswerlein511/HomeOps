import type { CpuInfo } from '../../../../../../../packages/shared/src/monitoring/models';

interface Props {
    cpu: CpuInfo;
}

export function CpuUsage({ cpu }: Props) {
    return <>CPU Usage: {cpu.usagePercent}%</>;
}
