/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');

// Read the input file as an array of numbers (lines)
const input = fs.readFileSync(path.join(__dirname, '/input.txt'), 'utf8').split('\n');

// create an array of 12 arrays
const indexes = Array(12).fill(0).map(() => []);

// For each line of the input file
input.forEach((line) => {
  // Split the number into the bits
  const bits = line.split('');

  // For each bit
  bits.forEach((bit, bitIndex) => {
    // Push the bit to the corresponding index array
    indexes[bitIndex].push(parseInt(bit, 10));
  });
});

// Transform our index array into the counts for each number
// For each index array
const counts = indexes.map((index) => {
  // Count the occurences of each number
  const numberOccourances = {};
  index.forEach((number) => {
    numberOccourances[number] = (numberOccourances[number] || 0) + 1;
  });

  return numberOccourances;
});

function getGamma(counts) {
  // For each index get the number with the highest occurence
  const highestOccurences = counts.map((count) => {
    const highestOccurence = Math.max(...Object.values(count));
    return Object.keys(count).find((key) => count[key] === highestOccurence);
  });

  // Return the highest occurances converted to a number from binary
  return parseInt(highestOccurences.join(''), 2);
}

function getEpsilon(counts) {
  // For each index get the number with the lowest occurence
  const lowestOccurences = counts.map((count) => {
    const lowestOccurence = Math.min(...Object.values(count));
    return Object.keys(count).find((key) => count[key] === lowestOccurence);
  });

  // Return the lowest occurances converted to a number from binary
  return parseInt(lowestOccurences.join(''), 2);
}

function getPowerConsumption() {
  // Get the power consumption
  const powerConsumption = getGamma(counts) * getEpsilon(counts);

  return powerConsumption;
}

// Get the answer
console.log(`The gamma rate ${getGamma(counts)}`);
console.log(`The epsilon rate ${getEpsilon(counts)}`);
console.log(`The power consumption ${getPowerConsumption()}`);
