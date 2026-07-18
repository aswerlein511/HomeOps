import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MemoryUsage } from '@/features/monitoring/pc/components';

describe('MemoryUsage', () => {
    const memory = {
        usagePercent: 48,
        usedBytes: 16,
        totalBytes: 32,
    };

    it('renders memory usage', () => {
        render(<MemoryUsage memory={memory as any} />);

        expect(screen.getByText('Memory Usage: 48%')).toBeInTheDocument();
    });

    it('renders updated usage', () => {
        render(
            <MemoryUsage
                memory={
                    {
                        ...memory,
                        usagePercent: 76,
                    } as any
                }
            />,
        );

        expect(screen.getByText('Memory Usage: 76%')).toBeInTheDocument();
    });

    it('renders 0 percent', () => {
        render(
            <MemoryUsage
                memory={
                    {
                        ...memory,
                        usagePercent: 0,
                    } as any
                }
            />,
        );

        expect(screen.getByText('Memory Usage: 0%')).toBeInTheDocument();
    });

    it('renders 100 percent', () => {
        render(
            <MemoryUsage
                memory={
                    {
                        ...memory,
                        usagePercent: 100,
                    } as any
                }
            />,
        );

        expect(screen.getByText('Memory Usage: 100%')).toBeInTheDocument();
    });
});
