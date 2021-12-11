const fs = require('fs');
const path = require('path');

/**
 * Function that reads in the input file and returns the contents as a array of numbers
 * @param {string} filePath - The path to the input file
 * @returns {number[]} - The contents of the input file as a array of numbers
 */
function readInput(filePath) {
  const input = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
  return input.split(',').map(Number);
}

/**
 * Function that gets the smallest and largest number in an array
 * @param {number[]} arr - The array to get the smallest and largest number from
 * @returns {number[]} - An array containing the smallest and largest number in the array
 */
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

/**
 * Function that caculates the fuel usage between two points
 * @param {number} start - The starting point
 * @param {number} end - The ending point
 * @returns {number} - The fuel usage between the two points
 */
function calculateFuelUsage(start, end) {
  // Get the distance between the two points
  const distance = Math.abs(end - start);

  // Define the sum of the fuel usage
  let fuelUsage = 0;

  // Loop through the distance and add the fuel usage
  for (let i = 1; i <= distance; i++) {
    fuelUsage += i;
  }

  // Return the fuel usage
  return fuelUsage;
}

// Get the smallest and largest number in the input array
const input = readInput('../Part 1/input.txt');
const [min, max] = getMinMax(input);

let mostEfficient = null;

// With the min and max consider each number between them
for (let i = min; i <= max; i++) {
  // Get the current horizontal poisition (the current number)
  const horizontalPosition = i;

  // Define the fuel usage for the current number
  let fuelUsage = 0;

  // For each number in the input caculate how much fuel is used to move there
  for (let j = 0; j < input.length; j++) {
    // Get the current vertical position
    const subHorizontalPosition = input[j];

    // Get the fuel usage for the current number (each step uses 1 more fuel than the previous step)
    const fuel = calculateFuelUsage(horizontalPosition, subHorizontalPosition);

    // Add the fuel usage to the total fuel usage
    fuelUsage += fuel;
  }

  // If the current fuel usage is less than the previous fuel usage, set the current fuel usage as the most efficient fuel usage
  if (mostEfficient === null || fuelUsage < mostEfficient.fuelUsage) {
    mostEfficient = {
      horizontalPosition,
      fuelUsage,
    };
  }
}

console.log(`The most efficient fuel usage is ${mostEfficient.fuelUsage} for the horizontal position ${mostEfficient.horizontalPosition}`);
