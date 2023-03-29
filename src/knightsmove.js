/* eslint-disable no-restricted-syntax */
import { add } from 'mathjs';

function getPossibleMoves(root) {
  const possibleMovesArray = [];
  const moveVectors = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [-1, -2],
    [1, -2],
  ];

  moveVectors.forEach((item) => {
    if (!root) {
      return;
    }
    const moveOption = add(root, item);
    if (
      moveOption[0] > 0 &&
      moveOption[1] > 0 &&
      moveOption[0] < 9 &&
      moveOption[1] < 9
    ) {
      possibleMovesArray.push(moveOption);
    }
  });
  return possibleMovesArray;
}

function nodeFactory(value, parentNode = null) {
  return { value, parentNode };
}

function knightsMove(root, targetPosition) {
  function buildTree(root) {
    const rootNode = nodeFactory(root);
    const queue = [rootNode];

    while (queue.length > 0) {
      const childNodeArray = [];
      const currentNode = queue.shift();
      const movesArray = getPossibleMoves(currentNode.value);
      movesArray.forEach((moves) => {
        const childNode = nodeFactory(moves, currentNode);
        childNodeArray.push(childNode);
        queue.push(childNode);
      });
      currentNode.children = childNodeArray;
      if (currentNode.value.join() === targetPosition.join()) {
        queue.length = 0;
        break;
      }
    }
    return rootNode;
  }
  const rootNode = buildTree(root);
  return rootNode;
}
console.log(knightsMove([1, 1], [5, 4]));
