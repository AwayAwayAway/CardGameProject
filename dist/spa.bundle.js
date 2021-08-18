/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/animation_and_sound_effects/animation.js":
/*!*****************************************************!*\
  !*** ./js/animation_and_sound_effects/animation.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadingScreenAnimation": function() { return /* binding */ loadingScreenAnimation; },
/* harmony export */   "playPauseBackgroundAudio": function() { return /* binding */ playPauseBackgroundAudio; },
/* harmony export */   "checkBackgroundAudio": function() { return /* binding */ checkBackgroundAudio; },
/* harmony export */   "shakeAnimation": function() { return /* binding */ shakeAnimation; },
/* harmony export */   "createCardAnimation": function() { return /* binding */ createCardAnimation; },
/* harmony export */   "discardCardAnimation": function() { return /* binding */ discardCardAnimation; },
/* harmony export */   "endTurnAnimation": function() { return /* binding */ endTurnAnimation; },
/* harmony export */   "attackInDirectionAnimation": function() { return /* binding */ attackInDirectionAnimation; },
/* harmony export */   "blockAnimation": function() { return /* binding */ blockAnimation; },
/* harmony export */   "attackAnimation": function() { return /* binding */ attackAnimation; },
/* harmony export */   "standardAttackAnimation": function() { return /* binding */ standardAttackAnimation; },
/* harmony export */   "multipleAttackAnimation": function() { return /* binding */ multipleAttackAnimation; },
/* harmony export */   "ultimateSkillAnimation": function() { return /* binding */ ultimateSkillAnimation; },
/* harmony export */   "playSoundEffect": function() { return /* binding */ playSoundEffect; },
/* harmony export */   "damageNumbersAnimation": function() { return /* binding */ damageNumbersAnimation; },
/* harmony export */   "notEnoughStaminaAnimation": function() { return /* binding */ notEnoughStaminaAnimation; }
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// animation through all menu loading black screen
var loadingScreenAnimation = function loadingScreenAnimation(target) {
  switch (target) {
    case 'mainMenuLoad':
      var mainEl = document.createElement('div');
      mainEl.className = 'back-main-menu-anim';
      document.body.insertBefore(mainEl, document.querySelector('.wrapper-choose-menu'));
      setTimeout(function () {
        return document.body.removeChild(mainEl);
      }, 1100);
      break;

    case 'chooseMenuLoad':
      var chooseEl = document.createElement('div');
      chooseEl.className = 'go-to-choose-menu-anim';
      document.body.insertBefore(chooseEl, document.querySelector('.wrapper-main-menu'));
      setTimeout(function () {
        return document.body.removeChild(chooseEl);
      }, 1100);
      break;

    case 'battleFieldLoad':
      var battleEl = document.createElement('div');
      battleEl.className = 'start-game-anim';
      document.body.insertBefore(battleEl, document.querySelector('.wrapper-choose-menu'));
      setTimeout(function () {
        return document.body.removeChild(battleEl);
      }, 1100);
      break;
  }
}; // starting play backgorundMusic


var playPauseBackgroundAudio = function playPauseBackgroundAudio() {
  var hash = window.location.hash;
  var state = decodeURIComponent(hash.substr(1));
  var soundOffOn = document.querySelector('.sound-icon');
  var backAudio;

  if (state == 'battle-field' || state == 'restoredGame') {
    backAudio = document.querySelector('.background-music-battlefield');
  } else {
    backAudio = document.querySelector('.background-music-main-menu');
  }

  if (backAudio.paused) {
    backAudio.play();
    soundOffOn.className = 'fas fa-volume-up sound-icon';
  } else {
    backAudio.pause();
    soundOffOn.className = 'fas fa-volume-mute sound-icon';
  }
};

var checkBackgroundAudio = function checkBackgroundAudio(querySelector) {
  var currentHash = decodeURIComponent(window.location.hash.substr(1));
  var mainAudio = document.querySelector('.background-music-main-menu');
  var audio = document.querySelector('.background-music-battlefield');
  var allAudio = document.querySelectorAll('.music');
  var soundOffOn = document.querySelector(querySelector);

  switch (currentHash) {
    case 'battle-field':
      if (mainAudio.paused && audio.paused) {
        mainAudio.pause();
        audio.pause();
      } else {
        mainAudio.pause();
        audio.play();
      }

      break;

    case 'restoredGame':
      if (mainAudio.paused && audio.paused) {
        mainAudio.pause();
        audio.pause();
      } else {
        mainAudio.pause();
        audio.play();
      }

      break;

    case 'main-menu':
      if (mainAudio.paused && audio.paused) {
        mainAudio.pause();
        audio.pause();
      } else {
        audio.pause();
        mainAudio.play();
      }

      break;

    case 'choose-menu':
      if (mainAudio.paused && audio.paused) {
        mainAudio.pause();
        audio.pause();
      } else {
        audio.pause();
        mainAudio.play();
      }

      break;
  }

  if (_toConsumableArray(allAudio).every(function (element) {
    return element.paused;
  })) {
    soundOffOn.className = 'fas fa-volume-mute sound-icon';
  } else {
    soundOffOn.className = 'fas fa-volume-up sound-icon';
  }
}; // shake display when character choosed


