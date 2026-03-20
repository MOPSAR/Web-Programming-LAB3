const GAME_STATE_KEY = 'game2048State';
const PREVIOUS_STATE_KEY = 'game2048PreviousState';
const LEADERS_KEY = 'game2048Leaders';

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

function loadLeaders() {
  const savedLeaders = localStorage.getItem(LEADERS_KEY);

  if (!savedLeaders) {
    return [];
  }

  return JSON.parse(savedLeaders);
}

function saveLeaderRecord(name, score) {
  const leaders = loadLeaders();

  leaders.push({
    name,
    score,
    date: new Date().toLocaleString('ru-RU')
  });

  leaders.sort((a, b) => b.score - a.score);

  const topLeaders = leaders.slice(0, 10);

  localStorage.setItem(LEADERS_KEY, JSON.stringify(topLeaders));
}