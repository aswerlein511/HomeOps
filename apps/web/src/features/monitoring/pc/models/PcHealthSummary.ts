export interface PcHealthSummary {
    hostname: string;

    cpuUsage: number;

    memoryUsage: number;

    diskUsage: number;

    lastUpdated: Date;
}
