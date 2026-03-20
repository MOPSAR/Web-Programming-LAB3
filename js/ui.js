const board = document.getElementById('board');

function renderStaticBoard() {
  board.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    board.appendChild(cell);
  }
}

renderStaticBoard();