export default function Ship(length) {
  let timesHit = 0;
  const isSunk = () => timesHit >= length;
  const hit = () => {
    timesHit += 1;
  };

  return { length, isSunk, hit };
}
