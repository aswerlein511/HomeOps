import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Providers from "@/app/Providers";

describe("Providers", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders the application", () => {
    render(<Providers />);

    expect(
      screen.getByTestId("layout-main")
    ).toBeInTheDocument();
  });

  it("renders the application shell", () => {
    render(<Providers />);

    expect(
      screen.getByTestId("layout-header")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("layout-sidebar")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("layout-footer")
    ).toBeInTheDocument();
  });

  it("renders without throwing", () => {
    expect(() => render(<Providers />)).not.toThrow();
  });
});
