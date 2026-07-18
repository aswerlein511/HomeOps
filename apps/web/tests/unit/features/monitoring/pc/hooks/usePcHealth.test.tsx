import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePcHealth } from "@/features/monitoring/pc/hooks";
import { pcHealthService } from "@/features/monitoring/pc/services";

vi.mock("@/features/monitoring/pc/services", () => ({
    pcHealthService: {
        getHealth: vi.fn(),
    },
}));

const mockedService = vi.mocked(pcHealthService);

describe("usePcHealth", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("starts in loading state", () => {
        mockedService.getHealth.mockResolvedValue({} as any);

        const { result } = renderHook(() => usePcHealth());

        expect(result.current.loading).toBe(true);
    });

    it("loads health data", async () => {
        const mockHealth = {
            hostname: "Aaron-PC",
        };

        mockedService.getHealth.mockResolvedValue(mockHealth as any);

        const { result } = renderHook(() => usePcHealth());

        await waitFor(() =>
            expect(result.current.loading).toBe(false),
        );

        expect(result.current.health).toEqual(mockHealth);
    });

    it("calls service exactly once", async () => {
        mockedService.getHealth.mockResolvedValue({} as any);

        renderHook(() => usePcHealth());

        await waitFor(() =>
            expect(mockedService.getHealth).toHaveBeenCalledTimes(1),
        );
    });
});
