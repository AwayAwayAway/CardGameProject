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
/* harmony export */   "loading": function() { return /* binding */ loading; },
/* harmony export */   "switchPlayPause": function() { return /* binding */ switchPlayPause; },
/* harmony export */   "checkBackgroundAudio": function() { return /* binding */ checkBackgroundAudio; },
/* harmony export */   "shakeAnimation": function() { return /* binding */ shakeAnimation; },
/* harmony export */   "createCardAnim": function() { return /* binding */ createCardAnim; },
/* harmony export */   "endTurnAnim": function() { return /* binding */ endTurnAnim; },
/* harmony export */   "blockAnimationEffect": function() { return /* binding */ blockAnimationEffect; },
/* harmony export */   "attackAnimation": function() { return /* binding */ attackAnimation; },
/* harmony export */   "playSoundEffect": function() { return /* binding */ playSoundEffect; },
/* harmony export */   "attackAnimationEffect": function() { return /* binding */ attackAnimationEffect; },
/* harmony export */   "multipleAttackAnimation": function() { return /* binding */ multipleAttackAnimation; },
/* harmony export */   "discardCardAnim": function() { return /* binding */ discardCardAnim; },
/* harmony export */   "standartAttackAnimation": function() { return /* binding */ standartAttackAnimation; },
/* harmony export */   "ultimateSkillAnimation": function() { return /* binding */ ultimateSkillAnimation; },
/* harmony export */   "damageNumbersAnimation": function() { return /* binding */ damageNumbersAnimation; }
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// animation through all menu loading black screen
function loading(target) {
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
} // starting play backgorundMusic


function switchPlayPause() {
  var hash = window.location.hash;
  var state = decodeURIComponent(hash.substr(1));
  var soundOffOn = document.querySelector('.soundIcon');
  var backAudio;

  if (state == 'battle-field') {
    backAudio = document.querySelector('.background-music-battlefield');
  } else {
    backAudio = document.querySelector('.background-music-main-menu');
  }

  if (backAudio.paused) {
    backAudio.play();
    soundOffOn.className = 'fas fa-volume-up soundIcon';
  } else {
    backAudio.pause();
    soundOffOn.className = 'fas fa-volume-mute soundIcon';
  }
}

var checkBackgroundAudio = function (querySelector) {
  var currentHash = [];
  var mainAudio = document.querySelector('.background-music-main-menu');
  var audio = document.querySelector('.background-music-battlefield');
  var allAudio = document.querySelectorAll('.music');
  return function () {
    currentHash.push(decodeURIComponent(window.location.hash.substr(1)));
    var soundOffOn = document.querySelector(querySelector);

    if (currentHash[currentHash.length - 1] === 'battle-field' && _toConsumableArray(allAudio).every(function (element) {
      return element.paused;
    })) {
      mainAudio.pause();
      audio.pause();
    } else if (currentHash[currentHash.length - 1] === 'battle-field' && _toConsumableArray(allAudio).some(function (element) {
      return element.paused;
    })) {
      mainAudio.pause();
      audio.play();
    } else if (currentHash[currentHash.length - 1] === 'choose-menu' && currentHash[currentHash.length - 2] === 'battle-field' && _toConsumableArray(allAudio).every(function (element) {
      return element.paused;
    })) {
      mainAudio.pause();
      audio.pause();
    } else if (currentHash[currentHash.length - 1] === 'choose-menu' && currentHash[currentHash.length - 2] === 'battle-field' && _toConsumableArray(allAudio).some(function (element) {
      return element.paused;
    })) {
      mainAudio.play();
      audio.pause();
    }

    if (_toConsumableArray(allAudio).every(function (element) {
      return element.paused;
    })) {
      soundOffOn.className = 'fas fa-volume-mute soundIcon';
    } else {
      soundOffOn.className = 'fas fa-volume-up soundIcon';
    }
  };
}('.soundIcon'); // shake display when character choosed


