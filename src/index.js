import Game from "./modules/Game";
import displayController from "./displayController";

const display = displayController();

const restart = document.querySelector("#restart");
const enemyBoard = document.querySelector(".enemy-board");
const playerBoard = document.querySelector(".player-board");
let draggedShip = null;
let game = new Game();
display.initialize(game.playerOne.gameboard, game.playerTwo.gameboard);

restart.addEventListener("click", () => {
  const name1 = null;
  const name2 = null;

  game = new Game(name1, name2);
  display.initialize(game.playerOne.gameboard, game.playerTwo.gameboard);
});

enemyBoard.addEventListener("click", (e) => {
  const { playerOne, playerTwo } = game;
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

// Drag and drop ships
playerBoard.addEventListener("drop", (e) => {
  e.preventDefault();
  const { playerOne } = game;
  if (!e.target.classList.contains("square")) return;
  e.target.classList.remove("drag-over");
  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");
  const isVertical = draggedShip.dataset.vertical === "true";
  playerOne.gameboard.placeShip(draggedShip.children.length, x, y, isVertical);

  display.initialize(playerOne.gameboard);
});

playerBoard.addEventListener("dragover", (e) => {
  e.preventDefault();
  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");
  const { length } = draggedShip.children;
  const isVertical = draggedShip.dataset.vertical === "true";
  if (game.playerOne.gameboard.isValidPosition(length, x, y, isVertical)) {
    e.target.classList.add("drag-over");
  } else e.target.classList.add("invalid");
});

playerBoard.addEventListener("dragleave", (e) => {
  e.target.classList.remove("drag-over");
  e.target.classList.remove("invalid");
});

const ships = document.querySelectorAll(".ships > div");
ships.forEach((ship) =>
  ship.addEventListener("dragstart", (e) => {
    draggedShip = e.target;
  })
);
