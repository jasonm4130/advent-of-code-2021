/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');

// Load in out input
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

// Get the number sequence from the input (this is simply the first line of the input)
const sequence = input.split('\n')[0].split(',').map(Number);

// Get each board from the input (this is the input split at each empty line, excluding the first line)
const boards = input.split('\n\n').slice(1);

// For each board convert it to a 2D array of numbers (each number is seperate by a space)
const boardArrays = boards.map((board) => board.split('\n').map((row) => row.trim().split(/ {1,2}/).map(Number)));

// Define if we have found a winner yet
let winningBoard = null;

// Define the winning number
let winningNumber = null;

// Loop through the sequence
sequence.forEach((sequenceNumber) => {
  // If we haven't found a winner yet set the winning number
  if (winningBoard === null) {
    winningNumber = sequenceNumber;

    // For each board
    boardArrays.forEach((board) => {
      // Subsititue the currnent number for null
      board.forEach((row, rowIndex) => {
        row.forEach((number, numberIndex) => {
          if (sequenceNumber === number) {
            board[rowIndex][numberIndex] = null;
          }
        });
      });

      // Check if any row contains all nulls
      board.forEach((row) => {
        if (row.every((column) => column === null)) {
          winningBoard = board;
        }
      });

      // Check if any column contains all nulls
      board.forEach((row, index) => {
        // Get the column from the board
        const column = board.map((row) => row[index]);

        // Check if the column contains all nulls
        if (column.every((column) => column === null)) {
          winningBoard = board;
        }
      });
    });
  }
});

// Get the sum of the winning board
const sum = winningBoard.reduce((sum, row) => sum + row.reduce((sum, number) => sum + number, 0), 0);

// Log the winning board
console.log(winningBoard, winningNumber, sum);
console.log(`The answer is ${sum * winningNumber}`);
