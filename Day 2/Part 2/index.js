const fs = require('fs');
const path = require('path');

// Read in the input file
const input = fs.readFileSync(path.resolve(__dirname, '../Part 1/input.txt'), 'utf8');

// Split the input into an array
const directions = input.split('\n').map((line) => {
  const parts = line.split(' ');
  return {
    direction: parts[0],
    distance: parseInt(parts[1], 10),
  };
});

// Setup the starting position
let horizontal = 0;
let depth = 0;
let aim = 0;

// For each direction command in the input file adjust the position
directions.forEach((direction) => {
  if (direction.direction === 'down') {
    aim += direction.distance;
  } else if (direction.direction === 'up') {
    aim -= direction.distance;
  } else if (direction.direction === 'forward') {
    horizontal += direction.distance;
    depth += aim * direction.distance;
  }
});

console.log(Math.abs(horizontal) * Math.abs(depth));
