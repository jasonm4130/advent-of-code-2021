const fs = require('fs');
const path = require('path');

/**
 * Function that gets the input in a usable format
 * @param {string} filePath - The path to the input file
 * @returns {string[]} - The input in a usable format
 */
function getInput(filePath) {
  // Get the input file
  const input = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');

  // Split the input into an array of objects (signal pattern and output value)
  return input.split('\n').map((line) => {
    const [signal, output] = line.split('|').map((str) => str.trim().split(' '));

    // Return the signal and pattern as an object
    return { signal, output };
  });
}

/**
 * Function that counts the occourances of a value
 * @param {string[]} signal - The signal to count the occourances of
 * @param {string} value - The value to count
 * @returns {number} - The number of occourances of the value
 */
function countOccourances(output, value) {
  return output.reduce((acc, curr) => {
    if (curr.length === value) {
      return acc + 1;
    }

    return acc;
  }, 0);
}

let numberOfTimes = 0;

getInput('input.txt').forEach((input) => {
  const { signal, output } = input;

  // Count the occourances for the numbers we are looking for
  const numberOfSevens = countOccourances(output, 3);
  const numberOfFours = countOccourances(output, 4);
  const numberOfEights = countOccourances(output, 7);
  const numberOfOnes = countOccourances(output, 2);

  // Add the counts to our total
  numberOfTimes += numberOfSevens + numberOfFours + numberOfEights + numberOfOnes;
});

console.log(numberOfTimes);
