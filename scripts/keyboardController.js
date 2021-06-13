import {appState} from './model.js';

export class KeyboardController {
  constructor() {
    this.callStack = [];
  }

  codeToId (key) {
    return key.code
      .split('Digit').join('')
      .split('Key').join('')
      .split(/(?=[A-Z])/).join("-")
      .toLowerCase();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const codeToId = this.codeToId(e);
      for (const button of document.querySelectorAll('button')) {
        if (button.id === codeToId) {
          button.style.backgroundColor = '#FF4500';
          this.callStack.unshift(codeToId);
          appState.handleButtonDownEvent(codeToId, button.innerHTML);
          break;
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      const codeToId = this.codeToId(e);
      for (const button of document.querySelectorAll('button')) {
        if (button.id === codeToId) {
          button.style.backgroundColor = button.className.includes('light') ? '#FFF200' :'#FF9D00';
          appState.handleButtonUpEvent(this.callStack[0]);
          this.callStack.shift();
          break;
        }
      }
    });
  }
}


