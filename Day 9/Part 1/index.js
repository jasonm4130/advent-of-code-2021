const fs = require('fs');
const path = require('path');

// Define the edge number (We set the edge number as 10 as all numbers will be lower than it)
const EDGE_HEIGHT = 10;

/**
 * Function that gets the input from the file and returns it array of points
 * @returns {Array} Array of points
 */
function getInput() {
  // Get the input
  let input = fs.readFileSync(path.join(__dirname, '/input.txt'), 'utf8');

  // Split the input into rows
  input = input.split('\n');

  // Split the rows into individual points and convert them to numbers
  input = input.map((row) => row.split('').map(Number));

  // Split the input into an array of points and convert the string to an array of numbers
  return input;
}

/**
 * Function that caculates the low points of the input
 * @param {Array} input Array of points
 * @returns {Array} Array of the low points
 */
function calculateLowPoints(input) {
  // Set an empty array to store the low points
  const lowPoints = [];

  // Loop through the rows of the input
  input.forEach((row, rowIndex) => {
    // Loop through the columns of the input
    row.forEach((column, columnIndex) => {
      // get the points to the left and right of the current point
      let left;
      let right;

      // If the current point is the left most point
      if (columnIndex === 0) {
        // Set the left point to the current point
        left = EDGE_HEIGHT;
      } else {
        // Set the left point to the point to the left of the current point
        left = input[rowIndex][columnIndex - 1];
      }

      // If the current point is the right most point
      if (columnIndex === row.length - 1) {
        // Set the right point to the current point
        right = EDGE_HEIGHT;
      } else {
        // Set the right point to the point to the right of the current point
        right = input[rowIndex][columnIndex + 1];
      }

      // Get the points above and below the current point
      let above;
      let below;

      // If the current point is the top most point
      if (rowIndex === 0) {
        // Set the above point to the current point
        above = EDGE_HEIGHT;
      } else {
        // Set the above point to the point above the current point
        above = input[rowIndex - 1][columnIndex];
      }

      // If the current point is the bottom most point
      if (rowIndex === input.length - 1) {
        // Set the below point to the current point
        below = EDGE_HEIGHT;
      } else {
        // Set the below point to the point below the current point
        below = input[rowIndex + 1][columnIndex];
      }

      // Check if the current point is the lowest point
      if (column < left && column < right && column < above && column < below) {
        // Add the current point to the low points array
        lowPoints.push(column);
      }
    });
  });

  return lowPoints;
}

/**
 * Function that caculates the risk level of the low points
 * @param {Array} lowPoints Array of the low points
 * @returns {Array} The risk level of the low points
 */
function calculateRiskLevel(lowPoints) {
  // Set an empty array to store the risk level
  const riskLevel = [];

  // Loop through the low points
  lowPoints.forEach((point) => {
    // Add one to the hight of each low point
    riskLevel.push(point + 1);
  });

  // Return the risk level
  return riskLevel;
}

/**
 * Function that caculates the sum of the risk level
 * @param {Array} riskLevel The risk level of the low points
 * @returns {Number} The sum of the risk level
 */
function calculateSum(riskLevel) {
  // Set the sum to 0
  let sum = 0;

  // Loop through the risk level
  riskLevel.forEach((level) => {
    // Add each level to the sum
    sum += level;
  });

  // Return the sum
  return sum;
}

console.log(`The sum of the risk level is ${calculateSum(calculateRiskLevel(calculateLowPoints(getInput())))}`);

// Export the functions that we might need in the next part
module.exports = {
  getInput,
  calculateLowPoints,
  calculateRiskLevel,
  calculateSum,
};
