/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');

const DAYS_TO_SIMULATE = 256;
const LANTERN_FISH_SPAWN_RATE = 6;
const LANTERN_FISH_INITIAL_DAYS = 9;

/**
 * Function that reads the input file and returns the contents as an array of numbers
 * @param {string} filePath - The path to the input file
 * @returns {number[]} - The contents of the input file as an array of numbers
 */
function readInput(filePath) {
  return fs.readFileSync(path.resolve(__dirname, filePath), 'utf8').split(',').map(Number);
}

const initialState = readInput('../Part 1/input.txt');

// Create a cyclical array of lenght LANTERN_FISH_INITIAL_DAYS
const cycleDays = new Array(LANTERN_FISH_INITIAL_DAYS).fill(0);

// Fill the array with the fish from the initial state
initialState.forEach((fish) => {
  cycleDays[fish]++;
});

// For each day we need to simulate, we need to update the cycle
for (let day = 1; day <= DAYS_TO_SIMULATE; day++) {
  // Get the number of fish that will spawn today
  const fishSpawn = cycleDays.shift();

  // Add the fish to the cycle at the LANTERN_FISH_SPAWN_RATE position
  cycleDays[LANTERN_FISH_SPAWN_RATE] = fishSpawn + cycleDays[LANTERN_FISH_SPAWN_RATE];

  // Add the new fish to the end of the cycle
  cycleDays.push(fishSpawn);
}

console.log(cycleDays);

// Log the totat number of fish that survived the simulation
console.log(cycleDays.reduce((acc, fish) => acc + fish, 0));
