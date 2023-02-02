export default class VirtualKeyboard {
  constructor() {
    this.elements = {
      wrapper: null,
      textarea: null,
      keyboard: null,
      keysContainer: null,
      keys: [],
      infoText: null,
    };

    this.props = {
      lang: null,
      textValue: '',
      capsON: false,
      caretPos: 0,
      firstSpacePressTime: 0,
      secondSpacePressTime: 0,
      pressed: [],
    };

    this.keyLayout = {
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift', 'En',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl',
      ],

      engShift: [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'DEL',
        'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'Shift', 'En',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl',
      ],

      ru: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift', 'Ру',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl',
      ],

      ruShift: [
        'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'DEL',
        'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
        'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'Shift', 'Ру',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl',
      ],

      eventCode: [
        'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'En',
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
      ],
    };
  }

  setLanguage() {
    switch (window.localStorage.getItem('lang')) {
      case 'ru':
        this.props.lang = this.keyLayout.ru;
        window.localStorage.setItem('lang', 'ru');
        break;
      case 'eng':
        this.props.lang = this.keyLayout.eng;
        window.localStorage.setItem('lang', 'eng');
        break;
      default:
        this.props.lang = this.keyLayout.eng;
        window.localStorage.setItem('lang', 'eng');
        break;
    }
  }

  render() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.className = 'wrapper';
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.className = 'textarea';
    this.elements.keyboard = document.createElement('div');
    this.elements.keyboard.className = 'keyboard';
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.className = 'keys__container';
    this.elements.infoText = document.createElement('p');
    this.elements.infoText.className = 'infoText';
    this.elements.infoText.textContent = 'Сделано в OS Windows. Смена языка - Shift + Ctrl Left. Два клика на пробел - ставится точка.';
    document.body.append(this.elements.wrapper);
    this.elements.wrapper.append(this.elements.textarea, this.elements.keyboard);
    this.elements.wrapper.append(this.elements.infoText);
    this.elements.keyboard.appendChild(this.elements.keysContainer);
    this.elements.keysContainer.appendChild(this.renderKeys(this.props.lang));
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__note');
  }

  renderKeys(lang) {
    this.fragment = document.createDocumentFragment();
    lang.forEach((value, index) => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.className = 'keyboard__note';
      keyElement.textContent = value;
      keyElement.id = this.keyLayout.eventCode[index];
      this.fragment.appendChild(keyElement);
      switch (value) {
        case 'Backspace':
          this.fragment.appendChild(document.createElement('br'));
          keyElement.classList.add('keyboard__key-wide');
          break;
        case 'DEL':
          this.fragment.appendChild(document.createElement('br'));
          keyElement.classList.add('keyboard__key-del');
          break;
        case 'Enter':
          this.fragment.appendChild(document.createElement('br'));
          keyElement.classList.add('keyboard__key-enter');
          break;
        case ' ':
          keyElement.classList.add('keyboard__key-space');
          break;
        case 'Ру':
        case 'En':
          this.fragment.appendChild(document.createElement('br'));
          keyElement.classList.add('keyboard__keys-dark');
          break;
        case 'Shift':
          if (keyElement.id === 'ShiftLeft') {
            keyElement.classList.add('keyboard__key-wide');
          } else {
            keyElement.classList.add('keyboard__keys-dark');
          }
          break;
        case 'Caps Lock':
          keyElement.classList.add('keyboard__key-wide');
          if (window.localStorage.getItem('lang') === 'engShift' || window.localStorage.getItem('lang') === 'ruShift') {
            keyElement.classList.add('active');
            this.props.capsON = true;
          }
          break;
        case 'Tab':
          keyElement.classList.add('keyboard__key-tab');
          break;
        case 'Ctrl':
        case 'Win':
        case 'Alt':
        case '▲':
        case '◄':
        case '▼':
        case '►':
          keyElement.classList.add('keyboard__keys-dark');
          break;
        default:
          break;
      }
    });
    return this.fragment;
  }

  pushedKeys() {
    document.body.addEventListener('mousedown', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('active');
        if (event.target.id === 'CapsLock' && this.props.capsON === true) {
          event.target.classList.remove('active');
          this.props.capsON = false;
        } else if (event.target.id === 'CapsLock' && this.props.capsON === false) {
          this.props.capsON = true;
        }
        if (event.id === 'ShiftLeft' || event.id === 'ShiftRight') {
          this.upDownKeys();
        }
      }
      this.input(event.target.textContent);
      this.actions(event.target);
    });
    document.body.addEventListener('mouseup', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.id !== 'CapsLock') {
          event.target.classList.remove('active');
        }
        if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
          this.upDownKeys();
        }
      }
      this.getCursorPosition(document.querySelector('.textarea'));
      this.setCursorPosition(document.querySelector('.textarea'));
    });
    document.body.addEventListener('dblclick', (event) => {
      if (event.target.tagName === 'BUTTON') {
        if (event.target.id === 'Space') {
          this.props.textValue = `${this.props.textValue.slice(0, this.props.caretPos - 2)}.${this.props.textValue.slice(this.props.caretPos)}`;
          this.addInTextArea(this.props.textValue);
          this.props.caretPos -= 1;
          this.setCursorPosition(document.querySelector('.textarea'));
        }
      }
    });
    document.body.addEventListener('keydown', (event) => {
      event.preventDefault();
      const key = document.getElementById(`${event.code}`);
      if (this.keyLayout.eventCode.includes(event.code)) {
        switch (event.code) {
          case 'CapsLock':
            if (event.repeat) {
              return;
            }
            if (this.props.capsON === true) {
              key.classList.remove('active');
              this.props.capsON = false;
              this.upDownKeys();
            } else if (this.props.capsON === false) {
              key.classList.add('active');
              this.props.capsON = true;
              this.upDownKeys();
            }
            break;
          case 'ShiftLeft':
          case 'ShiftRight':
            if (event.repeat) {
              return;
            }
            key.classList.add('active');
            this.upDownKeys();
            if (!this.props.pressed.includes(event.code)) {
              this.props.pressed.push(event.code);
            }
            break;
          case 'ControlLeft':
            key.classList.add('active');
            if (!this.props.pressed.includes(event.code)) {
              this.props.pressed.push(event.code);
            }
            break;
          case 'Space':
            this.doubleSpace();
            key.classList.add('active');
            break;
          default:
            key.classList.add('active');
            break;
        }
        this.input(key.textContent);
      }
    });
    document.body.addEventListener('keyup', (event) => {
      event.preventDefault();
      const key = document.getElementById(`${event.code}`);
      if (this.keyLayout.eventCode.includes(event.code)) {
        switch (event.code) {
          case 'ShiftLeft':
          case 'ShiftRight':
            this.upDownKeys();
            this.shiftCtrlPushed();
            key.classList.remove('active');
            break;
          case 'ControlLeft':
            this.shiftCtrlPushed();
            key.classList.remove('active');
            break;
          case 'CapsLock':
            if (this.props.capsON === true) {
              key.classList.add('active');
            } else {
              key.classList.remove('active');
            }
            break;
          default:
            key.classList.remove('active');
            break;
        }
      }
    });
    document.body.addEventListener('click', (event) => {
      if (event.target.tagName === 'TEXTAREA') {
        this.getCursorPosition(document.querySelector('.textarea'));
      }
    });
  }

  upDownKeys() {
    switch (this.props.lang) {
      case this.keyLayout.eng:
        this.changeButtonsLanguage(this.keyLayout.engShift);
        window.localStorage.setItem('lang', 'eng');
        break;
      case this.keyLayout.engShift:
        this.changeButtonsLanguage(this.keyLayout.eng);
        window.localStorage.setItem('lang', 'eng');
        break;
      case this.keyLayout.ru:
        this.changeButtonsLanguage(this.keyLayout.ruShift);
        window.localStorage.setItem('lang', 'ru');
        break;
      case this.keyLayout.ruShift:
        this.changeButtonsLanguage(this.keyLayout.ru);
        window.localStorage.setItem('lang', 'ru');
        break;
      default:
        break;
    }
  }

  changeLanguage() {
    switch (this.props.lang) {
      case this.keyLayout.eng:
        this.changeButtonsLanguage(this.keyLayout.ru);
        window.localStorage.setItem('lang', 'ru');
        break;
      case this.keyLayout.engShift:
        this.changeButtonsLanguage(this.keyLayout.ruShift);
        window.localStorage.setItem('lang', 'ru');
        break;
      case this.keyLayout.ru:
        this.changeButtonsLanguage(this.keyLayout.eng);
        window.localStorage.setItem('lang', 'eng');
        break;
      case this.keyLayout.ruShift:
        this.changeButtonsLanguage(this.keyLayout.engShift);
        window.localStorage.setItem('lang', 'eng');
        break;
      default:
        break;
    }
  }

  changeButtonsLanguage(value) {
    this.elements.keys.forEach((item, i) => {
      const element = item;
      element.textContent = value[i];
    });
    this.props.lang = value;
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__note');
  }

  actions(event) {
    if (event.textContent === 'En') {
      this.changeLanguage();
    } else if (event.textContent === 'Ру') {
      this.changeLanguage();
    } else if (event.id === 'ShiftLeft' || event.id === 'ShiftRight') {
      this.upDownKeys();
    } else if (event.id === 'CapsLock' || event.id === 'ShiftRight') {
      this.upDownKeys();
    }
  }

  input(event) {
    if (event.length === 1) {
      this.props.textValue = this.props.textValue.slice(0, this.props.caretPos)
      + event + this.props.textValue.slice(this.props.caretPos);
      this.props.caretPos += 1;
    }
    switch (event) {
      case 'Enter':
        this.props.textValue = `${this.props.textValue.slice(0, this.props.caretPos)}\n${this.props.textValue.slice(this.props.caretPos)}`;
        this.props.caretPos += 1;
        break;
      case 'Backspace':
        if (this.props.textValue === '' || this.props.caretPos === 0) {
          break;
        } else {
          this.props.textValue = this.props.textValue.slice(0, (this.props.caretPos - 1))
          + this.props.textValue.slice(this.props.caretPos);
          this.props.caretPos -= 1;
          break;
        }
      case 'DEL':
        this.props.textValue = this.props.textValue.slice(0, (this.props.caretPos))
        + this.props.textValue.slice(this.props.caretPos + 1);
        this.props.caretPos += 0;
        break;
      case 'Tab':
        this.props.textValue = `${this.props.textValue.slice(0, this.props.caretPos)}    ${this.props.textValue.slice(this.props.caretPos)}`;
        this.props.caretPos += 4;
        break;
      default:
        break;
    }
    this.addInTextArea(this.props.textValue);
    this.setCursorPosition(document.querySelector('.textarea'));
  }

  addInTextArea(value) {
    this.elements.textarea.value = value || '';
    document.querySelector('textarea').value = this.elements.textarea.value;
  }

  getCursorPosition(element) {
    if (document.selection) {
      element.focus();
      const sel = document.selection.createRange();
      sel.moveStart('character', -element.value.length);
      this.props.caretPos = sel.text.length;
    } else if (element.selectionStart || element.selectionStart === '0') {
      this.props.caretPos = element.selectionStart;
    } else if (!element.selectionStart || element.selectionStart !== '0') {
      this.props.caretPos = 0;
    }
    return this.props.caretPos;
  }

  setCursorPosition(element) {
    if (element.setSelectionRange) {
      element.focus();
      element.setSelectionRange(this.props.caretPos, this.props.caretPos);
    } else if (element.createTextRange) {
      const range = element.createTextRange();
      range.collapse(true);
      range.moveEnd('character', this.props.caretPos);
      range.moveStart('character', this.props.caretPos);
      range.select();
    }
  }

  doubleSpace() {
    const delta = 500;
    if (this.props.firstSpacePressTime === 0 && this.props.secondSpacePressTime === 0) {
      this.props.firstSpacePressTime = new Date().getTime();
    } else if (this.props.firstSpacePressTime !== 0 && this.props.secondSpacePressTime === 0) {
      this.props.secondSpacePressTime = new Date().getTime();
      if (this.props.secondSpacePressTime - this.props.firstSpacePressTime <= delta) {
        this.getCursorPosition(document.querySelector('.textarea'));
        this.props.textValue = `${this.props.textValue.slice(0, this.props.caretPos - 1)}.${this.props.textValue.slice(this.props.caretPos)}`;
        this.addInTextArea(this.props.textValue);
        this.props.caretPos += 0;
        this.setCursorPosition(document.querySelector('.textarea'));
        this.props.firstSpacePressTime = 0;
        this.props.secondSpacePressTime = 0;
      } else {
        this.setCursorPosition(document.querySelector('.textarea'));
        this.props.firstSpacePressTime = new Date().getTime();
        this.props.secondSpacePressTime = 0;
      }
    }
  }

  shiftCtrlPushed() {
    const keyShiftLeft = document.getElementById('ShiftLeft');
    const keyControlLeft = document.getElementById('ControlLeft');
    if (keyShiftLeft.classList.contains('active') && keyControlLeft.classList.contains('active')) {
      this.changeLanguage();
      this.props.pressed = [];
    }
  }
}
