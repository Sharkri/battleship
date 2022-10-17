import Player from "./Player";

export default class Game {
  constructor(name1, name2) {
    this.playerOne = Player(name1);
    this.playerTwo = Player(name2, "computer");
    // add random ship placement soon
    const playerTwoBoard = this.playerTwo.getBoard();
    playerTwoBoard.randomizeShips(
      { length: 5 },
      { length: 4 },
      { length: 3 },
      { length: 3 },
      { length: 2 }
    );
  }
}
