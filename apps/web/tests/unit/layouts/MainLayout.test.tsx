import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import MainLayout from '@/layouts/MainLayout';

function TestPage() {
    return <div data-testid='page-content'>Dashboard Page</div>;
}

describe('MainLayout', () => {
    function renderLayout() {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<TestPage />} />
                    </Route>
                </Routes>
            </MemoryRouter>,
        );
    }

    it('renders the application layout', () => {
        renderLayout();

        expect(screen.getByTestId('layout-main')).toBeInTheDocument();
    });

    it('renders the header', () => {
        renderLayout();

        expect(screen.getByTestId('layout-header')).toBeInTheDocument();
    });

    it('renders the sidebar', () => {
        renderLayout();

        expect(screen.getByTestId('layout-sidebar')).toBeInTheDocument();
    });

    it('renders the footer', () => {
        renderLayout();

        expect(screen.getByTestId('layout-footer')).toBeInTheDocument();
    });

    it('renders the main content area', () => {
        renderLayout();

        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders the layout content data-testid', () => {
        renderLayout();

        expect(screen.getByTestId('layout-content')).toBeInTheDocument();
    });

    it('renders the outlet content', () => {
        renderLayout();

        expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });

    it('renders the outlet data-testid', () => {
        renderLayout();

        expect(screen.getByTestId('page-content')).toBeInTheDocument();
    });

    it('renders one header, one sidebar, one main and one footer', () => {
        renderLayout();

        expect(screen.getAllByRole('banner')).toHaveLength(1);
        expect(screen.getAllByRole('complementary')).toHaveLength(1);
        expect(screen.getAllByRole('main')).toHaveLength(1);
        expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
    });

    it('applies the app-layout class', () => {
        renderLayout();

        expect(screen.getByTestId('layout-main')).toHaveClass('app-layout');
    });
});
