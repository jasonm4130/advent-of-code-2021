const fs = require('fs');
const path = require('path');

// Function that reads in the input file
function readInput(file) {
  return fs.readFileSync(path.resolve(__dirname, file), 'utf8').split('\n').map((line) => line.split(' -> ').map((points) => {
    const [x, y] = points.split(',');
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
  }));
}

// Function that gets the points between two points
function getPointsBetween(start, end) {
  const points = [];
  const xDiff = end.x - start.x;
  const yDiff = end.y - start.y;
  const xStep = xDiff / Math.abs(xDiff);
  const yStep = yDiff / Math.abs(yDiff);
  const { x } = start;
  const { y } = start;

  // Work out if the line is vertical or horizontal
  if (xDiff === 0) {
    for (let i = 0; i <= Math.abs(yDiff); i++) {
      points.push({ x, y: y + (i * yStep) });
    }
  } else if (yDiff === 0) {
    for (let i = 0; i <= Math.abs(xDiff); i++) {
      points.push({ x: x + (i * xStep), y });
    }
  } else {
    for (let i = 0; i <= Math.abs(xDiff); i++) {
      points.push({ x: x + (i * xStep), y: y + (i * yStep) });
    }
  }

  return points;
}

// Function that makes the map of possible line locations
function makeLineMap(input) {
  // Put all the points into a single array
  const points = [].concat(...input);

  // For the list of points find the biggest x and y values
  const maxX = Math.max(...points.map((point) => point.x));
  const maxY = Math.max(...points.map((point) => point.y));

  console.log(maxX, maxY);

  // Create a matrix of .'s with the max x and y values
  const matrix = [];
  for (let i = 0; i <= maxY; i++) {
    matrix.push([]);
    for (let j = 0; j <= maxX; j++) {
      matrix[i].push('.');
    }
  }

  let linePoints = [];

  // Loop through the lines and put the points into the matrix
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    // Pust the points to the linePoints array
    linePoints = linePoints.concat(getPointsBetween(line[0], line[1]));
  }

  console.log(linePoints);

  // Loop through the line points and put the points into the matrix
  for (let i = 0; i < linePoints.length; i++) {
    const point = linePoints[i];
    // If the point in the matrix is a ., set the point as a 1
    if (matrix[point.y][point.x] === '.') {
      matrix[point.y][point.x] = 1;
    } else {
      // If the point in the matrix is a number increment it by 1
      matrix[point.y][point.x]++;
    }
  }

  return matrix;
}

// Function that gets the points that have value grater than a set number
function getPointsWithValue(matrix, value) {
  const points = [];

  // Loop through the matrix and find the points that have a value greater than the set number
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > value) {
        points.push({ x: j, y: i });
      }
    }
  }

  return points;
}

const points = getPointsWithValue(makeLineMap(readInput('./input.txt')), 1);

console.log(points.length);
