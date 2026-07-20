import type { MemoryInfo } from '../../../../../../../packages/shared/src/monitoring/models';

interface Props {
    memory: MemoryInfo;
}

export function MemoryUsage({ memory }: Props) {
    return <>Memory Usage: {memory.usagePercent}%</>;
}
