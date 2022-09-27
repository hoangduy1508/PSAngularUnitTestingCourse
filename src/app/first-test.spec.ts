describe("first test", () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it('should be tru if true', () => {
    sut.a = false;

    sut.a = true;

    expect(sut.a).toBeTruthy();
  })
});
