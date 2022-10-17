import Game from "./modules/Game";
import displayController from "./displayController";

const display = displayController();
const ships = document.querySelectorAll(".ship");
const startGame = document.querySelector("#start-game");
const enemyBoard = document.querySelector(".enemy-board");
const previewBoard = document.querySelector(".preview-board");
const playAgain = document.querySelector(".play-again");
const randomize = document.querySelector("#randomize-board");
const reset = document.querySelector("#reset-board");
let draggedShip;
let game = new Game();
// Initialize the board to place the ships
display.render({
  board: game.playerOne.getBoard(),
  className: "preview-board",
});

startGame.addEventListener("click", () =>
  display.startGame(
    { board: game.playerOne.getBoard(), className: "player-board" },
    { board: game.playerTwo.getBoard(), className: "enemy-board" }
  )
);

// Listen for player attacking enemy board
enemyBoard.addEventListener("click", (e) => {
  const { playerOne, playerTwo } = game;
  const playerOneBoard = playerOne.getBoard();
  const playerTwoBoard = playerTwo.getBoard();
  // if already marked
  if (e.target.classList.length > 1) return;

  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");

  playerOne.attack(playerTwo, x, y);
  display.renderBoard(playerTwoBoard, "enemy-board");

  if (playerTwoBoard.isGameOver()) {
    display.endGame("You won");
    return;
  }

  // AI Move
  playerTwo.makeRandomMove(playerOne);
  display.renderBoard(playerOneBoard, "player-board");

  if (playerOneBoard.isGameOver()) display.endGame("You lost");
});

// Drag and drop ships
previewBoard.addEventListener("drop", (e) => {
  e.preventDefault();
  const playerOneBoard = game.playerOne.getBoard();
  e.target.classList.remove("drag-over");
  e.target.classList.remove("invalid");

  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");
  const isVertical = draggedShip.dataset.vertical === "true";
  const { length } = draggedShip.children;

  if (!playerOneBoard.isValidPosition(length, x, y, isVertical)) return;
  playerOneBoard.placeShip(length, x, y, isVertical);
  display.renderBoard(playerOneBoard, "preview-board");

  draggedShip.parentNode.classList.add("hidden");
  // if all ships are placed, let player start the game
  if (!document.querySelector(".ship-container:not(.hidden)"))
    startGame.disabled = false;
});

previewBoard.addEventListener("dragover", (e) => {
  e.preventDefault();
  const x = +e.target.getAttribute("data-coord-x");
  const y = +e.target.getAttribute("data-coord-y");
  const { length } = draggedShip.children;
  const isVertical = draggedShip.dataset.vertical === "true";
  const playerOneBoard = game.playerOne.getBoard();

  if (!playerOneBoard.isValidPosition(length, x, y, isVertical)) {
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

previewBoard.addEventListener("dragleave", (e) => {
  e.preventDefault();
  e.target.classList.remove("invalid");
  const dragOver = document.getElementsByClassName("preview-ship");
  [...dragOver].forEach((square) => square.classList.remove("preview-ship"));
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
  startGame.disabled = true;
  display.restart(
    { board: game.playerOne.getBoard(), className: "preview-board" },
    { board: game.playerOne.getBoard(), className: "player-board" },
    { board: game.playerTwo.getBoard(), className: "enemy-board" }
  );
});

randomize.addEventListener("click", () => {
  display.toggleShips(false);

  game.playerOne.createNewBoard();
  const playerOneBoard = game.playerOne.getBoard();
  playerOneBoard.randomizeShips(
    { length: 5 },
    { length: 4 },
    { length: 3 },
    { length: 3 },
    { length: 2 }
  );
  display.renderBoard(playerOneBoard, "preview-board");
  startGame.disabled = false;
});

reset.addEventListener("click", () => {
  display.toggleShips(true);

  game.playerOne.createNewBoard();

  display.renderBoard(game.playerOne.getBoard(), "preview-board");
  startGame.disabled = true;
});
