import { Stack, Typography } from '@mui/material';

export interface MetricProps {
    label: string;
    value: string | number;
}

export function Metric({ label, value }: MetricProps) {
    return (
        <Stack direction='row' justifyContent='space-between'>
            <Typography color='text.secondary'>{label}</Typography>

            <Typography fontWeight={600}>{value}</Typography>
        </Stack>
    );
}
