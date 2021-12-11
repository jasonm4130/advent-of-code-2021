/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');

const DAYS_TO_SIMULATE = 80;
const LANTERN_FISH_SPAWN_RATE = 6;
const LANTERN_FISH_INITIAL_DAYS = 8;

/**
 * Function that reads the input file and returns the contents as an array of numbers
 * @param {string} filePath - The path to the input file
 * @returns {number[]} - The contents of the input file as an array of numbers
 */
function readInput(filePath) {
  return fs.readFileSync(path.resolve(__dirname, filePath), 'utf8').split(',').map(Number);
}

const initialState = readInput('input.txt');

console.log(`Initial state: ${initialState.join(', ')}`);

const state = initialState;

// Loop through the number of days to simulate
for (let day = 1; day <= DAYS_TO_SIMULATE; day++) {
  // For each lantern fish, simulate the day
  state.forEach((fish, index) => {
    // For all fish decrease the fish's days till spawn by 1
    state[index]--;

    // If the fish's days till spawn is 0, increase the fish's days till spawn by its spawn rate and add a new fish to the state
    if (fish === 0) {
      state[index] = LANTERN_FISH_SPAWN_RATE;
      state.push(LANTERN_FISH_INITIAL_DAYS);
    }
  });

  console.log(`Day ${day}: ${state.join(', ')}`);
}

console.log(`Total fish: ${state.length}`);
