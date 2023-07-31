const squares = document.querySelectorAll('.squares');

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function appendBoard() {
  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      let index = e.target.dataset.index;
      let row = Math.floor(index / 3);
      let column = index % 3;
      board[row][column] = 'X';
      square.textContent = 'X';
      computersTurn();
      console.log(board);
    });
  });
};

appendBoard();

function computersTurn() {
  let index = Math.floor(Math.random() * 9);
  let row = Math.floor(index / 3);
  let column = index % 3;
  board[row][column] = 'O';
  const boardSquare = document.querySelector(`[data-index="${index}"]`);
  boardSquare.textContent = 'O';
}