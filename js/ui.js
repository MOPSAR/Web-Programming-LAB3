const board = document.getElementById('board');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const gameOverMessageElement = document.getElementById('gameOverMessage');
const playerNameInput = document.getElementById('playerName');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const leadersModal = document.getElementById('leadersModal');

function getTileClass(value) {
  return `tile-${value}`;
}

function renderBoard(grid) {
  board.innerHTML = '';

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const value = grid[row][col];
      const cell = document.createElement('div');

      cell.className = 'cell';

      if (value !== 0) {
        cell.classList.add(getTileClass(value));
        cell.textContent = value;
      }

      board.appendChild(cell);
    }
  }
}

function updateScore(score) {
  scoreElement.textContent = score;
}

function showGameOver() {
  gameOverElement.classList.remove('hidden');
  gameOverMessageElement.textContent = 'Игра окончена';
  playerNameInput.classList.remove('hidden');
  saveScoreBtn.classList.remove('hidden');
  playerNameInput.value = '';
}

function hideGameOver() {
  gameOverElement.classList.add('hidden');
  gameOverMessageElement.textContent = 'Игра окончена';
  playerNameInput.classList.remove('hidden');
  saveScoreBtn.classList.remove('hidden');
  playerNameInput.value = '';
}

function openLeadersModal() {
  leadersModal.classList.remove('hidden');
}

function closeLeadersModal() {
  leadersModal.classList.add('hidden');
}

function isLeadersModalOpen() {
  return !leadersModal.classList.contains('hidden');
}