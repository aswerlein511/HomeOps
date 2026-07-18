import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBadge } from '@/features/monitoring/pc/components';

describe('StatusBadge', () => {
    it.each(['Healthy', 'Warning', 'Critical', 'Offline', 'Unknown'])(
        'renders %s status',
        (status) => {
            render(<StatusBadge status={status as any} />);

            expect(screen.getByText(status)).toBeInTheDocument();
        },
    );

    it('renders as plain text', () => {
        render(<StatusBadge status={'Healthy' as any} />);

        expect(screen.getByText('Healthy')).toBeVisible();
    });
});
