/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');

// Read the input file
const input = fs.readFileSync(path.resolve(__dirname, '../Part 1/input.txt'), 'utf8').split('\n');

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

// Creat an array the lenght of one of the input items
let checksum = Array(input[0].length).fill(0);

let oxygenGeneratorRaiting = input;

// Filter the input array to only contain the highest bits
checksum.forEach((bit, index) => {
  // For each of the items in oxygenGeneratorRaiting get the current bit
  const currentBit = oxygenGeneratorRaiting.map((item) => item.split('')[index]);

  // Get the number of times 1 appears in the current bit
  const ones = currentBit.filter((bit) => bit === '1').length;

  // Get the number of times 0 appears in the current bit
  const zeros = currentBit.filter((bit) => bit === '0').length;

  // If the number of ones is greater than the number of zeros
  if (ones >= zeros) {
    // Set the checksum bit to 1
    checksum[index] = '1';
  } else {
    // Set the checksum bit to 0
    checksum[index] = '0';
  }

  oxygenGeneratorRaiting = oxygenGeneratorRaiting.filter((line) => line.split('')[index] === checksum[index] || oxygenGeneratorRaiting.length === 1);
});

// Reset our checksum before caculating the CO2 Scrubber
checksum = Array(input[0].length).fill(0);

let CO2ScrubberRaiting = input;

// Filter the input array to only contain the lowest bits
checksum.forEach((bit, index) => {
  // For each of the items in CO2ScrubberRaiting get the current bit
  const currentBit = CO2ScrubberRaiting.map((item) => item.split('')[index]);

  // Get the number of times 1 appears in the current bit
  const ones = currentBit.filter((bit) => bit === '1').length;

  // Get the number of times 0 appears in the current bit
  const zeros = currentBit.filter((bit) => bit === '0').length;

  // If the number of ones is less than the number of zeros
  if (ones < zeros) {
    // Set the checksum bit to 1
    checksum[index] = '1';
  } else {
    // Set the checksum bit to 0
    checksum[index] = '0';
  }

  CO2ScrubberRaiting = CO2ScrubberRaiting.filter((line) => line.split('')[index] === checksum[index] || CO2ScrubberRaiting.length === 1);
});

// Find the life support raiting
const lifeSupportRaiting = parseInt(oxygenGeneratorRaiting, 2) * parseInt(CO2ScrubberRaiting, 2);

console.log(`The oxygen generator raiting is ${oxygenGeneratorRaiting}`);
console.log(`The CO2 Scrubber Raiting is ${CO2ScrubberRaiting}`);
console.log(`The life support raiting is ${lifeSupportRaiting}`);
