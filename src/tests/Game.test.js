import Game from "../modules/Game";

it("should set up a new game", () => {
  const game = new Game("name1", "name2");
  expect(game.playerOne).toBeTruthy();
  expect(game.playerTwo).toBeTruthy();
});
