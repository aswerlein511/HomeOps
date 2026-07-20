import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '../../utils/renderWithProviders';

import Footer from '@/layouts/Footer';

describe('Footer', () => {
    it('renders the footer element', () => {
        renderWithProviders(<Footer />);

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('applies the app-footer class', () => {
        renderWithProviders(<Footer />);

        expect(screen.getByRole('contentinfo')).toHaveClass('app-footer');
    });

    it('renders the footer data-testid attribute', () => {
        renderWithProviders(<Footer />);

        expect(screen.getByRole('contentinfo')).toHaveAttribute('data-testid', 'layout-footer');
    });

    it('displays the connected status', () => {
        renderWithProviders(<Footer />);

        expect(screen.getByText('🟢 Connected')).toBeInTheDocument();
    });

    it('displays the application version', () => {
        renderWithProviders(<Footer />);

        expect(screen.getByText('HomeOps v0.1')).toBeInTheDocument();
    });

    it('contains exactly two status items', () => {
        renderWithProviders(<Footer />);

        const footer = screen.getByRole('contentinfo');

        expect(footer.querySelectorAll('span')).toHaveLength(2);
    });

    it('contains the connected status before the version', () => {
        renderWithProviders(<Footer />);

        const spans = screen.getByRole('contentinfo').querySelectorAll('span');

        expect(spans[0]).toHaveTextContent('🟢 Connected');
        expect(spans[1]).toHaveTextContent('HomeOps v0.1');
    });
});
