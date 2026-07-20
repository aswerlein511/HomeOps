import { Card, CardContent, CardHeader, Chip, Divider, Stack, Typography } from '@mui/material';

import { Metric } from '@/ui/common';
import type { PcHealth } from '@homeops/shared';

interface PcHealthCardProps {
    health: PcHealth;
}

export function PcHealthCard({ health }: PcHealthCardProps) {
    const disk =
        health.disks.find((d) => d.label === 'C:\\') ??
        health.disks.find((d) => d.mountPoint === '/') ??
        health.disks.find((d) => d.fileSystem?.startsWith('/dev')) ??
        health.disks[0];

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader
                title={health.hostname}
                subheader={health.operatingSystem}
                action={
                    <Chip
                        label={health.overallStatus}
                        color={
                            health.overallStatus === 'Healthy'
                                ? 'success'
                                : health.overallStatus === 'Warning'
                                  ? 'warning'
                                  : health.overallStatus === 'Critical'
                                    ? 'error'
                                    : 'default'
                        }
                    />
                }
            />

            <Divider />

            <CardContent>
                <Stack spacing={3}>
                    <div>
                        <Typography variant='h6' gutterBottom>
                            CPU
                        </Typography>

                        <Metric label='Model' value={health.cpu.model} />

                        <Metric label='Usage' value={`${health.cpu.usagePercent.toFixed(1)}%`} />

                        <Metric
                            label='Temperature'
                            value={
                                health.cpu.temperatureC != null
                                    ? `${health.cpu.temperatureC.toFixed(1)} °C`
                                    : 'N/A'
                            }
                        />
                    </div>

                    <Divider />

                    <div>
                        <Typography variant='h6' gutterBottom>
                            Memory
                        </Typography>

                        <Metric label='Usage' value={`${health.memory.usagePercent}%`} />
                        <Metric
                            label='Used'
                            value={`${(health.memory.usedBytes / 1024 ** 3).toFixed(1)} GB`}
                        />
                        <Metric
                            label='Total'
                            value={`${(health.memory.totalBytes / 1024 ** 3).toFixed(1)} GB`}
                        />
                    </div>

                    <Divider />

                    <div>
                        <Typography variant='h6' gutterBottom>
                            Disk
                        </Typography>

                        <Metric label='Drive' value={disk?.label ?? 'N/A'} />

                        <Metric
                            label='Usage'
                            value={disk ? `${disk.usagePercent.toFixed(1)}%` : 'N/A'}
                        />

                        <Metric
                            label='Health'
                            value={disk?.healthPercent != null ? `${disk.healthPercent}%` : 'N/A'}
                        />
                    </div>

                    <Divider />

                    <div>
                        <Typography variant='h6' gutterBottom>
                            Network
                        </Typography>

                        <Metric
                            label='Download'
                            value={
                                health.network.downloadMbps > 0
                                    ? `${health.network.downloadMbps.toFixed(1)} Mbps`
                                    : 'N/A'
                            }
                        />

                        <Metric
                            label='Upload'
                            value={
                                health.network.uploadMbps > 0
                                    ? `${health.network.uploadMbps.toFixed(1)} Mbps`
                                    : 'N/A'
                            }
                        />

                        <Metric
                            label='Latency'
                            value={
                                health.network.latencyMs > 0
                                    ? `${health.network.latencyMs.toFixed(0)} ms`
                                    : 'N/A'
                            }
                        />
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}
