describe("Addition operation", function () {
  it("should add an amount", function () {
    var m = monetary("CHF 200.20");

    m.add(19.80);

    expect(m.currency()).toBe("CHF");
    expect(m.amount()).toBe(220.00);
  });

  it("should add another monetary", function () {
    var m = monetary("CHF 200.20"),
        o = monetary("CHF 19.80");

    m.add(o);

    expect(m.currency()).toBe("CHF");
    expect(m.amount()).toBe(220.00);
  });

  it("should add a negative amount", function () {
    var m = monetary("CHF 200.20");

    m.add(-0.20);

    expect(m.currency()).toBe("CHF");
    expect(m.amount()).toBe(200.00);
  });

  it("should return invalid when adding another currency", function () {
    var m = monetary("CHF 200.20"),
        o = monetary("USD 20.50");

    m.add(o);

    expect(m.isInvalid()).toBe(true);
  });

  it("should always create a new monetary", function () {
    var m = monetary("CHF 200.20");
    var n = m.add(19.80);

    expect(m.currency()).toBe("CHF");
    expect(m.amount()).toBe(200.20);

    expect(n.currency()).toBe("CHF");
    expect(n.amount()).toBe(220.00);
  });
});
