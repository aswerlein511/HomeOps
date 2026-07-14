import { classNames } from "@/ui/common";
import { describe, expect, it } from "vitest";

describe("classNames", () => {
  it("returns an empty string when no arguments are provided", () => {
    expect(classNames()).toBe("");
  });

  it("returns a single class name", () => {
    expect(classNames("button")).toBe("button");
  });

  it("joins multiple class names", () => {
    expect(classNames("button", "primary")).toBe("button primary");
  });

  it("ignores undefined values", () => {
    expect(
      classNames("button", undefined, "primary")
    ).toBe("button primary");
  });

  it("ignores null values", () => {
    expect(
      classNames("button", null, "primary")
    ).toBe("button primary");
  });

  it("ignores false values", () => {
    expect(
      classNames("button", false, "primary")
    ).toBe("button primary");
  });

  it("ignores empty strings", () => {
    expect(
      classNames("button", "", "primary")
    ).toBe("button primary");
  });

  it("preserves ordering", () => {
    expect(
      classNames("one", "two", "three")
    ).toBe("one two three");
  });
});
