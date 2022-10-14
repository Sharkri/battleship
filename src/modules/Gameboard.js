import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.board = [];
    this.missedShots = [];
    this.validMoves = [];
    for (let i = 0; i < 7; i += 1) {
      const row = [];
      for (let j = 0; j < 7; j += 1) {
        this.validMoves.push([i, j]);
        row.push(null);
      }
      this.board.push(row);
    }
  }

  at(x, y) {
    return this.board[y][x];
  }

  placeShip(length, x, y) {
    if (this.board[y].slice(x).length < length) return;
    const ship = Ship(length);
    for (let i = 0; i < length; i += 1) this.board[y][x + i] = ship;
  }

  receiveAttack(x, y) {
    this.validMoves = this.validMoves.filter(
      (move) => JSON.stringify(move) !== `[${x},${y}]`
    );
    const square = this.at(x, y);
    if (square) {
      square.hit();
    } else this.missedShots.push([x, y]);
    return { isHit: !!square };
  }

  isGameOver() {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const ship = this.at(x, y);
        if (ship && !ship.isSunk()) return false;
      }
    }
    return true;
  }
}
