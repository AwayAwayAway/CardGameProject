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
    _this.aboutGame = document.querySelector('.about-button');

    _this.checkContinueCondition();

    _this.init('.wrapper-main-menu');

    var soundOffOn = _this.source[1];
    soundOffOn.addEventListener('click', _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playPauseBackgroundAudio);

    _toConsumableArray(_this.mainElement.children).forEach(function (button) {
      button.addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio');
      });
      button.addEventListener('click', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-click-audio');
      });
    });

    _this.aboutGame.addEventListener('click', function () {
      return _this.createAboutRules();
    });

    _this.rulesPage = "<div class = \"about-game\">\n\t\t\t<p>Defeat your opponent by playing <span style=\"color:brown\">Cards</span><img src=\"./images/cards/warrior/strike.png\" alt=\"card\"> from your hand by swipe it up or drag it in the center of battlefield.</p>\n\t\t\t<p>Cards require <span style=\"color: orange\">Energy</span> to play. You can see it on a card in the top left corner. Once you are out of Energy, <img id = \"about-game__stamina\" src=\"./images/icons/out-of-energy.png\" alt=\"cards\">end your turn.</p>\n\t\t\t<p>At start of your turn, new cards are drawn and your <span>Energy</span> is replenished.</p>\n\t\t\t<p>Play defensive card to gain <span style=\"color:blue\">Block</span><img src=\"./images/cards/warrior/defend_w.png\" alt=\"card\"> <span>Block</span> reduces incoming attack damage.</p>\n\t\t\t<p>If you want to save your game, just use menu <i class=\"fas fa-bars\"></i> and select \"save progress\" button.</p>\n\t\t</div>";
    return _this;
  }

  _createClass(MainMenu, [{
    key: "checkContinueCondition",
    value: function checkContinueCondition() {
      var temp = localStorage.getItem('gameData');
      var gameDate = JSON.parse(temp);

      if (!temp) {
        document.querySelector('.continue-button').addEventListener('click', function (event) {
          return event.stopPropagation();
        });
        document.querySelector('.continue-button').style.color = 'grey';
      }
    }
  }, {
    key: "createAboutRules",
    value: function createAboutRules() {
      var _this2 = this;

      var divEl = document.createElement('div');
      var closeBtn = document.createElement('div');
      var content = document.createElement('div');
      divEl.className = 'players-overlay fade-in-animation';
      closeBtn.className = 'close-rule-btn';
      content.innerHTML = "".concat(this.rulesPage);
      closeBtn.textContent = 'Close';
      divEl.appendChild(content);
      divEl.appendChild(closeBtn);
      this.mainElement.appendChild(divEl);
      document.querySelector('.close-rule-btn').addEventListener('click', function () {
        return _this2.removeAboutRules();
      });
      document.querySelector('.close-rule-btn').addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio');
      });
      document.querySelector('.close-rule-btn').addEventListener('click', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-click-audio');
      });
    }
  }, {
    key: "removeAboutRules",
    value: function removeAboutRules() {
      var _this3 = this;

      var divEl = document.querySelector('.players-overlay');
      divEl.className = 'players-overlay fade-out-animation';
      setTimeout(function () {
        return _this3.mainElement.removeChild(divEl);
      }, 500);
    }
  }]);

  return MainMenu;
}(Menu);

