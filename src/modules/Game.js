import Player from "./Player";

export default class Game {
  constructor(name1, name2, shipPlacements = []) {
    this.playerOne = Player(name1);
    this.playerTwo = Player(name2, "computer");
    shipPlacements.forEach((ship) => {
      const { length, x, y } = ship;
      this.playerOne.gameboard.placeShip(length, x, y);
    });
    // add random ship placement soon
    for (let i = 2; i < 6; i += 1) this.playerTwo.gameboard.placeShip(i, 1, i);
  }
}
