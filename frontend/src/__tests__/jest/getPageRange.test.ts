import getPageRange from "../../utils/getPageRange";

describe("getPageRange", () => {
  it("should return the correct page range", () => {
    expect(getPageRange(2, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(getPageRange(0, 5)).toEqual([0, 1, 2]);
    expect(getPageRange(4, 5)).toEqual([2, 3, 4]);
    expect(getPageRange(2, 5, 1)).toEqual([1, 2, 3]);
  });

  it("should handle edge cases", () => {
    expect(getPageRange(0, 1)).toEqual([0]);
    expect(getPageRange(1, 1)).toEqual([0]);
    expect(getPageRange(0, 0)).toEqual([]);
  });
});
