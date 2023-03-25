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

function nodeFactory(value, parentNode) {
  return { value, parentNode };
}

function knightsMove(root, targetPosition) {
  function buildTree(
    currentNode,
    queue = [],
    visitedNode = [currentNode],
    parentNode = null,
    childNodeArray = []
  ) {
    let rootNode = nodeFactory(root);

    if (currentNode) {
      rootNode = currentNode;
    }

    const movesArray = getPossibleMoves(currentNode);
    movesArray.forEach((moves) => {
      const serialisedVisitedNode = JSON.stringify(visitedNode);
      const serialisedMove = JSON.stringify(moves);
      if (serialisedVisitedNode.indexOf(serialisedMove) === -1) {
        childNodeArray.push(nodeFactory(moves, rootNode));
        visitedNode.push(moves);
        queue.push(moves);
      }
    });

    rootNode.children = childNodeArray;

    rootNode.children.forEach((child) => {
      if (child.value.join() === targetPosition.join()) {
        queue.length = 0;
      }

      const newNode = queue[0];
      queue.shift();
      child = buildTree(newNode, queue, visitedNode, rootNode.parentNode, []);
    });
    return rootNode;
  }
  return buildTree(root);
}
console.log(knightsMove([5, 4], [1, 1]));
