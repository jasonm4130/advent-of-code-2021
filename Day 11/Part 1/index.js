const fs = require('fs');
const path = require('path');

let countFlashes = 0;

// Read in the input file as a Matrix
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
// Get the input Matrix as ints
const inputMatrix = input.split('\n').map((row) => row.split('').map((input) => ({
  value: parseInt(input),
  hasFlashed: false,
})));

console.log(inputMatrix);

// Function that increases all octopus energy levels by 1
function increaseEnergy(inputMatrix) {
  for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
      inputMatrix[i][j].value += 1;
    }
  }
  return inputMatrix;
}

// Function that increases the energy levels of surrounding octopuses by 1
function increaseSurroundingEnergy(inputMatrix, i, j) {
  // Increase the energy level of the octopus above
  if (i > 0) {
    inputMatrix[i - 1][j].value += 1;
  }
  // Increase the energy level of the octopus below
  if (i < inputMatrix.length - 1) {
    inputMatrix[i + 1][j].value += 1;
  }
  // Increase the energy level of the octopus to the left
  if (j > 0) {
    inputMatrix[i][j - 1].value += 1;
  }
  // Increase the energy level of the octopus to the right
  if (j < inputMatrix[i].length - 1) {
    inputMatrix[i][j + 1].value += 1;
  }
  // Increase the energy level of the octopus to the top left
  if (i > 0 && j > 0) {
    inputMatrix[i - 1][j - 1].value += 1;
  }
  // Increase the energy level of the octopus to the top right
  if (i > 0 && j < inputMatrix[i].length - 1) {
    inputMatrix[i - 1][j + 1].value += 1;
  }
  // Increase the energy level of the octopus to the bottom left
  if (i < inputMatrix.length - 1 && j > 0) {
    inputMatrix[i + 1][j - 1].value += 1;
  }
  // Increase the energy level of the octopus to the bottom right
  if (i < inputMatrix.length - 1 && j < inputMatrix[i].length - 1) {
    inputMatrix[i + 1][j + 1].value += 1;
  }

  return inputMatrix;
}

// Function that checks if all octopuses have flashed
function checkAllOctopusesFlashed(inputMatrix) {
  let allOctopusesFlashed = true;
  for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
      if (!inputMatrix[i][j].hasFlashed) {
        allOctopusesFlashed = false;
      }
    }
  }
  return allOctopusesFlashed;
}

// Function that flashes the octopus recursively
function flash(inputMatrix) {
  let octopusFlashed = false;
  // Loop through the matrix
  for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
      // If the octopus is alive and has not flashed yet
      if (inputMatrix[i][j].value > 9 && !inputMatrix[i][j].hasFlashed) {
        // Increase the energy level of the surrounding octopuses
        inputMatrix = increaseSurroundingEnergy(inputMatrix, i, j);
        // Set the hasFlashed flag to true
        inputMatrix[i][j].hasFlashed = true;
        // Set the octopusFlashed flag to true
        octopusFlashed = true;
        // Increment the count of flashes
        countFlashes += 1;
      }
    }
  }
  // If any octopus has check the octopus energy levels, flash again
  if (octopusFlashed) {
    flash(inputMatrix);
  }

  // Return the matrix
  return inputMatrix;
}

// Function that resets the energy levels of all octopuses that have flashed to 0
function resetEnergy(inputMatrix) {
  for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
      if (inputMatrix[i][j].hasFlashed) {
        inputMatrix[i][j].value = 0;
        inputMatrix[i][j].hasFlashed = false;
      }
    }
  }
  return inputMatrix;
}

// Function complete step
function completeStep(inputMatrix) {
  increaseEnergy(inputMatrix);
  flash(inputMatrix);
  const allHaveFlashed = checkAllOctopusesFlashed(inputMatrix);
  if (allHaveFlashed) {
    return true;
  }
  resetEnergy(inputMatrix);
  return false;
}

let steps = 0;
let allHaveFlashed = false;
// Keep looping until all octopuses have flashed
while (!allHaveFlashed) {
  allHaveFlashed = completeStep(inputMatrix);
  steps++;
}

console.log(`It took ${steps} steps to flash all the octopuses`);
