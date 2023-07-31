const squares = document.querySelectorAll('.squares');

const board = [
  [1, 2, 3],
  ['', '', ''],
  ['', '', '']
]

function appendBoard() {
  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      let index = e.target.dataset.index;
      let row = Math.floor(index / 3);
      let column = index % 3;
      console.log(board[row][column]);
    });
  });
};

appendBoard();