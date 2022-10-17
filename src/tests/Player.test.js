import Player from "../modules/Player";

test("players should be able to attack eachother", () => {
  const player = Player("Joe");
  const player2 = Player("orangejuice");
  const playerTwoBoard = player2.getBoard();
  playerTwoBoard.placeShip(1, 3, 5);
  player.attack(player2, 3, 5);

  expect(playerTwoBoard.at(3, 5).isSunk()).toBeTruthy();
  expect(playerTwoBoard.isGameOver()).toBeTruthy();
});