var shakeAnimation = function shakeAnimation(queryElement) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
  var element = document.querySelector(queryElement);

  switch (direction) {
    case 'horizontal':
      element.classList.remove('shake-x');
      setTimeout(function () {
        return element.classList.add('shake-x');
      }, 0);
      setTimeout(function () {
        return element.classList.remove('shake-x');
      }, 400);
      break;

    case 'vertical':
      element.classList.remove('shake-y');
      setTimeout(function () {
        return element.classList.add('shake-y');
      }, 0);
      setTimeout(function () {
        return element.classList.remove('shake-y');
      }, 400);
      break;

    case 'mix':
      element.classList.remove('shake-mix');
      setTimeout(function () {
        return element.classList.add('shake-mix');
      }, 0);
      setTimeout(function () {
        return element.classList.remove('shake-mix');
      }, 400);
      break;
  }
};

var createCardAnimation = function createCardAnimation(querySelector, amount) {
  var elementAnim = document.querySelector(querySelector);

  switch (amount) {
    case 'single':
      for (var i = 0; i < _toConsumableArray(elementAnim.children).length; i++) {
        if (elementAnim.children[i].classList.contains('card-draw-animation')) {
          continue;
        } else {
          elementAnim.children[i].classList.add('card-draw-animation');
          playSoundEffect('.push-card-audio');
        }
      }

      break;

    case 'multiple':
      _toConsumableArray(elementAnim.children).forEach(function (element, index) {
        return setTimeout(function () {
          element.classList.add('card-draw-animation');
          playSoundEffect('.push-card-audio');
        }, 250 * index);
      });

      break;

    case 'overlay':
      _toConsumableArray(elementAnim.children).forEach(function (element) {
        return element.classList.add('card-draw-animation');
      });

  }
};

var discardCardAnimation = function discardCardAnimation(querySelector) {
  querySelector.classList.add('card-discard-animation');
};

var endTurnAnimation = function endTurnAnimation(side) {
  var button = document.querySelector('.end-of-turn-btn');
  var turnAnnouncer = document.querySelector('.players-action');
  turnAnnouncer.classList.add('players-turn-info');

  switch (side) {
    case 'left':
      setTimeout(function () {
        button.style.removeProperty('right');
        button.style.left = '2%';
      }, 500);
      break;

    case 'right':
      setTimeout(function () {
        button.style.removeProperty('left');
        button.style.right = '2%';
      }, 500);
      break;
  }

  setTimeout(function () {
    return button.classList.add('end-turn-animation');
  }, 1300);
  setTimeout(function () {
    return turnAnnouncer.classList.remove('players-turn-info');
  }, 2100);
  setTimeout(function () {
    return button.classList.remove('end-turn-animation');
  }, 1000);
};

var attackInDirectionAnimation = function attackInDirectionAnimation(querySelector, direction) {
  var container = document.querySelector(querySelector);

  switch (direction) {
    case 'right':
      container.classList.add('attack-right-animation');
      setTimeout(function () {
        return container.classList.remove('attack-right-animation');
      }, 1000);
      break;

    case 'left':
      container.classList.add('attack-left-animation');
      setTimeout(function () {
        return container.classList.remove('attack-left-animation');
      }, 1000);
      break;
  }
};

var blockAnimation = function blockAnimation(querySelector, className, src) {
  var container = document.querySelector(querySelector).parentElement;
  var image = src;
  image.className = className;
  container.appendChild(image);
  setTimeout(function () {
    return container.removeChild(image);
  }, 1000);
};

var attackAnimation = function attackAnimation(querySelector, className, src) {
  var container = document.querySelector(querySelector).parentElement;
  var image = src;
  image.style.transform = "rotate(".concat(Math.floor(Math.random() * (360 - 1) + 1), "deg)");
  image.className = className;
  container.appendChild(image);
  window.navigator.vibrate([400]);
  setTimeout(function () {
    return container.removeChild(image);
  }, 600);
};

