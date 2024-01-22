export default function shuffleR(array) {
  if (!array || array.length === 0) {
    console.error("Invalid array");
    return;
  }

  let currentIndex = array?.length,
    randomIndex;
  while (currentIndex != 0) {
    //Shuffling logic
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
