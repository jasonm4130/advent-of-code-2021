/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');

/**
 * Function that gets the input file as an array of strings (lines)
 * @param {string} filePath - The path to the input file
 * @returns {array} - The input file lines
 */
function getLines(filePath) {
  // Read the input file
  const input = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');

  // Split the input into an array of lines
  return input.split('\n').map((line) => line.split(''));
}

/**
 * Function that gets the connections for a character as a key value pair
 * @param {string[]} lines - The lines of the input file
 * @param {number} i - The row of the character
 * @param {number} j - The column of the character
 * @returns {object} - The connections for the character
 */
function getConnections(lines, i, j) {
  const connections = {};

  // Get the possible connections for the character
  const possibleConnections = [
    { x: i - 1, y: j },
    { x: i + 1, y: j },
    { x: i, y: j - 1 },
    { x: i, y: j + 1 },
  ];

  // Loop through the possible connections
  possibleConnections.forEach((connection) => {
    // If the connection is valid
    if (
      connection.x >= 0
      && connection.x < lines.length
      && connection.y >= 0
      && connection.y < lines[connection.x].length
    ) {
    // Get the character at the connection
      const character = lines[connection.x][connection.y];

      // If the character is not undefined
      if (character) {
      // Get the key for the connection
        let key = `${connection.x}-${connection.y}`;

        // If the connection is [0,0] set the key as start
        if (connection.x === 0 && connection.y === 0) {
          key = 'start';
        }

        // If the connection is the end set the key as end
        if (connection.x === lines.length - 1 && connection.y === lines[connection.x].length - 1) {
          key = 'finish';
        }

        // Add the character to the connections
        connections[key] = parseInt(character, 10);
      }
    }
  });

  // Return the connections
  return connections;
}

/**
 * Create a graph from the input file
 * @param {string} filePath - The path to the input file
 * @returns {object} - The graph
 */
function createGraph(filePath) {
  // Read the input file
  const input = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');

  // Split the input into lines
  const lines = input.split('\n');

  // Create the graph
  const graph = {};

  // Loop through each line
  for (let i = 0; i < lines.length; i++) {
    // Loop through each character
    for (let j = 0; j < lines[i].length; j++) {
      // create a key for the character
      let key = `${i}-${j}`;

      // Get the connections for the character
      const connections = getConnections(getLines(filePath), i, j);

      // If the item is [0,0] set the key as start
      if (i === 0 && j === 0) {
        key = 'start';
      }

      // If the item is the end set the key as end
      if (i === lines.length - 1 && j === lines[i].length - 1) {
        key = 'finish';
      }

      // If this isn't the finish node
      if (key !== 'finish') {
        // Add the character to the graph
        graph[key] = {
          connections,
        };
      } else {
        // Add the character to the graph
        graph[key] = {};
      }
    }
  }

  // Return the graph
  return graph;
}

/**
 * Function that gets the parents for a given node
 * @param {object} graph - The graph
 * @param {string} node - The node to get the parents for
 * @returns {object} - The parents for the node
 */
function getParents(graph, node) {
  // Create the parents object
  const parents = {};

  // Loop through each connection
  Object.keys(graph[node].connections).forEach((connection) => {
    // Set the parent for the connection
    parents[connection] = node;
  });

  // Return the parents
  return parents;
}

function main() {
  // Create the graph
  const graph = createGraph('test.txt');

  const lowestCostNode = (costs, processed) => Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);

  // function that returns the minimum cost and path to reach Finish
  const dijkstra = (graph) => {
    // track lowest cost to reach each node
    const costs = { finish: Infinity, ...graph.start };

    // track paths
    const parents = { finish: null };
    for (const child in graph.start) {
      parents[child] = 'start';
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
      const cost = costs[node];
      const children = graph[node];
      for (const n in children) {
        const newCost = cost + children[n];
        if (!costs[n]) {
          costs[n] = newCost;
          parents[n] = node;
        }
        if (costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = lowestCostNode(costs, processed);
    }

    const optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
      distance: costs.finish,
      path: optimalPath,
    };

    return results;
  };

  console.log(dijkstra(graph));
}

main();