var standardAttackAnimation = function standardAttackAnimation(querySelector, className, src) {
  var container = document.querySelector(querySelector).parentElement;
  var image = src;
  image.className = className;
  container.appendChild(image);
  window.navigator.vibrate([400]);
  setTimeout(function () {
    return container.removeChild(image);
  }, 400);
};

var multipleAttackAnimation = function multipleAttackAnimation(querySelector, className, src, amountEffect) {
  var container = document.querySelector(querySelector).parentElement;
  var image = src;

  var _loop = function _loop(i) {
    setTimeout(function () {
      if (i === 1) {
        image.style.transform = 'rotate(30deg)';
      } else if (i === 2) {
        image.style.transform = 'rotate(315deg)';
      }

      image.className = className;
      container.appendChild(image);
      window.navigator.vibrate([200]);
      playSoundEffect('.strike-attack-audio');
    }, i * 300);
  };

  for (var i = 0; i < amountEffect; i++) {
    _loop(i);
  }

  setTimeout(function () {
    return container.removeChild(image);
  }, 1300);
};

var ultimateSkillAnimation = function ultimateSkillAnimation(querySelector, className, src, audio) {
  var container = document.querySelector(querySelector).parentElement;
  var overlay = document.querySelector('.players-overlay');
  var overlayClose = document.querySelector('.players-overlay__close');
  var image = src;
  image.className = className;
  overlay.classList.remove('hidden');
  overlay.classList.add('fade-in-animation');
  overlayClose.classList.add('hidden');
  setTimeout(function () {
    container.appendChild(image);
    window.navigator.vibrate(800);
    shakeAnimation(querySelector);
    playSoundEffect(audio);
  }, 200);
  setTimeout(function () {
    container.removeChild(image);
    overlay.classList.add('fade-out-animation');
  }, 1250);
  setTimeout(function () {
    overlay.classList.add('hidden');
    overlay.classList.remove('fade-in-animation');
    overlay.classList.remove('fade-out-animation');
    overlayClose.classList.remove('hidden');
  }, 1850);
};

var playSoundEffect = function playSoundEffect(querySelector) {
  var soundEffect = document.querySelector(querySelector);

  if (!soundEffect) {
    return;
  }

  soundEffect.currentTime = 0;
  soundEffect.play();
};

var damageNumbersAnimation = function damageNumbersAnimation(querySelector, className, content) {
  var container = document.querySelector(querySelector).parentElement;
  var divEl = document.createElement('div');
  divEl.textContent = content;
  divEl.className = className;
  container.appendChild(divEl);
  setTimeout(function () {
    return container.removeChild(divEl);
  }, 1500);
};

var notEnoughStaminaAnimation = function notEnoughStaminaAnimation(player) {
  var activePlayerUI;
  var divEl = document.createElement('div');
  var fistBubble = document.createElement('div');
  var secondBubble = document.createElement('div');
  var thirdBubble = document.createElement('div');

  if (player === 'player1') {
    activePlayerUI = document.querySelector('.player-1__model').parentElement;
    divEl.className = 'not-enough-stamina-player-1 fade-in-animation';
    fistBubble.className = 'not-enough-stamina-player-1__first-bubble';
    secondBubble.className = 'not-enough-stamina-player-1__second-bubble';
    thirdBubble.className = 'not-enough-stamina-player-1__third-bubble';
  } else {
    activePlayerUI = document.querySelector('.player-2__model').parentElement;
    divEl.className = 'not-enough-stamina-player-2 fade-in-animation';
    fistBubble.className = 'not-enough-stamina-player-2__first-bubble';
    secondBubble.className = 'not-enough-stamina-player-2__second-bubble';
    thirdBubble.className = 'not-enough-stamina-player-2__third-bubble';
  }

  thirdBubble.innerHTML = 'Not enough <span style = "color: brown;"> Energy</span>';
  divEl.appendChild(fistBubble);
  divEl.appendChild(secondBubble);
  divEl.appendChild(thirdBubble);
  activePlayerUI.appendChild(divEl);
  setTimeout(function () {
    divEl.classList.add('fade-out-animation');
  }, 1500);
  setTimeout(function () {
    activePlayerUI.removeChild(divEl);
  }, 2000);
};



/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************!*\
  !*** ./js/SPAcontroller.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation_and_sound_effects/animation.js */ "./js/animation_and_sound_effects/animation.js");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");

 // import '../dist/spa.css';

