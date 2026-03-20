const gameState = {
  grid: [],
  score: 0,
  gameOver: false
};

function createEmptyGrid() {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEmptyCells() {
  const emptyCells = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (gameState.grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  return emptyCells;
}

function addRandomTile() {
  const emptyCells = getEmptyCells();

  if (emptyCells.length === 0) {
    return;
  }

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const tileValue = Math.random() < 0.9 ? 2 : 4;

  gameState.grid[randomCell.row][randomCell.col] = tileValue;
}

function startGame() {
  gameState.grid = createEmptyGrid();
  gameState.score = 0;
  gameState.gameOver = false;

  const startTilesCount = getRandomInt(1, 3);

  for (let i = 0; i < startTilesCount; i++) {
    addRandomTile();
  }

  renderBoard(gameState.grid);
  updateScore(gameState.score);
}

startGame();