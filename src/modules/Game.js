import Player from "./Player";

export default class Game {
  constructor(name1, name2) {
    this.playerOne = Player(name1);
    this.playerTwo = Player(name2, "computer");
    // Hard coded locations for now
    for (let i = 2; i < 6; i += 1) {
      this.playerOne.gameboard.placeShip(i, 0, i);
      this.playerTwo.gameboard.placeShip(i, 0, i);
    }
  }
}
