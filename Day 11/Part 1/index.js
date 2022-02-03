const fs = require('fs');
const path = require('path');

const ENERGY_MAX = 9;
const ENERGY_MIN = 0;
const STEPS = 100;

/**
 * Function that reads in the input file as an array of arrays of numbers
 * @param {string} fileName - The path to the input file
 * @returns {Array} - An array of arrays of numbers
 */
function readInput(fileName) {
  const input = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
  return input.split('\n').map((line) => line.split('').map((n) => parseInt(n, 10)));
}

/**
 * Function that converts the 2D array into octopus objects (x, y, energy)
 * @param {Array} input - The 2D array of numbers
 * @returns {Array} - An array of octopus objects
 */
function convertInput(input) {
  return input.map((row, y) => row.map((n, x) => ({ x, y, energy: n })));
}

/**
 * Function that finds the surrounding octopus objects and increases their energy (recursive)
 * @param {Array} octopi - An array of octopus objects
 * @param {number} x - The x coordinate of the current octopus
 * @param {number} y - The y coordinate of the current octopus
 * @param {number} energy - The energy of the current octopus
 * @returns {Array} - An array of octopus objects
 */
function findSurroundingOctopi(octopi, x, y, energy) {
  
  // Get the surrounding octopi including the diagonals
  const surroundingOctopi = [
    octopi[y - 1] && octopi[y - 1][x - 1],
    octopi[y - 1] && octopi[y - 1][x],
    octopi[y - 1] && octopi[y - 1][x + 1],
    octopi[y] && octopi[y][x - 1],
    octopi[y] && octopi[y][x + 1],
    octopi[y + 1] && octopi[y + 1][x - 1],
    octopi[y + 1] && octopi[y + 1][x],
    octopi[y + 1] && octopi[y + 1][x + 1],
  ];

  



// Get our initial state
const input = convertInput(readInput('test.txt'));

// For each step
for (let step = 0; step < STEPS; step++) {
  

console.log(readInput('test.txt'));
