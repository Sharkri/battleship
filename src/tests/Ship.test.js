import Ship from "../modules/Ship";

describe("should give correct ship", () => {
  const length = 4;
  const ship = Ship(length);
  it("should give correct length", () => expect(ship.length).toBe(4));
  it("should sink the ship", () => {
    expect(ship.isSunk()).toBeFalsy();
    for (let i = 0; i < length; i += 1) ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
