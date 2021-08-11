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
/* harmony export */   "ultimateSkillAnimation": function() { return /* binding */ ultimateSkillAnimation; }
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
  var overlayClose = document.querySelector('.overlay__close');
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
  }, 800);
  setTimeout(function () {
    overlay.classList.add('hidden');
    overlay.classList.remove('fade-in');
    overlay.classList.remove('fade-out');
    overlayClose.classList.remove('hidden');
  }, 1000);
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



/***/ }),

/***/ "./js/game_navigation_modules/menu_modules.js":
/*!****************************************************!*\
  !*** ./js/game_navigation_modules/menu_modules.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Menu; }
/* harmony export */ });
/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation_and_sound_effects/animation.js */ "./js/animation_and_sound_effects/animation.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Menu = /*#__PURE__*/function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, [{
    key: "init",
    value: function init(parentElement) {
      this.mainElement = document.querySelector(parentElement);
      this.source = _objectSpread({}, document.querySelector(parentElement).children);
    }
  }], [{
    key: "createMainMenu",
    value: function createMainMenu() {
      var mainMenu = new MainMenu();
    }
  }, {
    key: "createChooseMenu",
    value: function createChooseMenu() {
      var mainMenu = new ChooseMenu();
    }
  }]);

  return Menu;
}();



var MainMenu = /*#__PURE__*/function (_Menu) {
  _inherits(MainMenu, _Menu);

  var _super = _createSuper(MainMenu);

  function MainMenu() {
    var _this;

    _classCallCheck(this, MainMenu);

    _this = _super.call(this);

    _this.init('.wrapper-main-menu');

    var soundOffOn = _this.source[1];
    soundOffOn.addEventListener('click', _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.switchPlayPause);

    _toConsumableArray(_this.mainElement.children).forEach(function (button) {
      button.addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio');
      });
      button.addEventListener('click', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-click-audio');
      });
    });

    return _this;
  }

  return MainMenu;
}(Menu);

