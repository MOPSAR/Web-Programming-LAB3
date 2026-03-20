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

function slideAndMergeRow(row) {
  const filteredRow = row.filter(value => value !== 0);
  const mergedRow = [];
  let gainedScore = 0;

  for (let i = 0; i < filteredRow.length; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      const mergedValue = filteredRow[i] * 2;
      mergedRow.push(mergedValue);
      gainedScore += mergedValue;
      i++;
    } else {
      mergedRow.push(filteredRow[i]);
    }
  }

  while (mergedRow.length < 4) {
    mergedRow.push(0);
  }

  return {
    row: mergedRow,
    gainedScore
  };
}

function moveLeft(grid) {
  const newGrid = [];
  let moved = false;
  let moveScore = 0;

  for (let row = 0; row < 4; row++) {
    const currentRow = [...grid[row]];
    const result = slideAndMergeRow(currentRow);

    if (currentRow.join(',') !== result.row.join(',')) {
      moved = true;
    }

    newGrid.push(result.row);
    moveScore += result.gainedScore;
  }

  return {
    newGrid,
    moved,
    moveScore
  };
}

function reverseRows(grid) {
  return grid.map(row => [...row].reverse());
}

function transposeGrid(grid) {
  return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
}

function moveRight(grid) {
  const reversedGrid = reverseRows(grid);
  const result = moveLeft(reversedGrid);

  return {
    newGrid: reverseRows(result.newGrid),
    moved: result.moved,
    moveScore: result.moveScore
  };
}

function moveUp(grid) {
  const transposedGrid = transposeGrid(grid);
  const result = moveLeft(transposedGrid);

  return {
    newGrid: transposeGrid(result.newGrid),
    moved: result.moved,
    moveScore: result.moveScore
  };
}

function moveDown(grid) {
  const transposedGrid = transposeGrid(grid);
  const result = moveRight(transposedGrid);

  return {
    newGrid: transposeGrid(result.newGrid),
    moved: result.moved,
    moveScore: result.moveScore
  };
}

function hasAvailableMoves() {
  if (getEmptyCells().length > 0) {
    return true;
  }

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const currentValue = gameState.grid[row][col];

      if (col < 3 && currentValue === gameState.grid[row][col + 1]) {
        return true;
      }

      if (row < 3 && currentValue === gameState.grid[row + 1][col]) {
        return true;
      }
    }
  }

  return false;
}

function checkGameOver() {
  if (!hasAvailableMoves()) {
    gameState.gameOver = true;
    showGameOver();
    saveCurrentGame();
  }
}

function saveCurrentGame() {
  saveGameState({
    grid: gameState.grid,
    score: gameState.score,
    gameOver: gameState.gameOver
  });
}

function restoreSavedGame() {
  const savedState = loadGameState();

  if (!savedState) {
    return false;
  }

  gameState.grid = savedState.grid;
  gameState.score = savedState.score;
  gameState.gameOver = savedState.gameOver;

  renderBoard(gameState.grid);
  updateScore(gameState.score);

  if (gameState.gameOver) {
    showGameOver();
  } else {
    hideGameOver();
  }

  closeLeadersModal();

  return true;
}

function handleMove(direction) {
  if (gameState.gameOver || isLeadersModalOpen()) {
    return;
  }

  const currentGridCopy = gameState.grid.map(row => [...row]);
  let result = null;

  if (direction === 'left') {
    result = moveLeft(currentGridCopy);
  }

  if (direction === 'right') {
    result = moveRight(currentGridCopy);
  }

  if (direction === 'up') {
    result = moveUp(currentGridCopy);
  }

  if (direction === 'down') {
    result = moveDown(currentGridCopy);
  }

  if (!result || !result.moved) {
    return;
  }

  gameState.grid = result.newGrid;
  gameState.score += result.moveScore;

  const newTilesCount = getRandomInt(1, 2);

  for (let i = 0; i < newTilesCount; i++) {
    if (getEmptyCells().length > 0) {
      addRandomTile();
    }
  }

  renderBoard(gameState.grid);
  updateScore(gameState.score);
  checkGameOver();
  saveCurrentGame();
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
  hideGameOver();
  closeLeadersModal();
  saveCurrentGame();
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    handleMove('left');
  }

  if (event.key === 'ArrowRight') {
    handleMove('right');
  }

  if (event.key === 'ArrowUp') {
    handleMove('up');
  }

  if (event.key === 'ArrowDown') {
    handleMove('down');
  }
});

document.getElementById('newGameBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);
document.getElementById('leadersBtn').addEventListener('click', openLeadersModal);
document.getElementById('closeLeadersBtn').addEventListener('click', closeLeadersModal);

if (!restoreSavedGame()) {
  startGame();
}