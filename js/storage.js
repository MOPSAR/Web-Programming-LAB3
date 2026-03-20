const GAME_STATE_KEY = 'game2048State';
const PREVIOUS_STATE_KEY = 'game2048PreviousState';

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

function savePreviousState(state) {
  localStorage.setItem(PREVIOUS_STATE_KEY, JSON.stringify(state));
}

function loadPreviousState() {
  const savedState = localStorage.getItem(PREVIOUS_STATE_KEY);

  if (!savedState) {
    return null;
  }

  return JSON.parse(savedState);
}

function clearPreviousState() {
  localStorage.removeItem(PREVIOUS_STATE_KEY);
}