const board = document.getElementById('board');
const scoreElement = document.getElementById('score');

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