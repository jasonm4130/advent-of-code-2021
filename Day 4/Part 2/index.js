/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');

// Read in the input file
const input = fs.readFileSync(path.resolve(__dirname, '../Part 1/input.txt'), 'utf8');

// Get the number sequence from the input (this is simply the first line of the input)
const sequence = input.split('\n')[0].split(',').map(Number);

// Get each board from the input (this is the input split at each empty line, excluding the first line)
const boards = input.split('\n\n').slice(1);

// For each board convert it to a 2D array of numbers (each number is seperate by a space)
const boardArrays = boards.map((board) => board.split('\n').map((row) => row.trim().split(/ {1,2}/).map(Number)));

function isBoardWinning(board) {
  // Default assume the board hasn't won
  let hasBoardWon = false;

  // Check if the board has a row or column that is all null
  board.forEach((row) => {
    if (row.every((column) => column === null)) {
      hasBoardWon = true;
    }
  });

  // Check if any column contains all nulls
  board.forEach((row, index) => {
    // Get the column from the board
    const column = board.map((row) => row[index]);

    // Check if the column contains all nulls
    if (column.every((column) => column === null)) {
      hasBoardWon = true;
    }
  });

  // The default return value
  return hasBoardWon;
}

let lastWinningBoard = null;
let lastWinningNumber = null;

// For each sequence number
sequence.forEach((number) => {
  // If we dont have the last winning board yet
  if (boardArrays.length > 1) {
    // for each board
    boardArrays.forEach((board) => {
      // For each row
      board.forEach((row, rowIndex) => {
        // For each column
        row.forEach((column, columnIndex) => {
          // If the column is null
          if (column === number) {
            // Set the column to the number
            board[rowIndex][columnIndex] = null;
          }
        });
      });

      // Check if the board has won
      if (isBoardWinning(board) && boardArrays.length > 1) {
        // remove the board from the board arrays
        boardArrays.splice(boardArrays.indexOf(board), 1);
        // Set the last winning board to the board
        lastWinningBoard = board;
        // Set the last winning number to the number
        lastWinningNumber = number;
      }
    });
  }
});

// Get the sum of the last winning board
const sum = lastWinningBoard.reduce((sum, row) => sum + row.reduce((sum, column) => sum + column), 0);

console.log('The last winning board is:');
console.log(lastWinningBoard);
console.log(`The last winning number is: ${lastWinningNumber}`);
console.log(`The sum of the last winning board is: ${sum}`);
console.log(`The answer is ${sum * lastWinningNumber}`);
