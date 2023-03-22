import { add } from 'mathjs';

function nodeFactory(value, parentNode, children = []) {
  return { value, parentNode, children };
}

function knightsMove(root, targetPosition) {
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

  function buildGraph(
    root,
    queue = [],
    visitedNode = [root],
    parentNode = null
  ) {
    let rootNode = nodeFactory(root);

    const array = getPossibleMoves(root);
    array.forEach((item) => {
      if (!visitedNode.includes(item) && !queue.includes(item)) {
        rootNode.children.push(nodeFactory(item, root));
        visitedNode.push(item);
        queue.push(item);
      }
    });

    rootNode.children.forEach((item) => {
      if (item.value.join() === targetPosition.join()) {
        queue.length = 0;
      }

      while (queue.length > 0) {
        const newRoot = queue[0];
        queue.shift();
        buildGraph(newRoot, queue, visitedNode, parentNode);
      }
    });
    return rootNode;
  }
  return buildGraph(root);
}
console.log(knightsMove([1, 1], [5, 4]));
