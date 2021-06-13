import {View} from './view.js';
import {KeyboardController} from './keyboardController.js';
import {MouseController} from './mouseController.js';
import {appState} from './model.js';

class Index {
  init() {
    new View().init();
    new KeyboardController().init();
    new MouseController().init();
    appState.init();
  }
}

new Index().init();