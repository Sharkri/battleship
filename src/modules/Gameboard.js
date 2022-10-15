import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.board = [];
    this.missedShots = [];
    this.validMoves = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        this.validMoves.push([i, j]);
        row.push(null);
      }
      this.board.push(row);
    }
  }

  at(x, y) {
    return this.board[y][x];
  }

  isValidPosition(length, x, y, isVertical = false) {
    // dont allow ship to go off the board
    if (isVertical && this.board.slice(y).length < length) return false;
    if (!isVertical && this.board[y].slice(x).length < length) return false;
    // dont allow ships to be placed where a ship already is
    const slicedRow = this.board[y].slice(x, x + length);
    const column = this.board.slice(y, y + length);

    if (!isVertical && slicedRow.some((square) => square)) return false;
    if (isVertical && column.some((row) => row[x])) return false;

    return true;
  }

  placeShip(length, x, y, isVertical = false) {
    // verify if position is valid
    if (!this.isValidPosition(length, x, y, isVertical)) return;
    const ship = Ship(length);
    for (let i = 0; i < length; i += 1) {
      if (isVertical) this.board[y + i][x] = ship;
      else this.board[y][x + i] = ship;
    }
  }

  receiveAttack(x, y) {
    this.validMoves = this.validMoves.filter(
      (move) => JSON.stringify(move) !== `[${x},${y}]`
    );
    const square = this.at(x, y);
    if (square) {
      square.hit();
    } else this.missedShots.push([x, y]);
    return { isHit: square };
  }

  isGameOver() {
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        const ship = this.at(x, y);
        if (ship && !ship.isSunk()) return false;
      }
    }
    return true;
  }
}
