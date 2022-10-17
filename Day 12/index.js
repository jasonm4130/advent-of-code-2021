const args = require('args');
const fs = require('fs');
const path = require('path');

args.option('input', 'The input file to run against');

function getPointsAndInstructions(input) {
  let [points, instructions] = input.split(/\n\s*\n/);

  // Split the points at the new line
  points = points.split('\n');

  // Transform the points into objects
  points = points.map((point) => {
    const [x, y] = point.split(',');
    return {
      x, y,
    };
  });

  // Split the instructions at the new line
  instructions = instructions.split('\n');

  // Tansform the instructions into object
  instructions = instructions.map((instruction) => {
    const [direction, position] = instruction.match(/.=./)[0].split('=');
    return {
      direction, position,
    };
  });

  return { points, instructions };
}

function main() {
  // Get the input location from the args
  const { input: inputFile } = args.parse(process.argv);

  // Read in the input file
  const input = fs.readFileSync(path.resolve(inputFile), { encoding: 'utf8' });

  // get the dots and the instructions by splitting the input at an empty line
  const { points, instructions } = getPointsAndInstructions(input);

  console.log(points, instructions);
}

main();
