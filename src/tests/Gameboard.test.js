import Gameboard from "../modules/Gameboard";

it("should create a gameboard", () => {
  const gameboard = new Gameboard();
  // expect row and column to be 10x10
  expect(gameboard.board.length).toBe(10);
  expect(gameboard.board[0].length).toBe(10);
});

it("should place a ship", () => {
  const gameboard = new Gameboard();
  const length = 3;
  const x = 7;
  const y = 4;
  gameboard.placeShip(length, x, y);
  expect(gameboard.at(8, 4)).toBeTruthy();
});

it("should not allow invalid placement of a ship", () => {
  const gameboard = new Gameboard();
  const length = 8;
  const x = 3;
  const y = 0;
  expect(gameboard.isValidPosition(length, x, y)).toBeFalsy();
  expect(gameboard.isValidPosition(5, 4, 3)).toBeTruthy();
  // vertical check
  expect(gameboard.isValidPosition(3, 0, 8, true)).toBeFalsy();
  expect(gameboard.isValidPosition(4, 3, 4, true)).toBeTruthy();

  gameboard.placeShip(3, 5, 0);
  expect(gameboard.isValidPosition(2, 4, 0)).toBeFalsy();
  // vertical check again
  gameboard.placeShip(3, 0, 4, true);
  expect(gameboard.isValidPosition(2, 0, 3, true)).toBeFalsy();
});

it("should receive attack correctly", () => {
  const gameboard = new Gameboard();
  const x = 2;
  const y = 2;
  gameboard.placeShip(2, x, y);
  const ship = gameboard.at(x, y);
  gameboard.receiveAttack(x, y);
  gameboard.receiveAttack(x + 1, y);
  expect(ship.isSunk()).toBeTruthy();
});

it("should record missed shots", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(5, 2);
  expect(gameboard.missedShots[0]).toEqual([5, 2]);
});

it("should record hit shots", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(1, 5, 2);
  gameboard.receiveAttack(5, 2);
  expect(gameboard.hitShots[0]).toEqual([5, 2]);
});

it("should report if all ships sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, 8, 0);
  expect(gameboard.isGameOver()).toBeFalsy();
  gameboard.receiveAttack(8, 0);
  gameboard.receiveAttack(9, 0);
  expect(gameboard.isGameOver()).toBeTruthy();
});

it("should store valid moves", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(6, 5);
  expect(
    gameboard.validMoves.every(
      (validMove) => JSON.stringify(validMove) !== "[6,5]"
    )
  ).toBeTruthy();
});

it("should be able to place a ship vertically", () => {
  const gameboard = new Gameboard();
  const isVertical = true;
  gameboard.placeShip(5, 6, 0, isVertical);
  expect(gameboard.at(6, 4)).toBeTruthy();
  expect(gameboard.at(6, 5)).toBeFalsy();
});

it("should check if isHit()", () => {
  const gameboard = new Gameboard();
  expect(gameboard.isHit(6, 5)).toBeFalsy();
  gameboard.placeShip(2, 6, 5);
  gameboard.receiveAttack(6, 5);
  expect(gameboard.isHit(6, 5)).toBeTruthy();
});

it("should check if isMiss()", () => {
  const gameboard = new Gameboard();
  expect(gameboard.isMiss(6, 5)).toBeFalsy();
});
