import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PcHealthCard } from '@/features/monitoring/pc/components';
import { theme } from '@/theme';

vi.mock('@/ui/common', () => ({
    Metric: ({ label, value }: { label: string; value: string }) => (
        <div data-testid={`metric-${label}`}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    ),
}));

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

const renderComponent = (health = mockHealth) =>
    render(
        <ThemeProvider theme={theme}>
            <PcHealthCard health={health as any} />
        </ThemeProvider>,
    );

describe('PcHealthCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('healthy pc', () => {
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

            expect(screen.getByText('31.0%')).toBeInTheDocument();
        });

        it('renders cpu temperature', () => {
            renderComponent();

            expect(screen.getByText('55.0 °C')).toBeInTheDocument();
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

            expect(screen.getByText('72.0%')).toBeInTheDocument();
        });

        it('renders disk health', () => {
            renderComponent();

            expect(screen.getByText('99%')).toBeInTheDocument();
        });

        it('renders download speed', () => {
            renderComponent();

            expect(screen.getByText('965.0 Mbps')).toBeInTheDocument();
        });

        it('renders upload speed', () => {
            renderComponent();

            expect(screen.getByText('42.0 Mbps')).toBeInTheDocument();
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
            expect(screen.getByText('965.0 Mbps')).toBeInTheDocument();
            expect(screen.getByText('42.0 Mbps')).toBeInTheDocument();
            expect(screen.getByText('8 ms')).toBeInTheDocument();
        });
    });

    describe('status chip', () => {
        it.each(['Healthy', 'Warning', 'Critical', 'Unknown'])('renders %s status', (status) => {
            renderComponent({
                ...mockHealth,
                overallStatus: status,
            } as any);

            expect(screen.getByText(status)).toBeInTheDocument();
        });
    });

    describe('branch coverage', () => {
        it('renders N/A when cpu temperature is unavailable', () => {
            renderComponent({
                ...mockHealth,
                cpu: {
                    ...mockHealth.cpu,
                    temperatureC: undefined,
                },
            } as any);

            expect(screen.getByTestId('metric-Temperature')).toHaveTextContent('N/A');
        });

        it('prefers the linux root mount when no C drive exists', () => {
            renderComponent({
                ...mockHealth,
                disks: [
                    {
                        ...mockHealth.disks[0],
                        label: '',
                        mountPoint: '/',
                        fileSystem: 'ext4',
                        usagePercent: 40,
                        healthPercent: 98,
                    },
                ],
            } as any);

            const usages = screen.getAllByTestId('metric-Usage');

            expect(usages[2]).toHaveTextContent('40.0%');
            expect(screen.getByTestId('metric-Health')).toHaveTextContent('98%');
        });

        it('falls back to a /dev filesystem', () => {
            renderComponent({
                ...mockHealth,
                disks: [
                    {
                        ...mockHealth.disks[0],
                        label: '',
                        mountPoint: '/mnt/storage',
                        fileSystem: '/dev/nvme0n1p1',
                        usagePercent: 61,
                        healthPercent: 99,
                    },
                ],
            } as any);

            const usages = screen.getAllByTestId('metric-Usage');

            expect(usages[2]).toHaveTextContent('61.0%');
            expect(screen.getByTestId('metric-Health')).toHaveTextContent('99%');
        });

        it('falls back to the first disk', () => {
            renderComponent({
                ...mockHealth,
                disks: [
                    {
                        ...mockHealth.disks[0],
                        label: 'Backup',
                        mountPoint: '/backup',
                        fileSystem: 'xfs',
                        usagePercent: 25,
                        healthPercent: 95,
                    },
                ],
            } as any);

            expect(screen.getByTestId('metric-Drive')).toHaveTextContent('Backup');
        });

        it('renders N/A when there are no disks', () => {
            renderComponent({
                ...mockHealth,
                disks: [],
            } as any);

            expect(screen.getByTestId('metric-Drive')).toHaveTextContent('N/A');

            const usages = screen.getAllByTestId('metric-Usage');

            expect(usages[2]).toHaveTextContent('N/A');
            expect(screen.getByTestId('metric-Health')).toHaveTextContent('N/A');
        });

        it('renders N/A for zero network metrics', () => {
            renderComponent({
                ...mockHealth,
                network: {
                    downloadMbps: 0,
                    uploadMbps: 0,
                    latencyMs: 0,
                },
            });

            expect(screen.getByTestId('metric-Download')).toHaveTextContent('N/A');

            expect(screen.getByTestId('metric-Upload')).toHaveTextContent('N/A');

            expect(screen.getByTestId('metric-Latency')).toHaveTextContent('N/A');
        });

        it('renders Warning status correctly', () => {
            renderComponent({
                ...mockHealth,
                overallStatus: 'Warning',
            } as any);

            expect(screen.getByText('Warning')).toBeInTheDocument();
        });

        it('renders Critical status correctly', () => {
            renderComponent({
                ...mockHealth,
                overallStatus: 'Critical',
            } as any);

            expect(screen.getByText('Critical')).toBeInTheDocument();
        });

        it('renders Unknown status correctly', () => {
            renderComponent({
                ...mockHealth,
                overallStatus: 'Unknown',
            } as any);

            expect(screen.getByText('Unknown')).toBeInTheDocument();
        });
    });
});
