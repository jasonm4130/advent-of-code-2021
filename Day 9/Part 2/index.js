const fs = require('fs');
const path = require('path');

// Define a const of edge height
const EDGE_HEIGHT = 10;

// Define the highest point value
const HIGHEST_POINT_VALUE = 9;

/**
 * Function that gets the input from the file
 * @returns {Array} The input as an array
 */
function getInput() {
  // Get the input
  let input = fs.readFileSync(path.join(__dirname, '../Part 1/input.txt'), 'utf8');

  // Split the input into rows
  input = input.split('\n');

  // Split the rows into individual points and convert them to numbers
  input = input.map((row) => row.split('').map(Number));

  // Split the input into an array of points and convert the string to an array of numbers
  return input;
}

/**
 * Function that finds the x and y coordinates of the low points
 * @param {Array} input The input as an array
 * @returns {object[]} The low points as an array of objects
 */
function getLowPoints(input) {
  // Create an array to store the low points
  const lowPoints = [];

  // Loop through the input rows
  input.forEach((row, y) => {
    // Loop through the row columns
    row.forEach((column, x) => {
      // Define the left and right numbers
      let left = EDGE_HEIGHT;
      let right = EDGE_HEIGHT;

      // If the column is not the first column
      if (x !== 0) {
        // Set the left number to the column to the left
        left = input[y][x - 1];
      }

      // If the column is not the last column
      if (x !== row.length - 1) {
        // Set the right number to the column to the right
        right = input[y][x + 1];
      }

      // Define the top and bottom numbers
      let top = EDGE_HEIGHT;
      let bottom = EDGE_HEIGHT;

      // If the row is not the first row
      if (y !== 0) {
        // Set the top number to the row above
        top = input[y - 1][x];
      }

      // If the row is not the last row
      if (y !== input.length - 1) {
        // Set the bottom number to the row below
        bottom = input[y + 1][x];
      }

      // If the current number is smaller than the left, right, top, and bottom numbers
      if (column < left && column < right && column < top && column < bottom) {
        // Add the current point to the low points array
        lowPoints.push({ x, y, value: column });
      }
    });
  });

  // Return the low points
  return lowPoints;
}

/**
 * Function that converts the input array into objects with the x and y coordinates and the value
 * @param {Array} inputPoints The input as an array of points
 * @returns {object[]} The input as an array of objects with the x and y coordinates and the value
 */
function convertPoints(inputPoints) {
  // Create an array to store the converted points
  const convertedPoints = [];

  // Loop through each row of the input
  inputPoints.forEach((row, y) => {
    // Loop through each column of the row
    row.forEach((column, x) => {
      // Add the point to the converted points array
      convertedPoints.push({ x, y, value: column });
    });
  });

  // Return the converted points
  return convertedPoints;
}

/**
 * Function that checks if an array contains a point
 * @param {object} point The point to check
 * @param {object[]} points The points to check against
 * @returns {boolean} Whether or not the point is in the array
 */
function containsPoint(point, points) {
  // Let contains point be false
  let containsPointBool = false;

  // Loop through each point in the array
  points.forEach((p) => {
    // If the x and y coordinates are the same
    if (p.x === point.x && p.y === point.y) {
      // Set contains point to true
      containsPointBool = true;
    }
  });

  // Return false
  return containsPointBool;
}

/**
 * Get neighbors of a point that aren't equal to the HIGHEST_POINT_VALUE
 * @param {object} point The point to get the neighbors of
 * @param {Array} inputPoints The input as an array of points objects
 * @returns {object[]} The neighbors of the point
 */
function getBasinPoints(point, inputPoints, neighbors = []) {
  // Get the point to the left of the current point
  const left = inputPoints.find((p) => p.x === point.x - 1 && p.y === point.y);

  // Get the point to the right of the current point
  const right = inputPoints.find((p) => p.x === point.x + 1 && p.y === point.y);

  // Get the point above the current point
  const top = inputPoints.find((p) => p.x === point.x && p.y === point.y - 1);

  // Get the point below the current point
  const bottom = inputPoints.find((p) => p.x === point.x && p.y === point.y + 1);

  /**
   * If the point to the left exists, is not in the array of neighbours,
   * and is not the highest point value
   */
  if (left && !containsPoint(left, neighbors) && left.value !== HIGHEST_POINT_VALUE) {
    // Add the point to the neighbors array
    neighbors.push(left);

    // Get the neighbors of the point to the left
    getBasinPoints(left, inputPoints, neighbors);
  }

  /**
   * If the point to the right exists, is not in the array of neighbours,
   * and is not the highest point value
   */
  if (right && !containsPoint(right, neighbors) && right.value !== HIGHEST_POINT_VALUE) {
    // Add the point to the neighbors array
    neighbors.push(right);

    // Get the neighbors of the point to the right
    getBasinPoints(right, inputPoints, neighbors);
  }

  /**
   * If the point above exists, is not in the array of neighbours,
   * and is not the highest point value
   */
  if (top && !containsPoint(top, neighbors) && top.value !== HIGHEST_POINT_VALUE) {
    // Add the point to the neighbors array
    neighbors.push(top);

    // Get the neighbors of the point above
    getBasinPoints(top, inputPoints, neighbors);
  }

  /**
   * If the point below exists, is not in the array of neighbours,
   * and is not the highest point value
   */
  if (bottom && !containsPoint(bottom, neighbors) && bottom.value !== HIGHEST_POINT_VALUE) {
    // Add the point to the neighbors array
    neighbors.push(bottom);

    // Get the neighbors of the point below
    getBasinPoints(bottom, inputPoints, neighbors);
  }

  // Return the neighbors
  return neighbors;
}

/**
 * Function that finds the basins
 * @param {object[]} lowPoints The input as an array of low points (x, y, value)
 * @returns {Array} The basins as an array
 */
function findBasins(lowPoints) {
  // Create an array to store the basins
  const basins = [];

  // Get the input points converted to objects
  const inputPoints = convertPoints(getInput());

  // Loop through each low point and get the basin points
  lowPoints.forEach((lowPoint) => {
    // Get the basin points
    const basinPoints = getBasinPoints(lowPoint, inputPoints);

    // If the basin points are not empty
    if (basinPoints.length > 0) {
      // Add the basin points to the basins array
      basins.push(basinPoints);
    }
  });

  // Return the basins
  return basins;
}

/**
 * Function that finds the largest three basins
 * @param {Array} basins The basins as an array
 * @returns {Array} The largest three basins as an array
 */
function findLargestThreeBasins(basins) {
  // Sort the basins by the length of the basin
  const sortedBasins = basins.sort((a, b) => b.length - a.length);

  // Get the first 3 items in the sorted basins array
  const largestThreeBasins = sortedBasins.slice(0, 3);

  // Return the largest three basins
  return largestThreeBasins;
}

// Get the product of the largest three basins lenghts
const product = findLargestThreeBasins(findBasins(getLowPoints(getInput()))).reduce((acc, basin) => acc * basin.length, 1);

console.log(product);
