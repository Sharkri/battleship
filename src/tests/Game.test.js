import Game from "../modules/Game";

it("should set up a new game", () => {
  const game = new Game("name1", "name2");
  expect(game.playerOne).toBeTruthy();
  expect(game.playerTwo).toBeTruthy();
});

it("should let players place ships", () => {
  const shipPlacements = [
    { length: 5, x: 0, y: 0 },
    { length: 3, x: 2, y: 1 },
  ];
  const game = new Game(null, null, shipPlacements);
  expect(game.playerOne.gameboard.at(0, 0)).toBeTruthy();
  expect(game.playerOne.gameboard.at(2, 1)).toBeTruthy();
});