var gameConstructor = {};
document.addEventListener('DOMContentLoaded', gameConstructorInit); // change hash

document.addEventListener('click', function (event) {
  return switchHash(event);
});
window.addEventListener('hashchange', renderPage);

function renderPage() {
  var hash = decodeURIComponent(window.location.hash.substr(1)); // const state = decodeURIComponent(hash.substr(1));

  switch (hash) {
    case '':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loadingScreenAnimation)('mainMenuLoad');
      document.title = 'Main menu';
      setTimeout(function () {
        return createMainPage(gameConstructor.mainMenu);
      }, 500);
      break;

    case 'choose-menu':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loadingScreenAnimation)('chooseMenuLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.chooseMenu);
      }, 500);
      break;

    case 'main-menu':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loadingScreenAnimation)('mainMenuLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.mainMenu);
      }, 500);
      break;

    case 'battle-field':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loadingScreenAnimation)('battleFieldLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.battle);
      }, 500);
      break;

    case 'restoredGame':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loadingScreenAnimation)('battleFieldLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.battle);
      }, 500);
      break;
  }

  setTimeout(function () {
    return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.checkBackgroundAudio)('.sound-icon');
  }, 600);
}

function switchHash(event) {
  switch (event.target.className.split(' ')[0]) {
    case 'start-button':
      document.title = 'Choose menu';
      location.hash = decodeURIComponent('choose-menu');
      break;

    case 'back-to-main-menu':
      document.title = 'Main menu';
      location.hash = decodeURIComponent('main-menu');
      break;

    case 'start-game':
      document.title = 'Battlefield';
      location.hash = decodeURIComponent('battle-field');
      break;

    case 'continue-button':
      document.title = 'Battlefield';
      location.hash = decodeURIComponent('restoredGame');
      break;
  }
}

function gameConstructorInit() {
  $.ajax({
    url: 'json/main_menu.json',
    type: 'GET',
    dataType: 'json',
    success: saveMainMenu,
    error: errorHandler
  });
}

function saveMainMenu(data) {
  gameConstructor.mainMenu = data;
  $.ajax({
    url: 'json/choose_menu.json',
    type: 'GET',
    dataType: 'json',
    success: saveChooseMenu,
    error: errorHandler
  });
}

function saveChooseMenu(data) {
  gameConstructor.chooseMenu = data;
  $.ajax({
    url: 'json/battle.json',
    type: 'GET',
    dataType: 'json',
    success: saveBattle,
    error: errorHandler
  });
}

function saveBattle(data) {
  gameConstructor.battle = data;
  renderPage();
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
} // create page from JSON functions


function createMainPage(object) {
  var body = document.querySelector('body');
  var wrapperEl = document.querySelector('.wrapper');
  var scriptEl = document.querySelector('.script');
  var parent;
  var mainChild;
  var child;
  var subChild;
  var lowestChild;
  var script;

  for (var i = 0; i < object.length; i++) {
    for (var key in object[i]) {
      switch (object[i][key]) {
        case 'parent':
          parent = createElement(object[i]);
          break;

        case 'mainChild':
          mainChild = createElement(object[i]);
          parent.appendChild(mainChild);
          break;

        case 'child':
          child = createElement(object[i]);
          mainChild.appendChild(child);
          break;

        case 'subChild':
          subChild = createElement(object[i]);
          child.appendChild(subChild);
          break;

        case 'lowestChild':
          lowestChild = createElement(object[i]);
          subChild.appendChild(lowestChild);
          break;

        case 'script':
          script = createElement(object[i]);
          break;
      }
    }
  }

  if (wrapperEl) {
    body.replaceChild(parent, wrapperEl);
  } else {
    body.appendChild(parent);
  }

  if (scriptEl) {
    body.replaceChild(script, scriptEl);
  } else {
    body.appendChild(script);
  }
}

function createElement(obj) {
  var element = document.createElement(obj.tagName);
  element.setAttribute('class', obj.class);
  element.textContent = obj.content || '';

  if (obj.source) {
    element.src = obj.source;
  }

  if (obj.data) {
    element.setAttribute("".concat(obj.data), "".concat(obj.dataValue));
  }

  if (obj.type) {
    element.setAttribute("".concat(obj.type), "".concat(obj.typeValue));
  }

  if (obj.tagName === 'script') {
    element.setAttribute('defer', 'defer');
  }

  return element;
}
}();
/******/ })()
;
//# sourceMappingURL=spa.bundle.js.map