var ChooseMenu = /*#__PURE__*/function (_Menu2) {
  _inherits(ChooseMenu, _Menu2);

  var _super2 = _createSuper(ChooseMenu);

  function ChooseMenu() {
    var _this4;

    _classCallCheck(this, ChooseMenu);

    _this4 = _super2.call(this);
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

    _this4.init('.wrapper-choose-menu');

    var _this4$source = _this4.source,
        announcer = _this4$source[0],
        description = _this4$source[1],
        options = _this4$source[2],
        startGame = _this4$source[3],
        decision = _this4$source[4],
        soundOffOn = _this4$source[6];
    var _this4$source$ = _this4.source[4],
        enterNameInput = _this4$source$.firstElementChild,
        applyChoose = _this4$source$.lastElementChild;
    enterNameInput.maxLength = '10'; // save name and model of character of each player

    _this4.playerChooseCharacter = function () {
      var regexRule = /\w/;
      var warningCheck = enterNameInput.value !== 'You forgot enter name';

      var classCheck = _toConsumableArray(options.children).some(function (child) {
        return child.classList.contains('in-focus');
      });

      var regexCheck = regexRule.test(enterNameInput.value); //check if input is empty or didnt class choosed

      if (!warningCheck || !regexCheck) {
        this.allertEmptyName();
        this.allertClass();
        return;
      } else if (!classCheck) {
        this.allertClass();
        return;
      } // help myself with 'data' attribute to set which character player choose


      var temp = _toConsumableArray(options.children).filter(function (child) {
        if (child.classList.contains('in-focus')) {
          return child;
        }
      }); // record player's choose


      if (playerOneTurn) {
        playerOneName = enterNameInput.value.trim();
        playerOneClass = temp[0].dataset.class;
        announcer.textContent = 'Player 2: Choose your character';
        enterNameInput.value = '';
      } else {
        playerTwoName = enterNameInput.value.trim();
        playerTwoClass = temp[0].dataset.class;
        announcer.textContent = 'Players chose their characters';
        enterNameInput.value = '';
      }

      playerOneTurn = false;
      playerTwoTurn = true;
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-audio');
      this.removeStyles();
      this.checkConditionToStartBattle();
    }; // alert for empty input


    _this4.allertEmptyName = function () {
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-failed-audio');
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.decision__btn', 'horizontal');
      enterNameInput.value = 'You forgot enter name';
      enterNameInput.style.color = 'red';
      enterNameInput.style.fontSize = '2rem';
      setTimeout(function () {
        enterNameInput.value = '';
        enterNameInput.style.color = 'black';
        enterNameInput.style.fontSize = '2rem';
      }, 1000);
    };

    _this4.allertClass = function () {
      if (_toConsumableArray(options.children).some(function (child) {
        return child.classList.contains('in-focus');
      })) {
        return;
      } else {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-failed-audio');
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.options', 'mix');
      }
    }; // check if both players choose character and enter nicknames, start fight


    _this4.checkConditionToStartBattle = function () {
      if (playerOneClass && playerTwoClass) {
        var playersChoice = this.prepareToSaveData();
        options.classList.add('hidden');
        decision.classList.add('hidden');
        description.classList.add('hidden');
        localStorage.setItem('playersInfo', JSON.stringify(playersChoice));
        setTimeout(function () {
          startGame.classList.add('visible');
        }, 500);
      }
    };

    _this4.removeStyles = function () {
      _toConsumableArray(options.children).forEach(function (child) {
        child.classList.remove('in-focus');
      });
    }; // function trigger audio and shake animation


    _this4.startVisualAndSoundEffect = function (event) {
      switch (event.target.className.split(' ')[0]) {
        case 'warrior':
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.warrior-selected-audio');
          break;

        case 'rogue':
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.rogue-selected-audio');
          break;

        case 'mage':
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.mage-selected-audio');
          break;
      }
    }; // set text to describe each character


    _this4.setCharacterDescription = function (character) {
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

    _this4.setBackground = function (event) {
      if (event.target.className === 'options') {
        return;
      }

      this.removeStyles();
      event.target.classList.add('in-focus');
      this.setCharacterDescription("".concat(event.target.textContent.toLowerCase()));
      this.mainElement.style.backgroundImage = "url('./images/backgrounds/".concat(event.target.textContent.toLowerCase(), ".jpg')");
    };

    _this4.prepareToSaveData = function () {
      return {
        playerOneClass: playerOneClass,
        playerTwoClass: playerTwoClass,
        playerOneName: playerOneName,
        playerTwoName: playerTwoName
      };
    };

    options.addEventListener('click', function (event) {
      return _this4.setBackground(event);
    });
    options.addEventListener('click', function (event) {
      return _this4.startVisualAndSoundEffect(event);
    });

    _toConsumableArray(options.children).forEach(function (hover) {
      return hover.addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio');
      });
    }); //run function to choose character or  alert empty input name


    applyChoose.addEventListener('click', function () {
      return _this4.playerChooseCharacter();
    });
    soundOffOn.addEventListener('click', _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playPauseBackgroundAudio);
    document.addEventListener('keypress', function (event) {
      if (event.code === 'Enter') {
        _this4.playerChooseCharacter();
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

    return _this4;
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