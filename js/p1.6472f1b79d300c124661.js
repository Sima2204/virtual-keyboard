(()=>{"use strict";class e{constructor(){this.elements={wrapper:null,textarea:null,keyboard:null,keysContainer:null,keys:[],infoText:null},this.props={lang:null,textValue:"",capsON:!1,caretPos:0,firstSpacePressTime:0,secondSpacePressTime:0,pressed:[]},this.keyLayout={eng:["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace","Tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","DEL","Caps Lock","a","s","d","f","g","h","j","k","l",";","'","Enter","Shift","z","x","c","v","b","n","m",",",".","/","▲","Shift","En","Ctrl","Win","Alt"," ","Alt","◄","▼","►","Ctrl"],engShift:["~","!","@","#","$","%","^","&","*","(",")","_","+","Backspace","Tab","Q","W","E","R","T","Y","U","I","O","P","{","}","|","DEL","Caps Lock","A","S","D","F","G","H","J","K","L",":",'"',"Enter","Shift","Z","X","C","V","B","N","M","<",">","?","▲","Shift","En","Ctrl","Win","Alt"," ","Alt","◄","▼","►","Ctrl"],ru:["ё","1","2","3","4","5","6","7","8","9","0","-","=","Backspace","Tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","\\","DEL","Caps Lock","ф","ы","в","а","п","р","о","л","д","ж","э","Enter","Shift","я","ч","с","м","и","т","ь","б","ю",".","▲","Shift","Ру","Ctrl","Win","Alt"," ","Alt","◄","▼","►","Ctrl"],ruShift:["Ё","!",'"',"№",";","%",":","?","*","(",")","_","+","Backspace","Tab","Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ","/","DEL","Caps Lock","Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э","Enter","Shift","Я","Ч","С","М","И","Т","Ь","Б","Ю",",","▲","Shift","Ру","Ctrl","Win","Alt"," ","Alt","◄","▼","►","Ctrl"],eventCode:["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","Delete","CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter","ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ArrowUp","ShiftRight","En","ControlLeft","MetaLeft","AltLeft","Space","AltRight","ArrowLeft","ArrowDown","ArrowRight","ControlRight"]}}setLanguage(){"ru"===window.localStorage.getItem("lang")?(this.props.lang=this.keyLayout.ru,window.localStorage.setItem("lang","ru")):(this.props.lang=this.keyLayout.eng,window.localStorage.setItem("lang","eng"))}render(){this.elements.wrapper=document.createElement("div"),this.elements.wrapper.className="wrapper",this.elements.textarea=document.createElement("textarea"),this.elements.textarea.className="textarea",this.elements.keyboard=document.createElement("div"),this.elements.keyboard.className="keyboard",this.elements.keysContainer=document.createElement("div"),this.elements.keysContainer.className="keys__container",this.elements.infoText=document.createElement("p"),this.elements.infoText.className="infoText",this.elements.infoText.textContent="Сделано в OS Windows. Смена языка - Shift + Ctrl Left. Два клика на пробел - ставится точка.",document.body.append(this.elements.wrapper),this.elements.wrapper.append(this.elements.textarea,this.elements.keyboard),this.elements.wrapper.append(this.elements.infoText),this.elements.keyboard.appendChild(this.elements.keysContainer),this.elements.keysContainer.appendChild(this.renderKeys(this.props.lang)),this.elements.keys=this.elements.keysContainer.querySelectorAll(".keyboard__note")}renderKeys(e){return this.fragment=document.createDocumentFragment(),e.forEach(((e,t)=>{const s=document.createElement("button");switch(s.setAttribute("type","button"),s.className="keyboard__note",s.textContent=e,s.id=this.keyLayout.eventCode[t],this.fragment.appendChild(s),e){case"Backspace":this.fragment.appendChild(document.createElement("br")),s.classList.add("keyboard__key-wide");break;case"DEL":this.fragment.appendChild(document.createElement("br")),s.classList.add("keyboard__key-del");break;case"Enter":this.fragment.appendChild(document.createElement("br")),s.classList.add("keyboard__key-enter");break;case" ":s.classList.add("keyboard__key-space");break;case"Ру":case"En":this.fragment.appendChild(document.createElement("br")),s.classList.add("keyboard__keys-dark");break;case"Shift":"ShiftLeft"===s.id?s.classList.add("keyboard__key-wide"):s.classList.add("keyboard__keys-dark");break;case"Caps Lock":s.classList.add("keyboard__key-wide"),"engShift"!==window.localStorage.getItem("lang")&&"ruShift"!==window.localStorage.getItem("lang")||(s.classList.add("active"),this.props.capsON=!0);break;case"Tab":s.classList.add("keyboard__key-tab");break;case"Ctrl":case"Win":case"Alt":case"▲":case"◄":case"▼":case"►":s.classList.add("keyboard__keys-dark")}})),this.fragment}pushedKeys(){document.body.addEventListener("mousedown",(e=>{"BUTTON"===e.target.tagName&&(e.target.classList.add("active"),"CapsLock"===e.target.id&&!0===this.props.capsON?(e.target.classList.remove("active"),this.props.capsON=!1):"CapsLock"===e.target.id&&!1===this.props.capsON&&(this.props.capsON=!0),"ShiftLeft"!==e.id&&"ShiftRight"!==e.id||this.upDownKeys()),this.input(e.target.textContent),this.actions(e.target)})),document.body.addEventListener("mouseup",(e=>{"BUTTON"===e.target.tagName&&("CapsLock"!==e.target.id&&e.target.classList.remove("active"),"ShiftLeft"!==e.target.id&&"ShiftRight"!==e.target.id||this.upDownKeys()),this.getCursorPosition(document.querySelector(".textarea")),this.setCursorPosition(document.querySelector(".textarea"))})),document.body.addEventListener("dblclick",(e=>{"BUTTON"===e.target.tagName&&"Space"===e.target.id&&(this.props.textValue=`${this.props.textValue.slice(0,this.props.caretPos-2)}.${this.props.textValue.slice(this.props.caretPos)}`,this.addInTextArea(this.props.textValue),this.props.caretPos-=1,this.setCursorPosition(document.querySelector(".textarea")))})),document.body.addEventListener("keydown",(e=>{e.preventDefault();const t=document.getElementById(`${e.code}`);if(this.keyLayout.eventCode.includes(e.code)){switch(e.code){case"CapsLock":if(e.repeat)return;!0===this.props.capsON?(t.classList.remove("active"),this.props.capsON=!1,this.upDownKeys()):!1===this.props.capsON&&(t.classList.add("active"),this.props.capsON=!0,this.upDownKeys());break;case"ShiftLeft":case"ShiftRight":if(e.repeat)return;t.classList.add("active"),this.upDownKeys(),this.props.pressed.includes(e.code)||this.props.pressed.push(e.code);break;case"ControlLeft":t.classList.add("active"),this.props.pressed.includes(e.code)||this.props.pressed.push(e.code);break;case"Space":this.doubleSpace(),t.classList.add("active");break;default:t.classList.add("active")}this.input(t.textContent)}})),document.body.addEventListener("keyup",(e=>{e.preventDefault();const t=document.getElementById(`${e.code}`);if(this.keyLayout.eventCode.includes(e.code))switch(e.code){case"ShiftLeft":case"ShiftRight":this.upDownKeys(),this.shiftCtrlPushed(),t.classList.remove("active");break;case"ControlLeft":this.shiftCtrlPushed(),t.classList.remove("active");break;case"CapsLock":!0===this.props.capsON?t.classList.add("active"):t.classList.remove("active");break;default:t.classList.remove("active")}})),document.body.addEventListener("click",(e=>{"TEXTAREA"===e.target.tagName&&this.getCursorPosition(document.querySelector(".textarea"))}))}upDownKeys(){switch(this.props.lang){case this.keyLayout.eng:this.changeButtonsLanguage(this.keyLayout.engShift),window.localStorage.setItem("lang","eng");break;case this.keyLayout.engShift:this.changeButtonsLanguage(this.keyLayout.eng),window.localStorage.setItem("lang","eng");break;case this.keyLayout.ru:this.changeButtonsLanguage(this.keyLayout.ruShift),window.localStorage.setItem("lang","ru");break;case this.keyLayout.ruShift:this.changeButtonsLanguage(this.keyLayout.ru),window.localStorage.setItem("lang","ru")}}changeLanguage(){switch(this.props.lang){case this.keyLayout.eng:this.changeButtonsLanguage(this.keyLayout.ru),window.localStorage.setItem("lang","ru");break;case this.keyLayout.engShift:this.changeButtonsLanguage(this.keyLayout.ruShift),window.localStorage.setItem("lang","ru");break;case this.keyLayout.ru:this.changeButtonsLanguage(this.keyLayout.eng),window.localStorage.setItem("lang","eng");break;case this.keyLayout.ruShift:this.changeButtonsLanguage(this.keyLayout.engShift),window.localStorage.setItem("lang","eng")}}changeButtonsLanguage(e){this.elements.keys.forEach(((t,s)=>{t.textContent=e[s]})),this.props.lang=e,this.elements.keys=this.elements.keysContainer.querySelectorAll(".keyboard__note")}actions(e){"En"===e.textContent||"Ру"===e.textContent?this.changeLanguage():"ShiftLeft"===e.id||"ShiftRight"===e.id?this.upDownKeys():"CapsLock"!==e.id&&"ShiftRight"!==e.id||this.upDownKeys()}input(e){switch(1===e.length&&(this.props.textValue=this.props.textValue.slice(0,this.props.caretPos)+e+this.props.textValue.slice(this.props.caretPos),this.props.caretPos+=1),e){case"Enter":this.props.textValue=`${this.props.textValue.slice(0,this.props.caretPos)}\n${this.props.textValue.slice(this.props.caretPos)}`,this.props.caretPos+=1;break;case"Backspace":if(""===this.props.textValue||0===this.props.caretPos)break;this.props.textValue=this.props.textValue.slice(0,this.props.caretPos-1)+this.props.textValue.slice(this.props.caretPos),this.props.caretPos-=1;break;case"DEL":this.props.textValue=this.props.textValue.slice(0,this.props.caretPos)+this.props.textValue.slice(this.props.caretPos+1),this.props.caretPos+=0;break;case"Tab":this.props.textValue=`${this.props.textValue.slice(0,this.props.caretPos)}    ${this.props.textValue.slice(this.props.caretPos)}`,this.props.caretPos+=4}this.addInTextArea(this.props.textValue),this.setCursorPosition(document.querySelector(".textarea"))}addInTextArea(e){this.elements.textarea.value=e||"",document.querySelector("textarea").value=this.elements.textarea.value}getCursorPosition(e){if(document.selection){e.focus();const t=document.selection.createRange();t.moveStart("character",-e.value.length),this.props.caretPos=t.text.length}else e.selectionStart||"0"===e.selectionStart?this.props.caretPos=e.selectionStart:e.selectionStart&&"0"===e.selectionStart||(this.props.caretPos=0);return this.props.caretPos}setCursorPosition(e){if(e.setSelectionRange)e.focus(),e.setSelectionRange(this.props.caretPos,this.props.caretPos);else if(e.createTextRange){const t=e.createTextRange();t.collapse(!0),t.moveEnd("character",this.props.caretPos),t.moveStart("character",this.props.caretPos),t.select()}}doubleSpace(){0===this.props.firstSpacePressTime&&0===this.props.secondSpacePressTime?this.props.firstSpacePressTime=(new Date).getTime():0!==this.props.firstSpacePressTime&&0===this.props.secondSpacePressTime&&(this.props.secondSpacePressTime=(new Date).getTime(),this.props.secondSpacePressTime-this.props.firstSpacePressTime<=500?(this.getCursorPosition(document.querySelector(".textarea")),this.props.textValue=`${this.props.textValue.slice(0,this.props.caretPos-1)}.${this.props.textValue.slice(this.props.caretPos)}`,this.addInTextArea(this.props.textValue),this.props.caretPos+=0,this.setCursorPosition(document.querySelector(".textarea")),this.props.firstSpacePressTime=0,this.props.secondSpacePressTime=0):(this.setCursorPosition(document.querySelector(".textarea")),this.props.firstSpacePressTime=(new Date).getTime(),this.props.secondSpacePressTime=0))}shiftCtrlPushed(){const e=document.getElementById("ShiftLeft"),t=document.getElementById("ControlLeft");e.classList.contains("active")&&t.classList.contains("active")&&(this.changeLanguage(),this.props.pressed=[])}}window.onload=function(){const t=new e;t.setLanguage(),t.render(),t.pushedKeys()}})();