let lastInteractionWasKeyboard = false;

window.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    lastInteractionWasKeyboard = true;
  }
});

window.addEventListener('mousedown', () => {
  lastInteractionWasKeyboard = false;
});

export function getLastInteractionWasKeyboard(): boolean {
  return lastInteractionWasKeyboard;
}