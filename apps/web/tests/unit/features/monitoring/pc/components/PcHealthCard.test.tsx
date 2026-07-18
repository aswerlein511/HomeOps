import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PcHealthCard } from '@/features/monitoring/pc/components';
import { usePcHealth } from '@/features/monitoring/pc/hooks';
import { theme } from '@/theme';

vi.mock('@/features/monitoring/pc/hooks', () => ({
    usePcHealth: vi.fn(),
}));

vi.mock('@/ui/common', () => ({
    Metric: ({ label, value }: { label: string; value: string }) => (
        <div data-testid={`metric-${label}`}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    ),
}));

const mockedUsePcHealth = vi.mocked(usePcHealth);

const mockHealth = {
    hostname: 'Aaron-PC',
    operatingSystem: 'Windows 11 Pro',
    overallStatus: 'Healthy',

    cpu: {
        model: 'Intel Core Ultra 9 285K',
        usagePercent: 31,
        temperatureC: 55,
    },

    memory: {
        usagePercent: 48,
        usedBytes: 16 * 1024 ** 3,
        totalBytes: 32 * 1024 ** 3,
    },

    disks: [
        {
            label: 'C:',
            usagePercent: 72,
            healthPercent: 99,
        },
    ],

    network: {
        downloadMbps: 965,
        uploadMbps: 42,
        latencyMs: 8,
    },
};

const renderComponent = () =>
    render(
        <ThemeProvider theme={theme}>
            <PcHealthCard />
        </ThemeProvider>,
    );

describe('PcHealthCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('loading state', () => {
        beforeEach(() => {
            mockedUsePcHealth.mockReturnValue({
                loading: true,
                health: undefined,
            } as any);
        });

        it('renders loading message', () => {
            renderComponent();

            expect(screen.getByText('Loading PC Health...')).toBeInTheDocument();
        });

        it('does not render hostname', () => {
            renderComponent();

            expect(screen.queryByText('Aaron-PC')).not.toBeInTheDocument();
        });

        it('does not render metrics', () => {
            renderComponent();

            expect(screen.queryByTestId('metric-Model')).not.toBeInTheDocument();
        });
    });

    describe('empty state', () => {
        beforeEach(() => {
            mockedUsePcHealth.mockReturnValue({
                loading: false,
                health: undefined,
            } as any);
        });

        it('renders empty message', () => {
            renderComponent();

            expect(screen.getByText('No PC health data available.')).toBeInTheDocument();
        });

        it('does not render any metrics', () => {
            renderComponent();

            expect(screen.queryByTestId('metric-Model')).not.toBeInTheDocument();
        });
    });

    describe('healthy pc', () => {
        beforeEach(() => {
            mockedUsePcHealth.mockReturnValue({
                loading: false,
                health: mockHealth,
            } as any);
        });

        it('renders hostname', () => {
            renderComponent();

            expect(screen.getByText('Aaron-PC')).toBeInTheDocument();
        });

        it('renders operating system', () => {
            renderComponent();

            expect(screen.getByText('Windows 11 Pro')).toBeInTheDocument();
        });

        it('renders healthy status chip', () => {
            renderComponent();

            expect(screen.getByText('Healthy')).toBeInTheDocument();
        });

        it('renders CPU heading', () => {
            renderComponent();

            expect(screen.getByText('CPU')).toBeInTheDocument();
        });

        it('renders Memory heading', () => {
            renderComponent();

            expect(screen.getByText('Memory')).toBeInTheDocument();
        });

        it('renders Disk heading', () => {
            renderComponent();

            expect(screen.getByText('Disk')).toBeInTheDocument();
        });

        it('renders Network heading', () => {
            renderComponent();

            expect(screen.getByText('Network')).toBeInTheDocument();
        });

        it('renders cpu model', () => {
            renderComponent();

            expect(screen.getByText('Intel Core Ultra 9 285K')).toBeInTheDocument();
        });

        it('renders cpu usage', () => {
            renderComponent();

            expect(screen.getByText('31%')).toBeInTheDocument();
        });

        it('renders cpu temperature', () => {
            renderComponent();

            expect(screen.getByText('55 °C')).toBeInTheDocument();
        });

        it('renders memory usage', () => {
            renderComponent();

            expect(screen.getByText('48%')).toBeInTheDocument();
        });

        it('renders used memory', () => {
            renderComponent();

            expect(screen.getByText('16.0 GB')).toBeInTheDocument();
        });

        it('renders total memory', () => {
            renderComponent();

            expect(screen.getByText('32.0 GB')).toBeInTheDocument();
        });

        it('renders drive label', () => {
            renderComponent();

            expect(screen.getByText('C:')).toBeInTheDocument();
        });

        it('renders disk usage', () => {
            renderComponent();

            expect(screen.getByText('72%')).toBeInTheDocument();
        });

        it('renders disk health', () => {
            renderComponent();

            expect(screen.getByText('99%')).toBeInTheDocument();
        });

        it('renders download speed', () => {
            renderComponent();

            expect(screen.getByText('965 Mbps')).toBeInTheDocument();
        });

        it('renders upload speed', () => {
            renderComponent();

            expect(screen.getByText('42 Mbps')).toBeInTheDocument();
        });

        it('renders latency', () => {
            renderComponent();

            expect(screen.getByText('8 ms')).toBeInTheDocument();
        });

        it('renders all section headings', () => {
            renderComponent();

            expect(screen.getAllByRole('heading')).toHaveLength(4);
        });

        it('renders all metric labels', () => {
            renderComponent();

            expect(screen.getByText('Intel Core Ultra 9 285K')).toBeInTheDocument();

            expect(screen.getByText('16.0 GB')).toBeInTheDocument();

            expect(screen.getByText('32.0 GB')).toBeInTheDocument();

            expect(screen.getByText('C:')).toBeInTheDocument();

            expect(screen.getByText('965 Mbps')).toBeInTheDocument();

            expect(screen.getByText('42 Mbps')).toBeInTheDocument();

            expect(screen.getByText('8 ms')).toBeInTheDocument();
        });
    });

    describe('status chip', () => {
        it.each(['Healthy', 'Warning', 'Critical', 'Unknown'])('renders %s status', (status) => {
            mockedUsePcHealth.mockReturnValue({
                loading: false,
                health: {
                    ...mockHealth,
                    overallStatus: status,
                },
            } as any);

            renderComponent();

            expect(screen.getByText(status)).toBeInTheDocument();
        });
    });
});
