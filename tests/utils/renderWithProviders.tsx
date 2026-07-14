import type { ReactElement, ReactNode } from "react";

import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

interface WrapperProps {
  children: ReactNode;
}

function Providers({ children }: WrapperProps) {
  return (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: Providers,
    ...options,
  });
}

export * from "@testing-library/react";
