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
    const [y, x] = point.split(',').map((coord) => parseInt(coord, 10));
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

function getHighestPoints(dots) {
  // Get highest x and y numbers
  return dots.reduce((previous, currentPoint) => {
    // eslint-disable-next-line no-param-reassign
    const xHighest = currentPoint.x > previous.x ? currentPoint.x : previous.x;
    // eslint-disable-next-line no-param-reassign
    const yHighest = currentPoint.y > previous.y ? currentPoint.y : previous.y;

    return { x: xHighest, y: yHighest };
  }, { x: 0, y: 0 });
}

function drawPaper(dots) {
  // Get the highest points
  const { x: xEnd, y: yEnd } = getHighestPoints(dots);

  const rows = [];

  // Loop through x and y
  for (let x = 0; x <= xEnd; x++) {
    const row = [];
    for (let y = 0; y <= yEnd; y++) {
      // If there is a dot push a '#'
      if (dots.find((dot) => dot.y === y && dot.x === x)) {
        row.push('#');
      } else {
        row.push('.');
      }
    }
    rows.push(row);
  }

  // Convert our Matrix to a string
  console.log(rows.map((row) => row.join('')).join('\n'));
}

function main() {
  // Get the input location from the args
  const { input: inputFile } = args.parse(process.argv);

  // Read in the input file
  const input = fs.readFileSync(path.resolve(inputFile), { encoding: 'utf8' });

  // get the dots and the instructions by splitting the input at an empty line
  const { points, instructions } = getPointsAndInstructions(input);

  drawPaper(points);
}

main();
