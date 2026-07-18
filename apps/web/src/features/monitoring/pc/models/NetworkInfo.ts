import { HealthMetric } from '../types/HealthMetric';

export interface NetworkInfo extends HealthMetric {
    hostname: string;

    ipAddress: string;

    macAddress: string;

    interfaceName: string;

    gateway: string;

    dnsServers: string[];

    uploadMbps: number;

    downloadMbps: number;

    latencyMs: number;

    packetsSent: number;

    packetsReceived: number;
}
