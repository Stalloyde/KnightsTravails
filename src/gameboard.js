import { add } from 'mathjs';

function gameBoard() {
  const board = [];
  for (let i = 1; i < 9; i++) {
    for (let x = 1; x < 9; x++) {
      board.push([i, x]);
    }
  }

  const knight = {
    name: 'Knight',
    currentPos: [5, 4],
  };

  const possibleMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [-1, -2],
    [1, -2],
  ];

  console.log(add(knight.currentPos, possibleMoves[0]));
  console.log(add(knight.currentPos, possibleMoves[1]));
  console.log(add(knight.currentPos, possibleMoves[2]));
  console.log(add(knight.currentPos, possibleMoves[3]));
  console.log(add(knight.currentPos, possibleMoves[4]));
  console.log(add(knight.currentPos, possibleMoves[5]));
  console.log(add(knight.currentPos, possibleMoves[6]));
  console.log(add(knight.currentPos, possibleMoves[7]));
  return { board, knight };
}
gameBoard();
