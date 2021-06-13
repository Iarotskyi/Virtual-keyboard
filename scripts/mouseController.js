import {appState} from './model.js';

export class MouseController {

  init() {
    document.querySelectorAll('button').forEach((elem) => {
      elem.addEventListener('mousedown', (event) => {
        elem.style.backgroundColor = '#FF4500';
        appState.handleButtonDownEvent(elem.id, event.target.innerText);
      });

      elem.addEventListener('mouseup', () => {
        elem.style.backgroundColor = elem.className.includes('light') ? '#FFF200' :'#FF9D00';
        appState.handleButtonUpEvent(elem.id);
      });
    });
  }
}




