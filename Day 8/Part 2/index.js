/* eslint-disable no-restricted-syntax */
/* eslint-disable no-extend-native */
const fs = require('fs');
const path = require('path');

// Define the isSuperset method for sets
Set.prototype.isSuperset = function isSuperset(set) {
  // Check if the set is a subset of this set
  if (this.size < set.size) {
    return false;
  }

  // Check if the set is a subset of this set
  for (const item of set) {
    if (!this.has(item)) {
      return false;
    }
  }

  // If we made it this far, the set is a subset of this set
  return true;
};

// Define the subtract method for sets
Set.prototype.subtract = function subtract(set) {
  // Create a new set to hold the difference
  const difference = new Set(this);

  // Remove all items from the difference set that are in the set
  for (const item of set) {
    difference.delete(item);
  }

  // Return the difference set
  return difference;
};

/**
 * Function that gets the input in a usable format
 * @param {string} filePath - The path to the input file
 * @returns {string[]} - The input in a usable format
 */
function getInput(filePath) {
  // Get the input file
  const input = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');

  // Split the input into an array of objects (signal pattern and output value)
  return input.split('\n')
    .map((row) => row.split('|'))
    .map(([input, output]) => ({
      input: input
        .split(' ')
        .filter((n) => !!n)
        .map((val) => [...val.split('')].sort().join('')),
      output: output
        .split(' ')
        .filter((n) => !!n)
        .map((val) => [...val.split('')].sort().join('')),
    }));
}

/**
 * Function that solves for five segments
 * @param {object} pattern - The pattern to solve for
 * @param {object} uniqueTranslations - The unique translations
 * @returns the number the pattern represents
 */
function solveForFive(pattern, uniqueTranslations) {
  const { seven, four, one } = uniqueTranslations;

  if (seven && pattern.isSuperset(seven)) {
    return 3;
  }
  if (four && one && pattern.isSuperset(four.subtract(one))) {
    return 5;
  }
  return 2;
}

/**
 * Function that solves for six segments
 * @param {object} pattern - The pattern to solve for
 * @param {object} uniqueTranslations - The unique translations
 * @returns the number the pattern represents
 */
function solveForSix(pattern, uniqueTranslations) {
  const { seven, four } = uniqueTranslations;

  if (seven && !pattern.isSuperset(seven)) {
    return 6;
  }

  if (four && pattern.isSuperset(four)) {
    return 9;
  }

  return 0;
}

/**
 * Get our translations
 * @param {string[]} output - The signal to translate
 * @returns {object} - The translations
 */
function getUniqueTranslations(output) {
  // Remove any items that dont match the lenght of our known numbers
  return output
    .filter((item) => [7, 3, 4, 2].includes(item.length))
    .reduce((translatins, next) => {
      switch (next.length) {
        case 7:
          return { ...translatins, eight: new Set(next) };
        case 3:
          return { ...translatins, seven: new Set(next) };
        case 4:
          return { ...translatins, four: new Set(next) };
        case 2:
          return { ...translatins, one: new Set(next) };
        default:
          return { ...translatins };
      }
    }, {});
}

/**
 * Function that works out the segments for possible numbers
 * @param {object} input - The input to work out the segments for
 * @param {object} uniqueTranslations - The unique translations
 * @returns {object} - The segments
 */
function getTranslations(input, uniqueTranslations) {
  return input.reduce((translations, pattern) => {
    // Get the current pattern as a set
    const patternSet = new Set(pattern);

    switch (pattern.length) {
      case 7:
        return {
          ...translations,
          [pattern]: 8,
        };
      case 3:
        return {
          ...translations,
          [pattern]: 7,
        };
      case 4:
        return {
          ...translations,
          [pattern]: 4,
        };
      case 2:
        return {
          ...translations,
          [pattern]: 1,
        };
      case 5:
        return {
          ...translations,
          [pattern]: solveForFive(patternSet, uniqueTranslations),
        };
      case 6:
        return {
          ...translations,
          [pattern]: solveForSix(patternSet, uniqueTranslations),
        };
      default:
        return translations;
    }
  }, {});
}

/**
 * Function that solves the signal
 * @param {object} translations - The translations
 * @param {string[]} output - The output to solve for
 * @returns {number} - The number the signal represents
 */
function solveSignal(translations, output) {
  return parseInt(output.map((value) => translations[value]).join(''), 10);
}

const answer = getInput('../Part 1/input.txt').map(({ input, output }) => {
  const uniqueTranslations = getUniqueTranslations(input);
  const translations = getTranslations(input, uniqueTranslations);
  return solveSignal(translations, output);
}).reduce((acc, val) => acc + val, 0);

console.log(answer);
