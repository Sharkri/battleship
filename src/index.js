import Game from "./modules/Game";
import displayController from "./displayController";

const display = displayController();
const ships = document.querySelectorAll(".ship");
const startGame = document.querySelector("#start-game");
const enemyBoard = document.querySelector(".enemy-board");
const playerBoard = document.querySelector(".player-board");
const playAgain = document.querySelector(".play-again");
let draggedShip;
let game = new Game();
display.render(game.playerOne.gameboard, game.playerTwo.gameboard);
startGame.addEventListener("click", () => {
  startGame.disabled = true;
  enemyBoard.classList.add("active");
});

enemyBoard.addEventListener("click", (e) => {
  const { playerOne, playerTwo } = game;
  // if already marked
  if (e.target.classList.length > 1) return;

  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");

  playerOne.attack(playerTwo, x, y);
  display.renderBoard(playerTwo.gameboard, 1);
  if (playerTwo.gameboard.isGameOver()) {
    display.endGame(true);
    return;
  }
  // make ai move after player move
  playerTwo.makeRandomMove(playerOne);
  display.renderBoard(playerOne.gameboard, 0);
  if (playerOne.gameboard.isGameOver()) display.endGame(false);
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
  const { gameboard } = game.playerOne;

  if (!gameboard.isValidPosition(length, x, y, isVertical)) {
    e.target.classList.add("invalid");
    return;
  }
  // preview the where the ship will be placed
  for (let i = 0; i < length; i += 1) {
    // add a "preview-ship" class to preview the squares ship will be placed in
    // if isVertical increment y axis by 1, else increment x-axis
    if (isVertical)
      document
        .querySelector(`[data-coord-y="${[y + i]}"][data-coord-x="${[x]}"]`)
        .classList.add("preview-ship");
    else
      document
        .querySelector(`[data-coord-y="${[y]}"][data-coord-x="${[x + i]}"]`)
        .classList.add("preview-ship");
  }
});

playerBoard.addEventListener("dragleave", (e) => {
  e.preventDefault();
  const dragOver = document.getElementsByClassName("preview-ship");
  [...dragOver].forEach((square) => square.classList.remove("preview-ship"));
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

playAgain.addEventListener("click", () => {
  game = new Game();
  display.restart(game.playerOne.gameboard, game.playerTwo.gameboard);
});
