import VirtualKeyboard from './class';

window.onload = function load() {
  const virtualKeyboard = new VirtualKeyboard();
  virtualKeyboard.setLanguage();
  virtualKeyboard.render();
  virtualKeyboard.pushedKeys();
};
