import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CpuUsage } from '@/features/monitoring/pc/components';

describe('CpuUsage', () => {
    const cpu = {
        model: 'Intel Core Ultra 9 285K',
        usagePercent: 31,
        temperatureC: 55,
    };

    it('renders cpu usage percentage', () => {
        render(<CpuUsage cpu={cpu as any} />);

        expect(screen.getByText('CPU Usage: 31%')).toBeInTheDocument();
    });

    it('updates when usage changes', () => {
        render(
            <CpuUsage
                cpu={
                    {
                        ...cpu,
                        usagePercent: 82,
                    } as any
                }
            />,
        );

        expect(screen.getByText('CPU Usage: 82%')).toBeInTheDocument();
    });

    it('renders 0 percent', () => {
        render(
            <CpuUsage
                cpu={
                    {
                        ...cpu,
                        usagePercent: 0,
                    } as any
                }
            />,
        );

        expect(screen.getByText('CPU Usage: 0%')).toBeInTheDocument();
    });

    it('renders 100 percent', () => {
        render(
            <CpuUsage
                cpu={
                    {
                        ...cpu,
                        usagePercent: 100,
                    } as any
                }
            />,
        );

        expect(screen.getByText('CPU Usage: 100%')).toBeInTheDocument();
    });
});
