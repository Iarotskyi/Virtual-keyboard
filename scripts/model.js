class Model {
  constructor() {
    this.engKeysSmall = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./';
    this.engKeysBig = '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';
    this.engKeysAll = this.engKeysSmall.concat(this.engKeysBig);
    this.rusKeysSmall = 'ё1234567890-=йцукенгшщзхъ\\фывапролджэячсмитьбю.';
    this.rusKeysBig = 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,';
    this.rusKeysAll = this.rusKeysSmall.concat(this.rusKeysBig);
    this.allKeys = this.engKeysAll.concat(this.rusKeysAll);
    this.screen = document.getElementById('screen');
    this.isAltOn = false;
    this.isCapsON = false;
    this.isShiftON = false;
    this.engLang = true;
  }

  handleCapsLockClick() {
    if (!this.isCapsON) {
      document.getElementById('caps-indicator').style.backgroundColor = '#FF4500';
      document.querySelectorAll('.button-light').forEach((el) => {
        if (el.innerText !== '') el.innerHTML = el.innerText.toUpperCase()
      });
      this.isCapsON = true;
    }
    else {
      document.getElementById('caps-indicator').style.backgroundColor = '#FF9D00';
      document.querySelectorAll('.button-light').forEach((el) => {
        if (el.innerText !== '') el.innerHTML = el.innerText.toLowerCase()
      });
      this.isCapsON = false;
    }
  }

  handleShiftClickDown() {
    if (this.isAltOn) {
      this.switchLang();
      return;
    }
    document.querySelectorAll('.button-light').forEach((el) => {
      if (!this.isCapsON && !this.isShiftON && el.id !== 'space') {
        el.innerHTML = this.engLang ? this.engKeysBig[this.engKeysSmall.indexOf(el.innerText)] : this.rusKeysBig[this.rusKeysSmall.indexOf(el.innerText)];
      }
    });
    this.isShiftON = true;
  }

  handleShiftClickUp() {
    document.querySelectorAll('.button-light').forEach((el) => {
      if (!this.isCapsON && this.isShiftON && el.id !== 'space') {
        el.innerHTML = this.engLang ? this.engKeysSmall[this.engKeysBig.indexOf(el.innerText)] : this.rusKeysSmall[this.rusKeysBig.indexOf(el.innerText)];
      }
    });
    this.isShiftON = false;
  }

  handleAltClick() {
    if (this.isShiftON) this.switchLang();
    else this.isAltOn = true;
  }

  updatePositionInfo() {
    this.initPos = this.screen.selectionStart === 0 ? this.positionMemo || this.screen.selectionStart : this.screen.selectionStart;
    this.selection = window.getSelection().toString().length;
    this.eachRowLength = this.screen.value.split('\n').map((el) => el.length + 1);
    this.eachRowPos = this.eachRowLength.map((el, i, arr) => i > 0 ?
      el +
      arr.reduce((acc, elem, index) => index < i ? acc + elem : acc)
      : el);
    this.selectedRow = this.screen.value.slice(0, this.initPos).split(/[^\n]/).join('').length;
    this.left =  this.screen.value.slice(0, this.initPos);
    this.right =  this.screen.value.slice(this.initPos);
  }

  handleBackspaceClick() {
    this.updatePositionInfo();
    if (this.initPos === 0 && this.selection === 0) return;
    if (this.selection > 0) {
      this.screen.value = this.screen.value.slice(0, this.screen.selectionStart)
        + this.screen.value.slice(this.screen.selectionEnd);
      this.newPos = this.initPos;
    }
    else {
      this.screen.value = this.left.slice(0, -1) + this.right;
      this.newPos = this.initPos - 1;
    }
    this.screen.setSelectionRange(this.newPos, this.newPos);
    this.positionMemo = this.newPos;
  }

  handleDelClick() {
    this.updatePositionInfo();
    if (this.initPos === this.selection && this.initPos !== 0) return;
    if (this.selection > 0) {
      this.screen.value = this.screen.value.slice(0, this.screen.selectionStart)
        + this.screen.value.slice(this.screen.selectionEnd);
      this.newPos = this.initPos;
    }
    else {
      this.screen.value = this.left + this.right.slice(1);
      this.newPos = this.initPos;
    }
    this.screen.setSelectionRange(this.newPos, this.newPos);
    this.positionMemo = this.newPos;
  }

  handleArrowUpClick() {
    // Calculate the new position as the previous row length if the current position is further than the previous row length.
    // Otherwise - calculate as subtraction of initial position from previous row length.
    this.updatePositionInfo();
    if (this.eachRowLength.length === 1) return;
    if (this.selectedRow === 0) return;
    if (this.initPos - this.eachRowPos[this.selectedRow - 1] >= this.eachRowLength[this.selectedRow - 1]){
      this.newPos = this.eachRowLength.reduce((acc, el, i) => i <= this.selectedRow - 1 ? acc + el : acc) - 1;
    }
    else this.newPos = this.initPos - this.eachRowLength[this.selectedRow - 1];
    this.screen.setSelectionRange(this.newPos,this.newPos);
    this.positionMemo = this.newPos;
  }

  handleArrowDownClick() {
    // Calculate the new position as the next row length if the current position is further than the next row length.
    // Otherwise - calculate as addition of initial position to the current row length.
    this.updatePositionInfo();
    if (this.eachRowLength.length === 1) return;
    if (this.selectedRow === this.eachRowLength.length - 1) return;
    if (this.initPos - (this.eachRowPos[this.selectedRow - 1] || 0) >= this.eachRowLength[this.selectedRow + 1]){
      this.newPos = this.eachRowLength.reduce((acc, el, i) => i <= this.selectedRow + 1 ? acc + el : acc) - 1;
    }
    else {
      this.newPos = this.initPos + this.eachRowLength[this.selectedRow];
    }
    this.screen.setSelectionRange(this.newPos,this.newPos);
    this.positionMemo = this.newPos;
  }

  handleArrowLeftClick() {
    this.updatePositionInfo();
    this.newPos = this.initPos - 1;
    this.screen.setSelectionRange(this.newPos,this.newPos);
    this.positionMemo = this.newPos;
  }

  handleArrowRightClick() {
    this.updatePositionInfo();
    this.newPos = this.initPos + 1;
    this.screen.setSelectionRange(this.newPos,this.newPos);
    this.positionMemo = this.newPos;
  }

  handleAllOtherCLick(key) {
    if (this.allKeys.concat('\n\t').includes(key) || key === ' '){
      this.updatePositionInfo();
      if (this.initPos || this.initPos === 0) {
        if (this.selection > 0) {
          this.screen.value =
            this.screen.value.substring(0, this.screen.selectionStart)
            + key
            + this.screen.value.substring(this.screen.selectionEnd, this.screen.value.length);
          this.newPos = this.initPos + 1;
          this.screen.setSelectionRange(this.newPos, this.newPos);
          this.positionMemo = this.newPos;
        }
        else {
          this.screen.value =
            this.screen.value.substring(0, this.initPos)
            + key
            + this.screen.value.substring(this.initPos, this.screen.value.length);
          this.newPos = this.initPos + 1;
          this.screen.setSelectionRange(this.newPos, this.newPos);
          this.positionMemo = this.newPos;
        }

      }
      else {
        this.screen.value += key;
      }
    }
  }

  switchLang() {
    if (this.engLang) {
      document.querySelectorAll('.button-light').forEach((el) => {
        if (el.id !== 'space') el.innerHTML = this.rusKeysAll[this.engKeysAll.indexOf(el.innerText)];
      });
      this.engLang = false;
      window.sessionStorage['currentLang'] = 'rus';
      return
    }

      document.querySelectorAll('.button-light').forEach((el) => {
        if (el.id !== 'space') el.innerHTML = this.engKeysAll[this.rusKeysAll.indexOf(el.innerText)];
      });
      this.engLang = true;
      window.sessionStorage['currentLang'] = 'eng';
  }

  handleButtonDownEvent(keyCode, key) {
    switch(keyCode) {
      case 'caps-lock':
        this.handleCapsLockClick();
        break;

      case 'shift-left':
        this.handleShiftClickDown();
        break;

      case 'shift-right':
        this.handleShiftClickDown();
        break;

      case 'alt-left':
        this.handleAltClick();
        break;

      case 'alt-right':
        this.handleAltClick();
        break;

      case 'space':
        this.handleAllOtherCLick(' ');
        break;

      case 'enter':
        this.handleAllOtherCLick('\n');
        break;

      case 'tab':
        this.handleAllOtherCLick('\t');
        break;

      case 'backspace':
        this.handleBackspaceClick();
        break;

      case 'delete':
        this.handleDelClick();
        break;

      case 'arrow-up':
        this.handleArrowUpClick();
        break;

      case 'arrow-down':
        this.handleArrowDownClick();
        break;

      case 'arrow-left':
        this.handleArrowLeftClick();
        break;

      case 'arrow-right':
        this.handleArrowRightClick();
        break;

      default:
        this.handleAllOtherCLick(key);
    }
  }

  handleButtonUpEvent(key) {
    if (key === 'shift-left' || key === 'shift-right') this.handleShiftClickUp();
    if (key === 'alt-left' || key === 'alt-right') this.isAltOn = false;
  }

  init() {
    if (window.sessionStorage['currentLang'] === 'rus') this.switchLang();
  }
}

export const appState = new Model();


