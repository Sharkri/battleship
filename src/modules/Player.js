import Gameboard from "./Gameboard";

export default function Player(name, type = "player") {
  let gameboard = new Gameboard();

  function attack(enemy, x, y) {
    const enemyBoard = enemy.getBoard();
    enemyBoard.receiveAttack(x, y);
  }
  function createNewBoard() {
    gameboard = new Gameboard();
  }

  function makeRandomMove(enemy) {
    const enemyBoard = enemy.getBoard();
    const { validMoves } = enemyBoard;
    const [x, y] = validMoves[Math.floor(Math.random() * validMoves.length)];
    const { square } = enemyBoard.receiveAttack(x, y);
    return { square, x, y };
  }

  const getBoard = () => gameboard;

  if (type === "computer") return { name, getBoard, makeRandomMove };
  return { name, getBoard, createNewBoard, attack };
}
