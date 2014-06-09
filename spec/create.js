describe("Create new monetary", function () {
  it("should create from string", function () {
    var m = monetary("CHF 200.20");

    expect(m.currency()).toBe("CHF");
    expect(m.amount()).toBe(200.20);
  });

  it("should create from array", function () {
    var m = monetary(["CHF", 200.20]);

    expect(m.currency()).toBe("CHF");
    expect(m.amount()).toBe(200.20);
  });

  it("should create with string and locale". function () {
    var m = monetary("Fr. 75.-", "ch-de");

    expect(m.currency()).toBe("CHF"));
    expect(m.amount()).toBe(75.00);
  });

  it("should create with array and locale", function () {
    var m = monetary(["Fr", 75.00], "ch-de");

    expect(m.currency()).toBe("CHF"));
    expect(m.amount()).toBe(75.00);
  });

  it("should create invalid with empty input", function () {
    var m = monetary();

    expect(m.isInvalid()).toBe(true);
  });

  it("should create invalid with missing currency", function () {
    var m = monetary("999.00");

    expect(m.isInvalid()).toBe(true);
  });

  it("should create invalid with unknown currency", function () {
    var m = monetary("XYZ 999.00");

    expect(m.isInvalid()).toBe(true);
  });

  it("should create invalid with missing amount", function () {
    var m = monetary("USD");

    expect(m.isInvalid()).toBe(true);
  });

  it("should create invalid with malformed amount", function () {
    var m = monetary("12-541");

    expect(m.isInvalid()).toBe(true);
  });
});
