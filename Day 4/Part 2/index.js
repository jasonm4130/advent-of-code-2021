const fs = require('fs');
const path = require('path');

// Get the numbers called from then input
function getNumbers(inputFile) {
  // Read the input file
  const lines = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf8').split('\n');

  // Get the numbers from the first line
  const numbers = lines[0].split(',').map((number) => parseInt(number, 10));

  // Return the numbers
  return numbers;
}

// Function that gets the bingo cards from the input as an array of arrays
function getBingoCards(inputFile) {
  // Read the input file and split it at each empty line
  const lines = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf8').split('\n\n');

  // Remove the first line as this is the number sequence
  lines.shift();

  // Split each card at the new line character
  const cards = lines.map((card) => card.split('\n'));

  // Get the array of integers from each card
  const cardArrays = cards.map((card) => card.map((row) => row.trim().split(/ {1,2}/).map(Number)));

  // Return the cards
  return cardArrays;
}

const numberSequence = getNumbers('../Part 1/input.txt');
const bingoCards = getBingoCards('../Part 1/input.txt');

// Function that gets the last bingo card that will win
function getLastBingoCard(numberSequence, bingoCards) {
  const calledNumbers = [];
  const winningCards = [];
  let winningNumber;
  // Loop through the numbers
  for (let i = 0; i < numberSequence.length; i++) {
    // Add the number to the called numbers
    calledNumbers.push(numberSequence[i]);

    // Loop through the bingo cards
    for (let j = 0; j < bingoCards.length; j++) {
      let isWinningRow = false;
      let isWinningColumn = false;
      // If any row contains all the called numbers, the card wins and should be added to the winning cards and removed from the bingo cards
      if (bingoCards[j].some((row) => row.every((number) => calledNumbers.includes(number)))) {
        isWinningRow = true;
      }

      // Convert the card into an array of arrays representing the columns
      const columns = [];
      for (let k = 0; k < bingoCards[j][0].length; k++) {
        columns.push(bingoCards[j].map((row) => row[k]));
      }

      // If any column contains all the called numbers, the card wins and should be added to the winning cards and removed from the bingo cards
      if (columns.some((column) => column.every((number) => calledNumbers.includes(number)))) {
        isWinningColumn = true;
      }

      // If the card is a winning row or column, add it to the winning cards and remove it from the bingo cards
      if (isWinningRow || isWinningColumn) {
        winningCards.push(bingoCards[j]);
        bingoCards.splice(j, 1);
      }
    }

    // When there are no more bingo cards left, the winning number is the last called number
    if (bingoCards.length === 0) {
      winningNumber = calledNumbers[calledNumbers.length - 1];
      break;
    }
  }

  // Return the winning number and the winning cards (last card in the array)
  return {
    winningNumber,
    winningCards: winningCards[winningCards.length - 1],
    calledNumbers,
  };
}

// Get the last bingo card that will win
const lastBingoCard = getLastBingoCard(numberSequence, bingoCards);

// Print the winning number and the winning card
console.log(`The winning number is ${lastBingoCard.winningNumber}`);
console.log(lastBingoCard.winningCards);

// Remove all the called number from the last winning card
const lastBingoCardWithoutCalledNumbers = lastBingoCard.winningCards.map((row) => row.filter((number) => !lastBingoCard.calledNumbers.includes(number)));

console.log(lastBingoCardWithoutCalledNumbers);

// Sum the remaining numbers in the last winning card
const sum = lastBingoCardWithoutCalledNumbers.reduce((sum, row) => sum + row.reduce((sum, number) => sum + number, 0), 0);

// Multiply the winning number by the sum of the numbers in the winning card
console.log(`The product of the winning number and the sum of the numbers in the winning card is ${lastBingoCard.winningNumber * sum}`);
