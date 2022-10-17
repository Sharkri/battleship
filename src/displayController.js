export default function displayController() {
  const gameEndedModal = document.querySelector(".modal");
  const gameEndedText = document.querySelector(".game-ended-text");
  const placeShipModal = document.querySelector(".place-ship-modal");

  function renderBoard(board, className) {
    const domBoard = document.querySelector(`.${className}`);
    // Clear the board
    domBoard.textContent = "";
    for (let y = 0; y < 10; y += 1)
      for (let x = 0; x < 10; x += 1) {
        const square = document.createElement("button");
        square.classList.add("square");
        square.setAttribute("data-coord-x", x);
        square.setAttribute("data-coord-y", y);

        if (board.isHit(x, y)) square.classList.add("hit");
        if (board.isMiss(x, y)) square.classList.add("missed");

        const ship = board.at(x, y);
        // Only show the ship if it's not on the enemy's board
        if (ship && className !== "enemy-board") square.classList.add("ship");
        if (ship?.isSunk()) square.classList.add("sunk");

        domBoard.appendChild(square);
      }
  }

  function render(...players) {
    players.forEach((player) => renderBoard(player.board, player.className));
  }

  function restart(...players) {
    render(...players);
    const hiddenShips = document.querySelectorAll(".hidden");
    hiddenShips.forEach((ship) => {
      // Set ship to horizontal by default.
      ship.firstElementChild.setAttribute("data-vertical", "false");
      // Unhide the ship
      ship.classList.remove("hidden");
    });
    gameEndedModal.classList.remove("open");
    placeShipModal.classList.add("open");
  }

  function startGame(...players) {
    render(...players);
    placeShipModal.classList.remove("open");
  }

  function endGame(text) {
    gameEndedModal.classList.add("open");
    gameEndedText.textContent = text;
  }

  return { render, renderBoard, restart, endGame, startGame };
}
