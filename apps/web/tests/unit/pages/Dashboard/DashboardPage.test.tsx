import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import DashboardPage from "@/pages/Dashboard";

vi.mock("@/features/monitoring/pc", () => ({
    PcHealthCard: () => <div>Mock PcHealthCard</div>,
}));

describe("DashboardPage", () => {
    const renderPage = () => render(<DashboardPage />);

    it("renders the dashboard heading", () => {
        renderPage();

        expect(
            screen.getByRole("heading", {
                name: /dashboard/i,
            }),
        ).toBeInTheDocument();
    });

    it("renders the PC Health card", () => {
        renderPage();

        expect(
            screen.getByText("Mock PcHealthCard"),
        ).toBeInTheDocument();
    });

    it("renders exactly one PC Health card", () => {
        renderPage();

        expect(
            screen.getAllByText("Mock PcHealthCard"),
        ).toHaveLength(1);
    });

    it("renders the main landmark", () => {
        renderPage();

        expect(
            screen.getByRole("main"),
        ).toBeInTheDocument();
    });

    it("does not throw while rendering", () => {
        expect(() => renderPage()).not.toThrow();
    });
});
