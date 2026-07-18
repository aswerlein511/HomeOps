import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Metric } from "@/ui/common";

describe("Metric", () => {
    it("renders label", () => {
        render(
            <Metric
                label="CPU"
                value="31%"
            />,
        );

        expect(
            screen.getByText("CPU"),
        ).toBeInTheDocument();
    });

    it("renders value", () => {
        render(
            <Metric
                label="CPU"
                value="31%"
            />,
        );

        expect(
            screen.getByText("31%"),
        ).toBeInTheDocument();
    });

    it("renders numeric value", () => {
        render(
            <Metric
                label="Temperature"
                value={55}
            />,
        );

        expect(
            screen.getByText("55"),
        ).toBeInTheDocument();
    });

    it("renders zero", () => {
        render(
            <Metric
                label="Usage"
                value={0}
            />,
        );

        expect(
            screen.getByText("0"),
        ).toBeInTheDocument();
    });

    it("renders long value", () => {
        render(
            <Metric
                label="Model"
                value="Intel Core Ultra 9 285K"
            />,
        );

        expect(
            screen.getByText("Intel Core Ultra 9 285K"),
        ).toBeInTheDocument();
    });

    it("renders row layout", () => {
        render(
            <Metric
                label="CPU"
                value="31%"
            />,
        );

        expect(
            screen.getByText("CPU"),
        ).toBeVisible();

        expect(
            screen.getByText("31%"),
        ).toBeVisible();
    });
});
