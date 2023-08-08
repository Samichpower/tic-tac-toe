const squares = document.querySelectorAll('.squares');

const boardObj = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  roundWinner: null,
  player: 'X',
  computer: 'O',
  difficulty: 'normal',
};

let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.querySelector('.player-score');
const computerScoreDisplay = document.querySelector('.npc-score');
const playerSymbol = document.querySelector('.player-char');
const computerSymbol = document.querySelector('.computer-char');

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
  clearGame();
  boardObj.player = 'X';
  boardObj.computer = 'O';
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = playerScore;
  playerSymbol.textContent = 'X';
  computerSymbol.textContent = 'O';
});

const nextRoundButton = document.querySelector('.next-round-button');
nextRoundButton.disabled = true;
nextRoundButton.addEventListener('click', () => {
  clearGame();
  let temp = boardObj.player;
  boardObj.player = boardObj.computer;
  boardObj.computer = temp;
  playerSymbol.textContent = boardObj.player;
  computerSymbol.textContent = boardObj.computer;
  if (boardObj.computer === 'X') doComputersTurn();
});

function clearGame() {
  nextRoundButton.disabled = true;
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
  boardObj.roundWinner = null;
}

function doComputersTurn() {
  let index;
  let squareIndex;
  function getRandomMove() {
    while (true) {
      index = Math.floor(Math.random() * 9);
      squareIndex = document.querySelector(`[data-index="${index}"]`);
      if (!squareIndex.textContent) break;
    }
    const row = Math.floor(index / 3);
    const column = index % 3;
    boardObj.board[row][column] = boardObj.computer;
    setTimeout(() => {
      squareIndex.textContent = boardObj.computer;
      squareIndex.classList.add('disabled');
    }, 250);
  }

  function findWinningMove(board, symbol) {
    for (let row = 0; row < board.length; row++) {
      if (board[row].filter((item) => item === boardObj.computer).length === 2 && board[row].filter((item) => item === '').length === 1) {
        let item = board[row].indexOf('');
        index = row * 3 + item;
        squareIndex = document.querySelector(`[data-index="${index}"]`);
        console.log(squareIndex);
      }
    }
  }

  if (boardObj.difficulty === 'easy') {
    getRandomMove();
  } else if (boardObj.difficulty === 'normal') {
    findWinningMove(boardObj.board, boardObj.computer);
    getRandomMove();
  }
}

function playRound() {
  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
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
        for (let i = 0; i < squares.length; i++) {
          if (!squares[i].textContent) {
            doComputersTurn();
            break;
          };
        };
      } 
      disableBoard();
      
      if (checkForWinner() === boardObj.player) {
        playerScoreDisplay.textContent = ++playerScore;
      } else if (checkForWinner() === boardObj.computer) {
        computerScoreDisplay.textContent = ++computerScore;
      }
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
  if (winner === boardObj.player) {
    boardObj.roundWinner = 'Player';
  } else if (winner === boardObj.computer) {
    boardObj.roundWinner = 'Computer';
  };
  return winner;
}

let boardFiltered = null;
function disableBoard() {
  boardFiltered = [].concat(...boardObj.board).filter((item) => item != '');
  if (checkForWinner() || boardFiltered.length === 9) {
    nextRoundButton.disabled = false;
    squares.forEach((square) => {
      square.classList.add('disabled');
    });
  }
}