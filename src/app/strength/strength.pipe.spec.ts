import { StrengthPipe } from "./strength.pipe";

describe("Strength pipe test", () => {


  beforeEach(() => {

  });

  it('should display weak if strength is 5', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)');
  })
});
