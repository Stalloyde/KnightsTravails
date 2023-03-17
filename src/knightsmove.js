import { add } from 'mathjs';

function nodeFactory(value, descendants = []) {
  value = value;
  return { value, descendants };
}

function knightsMove(root, targetPosition) {
  const possibleMovesArray = [];
  function getPossibleMoves() {
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
  }

  function buildTree(root, queue = []) {
    if (root[0] === targetPosition[0] && root[1] === targetPosition[1]) {
      return root;
    }

    const rootNode = nodeFactory(root);
    getPossibleMoves();
    console.log(possibleMovesArray);
    possibleMovesArray.forEach((item) => {
      rootNode.descendants.push(item);
    });
    console.log(rootNode);
  }

  return buildTree(root);
}
knightsMove([1, 1], [5, 4]);
