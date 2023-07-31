const squares = document.querySelectorAll('.squares');

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function appendBoard() {
  function computersChoice() {
    while (true) {
      const index = Math.floor(Math.random() * 9);
      const row = Math.floor(index / 3);
      const column = index % 3;
      const boardSquare = document.querySelector(`[data-index="${index}"]`);
      if (!board[row][column]) {
        board[row][column] = 'O';
        boardSquare.textContent = 'O';
        break;
      }
    }
  }

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const row = Math.floor(index / 3);
      const column = index % 3;
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

// function checkForWinner() {
//   const rowWinner = 
// }