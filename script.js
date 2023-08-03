const squares = document.querySelectorAll('.squares');

function playGame() {
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let playerScore = 0;
  let computerScore = 0;
  
  const newGameButton = document.querySelector('.new-game-button');
  newGameButton.addEventListener('click', () => {
    clearBoard();
    nextRoundButton.disabled = false;
    playerScore = 0;
    computerScore = 0;
  });
  
  const nextRoundButton = document.querySelector('.next-round-button');
  nextRoundButton.addEventListener('click', () => {
    clearBoard();
  });

  function clearBoard() {
    squares.forEach((square) => {
      square.classList.remove('disabled');
      square.textContent = '';
    })
    boardFiltered = null;
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }
  
  function playRound() {
    function appendWinnerScore(winner) {
      if (winner === 'X') {
        playerScore++;
        console.log('PLAYER SCORE: ' + playerScore);
        console.log('COMPUTER SCORE: ' + computerScore);
      } else if (winner === 'O') {
        computerScore++;
        console.log('PLAYER SCORE: ' + playerScore);
        console.log('COMPUTER SCORE: ' + computerScore);
      }
    }

    function computersChoice() {
      while (true) {
        const index = Math.floor(Math.random() * 9);
        const row = Math.floor(index / 3);
        const column = index % 3;
        const boardSquare = document.querySelector(`[data-index="${index}"]`);
        if (!board[row][column]) {
          board[row][column] = 'O';
          setTimeout(() => {
            boardSquare.classList.add('disabled');
            boardSquare.textContent = 'O';
          }, 250)
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
        square.classList.add('disabled');
        if (!checkForWinner()) {
          nextRoundButton.disabled = true;
          for (let i = 0; i < squares.length; i++) {
            if (!squares[i].textContent) {
              computersChoice();
              break;
            };
          };
        } else {
          nextRoundButton.disabled = false;
        }
        disableBoard();
        appendWinnerScore(checkForWinner());
      });
    });
  };
  playRound();

  function checkForWinner() {
    function rowWinner() {
      for (let i = 0; i < board.length; i++) {
        const row = [];
        for (let j = 0; j < board[i].length; j++) {
          row.push(board[i][j]);
        };
  
        const result = row.every((item) => item === 'X') || row.every((item) => item === 'O');
        if (result) return row[0];
      }
    }
    function columnWinner() {
      for (let i = 0; i < board.length; i++) {
        const column = [];
        for (let j = 0; j < board[i].length; j++) {
          column.push(board[j][i]);
        };
  
        const result = column.every((item) => item === 'X') || column.every((item) => item === 'O');
        if (result) return column[0];
      }
    }
    function diagonalWinner() {
      const diagonalOne = [];
      diagonalOne.push(board[0][0], board[1][1], board[2][2]);
      const diagonalTwo = [];
      diagonalTwo.push(board[0][2], board[1][1], board[2][0]);
  
      const resultA = diagonalOne.every((item) => item === 'X') ||
                      diagonalOne.every((item) => item === 'O');
      const resultB = diagonalTwo.every((item) => item === 'X') ||
                      diagonalTwo.every((item) => item === 'O');
      if (resultA) {
        return diagonalOne[0];
      } else if (resultB) {
        return diagonalTwo[0];
      }
    }

    const winner = rowWinner() || columnWinner() || diagonalWinner();
    return winner;
  }

  let boardFiltered = null;
  function disableBoard() {
    boardFiltered = [].concat(...board).filter((item) => item != '');
    if (checkForWinner() || boardFiltered.length === 9) {
      squares.forEach((square) => {
        square.classList.add('disabled');
      });
    }
  }
}

playGame();