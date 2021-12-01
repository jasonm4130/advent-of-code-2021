const fs = require('fs');
const path = require('path');

// Read in our data set as an array of numbers from part 1
const input = fs.readFileSync(path.join(__dirname, '../Part 1/input.txt'), 'utf8').split('\n').map(Number);

// For each number create our sliding window of 3 numbers
const windows = input.map((num, i) => input.slice(i, i + 3));

// For each window get the sum of the numbers
const sums = windows.map((window) => window.reduce((a, b) => a + b));

// Count the number of time the sum array increases
const count = sums.reduce(
  (acc, curr) => {
    if (curr > acc.last) {
      acc.count += 1;
    }
    acc.last = curr;
    return acc;
  },
  { last: sums.at(0), count: 0 },
);

console.log(count.count);
