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
    let rootNode = nodeFactory(root, root);

    const array = getPossibleMoves(root); //3,2
    array.forEach((item) => {
      if (!visitedNode.includes(item) && !queue.includes(item)) {
        rootNode.children.push(nodeFactory(item, rootNode)); //3,2's children = 5,3... 5,1... 4,4
        visitedNode.push(item);
        queue.push(item);
      }
    });

    rootNode.children.forEach((item) => {
      if (item.value.join() === targetPosition.join()) {
        queue.length = 0;
      }

      while (queue.length > 0) {
        const newRoot = queue[0]; //3,.2
        queue.shift(); //2,3
        buildGraph(newRoot, queue, visitedNode, parentNode); //3,2, 2,3
      }
    });
    return rootNode;
  }
  return buildGraph(root);
}
console.log(knightsMove([1, 1], [3, 7]));
