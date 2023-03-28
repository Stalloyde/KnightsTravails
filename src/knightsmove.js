/* eslint-disable no-restricted-syntax */
import { toSafeInteger } from 'lodash';
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
    childNodeArray = []
  ) {
    let rootNode = root;

    if (queue.length === 0) {
      rootNode = nodeFactory(root, root);
    } else {
      rootNode = currentNode;
    }

    const movesArray = getPossibleMoves(currentNode);
    movesArray.forEach((moves) => {
      const serialisedVisitedNode = JSON.stringify(visitedNode);
      const serialisedMove = JSON.stringify(moves);
      if (serialisedVisitedNode.indexOf(serialisedMove) === -1) {
        childNodeArray.push(nodeFactory(moves, rootNode)); //Pass grandparentNode to child node
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
      child = buildTree(newNode, queue, visitedNode, []); //Pass rootNode as grandparentNode to child
    });
    return rootNode;
  }

  const rootNode = buildTree(root);

  function findShortestPath(root, queue = [root], path = [root.value]) {
    if (!root || !queue.length) return path;

    if (root.value === rootNode.value) {
      root.children.forEach((child) => queue.push(child));
    }

    if (root.value.children) {
      root.value.children.forEach((child) => {
        const node = {
          value: [child.value[0], child.value[1]],
          children: child.value.children,
        };
        queue.push(node);
        if (node.children) {
          for (const child of node.children) {
            if (child.value.join() === targetPosition.join()) {
              queue.length = 0;
              path.push(child.value);
            }
          }
        }
      });
    }

    const newRoot = queue[0];
    queue.shift();
    return findShortestPath(newRoot, queue, path);
  }

  return findShortestPath(rootNode);
}

console.log(knightsMove([1, 1], [5, 4]));
