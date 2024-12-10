import formatDate from "../../utils/formatDate";

describe("formatDate", () => {
  it("should format the date correctly", () => {
    const date = new Date(2025, 0, 1);
    expect(formatDate(date)).toBe("01 Jan 2025");
  });

  it('should return "N/A" for undefined date', () => {
    expect(formatDate(undefined)).toBe("N/A");
  });
});
