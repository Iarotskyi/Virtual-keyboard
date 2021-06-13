import {appState} from './model.js';

const virtualKeyboardMarkup = `
 
<section class="keyboard">
  <textarea id="screen" class="screen" placeholder="Text will be displayed here"></textarea>
  <span class="first row">
  <button id="backquote" class="button-light">\`</button>
  <button id="1" class="button-light">1</button>
  <button id="2" class="button-light">2</button>
  <button id="3" class="button-light">3</button>
  <button id="4" class="button-light">4</button>
  <button id="5" class="button-light">5</button>
  <button id="6" class="button-light">6</button>
  <button id="7" class="button-light">7</button>
  <button id="8" class="button-light">8</button>
  <button id="9" class="button-light">9</button>
  <button id="0" class="button-light">0</button>
  <button id="minus" class="button-light">-</button>
  <button id="equal" class="button-light">=</button>
  <button id="backspace" class="button-dark">Backspace</button>
  </span>

  <span class="second row">
  <button id="tab" class="button-dark">Tab</button>
  <button id='q' class="button-light">q</button>
  <button id='w' class="button-light">w</button>
  <button id='e' class="button-light">e</button>
  <button id='r' class="button-light">r</button>
  <button id='t' class="button-light">t</button>
  <button id='y' class="button-light">y</button>
  <button id='u' class="button-light">u</button>
  <button id='i' class="button-light">i</button>
  <button id='o' class="button-light">o</button>
  <button id='v' class="button-light">p</button>
  <button id='bracket-left' class="button-light">[</button>
  <button id='bracket-right' class="button-light">]</button>
  <button id='backslash' class="button-light">\\</button>
  <button id="delete" class="button-dark">DEL</button>
  </span>

  <span class="third row">
  <button id="caps-lock" class="button-dark"><div id="caps-indicator" class="caps-indicator"></div>Caps Lock</button>
  <button id='a' class="button-light">a</button>
  <button id='s' class="button-light">s</button>
  <button id='d' class="button-light">d</button>
  <button id='f' class="button-light">f</button>
  <button id='g' class="button-light">g</button>
  <button id='h' class="button-light">h</button>
  <button id='j' class="button-light">j</button>
  <button id='k' class="button-light">k</button>
  <button id='l' class="button-light">l</button>
  <button id='semicolon' class="button-light">;</button>
  <button id="quote" class="button-light">'</button>
  <button id="enter" class="button-dark">ENTER</button>
  </span>

  <span class="fourth row">
  <button id="shift-left" class="button-dark shift">Shift</button>
  <button id='z' class="button-light">z</button>
  <button id='x' class="button-light">x</button>
  <button id='c' class="button-light">c</button>
  <button id='v' class="button-light">v</button>
  <button id='b' class="button-light">b</button>
  <button id='n' class="button-light">n</button>
  <button id='m' class="button-light">m</button>
  <button id='comma' class="button-light">,</button>
  <button id='period' class="button-light">.</button>
  <button id='slash' class="button-light">/</button>
  <button id="shift-right" class="button-dark shift">Shift</button>
  </span>

  <span class="last row">
  <button id="control-left" class="button-dark ctrl">Ctrl</button>
  <button id="win" class="button-dark win">Win</button>
  <button id="alt-left" class="button-dark alt">Alt</button>
  <button id="space" class="button-light space">&nbsp</button>
  <button id="alt-right" class="button-dark alt">Alt</button>
  <button id="control-right" class="button-dark ctrl">Ctrl</button>
  <div class="arrow-container">
    <button id="arrow-left" class="button-dark arrow"><i class="fas fa-chevron-left"></i></button>
    <div class="arrow-splitter">
      <button id="arrow-up" class="button-dark arrow"><i class="fas fa-chevron-up"></i></button>
      <button id="arrow-down" class="button-dark arrow"><i class="fas fa-chevron-down"></i></button>
    </div>
    <button id="arrow-right" class="button-dark arrow"><i class="fas fa-chevron-right"></i></button>
  </div>
  </span>
  <footer class="footer">Press Alt + Shift to change language </br> NOTE: This keyboard was created for Windows OS, using it on other OS may result in inappropriate behaviour</footer>
</section>

`;

export class View {
  init() {
    window.document.body.innerHTML = virtualKeyboardMarkup;
    //initialization bugfix:
    appState.screen = document.getElementById('screen');
  }
}