const fs = require('fs');
const path = require('path');

// Read the input file
const input = fs.readFileSync(path.join(__dirname, '/input.txt'), 'utf8');

// Break the input into an array of objects (direction and distance)
const directions = input.split('\n').map((direction) => {
  const [dir, dist] = direction.split(' ');
  return { dir, dist };
});

// Starting at (0,0), walk the directions and calculate the distance
let x = 0;
let y = 0;

directions.forEach((direction) => {
  if (direction.dir === 'down') {
    y += parseInt(direction.dist, 10);
  } else if (direction.dir === 'up') {
    y -= parseInt(direction.dist, 10);
  } else if (direction.dir === 'forward') {
    x += parseInt(direction.dist, 10);
  }
});

// Multiply the x and y coordinates to get the total distance
const distance = x * y;

console.log(`The total distance is ${distance}`);