function shakeAnimation(queryElement) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
  var element = document.querySelector(queryElement);

  switch (direction) {
    case 'horizontal':
      element.classList.remove('shakeX');
      setTimeout(function () {
        return element.classList.add('shakeX');
      }, 0);
      setTimeout(function () {
        return element.classList.remove('shakeX');
      }, 400);
      break;

    case 'vertical':
      element.classList.remove('shakeY');
      setTimeout(function () {
        return element.classList.add('shakeY');
      }, 0);
      setTimeout(function () {
        return element.classList.remove('shakeY');
      }, 400);
      break;

    case 'mix':
      element.classList.remove('shakeMix');
      setTimeout(function () {
        return element.classList.add('shakeMix');
      }, 0);
      setTimeout(function () {
        return element.classList.remove('shakeMix');
      }, 400);
      break;
  }
}

function createCardAnim(querySelector, amount) {
  var elementAnim = document.querySelector(querySelector);

  switch (amount) {
    case 'single':
      for (var i = 0; i < _toConsumableArray(elementAnim.children).length; i++) {
        if (elementAnim.children[i].classList.contains('cardsDrawAnim')) {
          continue;
        } else {
          elementAnim.children[i].classList.add('cardsDrawAnim');
          playSoundEffect('.push-card-audio');
        }
      }

      break;

    case 'multiple':
      _toConsumableArray(elementAnim.children).forEach(function (element, index) {
        return setTimeout(function () {
          element.classList.add('cardsDrawAnim');
          playSoundEffect('.push-card-audio');
        }, 250 * index);
      });

      break;

    case 'overlay':
      _toConsumableArray(elementAnim.children).forEach(function (element) {
        return element.classList.add('cardsDrawAnim');
      });

  }
}

function discardCardAnim(querySelector) {
  querySelector.classList.add('cardDiscard');
}

function endTurnAnim(side) {
  var button = document.querySelector('.end-of-turn-btn');
  var turnAnnouncer = document.querySelector('.players-action');
  turnAnnouncer.classList.add('players-turn-info');

  switch (side) {
    case 'left':
      setTimeout(function () {
        button.style.removeProperty('right');
        button.style.left = '5%';
      }, 500);
      break;

    case 'right':
      setTimeout(function () {
        button.style.removeProperty('left');
        button.style.right = '5%';
      }, 500);
      break;
  }

  setTimeout(function () {
    return button.classList.add('endTurnAnim');
  }, 1300);
  setTimeout(function () {
    return turnAnnouncer.classList.remove('players-turn-info');
  }, 2100);
  setTimeout(function () {
    return button.classList.remove('endTurnAnim');
  }, 1000);
}

function blockAnimationEffect(querySelector, className, src) {
  var container = document.querySelector(querySelector).parentElement;
  var image = document.createElement('img');
  image.src = src;
  image.className = className;
  container.appendChild(image);
  setTimeout(function () {
    return container.removeChild(image);
  }, 1000);
}

function attackAnimation(querySelector, className, src) {
  var container = document.querySelector(querySelector).parentElement;
  var image = document.createElement('img');
  image.src = src;
  image.style.transform = "rotate(".concat(Math.floor(Math.random() * (360 - 1) + 1), "deg)");
  image.className = className;
  container.appendChild(image);
  setTimeout(function () {
    return container.removeChild(image);
  }, 600);
}

function multipleAttackAnimation(querySelector, className, src, amountEffect) {
  var container = document.querySelector(querySelector).parentElement;
  var effectStorage = [];

  for (var i = 0; i < amountEffect; i++) {
    var image = document.createElement('img');
    effectStorage.push(image);
  }

  effectStorage.forEach(function (elem, index) {
    elem.src = src;

    if (index === 1) {
      elem.style.transform = 'rotate(30deg)';
    } else if (index === 2) {
      elem.style.transform = 'rotate(315deg)';
    }

    elem.className = className;
    setTimeout(function () {
      container.appendChild(elem);
      playSoundEffect('.strike-attack-audio');
      setTimeout(function () {
        return container.removeChild(elem);
      }, 400);
    }, index * 300);
  });
}

