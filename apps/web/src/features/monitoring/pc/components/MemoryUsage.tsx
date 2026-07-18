import type { MemoryInfo } from '../models';

interface Props {
    memory: MemoryInfo;
}

export function MemoryUsage({ memory }: Props) {
    return <>Memory Usage: {memory.usagePercent}%</>;
}
