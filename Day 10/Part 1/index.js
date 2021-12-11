const fs = require('fs');
const path = require('path');

const START_CHARS = ['(', '<', '{', '['];
const END_CHARS = [')', '>', '}', ']'];

const POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
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

// Check each line logging the error if there is one
const lines = getLines(getInput('input.txt'));

let score = 0;

lines.forEach((line) => {
  const result = checkLine(line);

  if (result !== true) {
    console.log(result.error);
    score += POINTS[result.char];
  }
});

console.log(score);
