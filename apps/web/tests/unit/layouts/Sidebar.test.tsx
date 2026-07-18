import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen } from '../../utils/renderWithProviders';

import Sidebar from '@/layouts/Sidebar';

describe('Sidebar', () => {
    it('renders the sidebar', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getByRole('complementary')).toBeInTheDocument();
    });

    it('applies the app-sidebar class', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getByRole('complementary')).toHaveClass('app-sidebar');
    });

    it('renders the sidebar data-test attribute', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getByRole('complementary')).toHaveAttribute('data-test', 'layout-sidebar');
    });

    it('renders the navigation element', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders exactly four navigation links', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getAllByRole('link')).toHaveLength(4);
    });

    it('renders the Dashboard link', () => {
        renderWithProviders(<Sidebar />);

        const link = screen.getByRole('link', {
            name: /Dashboard/i,
        });

        expect(link).toHaveAttribute('href', '/');
        expect(link).toHaveAttribute('data-test', 'nav-dashboard');
    });

    it('renders the Projects link', () => {
        renderWithProviders(<Sidebar />);

        const link = screen.getByRole('link', {
            name: /Projects/i,
        });

        expect(link).toHaveAttribute('href', '/projects');
        expect(link).toHaveAttribute('data-test', 'nav-projects');
    });

    it('renders the Tests link', () => {
        renderWithProviders(<Sidebar />);

        const link = screen.getByRole('link', {
            name: /Tests/i,
        });

        expect(link).toHaveAttribute('href', '/tests');
        expect(link).toHaveAttribute('data-test', 'nav-tests');
    });

    it('renders the Settings link', () => {
        renderWithProviders(<Sidebar />);

        const link = screen.getByRole('link', {
            name: /Settings/i,
        });

        expect(link).toHaveAttribute('href', '/settings');
        expect(link).toHaveAttribute('data-test', 'nav-settings');
    });

    it('renders one unordered list', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getAllByRole('list')).toHaveLength(1);
    });

    it('renders four list items', () => {
        renderWithProviders(<Sidebar />);

        expect(screen.getAllByRole('listitem')).toHaveLength(4);
    });
});
