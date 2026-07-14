import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Router from "@/app/Router";

describe("Application Router", () => {
  it("renders the dashboard by default", () => {
    window.history.pushState({}, "", "/");

    render(<Router />);

    expect(
      screen.getByTestId("layout-main")
    ).toBeInTheDocument();
  });

  it("renders the header", () => {
    window.history.pushState({}, "", "/");

    render(<Router />);

    expect(
      screen.getByTestId("layout-header")
    ).toBeInTheDocument();
  });

  it("renders the sidebar", () => {
    window.history.pushState({}, "", "/");

    render(<Router />);

    expect(
      screen.getByTestId("layout-sidebar")
    ).toBeInTheDocument();
  });

  it("renders the footer", () => {
    window.history.pushState({}, "", "/");

    render(<Router />);

    expect(
      screen.getByTestId("layout-footer")
    ).toBeInTheDocument();
  });

  it("loads the Settings page", () => {
    window.history.pushState({}, "", "/settings");

    render(<Router />);

    expect(
      screen.getByTestId("layout-main")
    ).toBeInTheDocument();
  });

  it("redirects /dashboard to /", () => {
    window.history.pushState({}, "", "/dashboard");

    render(<Router />);

    expect(
      screen.getByTestId("layout-main")
    ).toBeInTheDocument();
  });

  it("renders the NotFound page for unknown routes", () => {
    window.history.pushState({}, "", "/does-not-exist");

    render(<Router />);

    expect(
      screen.getByText(/not found/i)
    ).toBeInTheDocument();
  });
});
