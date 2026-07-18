import type { CpuInfo } from '../models';

interface Props {
    cpu: CpuInfo;
}

export function CpuUsage({ cpu }: Props) {
    return <>CPU Usage: {cpu.usagePercent}%</>;
}
