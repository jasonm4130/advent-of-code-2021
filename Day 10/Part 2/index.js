const fs = require('fs');
const path = require('path');

const START_CHARS = ['(', '<', '{', '['];
const END_CHARS = [')', '>', '}', ']'];

const POINTS = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

/**
 * Function that gets the input file
 * @param {string} fileName - The name of the file
 * @returns {string} - The contents of the file
 */
function getInput(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8');
}

/**
 * Function that breaks the input into lines
 * @param {string} input - The input to break into lines
 * @returns {string[]} - The lines of the input
 */
function getLines(input) {
  return input.split('\n');
}

/**
 * Function that checks the syntax for each line
 * @param {string} line - The line to check
 * @returns {boolean|object}} - Whether the line is valid and if not, the error as an object (line, char, error)
 */
function checkLine(line) {
  // Break our line into characters
  const chars = line.split('');

  // Define our stack
  const stack = [];

  // Loop through each character
  for (let i = 0; i < chars.length; i++) {
    // Get the current character
    const char = chars[i];

    // Check if the character is a start character
    if (START_CHARS.includes(char)) {
      // Push the character to the stack
      stack.push(char);
    }

    // Check if the character is an end character
    if (END_CHARS.includes(char)) {
      // Check if the stack is empty
      if (stack.length === 0) {
        // Return the error
        return {
          line: i + 1,
          char,
          error: `Line ${i + 1} is invalid because the stack is empty`,
        };
      }

      // Get the last character in the stack
      const lastChar = stack.pop();

      // Check if the last character is not a matching character
      if (START_CHARS.includes(lastChar) && char !== END_CHARS[START_CHARS.indexOf(lastChar)]) {
        // Return the error
        return {
          line: i + 1,
          char,
          error: `Line ${i + 1} is invalid because the last character in the stack is ${lastChar}`,
        };
      }
    }
  }

  return true;
}

/**
 * Function that finds the charachters to complete an incomplete line
 * @param {string} line - The line to find the characters for
 * @returns {string[]} - The characters needed to complete the line
 */
function findCharacters(line) {
  // Define our characters
  const characters = [];

  // Define our stack
  const stack = [];

  // Loop through each character
  for (let i = 0; i < line.length; i++) {
    // Get the current character
    const char = line[i];

    // Check if the character is a start character
    if (START_CHARS.includes(char)) {
      // Push the character to the stack
      stack.push(char);
    }

    // Check if the character is an end character
    if (END_CHARS.includes(char)) {
      // Remove the last character from the stack
      stack.pop();
    }
  }

  // Reverse the stack
  stack.reverse();

  // For each of the characters in the stack
  for (let i = 0; i < stack.length; i++) {
    // Get the current character
    const char = stack[i];

    // Get the corresponding closing character
    const closingChar = END_CHARS[START_CHARS.indexOf(char)];

    // Add the closing character to the characters
    characters.push(closingChar);
  }

  return characters;
}

// Check each line logging the error if there is one
const lines = getLines(getInput('../Part 1/input.txt'));

// Remove the invalid lines
const incompleteLines = lines.filter((line) => checkLine(line) === true);

// Get the scores for each line
const autocompleteScores = incompleteLines.map((line) => {
  const characters = findCharacters(line);

  let score = 0;

  characters.forEach((char) => {
    score = (score * 5) + POINTS[char];
  });

  console.log(`Line ${line} with completion charachters ${characters.join(', ')} is valid and has a score of ${score}`);

  return score;
});

// Sort the scores
const sortedScores = autocompleteScores.sort((a, b) => b - a);

// Find the middle score
const middleScore = sortedScores[Math.floor(sortedScores.length / 2)];

console.log(`The middle score is ${middleScore}`);
