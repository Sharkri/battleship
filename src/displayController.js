export default function displayController() {
  const boards = document.querySelectorAll(".board");
  function initialize(playerBoard) {
    boards.forEach((board) => {
      // Clear the board
      board.textContent = "";
      for (let y = 0; y < 7; y += 1)
        for (let x = 0; x < 7; x += 1) {
          const square = document.createElement("button");
          square.classList.add("square");
          square.setAttribute("data-coord-x", x);
          square.setAttribute("data-coord-y", y);
          // mark square as a ship if on players board
          if (board.classList.contains("player-board") && playerBoard.at(x, y))
            square.classList.add("ship");

          board.appendChild(square);
        }
    });
  }
  return { initialize };
}
