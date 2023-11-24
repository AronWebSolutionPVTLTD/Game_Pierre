const arrayValues = [3, 4, 7, 34, 4, 87, 4];

const dynamicVariable = 7; /* set your dynamic variable here */
let result;
// Define the chance of a match (85% chance)
const matchChance = 0.85;

// Generate a random number between 0 and 1
const randomNumber = Math.random();

// Check if the random number falls within the match chance
if (randomNumber < matchChance) {
  // Choose a random value from the array
  const randomIndex = Math.floor(Math.random() * arrayValues.length);
  const randomValue = arrayValues[randomIndex];

  // Set the dynamic variable to the chosen value from the array
  result = randomValue;

  // Now dynamicVariable has an 85% chance of being one of the values in the array
} else {
  console.log("Nothingg");
}

console.log(result);