function standartAttackAnimation(querySelector, className, src) {
  var container = document.querySelector(querySelector).parentElement;
  var image = document.createElement('img');
  image.src = src;
  image.className = className;
  container.appendChild(image);
  setTimeout(function () {
    return container.removeChild(image);
  }, 400);
}

function ultimateSkillAnimation(querySelector, className, src, audio) {
  var container = document.querySelector(querySelector).parentElement;
  var overlay = document.querySelector('.players-overlay');
  var overlayClose = document.querySelector('.players-overlay__close');
  var image = document.createElement('img');
  image.src = src;
  image.className = className;
  overlay.classList.remove('hidden');
  overlay.classList.add('fade-in');
  overlayClose.classList.add('hidden');
  setTimeout(function () {
    container.appendChild(image);
    shakeAnimation(querySelector);
    playSoundEffect(audio);
  }, 200);
  setTimeout(function () {
    container.removeChild(image);
    overlay.classList.add('fade-out');
  }, 1350);
  setTimeout(function () {
    overlay.classList.add('hidden');
    overlay.classList.remove('fade-in');
    overlay.classList.remove('fade-out');
    overlayClose.classList.remove('hidden');
  }, 1500);
}

function playSoundEffect(querySelector) {
  var soundEffect = document.querySelector(querySelector);

  if (!soundEffect) {
    return;
  }

  soundEffect.currentTime = 0;
  soundEffect.play();
}

function attackAnimationEffect(querySelector, direction) {
  var container = document.querySelector(querySelector);

  switch (direction) {
    case 'right':
      container.classList.add('attackRight');
      setTimeout(function () {
        return container.classList.remove('attackRight');
      }, 1000);
      break;

    case 'left':
      container.classList.add('attackLeft');
      setTimeout(function () {
        return container.classList.remove('attackLeft');
      }, 1000);
      break;
  }
}

function damageNumbersAnimation(querySelector, className, content) {
  var container = document.querySelector(querySelector).parentElement;
  var divEl = document.createElement('div');
  divEl.textContent = content;
  divEl.className = className;
  container.appendChild(divEl);
  setTimeout(function () {
    return container.removeChild(divEl);
  }, 1500);
}



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


var gameConstructor = {};
document.addEventListener('DOMContentLoaded', gameConstructorInit); // change hash

document.addEventListener('click', function (event) {
  return switchHash(event);
});
window.addEventListener('hashchange', renderPage);

function renderPage() {
  var hash = window.location.hash;
  var state = decodeURIComponent(hash.substr(1));

  switch (state) {
    case '':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('mainMenuLoad');
      document.title = 'Main menu';
      setTimeout(function () {
        return createMainPage(gameConstructor.mainMenu);
      }, 500);
      break;

    case 'choose-menu':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('chooseMenuLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.chooseMenu);
      }, 500);
      break;

    case 'main-menu':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('mainMenuLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.mainMenu);
      }, 500);
      break;

    case 'battle-field':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('battleFieldLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.battle);
      }, 500);
      break;

    case 'restoredGame':
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('battleFieldLoad');
      setTimeout(function () {
        return createMainPage(gameConstructor.battle);
      }, 500);
      break;
  }

  setTimeout(function () {
    return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.checkBackgroundAudio)();
  }, 550);
}

function switchHash(event) {
  switch (event.target.className.split(' ')[0]) {
    case 'startButton':
      document.title = 'Choose menu';
      location.hash = decodeURIComponent('choose-menu');
      break;

    case 'back-to-main-menu':
      document.title = 'Main menu';
      location.hash = decodeURIComponent('main-menu');
      break;

    case 'startGame':
      document.title = 'Battlefield';
      location.hash = decodeURIComponent('battle-field');
      break;

    case 'continueButton':
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