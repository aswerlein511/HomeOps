import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DiskUsage } from '@/features/monitoring/pc/components';

describe('DiskUsage', () => {
    it('renders first disk usage', () => {
        render(
            <DiskUsage
                disks={
                    [
                        {
                            label: 'C:',
                            usagePercent: 72,
                            healthPercent: 99,
                        },
                    ] as any
                }
            />,
        );

        expect(screen.getByText('Disk Usage: 72%')).toBeInTheDocument();
    });

    it('uses first disk when multiple disks exist', () => {
        render(
            <DiskUsage
                disks={
                    [
                        {
                            label: 'C:',
                            usagePercent: 40,
                            healthPercent: 100,
                        },
                        {
                            label: 'D:',
                            usagePercent: 90,
                            healthPercent: 95,
                        },
                    ] as any
                }
            />,
        );

        expect(screen.getByText('Disk Usage: 40%')).toBeInTheDocument();
    });

    it('renders zero usage', () => {
        render(
            <DiskUsage
                disks={
                    [
                        {
                            label: 'C:',
                            usagePercent: 0,
                            healthPercent: 100,
                        },
                    ] as any
                }
            />,
        );

        expect(screen.getByText('Disk Usage: 0%')).toBeInTheDocument();
    });
});
