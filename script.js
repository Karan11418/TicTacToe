// script.js
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');
const newGameBtn = document.querySelector('.new-game');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] || isGameOver()) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    endGame();
    return;
  }

  if (board.every(cell => cell)) {
    statusText.textContent = `It's a Draw! 🤝`;
    endGame();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function isGameOver() {
  return board.every(cell => cell) || checkWin();
}

function restartGame() {
  board.fill(null);
  currentPlayer = 'X';
  statusText.textContent = `Player X's Turn`;
  newGameBtn.style.display = 'none';

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

function endGame() {
  newGameBtn.style.display = 'inline-block';
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function newGame() {
  restartGame();
  cells.forEach(cell => cell.addEventListener('click', handleClick));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', newGame);
