const squares = document.querySelectorAll('.squares');

function playGame() {
  const boardObj = {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    winner: null,
    player: 'X',
    computer: 'O'
  };

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
    boardObj.winner = null;
    let temp = boardObj.player;
    boardObj.player = boardObj.computer;
    boardObj.computer = temp;
    if (boardObj.computer === 'X') doComputersTurn();
  });

  function clearBoard() {
    squares.forEach((square) => {
      square.classList.remove('disabled');
      square.textContent = '';
    })
    boardFiltered = null;
    boardObj.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  function doComputersTurn() {
    while (true) {
      const index = Math.floor(Math.random() * 9);
      const row = Math.floor(index / 3);
      const column = index % 3;
      const boardSquare = document.querySelector(`[data-index="${index}"]`);
      if (!boardObj.board[row][column]) {
        boardObj.board[row][column] = boardObj.computer;
        setTimeout(() => {
          boardSquare.textContent = boardObj.computer;
          boardSquare.classList.add('disabled');
        }, 250)
        break;
      }
    }
  }
  
  function playRound() {
    function appendWinnerScore(winner) {
      const playerScoreDisplay = document.querySelector('.player-score');
      const computerScoreDisplay = document.querySelector('.npc-score');
      if (winner === boardObj.player) {
        playerScoreDisplay.textContent = ++playerScore;
      } else if (winner === boardObj.computer) {
        computerScoreDisplay.textContent = ++computerScore;
      }
    }

    squares.forEach((square) => {
      square.addEventListener('click', (e) => {
        console.log(boardObj);
        function doPlayersTurn() {
          const index = e.target.dataset.index;
          const row = Math.floor(index / 3);
          const column = index % 3;
          boardObj.board[row][column] = boardObj.player;
          square.textContent = boardObj.player;
          square.classList.add('disabled');
        };
        doPlayersTurn();

        if (!checkForWinner()) {
          nextRoundButton.disabled = true;
          for (let i = 0; i < squares.length; i++) {
            if (!squares[i].textContent) {
              doComputersTurn();
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
      for (let i = 0; i < boardObj.board.length; i++) {
        const row = [];
        for (let j = 0; j < boardObj.board[i].length; j++) {
          row.push(boardObj.board[i][j]);
        };
        const result = row.every((item) => item === 'X') || row.every((item) => item === 'O');
        if (result) return row[0];
      }
    }
    function columnWinner() {
      for (let i = 0; i < boardObj.board.length; i++) {
        const column = [];
        for (let j = 0; j < boardObj.board[i].length; j++) {
          column.push(boardObj.board[j][i]);
        };
        const result = column.every((item) => item === 'X') || column.every((item) => item === 'O');
        if (result) return column[0];
      }
    }
    function diagonalWinner() {
      const diagonalOne = [];
      diagonalOne.push(boardObj.board[0][0], boardObj.board[1][1], boardObj.board[2][2]);
      const diagonalTwo = [];
      diagonalTwo.push(boardObj.board[0][2], boardObj.board[1][1], boardObj.board[2][0]);
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
    boardFiltered = [].concat(...boardObj.board).filter((item) => item != '');
    if (checkForWinner() || boardFiltered.length === 9) {
      squares.forEach((square) => {
        square.classList.add('disabled');
      });
    }
  }
}

playGame();