import { Card, CardContent, CardHeader, Chip, Divider, Stack, Typography } from '@mui/material';

import { Metric } from '@/ui/common';

import { usePcHealth } from '../hooks';

export function PcHealthCard() {
    const { health, loading } = usePcHealth();

    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Typography>Loading PC Health...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (!health) {
        return (
            <Card>
                <CardContent>
                    <Typography>No PC health data available.</Typography>
                </CardContent>
            </Card>
        );
    }

    const disk = health.disks[0];

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

                        <Metric label='Usage' value={`${health.cpu.usagePercent}%`} />

                        <Metric label='Temperature' value={`${health.cpu.temperatureC} °C`} />
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

                        <Metric label='Drive' value={disk.label} />

                        <Metric label='Usage' value={`${disk.usagePercent}%`} />

                        <Metric label='Health' value={`${disk.healthPercent}%`} />
                    </div>

                    <Divider />

                    <div>
                        <Typography variant='h6' gutterBottom>
                            Network
                        </Typography>

                        <Metric label='Download' value={`${health.network.downloadMbps} Mbps`} />

                        <Metric label='Upload' value={`${health.network.uploadMbps} Mbps`} />

                        <Metric label='Latency' value={`${health.network.latencyMs} ms`} />
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}