var ChooseMenu = /*#__PURE__*/function (_Menu2) {
  _inherits(ChooseMenu, _Menu2);

  var _super2 = _createSuper(ChooseMenu);

  function ChooseMenu() {
    var _this2;

    _classCallCheck(this, ChooseMenu);

    _this2 = _super2.call(this);
    var playerOneTurn = true;
    var playerTwoTurn = false;
    var playerOneClass = null;
    var playerTwoClass = null;
    var playerOneName = null;
    var playerTwoName = null;
    var characterDescription = [{
      title: 'The Viking',
      profile: 'The remaining soldier of the Ironclads. Sold his soul to harness demonic energies',
      pross: 'Losing health goes into a rage. Becomes stronger when the enemy has a lot of health'
    }, {
      title: 'The Silent',
      profile: 'A deadly huntress from the foglands. Eradicates foes with daggers',
      pross: 'Light attacks and the ability to always find the right skill take the enemy by surprise'
    }, {
      title: 'The Watcher',
      profile: 'A blind ascetic who has come to "Evaluate" the Spire. Master of the divine Stances',
      pross: 'Massive magic  can destroy the enemy in a matter of seconds'
    }];

    _this2.init('.wrapper-choose-menu');

    var _this2$source = _this2.source,
        announcer = _this2$source[0],
        description = _this2$source[1],
        options = _this2$source[2],
        startGame = _this2$source[3],
        decision = _this2$source[4],
        soundOffOn = _this2$source[6];
    var _this2$source$ = _this2.source[4],
        enterName = _this2$source$.firstElementChild,
        applyChoose = _this2$source$.lastElementChild; // save name and model of character of each player

    _this2.playerChooseCharacter = function () {
      // const announcer = document.querySelector('.playerChoose');
      var check = enterName.value.length >= 1 && enterName.value !== 'You forgot enter name' && _toConsumableArray(options.children).some(function (child) {
        return child.classList.contains('in-focus');
      }); //check if input is empty


      if (!check) {
        this.allertEmptyName();
        return;
      } // help myself with 'data' attribute to set which character player choose


      var temp = _toConsumableArray(options.children).filter(function (child) {
        if (child.classList.contains('in-focus')) {
          return child;
        }
      }); // record player's choose


      if (playerOneTurn) {
        playerOneName = enterName.value;
        playerOneClass = temp[0].dataset.class;
        announcer.textContent = 'Player 2: Choose your character';
        enterName.value = '';
      } else {
        playerTwoName = enterName.value;
        playerTwoClass = temp[0].dataset.class;
        announcer.textContent = 'Players chose their characters';
        enterName.value = '';
      }

      playerOneTurn = false;
      playerTwoTurn = true;
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-audio');
      this.removeStyles();
      this.checkConditionToStartBattle();
    }; // alert for empty input


    _this2.allertEmptyName = function () {
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-failed-audio');

      if (enterName.value.length <= 1) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.decision-btn', 'horizontal');
        enterName.value = 'You forgot enter name';
        enterName.style.color = 'red';
        enterName.style.fontSize = '2rem';
        setTimeout(function () {
          enterName.value = '';
          enterName.style.color = 'black';
          enterName.style.fontSize = '2rem';
        }, 1000);
      }

      if (_toConsumableArray(options.children).some(function (child) {
        return child.classList.contains('in-focus');
      })) {
        return;
      } else {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.options', 'mix');
      }
    }; // check if both players choose character and enter nicknames, start fight


    _this2.checkConditionToStartBattle = function () {
      if (playerOneClass && playerTwoClass) {
        var playersChoice = this.prepareToExtract();
        options.classList.add('hidden');
        decision.classList.add('hidden');
        description.classList.add('hidden');
        localStorage.setItem('playersInfo', JSON.stringify(playersChoice));
        setTimeout(function () {
          startGame.classList.add('visible');
        }, 500);
      }
    };

    _this2.removeStyles = function () {
      _toConsumableArray(options.children).forEach(function (child) {
        child.classList.remove('in-focus');
      });
    }; // function trigger audio and shake animation


    _this2.startVisualAndSoundEffect = function (event) {
      switch (event.target.className.split(' ')[0]) {
        case 'warrior':
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.wrapper-choose-menu');
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.warrior-selected-audio');
          break;

        case 'rogue':
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.wrapper-choose-menu');
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.rogue-selected-audio');
          break;

        case 'mage':
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.wrapper-choose-menu');
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.mage-selected-audio');
          break;
      }
    }; // set text to describe each character


    _this2.setCharacterDescription = function (character) {
      var keys = Object.keys(characterDescription[0]);

      switch (character) {
        case 'warrior':
          _toConsumableArray(description.children).forEach(function (element, index) {
            return element.textContent = characterDescription[0][keys[index]];
          });

          break;

        case 'rogue':
          _toConsumableArray(description.children).forEach(function (element, index) {
            return element.textContent = characterDescription[1][keys[index]];
          });

          break;

        case 'mage':
          _toConsumableArray(description.children).forEach(function (element, index) {
            return element.textContent = characterDescription[2][keys[index]];
          });

          break;
      }
    };

    _this2.setBackground = function (event) {
      if (event.target.className === 'options') {
        return;
      }

      this.removeStyles();
      event.target.classList.add('in-focus');
      this.setCharacterDescription("".concat(event.target.textContent.toLowerCase()));
      this.mainElement.style.backgroundImage = "url('../images/backgrounds/".concat(event.target.textContent.toLowerCase(), ".jpg')");
    };

    _this2.prepareToExtract = function () {
      return {
        playerOneClass: playerOneClass,
        playerTwoClass: playerTwoClass,
        playerOneName: playerOneName,
        playerTwoName: playerTwoName
      };
    };

    options.addEventListener('click', function (event) {
      return _this2.setBackground(event);
    });
    options.addEventListener('click', function (event) {
      return _this2.startVisualAndSoundEffect(event);
    });

    _toConsumableArray(options.children).forEach(function (hover) {
      return hover.addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio');
      });
    }); //run function to choose character or  alert empty input name


    applyChoose.addEventListener('click', function () {
      return _this2.playerChooseCharacter();
    });
    soundOffOn.addEventListener('click', _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.switchPlayPause);
    document.addEventListener('keypress', function (event) {
      if (event.code === 'Enter') {
        _this2.playerChooseCharacter();
      }
    });

    _toConsumableArray(document.querySelectorAll('.btn')).forEach(function (button) {
      button.addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio');
      });
      button.addEventListener('click', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-click-audio');
      });
    });

    return _this2;
  }

  return ChooseMenu;
}(Menu);

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
/*!***************************!*\
  !*** ./js/choose_menu.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_navigation_modules_menu_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_navigation_modules/menu_modules */ "./js/game_navigation_modules/menu_modules.js");

_game_navigation_modules_menu_modules__WEBPACK_IMPORTED_MODULE_0__.default.createChooseMenu();
}();
/******/ })()
;
//# sourceMappingURL=chooseMenu.bundle.js.map