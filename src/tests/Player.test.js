import Player from "../modules/Player";

test("players should be able to attack eachother", () => {
  const player = Player("Joe");
  const player2 = Player("orangejuice");
  player2.gameboard.placeShip(1, 3, 5);
  player.attack(player2, 3, 5);
  expect(player2.gameboard.at(3, 5).isSunk()).toBeTruthy();
  expect(player2.gameboard.isGameOver()).toBeTruthy();
});
