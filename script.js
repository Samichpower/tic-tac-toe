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
    });
  });
};

appendBoard();