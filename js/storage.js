const GAME_STATE_KEY = 'game2048State';

function saveGameState(state) {
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
}

function loadGameState() {
  const savedState = localStorage.getItem(GAME_STATE_KEY);

  if (!savedState) {
    return null;
  }

  return JSON.parse(savedState);
}

function clearGameState() {
  localStorage.removeItem(GAME_STATE_KEY);
}