const board = document.getElementById('board');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const gameOverMessageElement = document.getElementById('gameOverMessage');
const playerNameInput = document.getElementById('playerName');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const leadersModal = document.getElementById('leadersModal');
const leadersTableBody = document.getElementById('leadersTableBody');
const mobileControls = document.getElementById('mobileControls');

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

function showMobileControls() {
  mobileControls.classList.remove('hidden');
}

function hideMobileControls() {
  mobileControls.classList.add('hidden');
}

function showGameOver() {
  gameOverElement.classList.remove('hidden');
  gameOverMessageElement.textContent = 'Игра окончена';
  playerNameInput.classList.remove('hidden');
  saveScoreBtn.classList.remove('hidden');
  playerNameInput.value = '';
  hideMobileControls();
}

function hideGameOver() {
  gameOverElement.classList.add('hidden');
  gameOverMessageElement.textContent = 'Игра окончена';
  playerNameInput.classList.remove('hidden');
  saveScoreBtn.classList.remove('hidden');
  playerNameInput.value = '';
  showMobileControls();
}

function renderLeadersTable() {
  const leaders = loadLeaders();
  leadersTableBody.innerHTML = '';

  if (leaders.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="3">Рекордов пока нет</td>';
    leadersTableBody.appendChild(emptyRow);
    return;
  }

  leaders.forEach(leader => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${leader.name}</td>
      <td>${leader.score}</td>
      <td>${leader.date}</td>
    `;
    leadersTableBody.appendChild(row);
  });
}

function openLeadersModal() {
  renderLeadersTable();
  leadersModal.classList.remove('hidden');
  hideMobileControls();
}

function closeLeadersModal() {
  leadersModal.classList.add('hidden');

  if (!gameOverElement.classList.contains('hidden')) {
    hideMobileControls();
  } else {
    showMobileControls();
  }
}

function isLeadersModalOpen() {
  return !leadersModal.classList.contains('hidden');
}

function showSavedRecordMessage() {
  playerNameInput.classList.add('hidden');
  saveScoreBtn.classList.add('hidden');
  gameOverMessageElement.textContent = 'Ваш рекорд сохранён';
  hideMobileControls();
}