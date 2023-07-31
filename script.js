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
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i].textContent) {
          computersChoice();
          break;
        }
      }
      console.log(board);
    });
  });
};

appendBoard();

function computersChoice() {
  while (true) {
    let index = Math.floor(Math.random() * 9);
    let row = Math.floor(index / 3);
    let column = index % 3;
    const boardSquare = document.querySelector(`[data-index="${index}"]`);
    if (!board[row][column]) {
      board[row][column] = 'O';
      boardSquare.textContent = 'O';
      break;
    }
  }
}