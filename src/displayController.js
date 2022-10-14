export default function displayController() {
  const boards = document.querySelectorAll(".board");
  function restart(playerBoard) {
    for (let i = 0; i < boards.length; i += 1) {
      const board = boards[i];
      board.textContent = "";
      for (let y = 0; y < 7; y += 1) {
        const column = document.createElement("div");
        column.classList.add("column");
        for (let x = 0; x < 7; x += 1) {
          const square = document.createElement("div");
          // show players ship
          if (i === 0 && playerBoard.at(x, y)) square.classList.add("ship");
          square.classList.add("square");
          column.appendChild(square);
        }
        board.appendChild(column);
      }
    }
  }
  return { restart };
}
