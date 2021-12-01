const fs = require('fs');
const path = require('path');

// Read in the input text as an array of numbers
const input = fs.readFileSync(path.join(__dirname, '/input.txt'), 'utf8').split('\n').map(Number);

// Count the number of times the input array increases
const count = input.reduce(
  (acc, curr) => {
    if (curr > acc.last) {
      acc.count += 1;
    }
    acc.last = curr;
    return acc;
  },
  { last: input.at(0), count: 0 },
);

console.log(count.count);
