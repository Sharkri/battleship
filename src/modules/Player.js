import Gameboard from "./Gameboard";

export default function Player(name, type = "player") {
  const gameboard = new Gameboard();

  const attack = (enemy, x, y) => enemy.gameboard.receiveAttack(x, y);

  function makeRandomMove(enemy) {
    const { validMoves } = enemy.gameboard;
    const [x, y] = validMoves[Math.floor(Math.random() * validMoves.length)];
    const { square } = enemy.gameboard.receiveAttack(x, y);
    return { square, x, y };
  }

  if (type === "computer") return { name, gameboard, makeRandomMove };
  return { name, gameboard, attack };
}
