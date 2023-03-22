import { add } from 'mathjs';

function nodeFactory(value, parentNode, children = []) {
  return { value, parentNode, children };
}

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

function knightsMove(root, targetPosition) {
  function buildGraph(
    currentNode,
    queue = [],
    visitedNode = [currentNode],
    parentNode = null
  ) {
    let rootNode = nodeFactory(currentNode);

    const movesArray = getPossibleMoves(currentNode);
    movesArray.forEach((moves) => {
      if (!visitedNode.includes(moves) && !queue.includes(moves)) {
        rootNode.children.push(nodeFactory(moves, rootNode));
        visitedNode.push(moves);
        queue.push(moves);
      }
    });

    rootNode.children.forEach((childNode) => {
      if (childNode.value.join() === targetPosition.join()) {
        queue.length = 0;
        return targetPosition;
      }

      const newNode = queue[0];
      queue.shift();
      childNode.children = buildGraph(newNode, queue, visitedNode, parentNode);
    });
    return rootNode;
  }
  return buildGraph(root);
}
console.log(knightsMove([1, 1], [5, 4]));
