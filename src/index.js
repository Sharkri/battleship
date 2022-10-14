import Game from "./modules/Game";
import displayController from "./displayController";

const display = displayController();
const restart = document.querySelector("#restart");
const enemyBoard = document.querySelector(".enemy-board");
let game = new Game();
display.initialize(game.playerOne.gameboard, game.playerTwo.gameboard);

restart.addEventListener("click", () => {
  game = new Game();
  display.initialize(game.playerOne.gameboard, game.playerTwo.gameboard);
});

enemyBoard.addEventListener("click", (e) => {
  const { playerOne } = game;
  const { playerTwo } = game;

  // if already marked
  if (e.target.classList.length > 1) return;

  // dont let player click after game over
  if (playerTwo.gameboard.isGameOver() || playerOne.gameboard.isGameOver())
    return;

  const x = e.target.getAttribute("data-coord-x");
  const y = e.target.getAttribute("data-coord-y");

  const attack = playerOne.attack(playerTwo, x, y);
  e.target.classList.add(attack.isHit ? "hit" : "missed");

  if (playerTwo.gameboard.isGameOver()) {
    // handle epic win
    return;
  }

  // make ai move after player move
  const AIMove = playerTwo.makeRandomMove(playerOne);
  const grid = document.querySelector(
    `.player-board .square[data-coord-x="${AIMove.x}"][data-coord-y="${AIMove.y}"]`
  );
  grid.classList.add(AIMove.isHit ? "hit" : "missed");

  if (playerOne.gameboard.isGameOver()) {
    // handle lose
  }
});
