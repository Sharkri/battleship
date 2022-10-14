import Gameboard from "../modules/Gameboard";

it("should create a gameboard", () => {
  const gameboard = new Gameboard();
  // expect row and column to be 7x7
  expect(gameboard.board.length).toBe(7);
  expect(gameboard.board[0].length).toBe(7);
});

it("should place a ship", () => {
  const gameboard = new Gameboard();
  const length = 3;
  const x = 0;
  const y = 4;
  gameboard.placeShip(length, x, y);
  expect(gameboard.at(2, 4)).toBeTruthy();
});

it("should not allow invalid placement of a ship", () => {
  const gameboard = new Gameboard();
  const length = 6;
  const x = 0;
  const y = 0;
  gameboard.placeShip(length, x, y);
  expect(gameboard.at(6, 0)).toBeFalsy();
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

it("should report if all ships sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(2, 0, 0);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
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

it.todo("should be able to place a ship vertically");
