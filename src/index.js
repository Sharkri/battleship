import Game from "./modules/Game";
import displayController from "./displayController";

const display = displayController();
const ships = document.querySelectorAll(".ship");
const startGame = document.querySelector("#start-game");
const enemyBoard = document.querySelector(".enemy-board");
const playerBoard = document.querySelector(".player-board");
let draggedShip;
const game = new Game();
display.render(game.playerOne.gameboard, game.playerTwo.gameboard);

startGame.addEventListener("click", () => {
  startGame.disabled = true;
  enemyBoard.classList.add("active");
});

enemyBoard.addEventListener("click", (e) => {
  const { playerOne, playerTwo } = game;
  // if already marked
  if (e.target.classList.length > 1) return;

  // dont let player click after game over
  if (playerTwo.gameboard.isGameOver() || playerOne.gameboard.isGameOver())
    return;

  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");

  playerOne.attack(playerTwo, x, y);
  display.renderBoard(playerTwo.gameboard, 1);
  if (playerTwo.gameboard.isGameOver()) {
    // handle epic win
    return;
  }

  // make ai move after player move
  playerTwo.makeRandomMove(playerOne);
  display.renderBoard(playerOne.gameboard, 0);
  if (playerOne.gameboard.isGameOver()) {
    // handle lose
  }
});

// Drag and drop ships
playerBoard.addEventListener("drop", (e) => {
  e.preventDefault();
  const { playerOne, playerTwo } = game;
  e.target.classList.remove("drag-over");
  e.target.classList.remove("invalid");

  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");
  const isVertical = draggedShip.dataset.vertical === "true";
  const { length } = draggedShip.children;
  if (!playerOne.gameboard.isValidPosition(length, x, y, isVertical)) return;

  playerOne.gameboard.placeShip(length, x, y, isVertical);
  display.render(playerOne.gameboard, playerTwo.gameboard);
  draggedShip.parentNode.classList.add("hidden");

  // check if all ships are placed
  if (!document.querySelector(".ship-container:not(.hidden)")) {
    startGame.disabled = false;
  }
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
  e.preventDefault();
  e.target.classList.remove("drag-over");
  e.target.classList.remove("invalid");
});

ships.forEach((ship) =>
  ship.addEventListener("dragstart", (e) => {
    draggedShip = e.target;
  })
);
const rotateBtns = document.querySelectorAll(".rotate");
rotateBtns.forEach((rotateBtn) =>
  rotateBtn.addEventListener("click", (e) => {
    const ship = e.target.closest("svg").previousElementSibling;
    const isVertical = ship.getAttribute("data-vertical") === "true";
    ship.setAttribute("data-vertical", !isVertical);
  })
);
