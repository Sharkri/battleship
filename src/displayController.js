export default function displayController() {
  const boards = document.querySelectorAll(".board");
  const modal = document.querySelector(".modal");
  const enemyBoard = document.querySelector(".enemy-board");
  const gameEndedText = document.querySelector(".game-ended-text");
  function renderBoard(board, boardIndex) {
    // Clear the board
    boards[boardIndex].textContent = "";
    for (let y = 0; y < 10; y += 1)
      for (let x = 0; x < 10; x += 1) {
        const square = document.createElement("button");
        square.classList.add("square");
        square.setAttribute("data-coord-x", x);
        square.setAttribute("data-coord-y", y);

        if (board.isHit(x, y)) square.classList.add("hit");
        if (board.isMiss(x, y)) square.classList.add("missed");

        const ship = board.at(x, y);
        // Only show the ship if it's on the players board
        if (ship && boardIndex === 0) square.classList.add("ship");
        if (ship?.isSunk()) square.classList.add("sunk");

        boards[boardIndex].appendChild(square);
      }
  }

  function render(...gameboards) {
    for (let i = 0; i < gameboards.length; i += 1) {
      renderBoard(gameboards[i], i);
    }
  }

  function restart(...gameboards) {
    render(...gameboards);
    // unhide the ships to place on board
    const hiddenShips = document.querySelectorAll(".hidden");
    hiddenShips.forEach((ship) => {
      // by default ship is horizontal
      ship.firstElementChild.setAttribute("data-vertical", "false");
      ship.classList.remove("hidden");
      modal.classList.remove("open");
      enemyBoard.classList.remove("active");
    });
  }

  function endGame(isWin) {
    modal.classList.add("open");
    gameEndedText.textContent = isWin ? "You won" : "You lost";
  }

  return { render, renderBoard, restart, endGame };
}
