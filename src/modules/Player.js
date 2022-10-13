import Gameboard from "./Gameboard";

export default function Player(name, type = "player") {
  const gameboard = new Gameboard();

  const attack = (enemy, x, y) => enemy.gameboard.receiveAttack(x, y);

  function makeRandomMove(enemy) {
    const x = Math.floor(Math.random() * 7);
    const y = Math.floor(Math.random() * 7);
    // Implement legal moves later
    enemy.gameboard.receiveAttack(x, y);
  }
  if (type === "computer") return { name, gameboard, makeRandomMove };
  return { name, gameboard, attack };
}
