import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '../../utils/renderWithProviders';

import Header from '@/layouts/Header';

describe('Header', () => {
    it('renders the header element', () => {
        renderWithProviders(<Header />);

        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the HomeOps title', () => {
        renderWithProviders(<Header />);

        expect(screen.getByText('🏠 HomeOps')).toBeInTheDocument();
    });

    it('renders the platform subtitle', () => {
        renderWithProviders(<Header />);

        expect(screen.getByText('Local Automation Platform')).toBeInTheDocument();
    });

    it('renders the Connect button', () => {
        renderWithProviders(<Header />);

        expect(
            screen.getByRole('button', {
                name: 'Connect',
            }),
        ).toBeInTheDocument();
    });

    it('applies the app-header class', () => {
        renderWithProviders(<Header />);

        expect(screen.getByRole('banner')).toHaveClass('app-header');
    });

    it('renders the header data-testid attribute', () => {
        renderWithProviders(<Header />);

        expect(screen.getByRole('banner')).toHaveAttribute('data-testid', 'layout-header');
    });

    it('renders the connect button data-testid attribute', () => {
        renderWithProviders(<Header />);

        expect(
            screen.getByRole('button', {
                name: 'Connect',
            }),
        ).toHaveAttribute('data-testid', 'btn-connect');
    });

    it('contains exactly one heading', () => {
        renderWithProviders(<Header />);

        expect(screen.getAllByRole('heading')).toHaveLength(1);
    });

    it('uses an h2 heading', () => {
        renderWithProviders(<Header />);

        expect(
            screen.getByRole('heading', {
                level: 2,
            }),
        ).toHaveTextContent('🏠 HomeOps');
    });

    it('renders exactly one button', () => {
        renderWithProviders(<Header />);

        expect(screen.getAllByRole('button')).toHaveLength(1);
    });
});
