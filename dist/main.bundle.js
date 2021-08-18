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

/***/ "./js/cards.js":
/*!*********************!*\
  !*** ./js/cards.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "skillCollection": function() { return /* binding */ skillCollection; }
/* harmony export */ });
/* harmony import */ var _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cardsModel */ "./js/modules/cardsModel.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./js/game.js");
/* harmony import */ var _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/preloadImages */ "./js/modules/preloadImages.js");



 //START CREATING WARRIOR'S CARDS

var strike_w = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(0, 'attack', 1, 6, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.strike_w, 'strike_w');
var bash = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(1, 'attack', 1, 8, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.bash, 'bash');
var anger = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(2, 'attackAddEffect', 1, 6, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.anger, 'anger', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.healthPoints < 40) {
    effect = 13;
  } else {
    effect = 6;
  }

  return effect;
});
var bodySlam = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(3, 'attackAddEffect', 2, 0, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.bodySlam, 'bodySlam', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints > 0) {
    effect = _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints;
  } else {
    effect = 0;
  }

  return effect;
});
var perfectedStrike = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(4, 'attackAddEffect', 1, 6, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.perfectedStrike, 'perfectedStrike', function () {
  return 6 + _game__WEBPACK_IMPORTED_MODULE_1__.boardModel.cardInHand.children.length;
});
var bludgeon = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(5, 'attackAddEffect', 3, 12, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.bludgeon, 'bludgeon', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.healthPoints > 50) {
    effect = 17;
  } else {
    effect = 12;
  }

  return effect;
});
var defend_w = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(6, 'defend', 1, 5, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.defend_w, 'defend_w');
var armaments = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(7, 'defendAddEffect', 1, 5, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.armaments, 'armaments', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints === 0) {
    effect = 7;
  } else {
    effect = 5;
  }

  return effect;
});
var ironWave = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(8, 'defendAndAttack', 1, 5, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.ironWave, 'ironWave', function () {
  return 5;
});
var warcry = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(9, 'defendDrawDiscard', 0, 1, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.warcry, 'warcry');
var bloodletting = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(10, 'defendDrawDiscard', 0, 3, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.bloodletting, 'bloodletting');
var entrench = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(11, 'defendAddEffect', 2, 2, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.warrior.entrench, 'entrench', function () {
  return _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints * 2 - _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints;
}); //START CREATING ROGUE'S CARDS

var strike_r = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(0, 'attack', 1, 6, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.strike_r, 'strike_r');
var daggerThrow = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(1, 'attackDrawDiscard', 1, 9, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.daggerThrow, 'daggerThrow');
var flechettes = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(2, 'attackAddEffect', 1, 3, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.flechettes, 'flechettes', function () {
  return 3 * _game__WEBPACK_IMPORTED_MODULE_1__.boardModel.cardInHand.children.length;
});
var riddleWithHoles = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(3, 'attackAddEffect', 2, 7, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.riddleWithHoles, 'riddleWithHoles');
var slice = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(4, 'attack', 0, 4, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.slice, 'slice');
var quickSlash = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(5, 'attackDrawDiscard', 1, 7, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.quickSlash, 'quickSlash');
var survivor = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(6, 'defendDrawDiscard', 1, 8, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.survivor, 'survivor');
var deflect = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(7, 'defend', 0, 4, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.deflect, 'deflect');
var backFlip = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(8, 'defendDrawDiscard', 1, 1, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.backFlip, 'backFlip', function () {
  return 5;
});
var prepared = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(9, 'defendDrawDiscard', 0, 1, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.prepared, 'prepared');
var expertise = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(10, 'defendDrawDiscard', 1, 5, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.expertise, 'expertise');
var dash = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(11, 'defendAndAttack', 2, 10, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.rogue.dash, 'dash', function () {
  return 8;
}); //START CREATING MAGE'S CARDS

var strike_m = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(0, 'attack', 1, 6, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.strike_m, 'strike_m');
var cutThroughFate = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(1, 'attackDrawDiscard', 1, 7, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.cutThroughFate, 'cutThroughFate', function () {
  return 2;
});
var reachHeaven = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(2, 'attack', 2, 12, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.reachHeaven, 'reachHeaven');
var signatureMove = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(3, 'attackAddEffect', 2, 0, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.signatureMove, 'signatureMove', function () {
  return _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.defendPoints;
});
var tantrum = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(4, 'attackAddEffect', 1, 3, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.tantrum, 'tantrum', function () {
  return 3 + (Math.floor(Math.random() * (6 - 1)) + 1);
});
var judgment = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(5, 'attackAddEffect', 2, 0, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.judgment, 'judgment', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.healthPoints <= 15) {
    effect = 0;
  }

  return effect;
});
var masterReality = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(6, 'defendAddEffect', 1, 5, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.masterReality, 'masterReality', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints == 0) {
    effect = 10;
  } else {
    effect = 5;
  }

  return effect;
});
var defend_m = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(7, 'defend', 1, 5, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.defend_m, 'defend_m');
var meditate = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(8, 'defendAddEffect', 1, 3, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.meditate, 'meditate');
var thirdEye = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(9, 'defendDrawDiscard', 1, 7, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.thirdEye, 'thirdEye');
var nirvana = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(10, 'defendAddEffect', 1, 0, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.nirvana, 'nirvana', function () {
  return _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.defendPoints;
});
var alpha = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(11, 'defendDrawDiscard', 1, 4, _modules_preloadImages__WEBPACK_IMPORTED_MODULE_2__.skillCollectionImages.mage.alpha, 'alpha');
var skillCollection = {
  warrior: [strike_w, bash, anger, bodySlam, perfectedStrike, bludgeon, defend_w, armaments, ironWave, warcry, bloodletting, entrench],
  rogue: [strike_r, daggerThrow, flechettes, riddleWithHoles, slice, quickSlash, survivor, deflect, backFlip, prepared, expertise, dash],
  mage: [strike_m, cutThroughFate, reachHeaven, signatureMove, tantrum, judgment, masterReality, defend_m, meditate, thirdEye, nirvana, alpha]
};

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameObserver": function() { return /* binding */ gameObserver; },
/* harmony export */   "boardModel": function() { return /* binding */ boardModel; },
/* harmony export */   "boardView": function() { return /* binding */ boardView; },
/* harmony export */   "player1": function() { return /* binding */ player1; },
/* harmony export */   "player2": function() { return /* binding */ player2; }
/* harmony export */ });
/* harmony import */ var _modules_gameModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameModel */ "./js/modules/gameModel.js");
/* harmony import */ var _modules_boardModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/boardModel */ "./js/modules/boardModel.js");
/* harmony import */ var _modules_boardView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/boardView */ "./js/modules/boardView.js");
/* harmony import */ var _modules_gameController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/gameController */ "./js/modules/gameController.js");
/* harmony import */ var _modules_playerModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/playerModel */ "./js/modules/playerModel.js");
/* harmony import */ var _modules_playerView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/playerView */ "./js/modules/playerView.js");
/* harmony import */ var _modules_playerController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/playerController */ "./js/modules/playerController.js");
/* harmony import */ var _modules_boardController__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/boardController */ "./js/modules/boardController.js");
/* harmony import */ var _modules_observerModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/observerModel */ "./js/modules/observerModel.js");









var gameObserver = new _modules_gameModel__WEBPACK_IMPORTED_MODULE_0__.default();
var boardModel = new _modules_boardModel__WEBPACK_IMPORTED_MODULE_1__.default(gameObserver);
var boardView = new _modules_boardView__WEBPACK_IMPORTED_MODULE_2__.default(boardModel, gameObserver, document.querySelector('.wrapper-battle'));
var gameController = new _modules_gameController__WEBPACK_IMPORTED_MODULE_3__.default(gameObserver, boardView);
var player1 = new _modules_playerModel__WEBPACK_IMPORTED_MODULE_4__.default(gameObserver, boardModel);
var player2 = new _modules_playerModel__WEBPACK_IMPORTED_MODULE_4__.default(gameObserver, boardModel);
var playersView = new _modules_playerView__WEBPACK_IMPORTED_MODULE_5__.default(player1, player2, gameObserver, document.querySelector('.wrapper-battle'));
var playersController = new _modules_playerController__WEBPACK_IMPORTED_MODULE_6__.default(player1, player2, boardView, playersView);
var boardController = new _modules_boardController__WEBPACK_IMPORTED_MODULE_7__.default(gameObserver, boardModel, player1, player2, boardView);
var winConditionObserver = new MutationObserver(_modules_observerModel__WEBPACK_IMPORTED_MODULE_8__.endGame);
var saveConcedeConditionObserver = new MutationObserver(_modules_observerModel__WEBPACK_IMPORTED_MODULE_8__.allowSaveConcede);
gameObserver.start();
boardView.init();
winConditionObserver.observe(playersView.playerOneHPValue, {
  childList: true,
  subtree: true,
  characterData: true
});
winConditionObserver.observe(playersView.playerTwoHPValue, {
  childList: true,
  subtree: true,
  characterData: true
});
saveConcedeConditionObserver.observe(boardView.battleField, {
  attributes: true
});


/***/ }),

/***/ "./js/modules/boardController.js":
/*!***************************************!*\
  !*** ./js/modules/boardController.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BoardController; }
/* harmony export */ });
/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation_and_sound_effects/animation.js */ "./js/animation_and_sound_effects/animation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var BoardController = /*#__PURE__*/function () {
  function BoardController(game, board, playerModel1, playerModel2, view) {
    var _this = this;

    _classCallCheck(this, BoardController);

    this.gameModel = game;
    this.boardModel = board;
    this.player1 = playerModel1;
    this.player2 = playerModel2;
    this.boardView = view;

    if (this.boardView.hasOwnProperty('onLoadCreate')) {
      this.boardView.onLoadCreate.attach(function (card, place) {
        return _this.createCard(card, place);
      });
    }

    if (this.boardView.hasOwnProperty('dropEvent')) {
      this.boardView.dropEvent.attach(function () {
        return _this.deleteActionCard();
      });
    }

    if (this.boardView.hasOwnProperty('endTurn')) {
      this.boardView.endTurn.attach(function () {
        return _this.createCardsInHand();
      });
    }

    if (this.boardView.hasOwnProperty('showPlayerDeck')) {
      this.boardView.showPlayerDeck.attach(function (event) {
        return _this.showPlayersDeck(event);
      });
    }

    if (this.boardView.hasOwnProperty('onClosePileCards')) {
      this.boardView.onClosePileCards.attach(function () {
        return _this.deleteOverlayCards();
      });
    }

    if (this.gameModel.hasOwnProperty('selectionContinue')) {
      this.gameModel.selectionContinue.attach(function () {
        return _this.createCard();
      });
    }

    if (this.gameModel.hasOwnProperty('selectionEnd')) {
      this.gameModel.selectionEnd.attach(function (restoredCards) {
        return _this.createCardsInHand(restoredCards);
      });
    }

    if (this.player1.hasOwnProperty('cardDraw')) {
      this.player1.cardDraw.attach(function (card) {
        return _this.addCardInHand(card);
      });
    }

    if (this.player2.hasOwnProperty('cardDraw')) {
      this.player2.cardDraw.attach(function (card) {
        return _this.addCardInHand(card);
      });
    }

    if (this.player1.hasOwnProperty('cardDiscard')) {
      this.player1.cardDiscard.attach(function (card) {
        return _this.deleteRandomCard(card);
      });
    }

    if (this.player2.hasOwnProperty('cardDiscard')) {
      this.player2.cardDiscard.attach(function (card) {
        return _this.deleteRandomCard(card);
      });
    }

    if (this.boardView.hasOwnProperty('soundOffOn')) {
      this.boardView.soundOffOn.attach(function () {
        return _this.turnOnOfSound();
      });
    }
  }

  _createClass(BoardController, [{
    key: "createCard",
    value: function createCard() {
      this.boardModel.createCardsForChoose(this.gameModel);
    }
  }, {
    key: "createCardsInHand",
    value: function createCardsInHand(restoredCards) {
      var _this2 = this;

      if (restoredCards) {
        restoredCards.forEach(function (element) {
          return _this2.boardModel.createCards(element, 'hand', true);
        });
        this.boardModel.createAnimation.notify('.card-in-hand-field', 'multiple');
      } else {
        this.boardModel.pullRandomCardsInHand();
      }
    }
  }, {
    key: "deleteActionCard",
    value: function deleteActionCard() {
      this.boardModel.deletePlayedCard('playedCard');
    }
  }, {
    key: "deleteRandomCard",
    value: function deleteRandomCard(card) {
      this.boardModel.deletePlayedCard('randomCard', card);
    }
  }, {
    key: "deleteOverlayCards",
    value: function deleteOverlayCards() {
      this.boardModel.removeExtraCards('overlay');
    }
  }, {
    key: "addCardInHand",
    value: function addCardInHand(card) {
      this.boardModel.createCards(card, 'hand', true);
    }
  }, {
    key: "showPlayersDeck",
    value: function showPlayersDeck(eventTarget) {
      this.boardModel.showCardsForPlayers(eventTarget);
    }
  }, {
    key: "turnOnOfSound",
    value: function turnOnOfSound() {
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playPauseBackgroundAudio)();
    }
  }]);

  return BoardController;
}();



/***/ }),

/***/ "./js/modules/boardModel.js":
/*!**********************************!*\
  !*** ./js/modules/boardModel.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Board; }
/* harmony export */ });
/* harmony import */ var _eventsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsModel */ "./js/modules/eventsModel.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cards */ "./js/cards.js");
/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation_and_sound_effects/animation.js */ "./js/animation_and_sound_effects/animation.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Board = /*#__PURE__*/function () {
  function Board(model) {
    _classCallCheck(this, Board);

    this.gameModel = model;
    this.deckWrapper = document.querySelector('.cards-choose-field'); // field for cards at the start when players are choosing

    this.cardInHand = document.querySelector('.card-in-hand-field'); // field for cards in hand each player

    this.playersTurnInfo = document.querySelector('.players-action');
    this.playersDeck = document.querySelector('.players-overlay__cards');
    this.onCreateCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.removeCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.removeActionCard = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.createAnimation = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // this.endTurnAnimation = new Events();
  } // создаем деку в начале игры для игрока согласно классу


  _createClass(Board, [{
    key: "createCardsForChoose",
    value: function createCardsForChoose(playerClassInfo) {
      var _this = this;

      this.removeExtraCards('board');

      if (this.gameModel.playerOneTurn) {
        setTimeout(function () {
          _cards__WEBPACK_IMPORTED_MODULE_1__.skillCollection[playerClassInfo.playerOneClass].forEach(function (element) {
            return _this.createCards(element, 'board');
          });

          _this.createAnimation.notify('.cards-choose-field', 'multiple');
        }, 500);
      } else {
        setTimeout(function () {
          _cards__WEBPACK_IMPORTED_MODULE_1__.skillCollection[playerClassInfo.playerTwoClass].forEach(function (element) {
            return _this.createCards(element, 'board');
          });

          _this.createAnimation.notify('.cards-choose-field', 'multiple');
        }, 500);
      }
    }
  }, {
    key: "showCardsForPlayers",
    value: function showCardsForPlayers(eventTarget) {
      var _this2 = this;

      if (eventTarget.classList.contains('player-1__pile-of-card')) {
        this.gameModel.playerOnePullOfCards.forEach(function (element) {
          return _this2.createCards(element, 'overlay');
        });
        this.createAnimation.notify('.players-overlay__cards', 'overlay');
      }

      if (eventTarget.classList.contains('player-2__pile-of-card')) {
        this.gameModel.playerTwoPullOfCards.forEach(function (element) {
          return _this2.createCards(element, 'overlay');
        });
        this.createAnimation.notify('.players-overlay__cards', 'overlay');
      }
    }
  }, {
    key: "createCards",
    value: function createCards(card, appendPlace) {
      var draggable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elDiv = card.icon;

      if (appendPlace === 'hand') {
        elDiv.setAttribute('class', 'cards-hand');
      } else {
        elDiv.setAttribute('class', 'cards');
      }

      elDiv.setAttribute('data-info', "".concat(card.id));

      if (draggable) {
        elDiv.setAttribute('draggable', 'true');
      } else {
        elDiv.setAttribute('draggable', 'false');
      }

      this.onCreateCards.notify(elDiv, appendPlace);
    } // кидаем карты в руку

  }, {
    key: "pullRandomCardsInHand",
    value: function pullRandomCardsInHand() {
      this.removeExtraCards('hand');
      var tempIndex = []; //делаем проверку чтобы карты в руке не повторялись

      for (var i = 0; i < 4; i++) {
        // количество карт в руку
        var n = Math.floor(Math.random() * 8); // количество набранных карт

        if (tempIndex.indexOf(n) == -1) {
          tempIndex.push(n);
        } else {
          i--;
        }
      } // создаем карты в руке согласно игрока чей ход


      if (this.gameModel.playerOneTurn) {
        for (var _i = 0; _i < tempIndex.length; _i++) {
          this.createCards(this.gameModel.playerOnePullOfCards[tempIndex[_i]], 'hand', true);
        }

        this.createAnimation.notify('.card-in-hand-field', 'multiple');
      } else {
        for (var _i2 = 0; _i2 < tempIndex.length; _i2++) {
          this.createCards(this.gameModel.playerTwoPullOfCards[tempIndex[_i2]], 'hand', true);
        }

        this.createAnimation.notify('.card-in-hand-field', 'multiple');
      }
    } // убираем лишние карты с доски или из руки

  }, {
    key: "removeExtraCards",
    value: function removeExtraCards(place) {
      var orderToRemove = [];

      switch (place) {
        case 'board':
          orderToRemove = _toConsumableArray(this.deckWrapper.children);
          break;

        case 'hand':
          orderToRemove = _toConsumableArray(this.cardInHand.children);
          break;

        case 'overlay':
          orderToRemove = _toConsumableArray(this.playersDeck.children);
          break;
      }

      this.removeCards.notify(orderToRemove, place);
    } //удаляем сыгранные карты из руки с проверкой

  }, {
    key: "deletePlayedCard",
    value: function deletePlayedCard(condition, card) {
      if (this.gameModel.tempCard.cost > this.gameModel.activePlayer.staminaPoints) {
        return;
      }

      switch (condition) {
        case 'playedCard':
          this.removeActionCard.notify(this.gameModel.dragCard);
          break;

        case 'randomCard':
          this.removeActionCard.notify(card);
          break;
      }
    }
  }]);

  return Board;
}();



/***/ }),

/***/ "./js/modules/boardView.js":
/*!*********************************!*\
  !*** ./js/modules/boardView.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BoardView; }
/* harmony export */ });
/* harmony import */ var _eventsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsModel */ "./js/modules/eventsModel.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game */ "./js/game.js");
/* harmony import */ var _observerModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observerModel */ "./js/modules/observerModel.js");
/* harmony import */ var _animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation_and_sound_effects/animation */ "./js/animation_and_sound_effects/animation.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var BoardView = /*#__PURE__*/function () {
  function BoardView(board, game, selector) {
    var _this = this;

    _classCallCheck(this, BoardView);

    this.boardModel = board;
    this.gameModel = game;
    this.boardSelector = selector;
    this.deckWrapper = this.boardSelector.querySelector('.cards-choose-field'); // field for cards at the start when players are choosing

    this.acceptChoiceBtn = this.boardSelector.querySelector('.players-draw-info__accept'); // player accept cards he chose

    this.cardsChooseCounter = this.boardSelector.querySelector('.players-draw-info__count'); // counter for amount of cards have been chosen(needs for alert)

    this.cardInHandField = this.boardSelector.querySelector('.card-in-hand-field'); // field for cards in hand each player

    this.battleField = this.boardSelector.querySelector('.battle-field'); // play field

    this.endTurnBtn = this.boardSelector.querySelector('.end-of-turn-btn'); // end turn button

    this.playersTurnInfo = this.boardSelector.querySelector('.players-action');
    this.cardsPlayField = this.boardSelector.querySelector('.play-field'); // area for cards to drop and play their actions

    this.soundOffOnIcon = this.boardSelector.querySelector('.sound-icon');
    this.playersOverlay = this.boardSelector.querySelector('.players-overlay');
    this.playersDeck = this.boardSelector.querySelector('.players-overlay__cards');
    this.playersDeckClose = this.boardSelector.querySelector('.players-overlay__close');
    this.menu = this.boardSelector.querySelector('.battle-field-nav');
    this.menuIcon = this.boardSelector.querySelector('.battle-field-nav__icon');

    this.touchEvent = function (event) {
      var self = _this;
      var coordinateY = event.touches[0].pageY;
      var eventTarget = event.target;

      if (event.target.classList.contains('cards')) {
        var closure = function closure() {
          var coordinate = coordinateY;
          var target = eventTarget;
          self.boardSelector.addEventListener('touchend', function touchEnd(event) {
            var comparison = parseFloat(coordinateY) - parseFloat(event.changedTouches[0].pageY);
            eventTarget.classList.remove('touch-start-animation');
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.card-grab-cancel-audio');

            if (comparison > 170) {
              self.dropEvent.notify();
              self.doCardAction.notify(self.gameModel.playerOneTurn);
            }

            this.removeEventListener('touchend', touchEnd);
          });
        };

        _this.touchCardStart.notify(event.target);

        event.target.classList.add('touch-start-animation');
        (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.drag-audio');
        closure();
      }
    };

    this.onLoadCreate = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие для this.gameModel закинуть в масиив выбранные карты

    this.onDefineCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие на проверку набрали ли игроки карты

    this.submitCardCheckChoose = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // навели убрали мышку на карту в руке

    this.grabCardStart = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.touchCardStart = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); //удаляем сыгранную карту

    this.dropEvent = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // выполняем действие карты

    this.doCardAction = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.endTurn = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.onClosePileCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.showPlayerDeck = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.soundOffOn = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.saveGameProgres = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.onRestoreGameData = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.onConcede = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();

    if ("ontouchstart" in window) {
      this.cardInHandField.addEventListener('touchstart', function (event) {
        return _this.touchEvent(event);
      }); // событие клик подстветка выбора карт

      this.deckWrapper.addEventListener('touchstart', function (event) {
        return _this.cardChooseAnim(event.target);
      });
    } else {
      // событие клик подстветка выбора карт
      this.deckWrapper.addEventListener('click', function (event) {
        return _this.cardChooseAnim(event.target);
      }); // анимация карт при перетаскивании плюс узнаем какую карту перетавскиваем

      this.cardInHandField.addEventListener('dragstart', function (event) {
        return _this.dragCardStartAnimation(event.target);
      });
      this.cardInHandField.addEventListener('dragstart', function (event) {
        return _this.grabCardStart.notify(event.target);
      });
      this.cardInHandField.addEventListener('dragend', function (event) {
        return _this.dragCardEndAnimation(event.target);
      });
      this.cardsPlayField.addEventListener('dragenter', function (event) {
        return _this.dragCardEnterAnimation(event);
      });
      this.cardsPlayField.addEventListener('dragover', function (event) {
        return event.preventDefault();
      }); // играем карты

      this.cardsPlayField.addEventListener('drop', function () {
        _this.dropEvent.notify();

        _this.doCardAction.notify(_this.gameModel.playerOneTurn);

        _this.deletePlayfieldAnimation();
      });
    }

    this.acceptChoiceBtn.addEventListener('click', function () {
      _this.onDefineCards.notify();

      _this.submitCardCheckChoose.notify();
    });
    this.battleField.addEventListener('click', function (event) {
      _this.showPlayerDeck.notify(event.target);

      _this.openCloseOverlay(event.target);
    });
    this.playersDeckClose.addEventListener('click', function (event) {
      _this.onClosePileCards.notify();

      _this.openCloseOverlay(event.target);
    });
    this.endTurnBtn.addEventListener('click', function () {
      return _this.endTurn.notify();
    });
    this.soundOffOnIcon.addEventListener('click', function () {
      return _this.soundOffOn.notify();
    });
    this.menuIcon.addEventListener('click', function () {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.btn-click-audio');

      _this.showMenu();
    });
    this.menu.addEventListener('click', function (event) {
      return _this.navigateGame(event.target);
    });

    _toConsumableArray(this.menu.getElementsByTagName('li')).forEach(function (button) {
      button.addEventListener('mouseover', function () {
        return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.btn-hover-audio');
      });
      button.addEventListener('click', function () {
        return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.btn-click-audio');
      });
    });

    this.boardSelector.querySelector('.save-progress').addEventListener('click', _observerModel__WEBPACK_IMPORTED_MODULE_2__.forbidClick);
    this.boardSelector.querySelector('.concede').addEventListener('click', _observerModel__WEBPACK_IMPORTED_MODULE_2__.forbidClick);
    window.addEventListener('beforeunload', _observerModel__WEBPACK_IMPORTED_MODULE_2__.warningUnload); // this.boardModel создала карты надо их отобразить

    this.boardModel.onCreateCards.attach(function (card, place) {
      return _this.drawCards(card, place);
    }); // событие this.gameModel проверяет набранны ли у игроков карты

    this.gameModel.selectionEnd.attach(function () {
      return _this.selectionEndUpdate();
    }); // событие на удаление лишних карт

    this.boardModel.removeCards.attach(function (cards, place) {
      return _this.extraCardsToRemove(cards, place);
    }); // событие на отображение инфо кто выбирает карты

    this.gameModel.choosePlayerInfo.attach(function (text) {
      return _this.playerChooseInfoUpdate(text);
    }); // событие на отображение никнеймов игроков

    this.gameModel.updatePlayersNames.attach(function (name1, name2) {
      return _this.playerNameUpdate(name1, name2);
    }); // событие на отображение моделек персонажей

    this.gameModel.updatePlayersModels.attach(function (modelPlayer1, modelPlayer2) {
      return _this.playerModelsUpdate(modelPlayer1, modelPlayer2);
    }); // удаление сыгранной карты

    this.boardModel.removeActionCard.attach(function (card) {
      return _this.deleteActionCard(card);
    });
    this.boardModel.createAnimation.attach(function (querySelector, amount) {
      return _this.createAnimation(querySelector, amount);
    });
    this.gameModel.endTurnAnimation.attach(function (btnSide, textInfo) {
      return _this.endTurnAnimation(btnSide, textInfo);
    });
  } // need for start render cards when page is loaded


  _createClass(BoardView, [{
    key: "init",
    value: function init() {
      if (localStorage.getItem('gameData')) {
        this.checkRestoreGame();
        return;
      } else {
        this.onLoadCreate.notify();
      }
    }
  }, {
    key: "drawCards",
    value: function drawCards(card, place) {
      switch (place) {
        case 'board':
          this.deckWrapper.appendChild(card);
          break;

        case 'hand':
          this.cardInHandField.appendChild(card);
          break;

        case 'overlay':
          this.playersDeck.appendChild(card);
          break;
      }

      this.cardsChooseCounter.textContent = '0';
      this.cardsChooseCounter.style = 'color: white';
    }
  }, {
    key: "extraCardsToRemove",
    value: function extraCardsToRemove(cards, place) {
      if (place == 'board' && cards.length > 0) {
        for (var i = 0; i < cards.length; i++) {
          this.deckWrapper.removeChild(cards[i]);
        }
      }

      if (place == 'hand' && cards.length > 0) {
        for (var _i = 0; _i < cards.length; _i++) {
          this.cardInHandField.removeChild(cards[_i]);
        }
      }

      if (place == 'overlay' && cards.length > 0) {
        for (var _i2 = 0; _i2 < cards.length; _i2++) {
          this.playersDeck.removeChild(cards[_i2]);
        }
      }
    }
  }, {
    key: "deleteActionCard",
    value: function deleteActionCard(card) {
      this.cardInHandField.removeChild(card);
    }
  }, {
    key: "counterUpdate",
    value: function counterUpdate(info) {
      this.cardsChooseCounter.textContent = info.number;
      this.cardsChooseCounter.style = "color: ".concat(info.color);
    }
  }, {
    key: "selectionEndUpdate",
    value: function selectionEndUpdate() {
      this.deckWrapper.style.display = 'none';
      this.battleField.classList.remove('hidden');
      this.boardSelector.querySelector('.players-draw-info').style.display = 'none';
    }
  }, {
    key: "playerChooseInfoUpdate",
    value: function playerChooseInfoUpdate(text) {
      this.boardSelector.querySelector('.players-draw-info__name').textContent = text;
    }
  }, {
    key: "playerNameUpdate",
    value: function playerNameUpdate(name1, name2) {
      this.boardSelector.querySelector('.player-1__name').textContent = name1;
      this.boardSelector.querySelector('.player-2__name').textContent = name2;
    }
  }, {
    key: "playerModelsUpdate",
    value: function playerModelsUpdate(modelPlayer1, modelPlayer2) {
      var player1Model = this.boardSelector.querySelector('.player-1__model');
      var player2Model = this.boardSelector.querySelector('.player-2__model');
      player1Model.type = 'image/svg+xml';
      player2Model.type = 'image/svg+xml';

      switch (modelPlayer1) {
        case 'warrior':
          player1Model.data = 'images/models/viking.svg';
          break;

        case 'rogue':
          player1Model.data = 'images/models/rogue.svg';
          break;

        case 'mage':
          player1Model.data = 'images/models/mage.svg';
          break;

        default:
          console.log('models not found');
      }

      switch (modelPlayer2) {
        case 'warrior':
          player2Model.data = 'images/models/viking.svg';
          break;

        case 'rogue':
          player2Model.data = 'images/models/rogue.svg';
          break;

        case 'mage':
          player2Model.data = 'images/models/mage.svg';
          break;

        default:
          console.log('models not found');
      }
    }
  }, {
    key: "doConcede",
    value: function doConcede() {
      if (this.gameModel.playerOneTurn) {
        this.onConcede.notify('player1');
      } else {
        this.onConcede.notify('player2');
      }
    }
  }, {
    key: "createAnimation",
    value: function createAnimation(querySelector, amount) {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.createCardAnimation)(querySelector, amount);
    }
  }, {
    key: "endTurnAnimation",
    value: function endTurnAnimation(btnSide, textInfo) {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.endTurnAnimation)(btnSide);

      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.end-turn-audio');
      this.playersTurnInfo.textContent = textInfo;
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      var menuIcon = this.boardSelector.querySelector('.battle-field-nav__icon');
      var menuList = this.boardSelector.querySelector('.battle-field-nav__list');

      if (menuIcon.classList.contains('fa-times-circle')) {
        menuList.classList.add('hidden');
        menuIcon.className = 'fas fa-bars battle-field-nav__icon';
      } else {
        menuList.classList.remove('hidden');
        menuIcon.className = 'far fa-times-circle battle-field-nav__icon';
      }
    }
  }, {
    key: "navigateGame",
    value: function navigateGame(eventTarget) {
      switch (eventTarget.className.split(' ')[0]) {
        case 'return-to-main-menu':
          this.showMenu();
          window.removeEventListener('beforeunload', _observerModel__WEBPACK_IMPORTED_MODULE_2__.warningUnload);
          document.title = 'Main menu';
          location.hash = decodeURIComponent('main-menu');
          break;

        case 'return-to-choose-menu':
          this.showMenu();
          window.removeEventListener('beforeunload', _observerModel__WEBPACK_IMPORTED_MODULE_2__.warningUnload);
          document.title = 'Choose menu';
          location.hash = decodeURIComponent('choose-menu');
          break;

        case 'save-progress':
          this.showMenu();
          this.saveGameProgres.notify();
          break;

        case 'concede':
          this.showMenu();
          this.doConcede();
          break;
      }
    }
  }, {
    key: "checkRestoreGame",
    value: function checkRestoreGame() {
      var _this2 = this;

      // const hash = window.location.hash;
      // const state = decodeURIComponent(hash.substr(1));
      // if (state === 'restoredGame') {
      this.playersOverlay.classList.remove('hidden');
      this.playersOverlay.classList.add('fade-in-animation');
      this.playersDeckClose.classList.add('hidden');
      var divEl = document.createElement('div');
      divEl.className = 'confirm-continue';
      divEl.textContent = 'Do you want to continue the last game?';
      var choiceYes = document.createElement('button');
      choiceYes.className = 'confirm-continue__accept';
      choiceYes.textContent = 'Yes';
      var choiceNo = document.createElement('button');
      choiceNo.className = 'confirm-continue__reject';
      choiceNo.textContent = 'No';
      divEl.appendChild(choiceYes);
      divEl.appendChild(choiceNo);
      this.playersOverlay.appendChild(divEl);
      this.boardSelector.querySelector('.confirm-continue').addEventListener('click', function (event) {
        return _this2.doContinueDecision(event.target);
      }); // }
    }
  }, {
    key: "doContinueDecision",
    value: function doContinueDecision(eventTarget) {
      var divEl = document.querySelector('.confirm-continue');

      switch (eventTarget.className) {
        case 'confirm-continue__reject':
          this.playersOverlay.removeChild(divEl);
          this.playersOverlay.classList.add('hidden');
          this.playersDeckClose.classList.remove('hidden');
          this.onLoadCreate.notify();
          break;

        case 'confirm-continue__accept':
          this.playersOverlay.classList.remove('fade-in-animation');
          this.onRestoreGameData.notify();
          break;
      }
    } //добавляем стили для перетаскивания

  }, {
    key: "dragCardStartAnimation",
    value: function dragCardStartAnimation(eventTarget) {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.drag-audio');

      if (eventTarget !== this.cardInHandField) {
        setTimeout(function () {
          return eventTarget.classList.add('invisible');
        }, 0);
        this.cardsPlayField.classList.add('pulse-animation');
      }
    }
  }, {
    key: "dragCardEndAnimation",
    value: function dragCardEndAnimation(eventTarget) {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.card-grab-cancel-audio');

      if (eventTarget !== this.cardInHandField) {
        eventTarget.classList.remove('invisible');
      }

      this.deletePlayfieldAnimation();
    }
  }, {
    key: "dragCardEnterAnimation",
    value: function dragCardEnterAnimation(event) {
      event.preventDefault();
      this.cardsPlayField.classList.add('pulse-animation-enter');
    }
  }, {
    key: "deletePlayfieldAnimation",
    value: function deletePlayfieldAnimation() {
      this.cardsPlayField.classList.remove('pulse-animation-enter');
      this.cardsPlayField.classList.remove('pulse-animation');
    } // подсветка выбранных карт

  }, {
    key: "cardChooseAnim",
    value: function cardChooseAnim(eventTarget) {
      var target = eventTarget;

      if (target !== this.deckWrapper) {
        target.classList.toggle('card-to-select');
      }

      if (target.classList.contains('card-to-select')) {
        (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.card-selected-audio');
      }

      var counter = document.getElementsByClassName('card-to-select').length;
      var counterInfo = {};
      counterInfo.number = counter;

      if (counter > 8) {
        counterInfo.color = 'red';
      } else if (counter == 8) {
        counterInfo.color = 'green';
      } else if (counter > 0 && counter < 8) {
        counterInfo.color = 'cyan';
      } else {
        counterInfo.color = 'white';
      }

      this.counterUpdate(counterInfo);
    }
  }, {
    key: "openCloseOverlay",
    value: function openCloseOverlay(target) {
      if (target.classList.contains('player-1__pile-of-card') || target.classList.contains('player-2__pile-of-card')) {
        this.playersOverlay.classList.remove('hidden');
        this.playersOverlay.classList.add('fade-in-pile-animation');
        (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.overlay-open-audio');
      }

      if (target.classList.contains('players-overlay__close')) {
        this.playersOverlay.classList.remove('fade-in-pile-animation');
        this.playersOverlay.classList.add('hidden');
        (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.overlay-close-audio');
      }
    }
  }]);

  return BoardView;
}();



/***/ }),

/***/ "./js/modules/cardsModel.js":
/*!**********************************!*\
  !*** ./js/modules/cardsModel.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Cards; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cards = function Cards(id, type, cost, effect, icon, name, sideEffect) {
  _classCallCheck(this, Cards);

  this.id = id;
  this.cost = cost;
  this.type = type;
  this.effect = effect;
  this.icon = icon;
  this.name = name;
  this.sideEffect = sideEffect;
};



/***/ }),

/***/ "./js/modules/eventsModel.js":
/*!***********************************!*\
  !*** ./js/modules/eventsModel.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Events; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Events = /*#__PURE__*/function () {
  function Events() {
    _classCallCheck(this, Events);

    this.listeners = [];
  }

  _createClass(Events, [{
    key: "attach",
    value: function attach(listener) {
      this.listeners.push(listener);
    }
  }, {
    key: "notify",
    value: function notify(arg1, arg2) {
      var _this = this;

      this.listeners.forEach(function (listener, index) {
        _this.listeners[index](arg1, arg2);
      });
    }
  }]);

  return Events;
}();



/***/ }),

/***/ "./js/modules/gameController.js":
/*!**************************************!*\
  !*** ./js/modules/gameController.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GameController; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameController = /*#__PURE__*/function () {
  function GameController(model, view) {
    var _this = this;

    _classCallCheck(this, GameController);

    this.gameModel = model;
    this.boardView = view;

    if (this.boardView.hasOwnProperty('onDefineCards')) {
      this.boardView.onDefineCards.attach(function () {
        return _this.defineCards();
      });
    }

    if (this.boardView.hasOwnProperty('submitCardCheckChoose')) {
      this.boardView.submitCardCheckChoose.attach(function () {
        return _this.doCardCheckChoose();
      });
    }

    if (this.boardView.hasOwnProperty('grabCardStart')) {
      this.boardView.grabCardStart.attach(function (eventTarget) {
        return _this.actionCard(eventTarget);
      });
    }

    if (this.boardView.hasOwnProperty('touchCardStart')) {
      this.boardView.touchCardStart.attach(function (eventTarget) {
        return _this.actionCard(eventTarget);
      });
    }

    if (this.boardView.hasOwnProperty('endTurn')) {
      this.boardView.endTurn.attach(function () {
        return _this.doEndTurn();
      });
    }

    if (this.boardView.hasOwnProperty('saveGameProgres')) {
      this.boardView.saveGameProgres.attach(function () {
        return _this.onSaveGameData();
      });
    }

    if (this.boardView.hasOwnProperty('onRestoreGameData')) {
      this.boardView.onRestoreGameData.attach(function () {
        return _this.startRestoreData();
      });
    }
  } // событие на кнопку подтверждения выбора карт, запоминаем что выбрал в масси


  _createClass(GameController, [{
    key: "defineCards",
    value: function defineCards() {
      this.gameModel.definePlayersCardSet();
    } // событие на кнопку подтверждения выбора карт, проверяем оба игрока сделали выбор

  }, {
    key: "doCardCheckChoose",
    value: function doCardCheckChoose() {
      this.gameModel.checkCardsSelectionEnd();
    }
  }, {
    key: "actionCard",
    value: function actionCard(eventTarget) {
      this.gameModel.initActionCard(eventTarget);
    }
  }, {
    key: "doEndTurn",
    value: function doEndTurn() {
      this.gameModel.turnEndsNextPlayerTurn();
      this.gameModel.setTextTurnInfo();
    }
  }, {
    key: "onSaveGameData",
    value: function onSaveGameData() {
      this.gameModel.saveGameData();
    }
  }, {
    key: "startRestoreData",
    value: function startRestoreData() {
      this.gameModel.doRestoreGameData();
    }
  }]);

  return GameController;
}();



/***/ }),

/***/ "./js/modules/gameModel.js":
/*!*********************************!*\
  !*** ./js/modules/gameModel.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Game; }
/* harmony export */ });
/* harmony import */ var _eventsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsModel */ "./js/modules/eventsModel.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cards */ "./js/cards.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game */ "./js/game.js");
/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation_and_sound_effects/animation.js */ "./js/animation_and_sound_effects/animation.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.activePlayer = null; //активный игрок на данный момент кто будет наносить урон

    this.passivePlayer = null; //пассивный игрок на данный момент кто будет получать урон

    this.playerOneTurn = true;
    this.playerTwoTurn = false;
    this.playerOneClass = null; // сохраняет класс игрока будем реализовывать выбор скилов под класс

    this.playerTwoClass = null;
    this.playerOnePullOfCards = [];
    this.playerTwoPullOfCards = [];
    this.playersInfo = {}; //info from local storage about choose menu

    this.dragCard = null;
    this.tempCard = null; // карта которая играется
    // событие выбор карт завершен

    this.selectionEnd = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие выбор карт продолжается

    this.selectionContinue = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие изменить кто выбирает карты

    this.choosePlayerInfo = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие установить никнеймы игрокам

    this.updatePlayersNames = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие установить модельки персонажей игрокам

    this.updatePlayersModels = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // анимация конца хода

    this.endTurnAnimation = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.init();
    }
  }, {
    key: "init",
    value: function init() {
      this.setPlayersChoiceInfo('playersInfo');
      this.setPlayersClasses();
      this.setPlayersNames();
      this.setPlayersModels();
      this.setTextChooseInfo();
      this.setActivePassivePlayer();
    }
  }, {
    key: "setPlayersChoiceInfo",
    value: // забираем инфу о выборе игроками персонажей и их никнеймов и парсим json
    function setPlayersChoiceInfo(object) {
      var temp = localStorage.getItem(object);
      this.playersInfo = JSON.parse(temp);
    }
  }, {
    key: "setPlayersClasses",
    value: // устанавливаем класы игроками из объекта
    function setPlayersClasses() {
      this.playerOneClass = this.playersInfo.playerOneClass;
      this.playerTwoClass = this.playersInfo.playerTwoClass;
    }
  }, {
    key: "setPlayersNames",
    value: // устанавливаем никнеймы игрокам из объекта
    function setPlayersNames() {
      this.updatePlayersNames.notify(this.playersInfo.playerOneName, this.playersInfo.playerTwoName);
    }
  }, {
    key: "setPlayersModels",
    value: // устанавливаем модельки игроков согласно выбору
    function setPlayersModels() {
      this.updatePlayersModels.notify(this.playersInfo.playerOneClass, this.playersInfo.playerTwoClass);
    }
  }, {
    key: "setTextChooseInfo",
    value: // показываем какой игрок выбирает карты
    function setTextChooseInfo() {
      if (this.playerOneTurn) {
        this.choosePlayerInfo.notify("".concat(this.playersInfo.playerOneName, " is choosing"));
      } else {
        this.choosePlayerInfo.notify("".concat(this.playersInfo.playerTwoName, " is choosing"));
      }
    }
  }, {
    key: "setTextTurnInfo",
    value: function setTextTurnInfo() {
      if (this.playerOneTurn) {
        this.endTurnAnimation.notify('left', "".concat(this.playersInfo.playerOneName, "'s Turn"));
      } else {
        this.endTurnAnimation.notify('right', "".concat(this.playersInfo.playerTwoName, "'s Turn"));
      }
    }
  }, {
    key: "setActivePassivePlayer",
    value: // линкуем player1 & player2 в gamemodel
    function setActivePassivePlayer() {
      if (this.playerOneTurn) {
        this.activePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player1;
        this.passivePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player2;
      } else {
        this.activePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player2;
        this.passivePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player1;
      }
    }
  }, {
    key: "definePlayersCardSet",
    value: // пулим карты выбранные ироком на старте игры в gameControl, этими картами игроки будут играть дальше
    function definePlayersCardSet() {
      var cards = document.querySelectorAll('.cards'); //счетчик выбранных карт

      var counter = document.getElementsByClassName('card-to-select').length; // если выбрано больше или недобор указанных карт запрещает пулить в переменную

      if (counter < 8 || counter >= 9) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.confirm-failed-audio');
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_3__.shakeAnimation)('.players-draw-info__accept', 'horizontal');
        return;
      }

      var tempCardChoosePlayer = []; //пушим карты 1го игрока в массив

      if (this.playerOneTurn) {
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].classList.contains('card-to-select')) {
            tempCardChoosePlayer.push(cards[i].dataset.info);
          }
        }

        this.playerOnePullOfCards = this.checkOnSelectedCards(tempCardChoosePlayer, this.playerOneClass);
      } //пушим карты 2го игрока в массив


      if (this.playerTwoTurn) {
        for (var _i = 0; _i < cards.length; _i++) {
          if (cards[_i].classList.contains('card-to-select')) {
            tempCardChoosePlayer.push(cards[_i].dataset.info);
          }
        }

        this.playerTwoPullOfCards = this.checkOnSelectedCards(tempCardChoosePlayer, this.playerTwoClass);
      }

      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.confirm-audio'); //меняем очередность выбора для игроков

      this.setTurnPriority();
      this.checkCardsSelectionEnd();
    }
  }, {
    key: "checkOnSelectedCards",
    value: // передаем массив из выбранных согласно ID карты и класс выбранного персонажа для поиска в SkillCollection его типа карт
    function checkOnSelectedCards(datainfo, search) {
      var temp = [];

      for (var i = 0; i < _cards__WEBPACK_IMPORTED_MODULE_1__.skillCollection[search].length; i++) {
        for (var j = 0; j < datainfo.length; j++) {
          if (_cards__WEBPACK_IMPORTED_MODULE_1__.skillCollection[search][i]['id'] == datainfo[j]) {
            temp.push(_cards__WEBPACK_IMPORTED_MODULE_1__.skillCollection[search][i]);
          }
        }
      }

      return temp;
    }
  }, {
    key: "checkCardsSelectionEnd",
    value: //проверяем игроки набрали карты скрываем меню выбора карт, открываем игровое поле
    function checkCardsSelectionEnd() {
      var counter = document.getElementsByClassName('card-to-select').length; // если выбрано больше или недобор указанных карт запрещает пулить в переменную

      if (counter < 8 || counter >= 9) {
        return;
      }

      if (this.playerOnePullOfCards.length > 1 && this.playerTwoPullOfCards.length > 1) {
        this.selectionEnd.notify();
        this.setTextTurnInfo();
      } else {
        this.selectionContinue.notify();
        this.setTextChooseInfo();
      }
    }
  }, {
    key: "initActionCard",
    value: //узнаем какая карта была взята для игры и сыграна
    function initActionCard(eventTarget) {
      var _this = this;

      this.dragCard = eventTarget;

      if (this.playerOneTurn) {
        this.tempCard = this.playerOnePullOfCards.find(function (element) {
          return element.id == _this.dragCard.dataset.info;
        });
      } else {
        this.tempCard = this.playerTwoPullOfCards.find(function (element) {
          return element.id == _this.dragCard.dataset.info;
        });
      }
    }
  }, {
    key: "turnEndsNextPlayerTurn",
    value: //конец хода меняет инфо о активном игроке и обновляет выносливость
    function turnEndsNextPlayerTurn() {
      if (this.playerOneTurn) {
        this.playerOneTurn = false;
        this.playerTwoTurn = true;
        this.activePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player2;
        this.passivePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player1;
      } else {
        this.playerOneTurn = true;
        this.playerTwoTurn = false;
        this.activePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player1;
        this.passivePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player2;
      }
    }
  }, {
    key: "setTurnPriority",
    value: // устанавливаем приоритет хода игрока
    function setTurnPriority() {
      if (this.playerOneTurn) {
        this.playerOneTurn = false;
        this.playerTwoTurn = true;
      } else {
        this.playerOneTurn = true;
        this.playerTwoTurn = false;
      }
    }
  }, {
    key: "saveGameData",
    value: function saveGameData() {
      var info = {
        playerOneTurn: this.playerOneTurn,
        playerTwoTurn: this.playerTwoTurn,
        playerOnePullOfCards: this.playerOnePullOfCards.map(function (element) {
          return element.id;
        }),
        playerTwoPullOfCards: this.playerTwoPullOfCards.map(function (element) {
          return element.id;
        }),
        activePlayerCardsHand: this.saveActivePlayerCardsHand(),
        player1: _game__WEBPACK_IMPORTED_MODULE_2__.player1.savePlayerData(),
        player2: _game__WEBPACK_IMPORTED_MODULE_2__.player2.savePlayerData()
      };
      console.log(info);
      localStorage.setItem('gameData', JSON.stringify(info));
    }
  }, {
    key: "saveActivePlayerCardsHand",
    value: function saveActivePlayerCardsHand() {
      var cardInfo = document.querySelector('.card-in-hand-field');

      var cardID = _toConsumableArray(cardInfo.children).map(function (element) {
        return element.dataset.info;
      });

      return cardID;
    }
  }, {
    key: "doRestoreGameData",
    value: function doRestoreGameData() {
      var temp = localStorage.getItem('gameData');
      var tempData = JSON.parse(temp);
      var overlay = document.querySelector('.players-overlay');
      var overlayClose = document.querySelector('.players-overlay__close');
      var divEl = document.querySelector('.confirm-continue');
      var activePlayerHand;
      this.playerOneTurn = tempData.playerOneTurn;
      this.playerTwoTurn = tempData.playerTwoTurn;
      this.playerOnePullOfCards = this.checkOnSelectedCards(tempData.playerOnePullOfCards, this.playerOneClass);
      this.playerTwoPullOfCards = this.checkOnSelectedCards(tempData.playerTwoPullOfCards, this.playerTwoClass);

      if (this.playerOneTurn) {
        activePlayerHand = this.checkOnSelectedCards(tempData.activePlayerCardsHand, this.playerOneClass);
      } else {
        activePlayerHand = this.checkOnSelectedCards(tempData.activePlayerCardsHand, this.playerTwoClass);
      }

      this.setActivePassivePlayer();
      this.setTextTurnInfo();
      _game__WEBPACK_IMPORTED_MODULE_2__.player1.doRestorePlayerData('player1');
      _game__WEBPACK_IMPORTED_MODULE_2__.player2.doRestorePlayerData('player2');
      this.selectionEnd.notify(activePlayerHand);
      overlay.removeChild(divEl);
      overlay.classList.add('hidden');
      overlayClose.classList.remove('hidden');
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./js/modules/observerModel.js":
/*!*************************************!*\
  !*** ./js/modules/observerModel.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "endGame": function() { return /* binding */ endGame; },
/* harmony export */   "allowSaveConcede": function() { return /* binding */ allowSaveConcede; },
/* harmony export */   "warningUnload": function() { return /* binding */ warningUnload; },
/* harmony export */   "forbidClick": function() { return /* binding */ forbidClick; }
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game */ "./js/game.js");
/* harmony import */ var _animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation_and_sound_effects/animation */ "./js/animation_and_sound_effects/animation.js");



var endGame = function endGame(mutations) {
  if (mutations[0]['target'].classList.contains('player-1__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
    _game__WEBPACK_IMPORTED_MODULE_0__.boardView.playersTurnInfo.textContent = "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.gameObserver.playersInfo.playerTwoName, " is a winner");
    _game__WEBPACK_IMPORTED_MODULE_0__.boardView.playersTurnInfo.classList.add('win-info-animation');
    hideInterfaceElements();
    proposePlayAgain();
    forbidSaveConcede();
  }

  if (mutations[0]['target'].classList.contains('player-2__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
    _game__WEBPACK_IMPORTED_MODULE_0__.boardView.playersTurnInfo.textContent = "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.gameObserver.playersInfo.playerOneName, " is a winner");
    _game__WEBPACK_IMPORTED_MODULE_0__.boardView.playersTurnInfo.classList.add('win-info-animation');
    hideInterfaceElements();
    proposePlayAgain();
    forbidSaveConcede();
  }
};

var allowSaveConcede = function allowSaveConcede() {
  document.querySelector('.save-progress').removeEventListener('click', forbidClick);
  document.querySelector('.concede').removeEventListener('click', forbidClick);
  document.querySelector('.save-progress').classList.add('save-progress-allow');
  document.querySelector('.concede').classList.add('concede-allow');
};

var forbidSaveConcede = function forbidSaveConcede() {
  document.querySelector('.save-progress').addEventListener('click', forbidClick);
  document.querySelector('.concede').addEventListener('click', forbidClick);
  document.querySelector('.save-progress').classList.remove('save-progress-allow');
  document.querySelector('.concede').classList.remove('concede-allow');
};

var hideInterfaceElements = function hideInterfaceElements() {
  _game__WEBPACK_IMPORTED_MODULE_0__.boardView.cardInHandField.classList.add('hidden');
  _game__WEBPACK_IMPORTED_MODULE_0__.boardView.endTurnBtn.classList.add('hidden');
  document.querySelector('.background-music-battlefield').pause();
  (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.victory-audio');
  localStorage.removeItem('gameData');
};

var proposePlayAgain = function proposePlayAgain() {
  var divEl = document.createElement('div');
  divEl.className = 'play-again';
  divEl.textContent = 'Do you want to play one more battle?';
  var choiceYes = document.createElement('button');
  choiceYes.className = 'play-again__accept';
  choiceYes.textContent = 'Yes';
  var choiceNo = document.createElement('button');
  choiceNo.className = 'play-again__reject';
  choiceNo.textContent = 'No';
  divEl.appendChild(choiceYes);
  divEl.appendChild(choiceNo);
  _game__WEBPACK_IMPORTED_MODULE_0__.boardView.boardSelector.appendChild(divEl);
  choiceYes.addEventListener('click', function () {
    window.removeEventListener('beforeunload', warningUnload);
    window.location.reload();
  });
  choiceNo.addEventListener('click', function () {
    window.removeEventListener('beforeunload', warningUnload);
    _game__WEBPACK_IMPORTED_MODULE_0__.boardView.playersTurnInfo.display = 'none';
    divEl.style.display = 'none';
    document.title = 'Main menu';
    location.hash = decodeURIComponent('main-menu');
  });
};

var warningUnload = function warningUnload(event) {
  event.preventDefault();
  event.returnValue = '';
};

var forbidClick = function forbidClick(event) {
  return event.stopPropagation();
};



/***/ }),

/***/ "./js/modules/playerController.js":
/*!****************************************!*\
  !*** ./js/modules/playerController.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PlayersController; }
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game */ "./js/game.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var PlayersController = /*#__PURE__*/function () {
  function PlayersController(playerOneModel, playerTwoModel, boardView, playerView) {
    var _this = this;

    _classCallCheck(this, PlayersController);

    this.playerOneModel = playerOneModel;
    this.playerTwoModel = playerTwoModel;
    this.boardView = boardView;
    this.playersView = playerView;

    if (this.boardView.hasOwnProperty('doCardAction')) {
      this.boardView.doCardAction.attach(function (priority) {
        return _this.playCard(priority);
      });
    }

    if (this.boardView.hasOwnProperty('endTurn')) {
      this.boardView.endTurn.attach(function () {
        return _this.doEndTurn();
      });
    }

    if (this.playersView.hasOwnProperty('updateInitialValue')) {
      this.playersView.updateInitialValue.attach(function () {
        return _this.updateInitialValue();
      });
    }

    if (this.boardView.hasOwnProperty('saveGameProgres')) {
      this.boardView.saveGameProgres.attach(function () {
        return _this.onSavePlayerData();
      });
    }

    if (this.boardView.hasOwnProperty('onConcede')) {
      this.boardView.onConcede.attach(function (player) {
        return _this.doConcede(player);
      });
    }
  }

  _createClass(PlayersController, [{
    key: "playCard",
    value: function playCard(priority) {
      if (priority) {
        this.playerOneModel.doAction();
      } else {
        this.playerTwoModel.doAction();
      }
    }
  }, {
    key: "doEndTurn",
    value: function doEndTurn() {
      this.playerOneModel.endTurn();
      this.playerOneModel.updateInitialValues();
      this.playerTwoModel.updateInitialValues();
    }
  }, {
    key: "updateInitialValue",
    value: function updateInitialValue() {
      this.playerOneModel.updateInitialValues();
      this.playerTwoModel.updateInitialValues();
    }
  }, {
    key: "onSavePlayerData",
    value: function onSavePlayerData() {
      this.playerOneModel.savePlayerData();
      this.playerTwoModel.savePlayerData();
    }
  }, {
    key: "doConcede",
    value: function doConcede(player) {
      if (player === 'player1') {
        _game__WEBPACK_IMPORTED_MODULE_0__.player1.concede();
      } else {
        _game__WEBPACK_IMPORTED_MODULE_0__.player2.concede();
      }
    }
  }]);

  return PlayersController;
}();



/***/ }),

/***/ "./js/modules/playerModel.js":
/*!***********************************!*\
  !*** ./js/modules/playerModel.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Players; }
/* harmony export */ });
/* harmony import */ var _eventsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsModel */ "./js/modules/eventsModel.js");
/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation_and_sound_effects/animation.js */ "./js/animation_and_sound_effects/animation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Players = /*#__PURE__*/function () {
  function Players(game, board) {
    _classCallCheck(this, Players);

    this.healthPoints = 100;
    this.staminaPoints = 4;
    this.defendPoints = 7;
    this.gameModel = game;
    this.boardModel = board;
    this.playerViewUpdate = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.cardDraw = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.cardDiscard = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.actionAnimation = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.initialHP = 100;
    this.initialDP = 7;
  }

  _createClass(Players, [{
    key: "endTurn",
    value: function endTurn() {
      this.gameModel.activePlayer.staminaPoints = 4;
      this.gameModel.passivePlayer.staminaPoints = 4;
      this.updateView();
    }
  }, {
    key: "updateView",
    value: function updateView(state) {
      if (state) {
        this.playerViewUpdate.notify('concede');
      } else {
        this.playerViewUpdate.notify();
      }
    }
  }, {
    key: "updateInitialValues",
    value: function updateInitialValues() {
      this.initialHP = this.healthPoints;
      this.initialDP = this.defendPoints;
    }
  }, {
    key: "doAction",
    value: function doAction() {
      if (this.gameModel.activePlayer.staminaPoints < this.gameModel.tempCard.cost) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.card-grab-cancel-audio');
        this.gameModel.playerOneTurn ? (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.notEnoughStaminaAnimation)('player1') : (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.notEnoughStaminaAnimation)();
        return;
      }

      switch (this.gameModel.tempCard.type) {
        case 'attack':
          this.standartAttack(this.gameModel.tempCard);
          break;

        case 'attackDrawDiscard':
          this.attackDrawDiscard(this.gameModel.tempCard);
          break;

        case 'attackAddEffect':
          this.sideEffectAttack(this.gameModel.tempCard);
          break;

        case 'defend':
          this.standartDefend(this.gameModel.tempCard);
          break;

        case 'defendAddEffect':
          this.sideEffectDefend(this.gameModel.tempCard);
          break;

        case 'defendDrawDiscard':
          this.defendDrawDiscard(this.gameModel.tempCard);
          break;

        case 'defendAndAttack':
          this.defendWithAttack(this.gameModel.tempCard);
          break;
      }
    }
  }, {
    key: "randomCardDraw",
    value: function randomCardDraw() {
      var randomCardDraw = Math.floor(Math.random() * this.gameModel.playerOnePullOfCards.length);

      if (this.gameModel.playerOneTurn) {
        this.cardDraw.notify(this.gameModel.playerOnePullOfCards[randomCardDraw]);
      } else {
        this.cardDraw.notify(this.gameModel.playerTwoPullOfCards[randomCardDraw]);
      }

      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.createCardAnimation)('.card-in-hand-field', 'single');
    }
  }, {
    key: "massiveRandomDraw",
    value: function massiveRandomDraw(card, condition) {
      var tempIndex = []; //делаем проверку чтобы карты в руке не повторялись

      for (var i = 0; i < card.effect - condition; i++) {
        // количество карт в руку
        var n = Math.floor(Math.random() * 8); // количество набранных карт

        if (tempIndex.indexOf(n) === -1) {
          tempIndex.push(n);
        } else {
          i--;
        }
      }

      if (this.gameModel.playerOneTurn) {
        for (var _i = 0; _i < tempIndex.length; _i++) {
          this.cardDraw.notify(this.gameModel.playerOnePullOfCards[tempIndex[_i]]);
        }
      } else {
        for (var _i2 = 0; _i2 < tempIndex.length; _i2++) {
          this.cardDraw.notify(this.gameModel.playerTwoPullOfCards[tempIndex[_i2]]);
        }
      }

      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.createCardAnimation)('.card-in-hand-field', 'single');
    }
  }, {
    key: "randomCardDiscard",
    value: function randomCardDiscard() {
      var _this = this;

      var randomDiscard = Math.floor(Math.random() * this.boardModel.cardInHand.children.length); //it will be error if you use DaggerThrow as the last card in hand so w check on this

      if (this.boardModel.cardInHand.children.length > 0) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.discardCardAnimation)(this.boardModel.cardInHand.children[randomDiscard]);
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.discard-card-audio');
        setTimeout(function () {
          return _this.cardDiscard.notify(_this.boardModel.cardInHand.children[randomDiscard]);
        }, 300);
      }
    }
  }, {
    key: "cardRemove",
    value: function cardRemove(element) {
      //it will be error if you use DaggerThrow as the last card in hand so w check on this
      if (this.boardModel.cardInHand.children.length > 0) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.discardCardAnimation)(element);
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.discard-card-audio');
        this.cardDiscard.notify(element);
      }
    }
  }, {
    key: "standartAttack",
    value: function standartAttack(card) {
      if (this.gameModel.passivePlayer.defendPoints) {
        var test = this.gameModel.passivePlayer.defendPoints - card.effect;

        if (test < 0) {
          this.gameModel.passivePlayer.defendPoints = 0;
          test = Math.abs(test);
          this.gameModel.passivePlayer.healthPoints -= test;
        } else {
          this.gameModel.passivePlayer.defendPoints = test;
        }
      } else {
        this.gameModel.passivePlayer.healthPoints -= card.effect;
      }

      this.gameModel.activePlayer.staminaPoints -= card.cost;
      this.actionAnimation.notify();
    }
  }, {
    key: "sideEffectAttack",
    value: function sideEffectAttack(card) {
      // some of cards have special side effects, so we do additional if check
      // to make for them special methods
      if (card.name == 'riddleWithHoles') {
        this.gameModel.passivePlayer.healthPoints -= card.effect;
        this.gameModel.activePlayer.staminaPoints -= card.cost;
        this.actionAnimation.notify();
        return;
      }

      if (card.name == 'judgment') {
        var sideEffect = card.sideEffect();

        if (sideEffect == undefined) {
          this.actionAnimation.notify();
          return;
        }

        this.gameModel.passivePlayer.healthPoints = sideEffect;
        this.actionAnimation.notify();
        return;
      } // some of cards havee common side effect so we can group it in one method


      if (card.sideEffect) {
        var _sideEffect = card.sideEffect();

        if (this.gameModel.passivePlayer.defendPoints) {
          var test = this.gameModel.passivePlayer.defendPoints - _sideEffect;

          if (test < 0) {
            this.gameModel.passivePlayer.defendPoints = 0;
            test = Math.abs(test);
            this.gameModel.passivePlayer.healthPoints -= test;
          } else {
            this.gameModel.passivePlayer.defendPoints = test;
          }
        } else {
          if (_sideEffect) {
            this.gameModel.passivePlayer.healthPoints -= _sideEffect;
          } else {
            this.gameModel.passivePlayer.healthPoints -= card.effect;
          }
        }
      }

      this.gameModel.activePlayer.staminaPoints -= card.cost;
      this.actionAnimation.notify();
    }
  }, {
    key: "attackDrawDiscard",
    value: function attackDrawDiscard(card) {
      var _this2 = this;

      // some of cards have special side effect, so we do additional if check
      // to make for them special methods
      // if (this.gameModel.activePlayer.staminaPoints < card.cost) {
      // 	return;
      // }
      if (this.gameModel.passivePlayer.defendPoints) {
        var test = this.gameModel.passivePlayer.defendPoints - card.effect;

        if (test < 0) {
          this.gameModel.passivePlayer.defendPoints = 0;
          test = Math.abs(test);
          this.gameModel.passivePlayer.healthPoints -= test;
        } else {
          this.gameModel.passivePlayer.defendPoints = test;
        }
      } else {
        this.gameModel.passivePlayer.healthPoints -= card.effect;
      }

      if (card.name == 'daggerThrow') {
        setTimeout(function () {
          return _this2.randomCardDiscard();
        }, 300);
        setTimeout(function () {
          return _this2.randomCardDraw();
        }, 800);
      }

      if (card.name == 'quickSlash') {
        this.randomCardDraw();
      }

      if (card.name == 'cutThroughFate') {
        var sideEffect = card.sideEffect();
        this.gameModel.activePlayer.defendPoints += sideEffect;
        setTimeout(function () {
          return _this2.randomCardDraw();
        }, 600);
      }

      this.gameModel.activePlayer.staminaPoints -= card.cost;
      this.actionAnimation.notify();
    }
  }, {
    key: "standartDefend",
    value: function standartDefend(card) {
      this.gameModel.activePlayer.defendPoints += card.effect;
      this.gameModel.activePlayer.staminaPoints -= card.cost;
      this.actionAnimation.notify();
    }
  }, {
    key: "sideEffectDefend",
    value: function sideEffectDefend(card) {
      if (card.name == 'nirvana') {
        var sideEffect = card.sideEffect();
        this.gameModel.activePlayer.defendPoints = sideEffect;
        this.gameModel.activePlayer.staminaPoints -= card.cost;
        this.actionAnimation.notify();
        return;
      }

      if (card.name == 'meditate') {
        var test = this.gameModel.activePlayer.staminaPoints - card.cost + card.effect;

        if (test > 4) {
          this.gameModel.activePlayer.staminaPoints -= card.cost;
          this.gameModel.activePlayer.staminaPoints = 4;
        } else {
          this.gameModel.activePlayer.staminaPoints -= card.cost;
          this.gameModel.activePlayer.staminaPoints += card.effect;
        }

        this.actionAnimation.notify();
        return;
      }

      if (card.sideEffect) {
        var _sideEffect2 = card.sideEffect();

        this.gameModel.activePlayer.defendPoints += _sideEffect2;
        this.gameModel.activePlayer.staminaPoints -= card.cost;
        this.actionAnimation.notify();
      }
    }
  }, {
    key: "defendWithAttack",
    value: function defendWithAttack(card) {
      if (this.gameModel.passivePlayer.defendPoints) {
        var test = this.gameModel.passivePlayer.defendPoints - card.effect;

        if (test < 0) {
          this.gameModel.passivePlayer.defendPoints = 0;
          test = Math.abs(test);
          this.gameModel.passivePlayer.healthPoints -= test;
        } else {
          this.gameModel.passivePlayer.defendPoints = test;
        }
      } else {
        this.gameModel.passivePlayer.healthPoints -= card.effect;
      }

      this.gameModel.activePlayer.defendPoints += card.effect;
      this.gameModel.activePlayer.staminaPoints -= card.cost;
      this.actionAnimation.notify();
    }
  }, {
    key: "defendDrawDiscard",
    value: function defendDrawDiscard(card) {
      var _this3 = this;

      // some of cards have special side effect, so we do additional if check
      // to make for them special methods
      // if (this.gameModel.activePlayer.staminaPoints < card.cost) {
      // 	return;
      // }
      if (card.name == 'prepared') {
        this.randomCardDiscard();
        setTimeout(function () {
          return _this3.randomCardDraw();
        }, 300);
        return;
      }

      if (card.name == 'warcry') {
        this.randomCardDraw();
        this.actionAnimation.notify();
        return;
      }

      if (card.name == 'survivor') {
        setTimeout(function () {
          return _this3.randomCardDiscard();
        }, 300);
        this.gameModel.activePlayer.defendPoints += card.effect;
      }

      if (card.name == 'bloodletting') {
        this.randomCardDraw();
        this.gameModel.activePlayer.healthPoints -= card.effect;
        this.actionAnimation.notify();
        return;
      }

      if (card.name == 'expertise') {
        this.massiveRandomDraw(card, this.boardModel.cardInHand.children.length);
      }

      if (card.name == 'alpha') {
        // убираем лишние карты из руки
        for (var i = 0; i < this.boardModel.cardInHand.children.length; i++) {
          if (this.boardModel.cardInHand.children[i].classList.contains('cards')) {
            this.cardRemove(this.boardModel.cardInHand.children[i]);
            i--;
          }
        }

        this.massiveRandomDraw(card, 0);
      }

      if (card.name == 'backFlip') {
        var sideEffect = card.sideEffect();
        this.gameModel.activePlayer.defendPoints += sideEffect;
        setTimeout(function () {
          return _this3.massiveRandomDraw(card, 0);
        }, 300);
      }

      if (card.name == 'thirdEye') {
        this.gameModel.activePlayer.defendPoints += card.effect;
        this.randomCardDraw();
      }

      this.gameModel.activePlayer.staminaPoints -= card.cost;
      this.actionAnimation.notify();
    }
  }, {
    key: "savePlayerData",
    value: function savePlayerData() {
      return {
        healthPoints: this.healthPoints,
        staminaPoints: this.staminaPoints,
        defendPoints: this.defendPoints,
        initialHP: this.initialHP,
        initialDP: this.initialDP
      };
    }
  }, {
    key: "doRestorePlayerData",
    value: function doRestorePlayerData(player) {
      var temp = localStorage.getItem('gameData');
      var tempData = JSON.parse(temp);
      this.healthPoints = tempData[player].healthPoints;
      this.staminaPoints = tempData[player].staminaPoints;
      this.defendPoints = tempData[player].defendPoints;
      this.initialHP = tempData[player].initialHP;
      this.initialDP = tempData[player].initialDP;
    }
  }, {
    key: "concede",
    value: function concede() {
      this.healthPoints = 0;
      this.updateView('concede');
    }
  }]);

  return Players;
}();



/***/ }),

/***/ "./js/modules/playerView.js":
/*!**********************************!*\
  !*** ./js/modules/playerView.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PlayersView; }
/* harmony export */ });
/* harmony import */ var _eventsModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsModel */ "./js/modules/eventsModel.js");
/* harmony import */ var _animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation_and_sound_effects/animation */ "./js/animation_and_sound_effects/animation.js");
/* harmony import */ var _preloadImages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./preloadImages */ "./js/modules/preloadImages.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var PlayersView = /*#__PURE__*/function () {
  function PlayersView(playerOneModel, playerTwoModel, gameModel, container) {
    var _this = this;

    _classCallCheck(this, PlayersView);

    this.playerOneModel = playerOneModel;
    this.playerTwoModel = playerTwoModel;
    this.gameModel = gameModel;
    var playerContainer = container;
    this.updateInitialValue = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.playerOneHPValue = playerContainer.querySelector('.player-1__hp-value');
    this.playerOneDefenceValue = playerContainer.querySelector('.player-1__defence-value');
    this.playerOneStaminaValue = playerContainer.querySelector('.player-1__stamina-value');
    this.playerOneHP = playerContainer.querySelector('.player-1__hp-bar-inner');
    this.playerTwoHPValue = playerContainer.querySelector('.player-2__hp-value');
    this.playerTwoDefenceValue = playerContainer.querySelector('.player-2__defence-value');
    this.playerTwoStaminaValue = playerContainer.querySelector('.player-2__stamina-value');
    this.playerTwoHP = playerContainer.querySelector('.player-2__hp-bar-inner');
    this.playerOneModel.playerViewUpdate.attach(function (state) {
      if (state) {
        _this.updateViewHP();
      } else {
        _this.updateViewStamina();
      }
    });
    this.playerTwoModel.playerViewUpdate.attach(function (state) {
      if (state) {
        _this.updateViewHP();
      } else {
        _this.updateViewStamina();
      }
    });
    this.playerOneModel.actionAnimation.attach(function () {
      return _this.doAnimation();
    });
    this.playerTwoModel.actionAnimation.attach(function () {
      return _this.doAnimation();
    });
    this.gameModel.selectionEnd.attach(function () {
      _this.updateViewHP();

      _this.updateViewDef();

      _this.updateViewStamina();
    });
  } // устанавливаем первые параметры здоровье, защита, стамина


  _createClass(PlayersView, [{
    key: "updateViewHP",
    value: function updateViewHP() {
      this.playerOneHPValue.textContent = this.playerOneModel.healthPoints;
      this.playerOneHP.style.width = this.playerOneModel.healthPoints + '%';
      this.playerTwoHPValue.textContent = this.playerTwoModel.healthPoints;
      this.playerTwoHP.style.width = this.playerTwoModel.healthPoints + '%';
    }
  }, {
    key: "updateViewDef",
    value: function updateViewDef() {
      var _this2 = this;

      this.playerOneDefenceValue.textContent = this.playerOneModel.defendPoints;
      this.playerTwoDefenceValue.textContent = this.playerTwoModel.defendPoints;
      this.playerOneDefenceValue.classList.remove('defend-value-negative-animation');
      this.playerOneDefenceValue.classList.remove('defend-value-positive-animation');
      this.playerTwoDefenceValue.classList.remove('defend-value-negative-animation');
      this.playerTwoDefenceValue.classList.remove('defend-value-positive-animation');

      if (this.playerOneModel.initialDP > this.playerOneModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerOneDefenceValue.className = 'player-1__defence-value defend-value-negative-animation';
        }, 0);
      }

      if (this.playerOneModel.initialDP < this.playerOneModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerOneDefenceValue.className = 'player-1__defence-value defend-value-positive-animation';
        }, 0);
      }

      if (this.playerTwoModel.initialDP > this.playerTwoModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerTwoDefenceValue.className = 'player-2__defence-value defend-value-negative-animation';
        }, 0);
      }

      if (this.playerTwoModel.initialDP < this.playerTwoModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerTwoDefenceValue.className = 'player-2__defence-value defend-value-positive-animation';
        }, 0);
      }
    }
  }, {
    key: "updateViewStamina",
    value: function updateViewStamina() {
      this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;
      this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
    }
  }, {
    key: "updateDamageNumbers",
    value: function updateDamageNumbers(passivePlayerUI) {
      var calcDP = this.gameModel.passivePlayer.initialDP - this.gameModel.passivePlayer.defendPoints;
      var calcHP = this.gameModel.passivePlayer.initialHP - this.gameModel.passivePlayer.healthPoints;

      if (calcDP <= 0) {
        calcDP = 0;
      }

      var resultContent = calcHP + calcDP;
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.damageNumbersAnimation)(passivePlayerUI, 'damage-number-animation', resultContent);
    }
  }, {
    key: "doAnimation",
    value: function doAnimation() {
      var _this3 = this;

      var activePlayerUI;
      var passivePlayerUI;
      var direction;

      if (this.gameModel.playerOneTurn) {
        activePlayerUI = '.player-1__model';
        passivePlayerUI = '.player-2__model';
        direction = 'right';
      } else {
        activePlayerUI = '.player-2__model';
        passivePlayerUI = '.player-1__model';
        direction = 'left';
      }

      switch (this.gameModel.tempCard.name) {
        case 'strike_w':
        case 'bash':
        case 'strike_r':
        case 'quickSlash':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackAnimation)(passivePlayerUI, 'attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.warriorAttack);
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.strike-attack-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'defend_w':
        case 'armaments':
        case 'entrench':
        case 'deflect':
        case 'backFlip':
        case 'defend_m':
        case 'nirvana':
        case 'masterReality':
        case 'thirdEye':
        case 'survivor':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.blockAnimation)(activePlayerUI, 'shield-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.defend);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.defend-audio');
          this.updateViewDef();
          this.updateViewStamina();
          this.updateInitialValue.notify();
          break;

        case 'bodySlam':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackAnimation)(passivePlayerUI, 'smash-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.smash);
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.bash-attack-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'slice':
        case 'strike_m':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackAnimation)(passivePlayerUI, 'smash-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.smash);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.mage-punch-audio');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'daggerThrow':
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackAnimation)(passivePlayerUI, 'smash-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.smash);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.bash-attack-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'anger':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.standardAttackAnimation)(passivePlayerUI, 'anger-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.anger);
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.anger-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'reachHeaven':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.standardAttackAnimation)(passivePlayerUI, 'anger-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.reachHeaven);
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.mage-strong-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'ironWave':
        case 'dash':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.blockAnimation)(activePlayerUI, 'shield-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.defend);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.defend-audio');
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.standardAttackAnimation)(passivePlayerUI, 'anger-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.anger);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.bash-attack-audio');

            _this3.updateViewHP();

            _this3.updateViewDef();

            _this3.updateViewStamina();

            _this3.updateDamageNumbers(passivePlayerUI);

            _this3.updateInitialValue.notify();
          }, 400);
          break;

        case 'bloodletting':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.standardAttackAnimation)(activePlayerUI, 'shield-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.bloodletting);
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(activePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.bloodletting-audio');
          }, 200);
          this.updateViewHP();
          this.updateInitialValue.notify();
          break;

        case 'warcry':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(activePlayerUI);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.warcry-audio');
          this.updateViewStamina();
          break;

        case 'meditate':
        case 'alpha':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.blockAnimation)(activePlayerUI, 'refresh-skill-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.refreshStamina);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.meditate-audio');
          this.updateViewStamina();
          break;

        case 'cutThroughFate':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.blockAnimation)(activePlayerUI, 'shield-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.defend);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.defend-audio');
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.standardAttackAnimation)(passivePlayerUI, 'anger-attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.mageEffect);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.mage-attack-audio');

            _this3.updateViewHP();

            _this3.updateViewDef();

            _this3.updateInitialValue.notify();
          }, 400);
          break;

        case 'perfectedStrike':
        case 'tantrum':
        case 'flechettes':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.multipleAttackAnimation)(passivePlayerUI, 'attack-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.warriorAttack, 3);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.shakeAnimation)(passivePlayerUI);
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'expertise':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.blockAnimation)(activePlayerUI, 'refresh-skill-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.serpentRing);
          this.updateViewStamina();
          break;

        case 'bludgeon':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.warcry-audio');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.ultimateSkillAnimation)(passivePlayerUI, 'warrior-ultimate-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.flash, '.flash-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'riddleWithHoles':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.ultimateSkillAnimation)(passivePlayerUI, 'rogue-ultimate-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.daggersSvg, '.backstab-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'signatureMove':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.ultimateSkillAnimation)(passivePlayerUI, 'mage-ultimate-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.mageAttack, '.mage-ultimate-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;

        case 'judgment':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.attackInDirectionAnimation)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.ultimateSkillAnimation)(passivePlayerUI, 'rogue-ultimate-animation', _preloadImages__WEBPACK_IMPORTED_MODULE_2__.animationCollectionImages.judgmentSvg, '.judj-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          this.updateDamageNumbers(passivePlayerUI);
          this.updateInitialValue.notify();
          break;
      }
    }
  }]);

  return PlayersView;
}();



/***/ }),

/***/ "./js/modules/preloadImages.js":
/*!*************************************!*\
  !*** ./js/modules/preloadImages.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "skillCollectionImages": function() { return /* binding */ skillCollectionImages; },
/* harmony export */   "animationCollectionImages": function() { return /* binding */ animationCollectionImages; }
/* harmony export */ });
var preloadSkillImages = function preloadSkillImages(object) {
  var tempObeject = {};

  for (var key in object) {
    var regex = /(svg)$/ig;

    if (regex.test(key)) {
      var temp = document.createElement('object');
      temp.data = object[key];
      tempObeject[key] = temp;
    } else {
      var img = new Image();
      img.src = object[key];
      tempObeject[key] = img;
    }
  }

  return tempObeject;
};

var skillCollectionLinks = {
  warrior: {
    strike_w: './images/cards/warrior/strike.png',
    bash: './images/cards/warrior/bash.png',
    anger: './images/cards/warrior/anger.png',
    bodySlam: './images/cards/warrior/bodySlam.png',
    perfectedStrike: './images/cards/warrior/perfectedStrike.png',
    bludgeon: './images/cards/warrior/bludgeon.png',
    defend_w: './images/cards/warrior/defend_w.png',
    armaments: './images/cards/warrior/armaments.png',
    ironWave: './images/cards/warrior/ironWave.png',
    warcry: './images/cards/warrior/warcry.png',
    bloodletting: './images/cards/warrior/bloodletting.png',
    entrench: './images/cards/warrior/entrench.png'
  },
  rogue: {
    strike_r: './images/cards/rogue/strike_G.png',
    daggerThrow: './images/cards/rogue/r_dagger-throw.png',
    flechettes: './images/cards/rogue/flechettes.png',
    riddleWithHoles: './images/cards/rogue/riddleWithHoles.png',
    slice: './images/cards/rogue/slice.png',
    quickSlash: './images/cards/rogue/quickSlash.png',
    survivor: './images/cards/rogue/survivor.png',
    deflect: './images/cards/rogue/deflect.png',
    backFlip: './images/cards/rogue/backFlip.png',
    prepared: './images/cards/rogue/prepared.png',
    expertise: './images/cards/rogue/expertise.png',
    dash: './images/cards/rogue/dash.png'
  },
  mage: {
    strike_m: './images/cards/mage/strike_P.png',
    cutThroughFate: './images/cards/mage/cutThroughFate.png',
    reachHeaven: './images/cards/mage/reachHeaven.png',
    signatureMove: './images/cards/mage/signatureMove.png',
    tantrum: './images/cards/mage/tantrum.png',
    judgment: './images/cards/mage/judgment.png',
    masterReality: './images/cards/mage/masterReality.png',
    defend_m: './images/cards/mage/defend_P.png',
    meditate: './images/cards/mage/meditate.png',
    thirdEye: './images/cards/mage/thirdEye.png',
    nirvana: './images/cards/mage/nirvana.png',
    alpha: './images/cards/mage/alpha.png'
  }
};
var animationCollectionLinks = {
  anger: './images/attack-effects/anger.png',
  bloodletting: './images/attack-effects/bloodletting.png',
  daggersSvg: './images/attack-effects/daggers.svg',
  flash: './images/attack-effects/flash.png',
  judgmentSvg: './images/attack-effects/judgment.svg',
  mageAttack: './images/attack-effects/mage-attack.png',
  mageEffect: './images/attack-effects/mage-effect.png',
  reachHeaven: './images/attack-effects/reach-heaven.png',
  refreshStamina: './images/attack-effects/refresh-stamina.svg',
  serpentRing: './images/attack-effects/serpent-ring.png',
  smash: './images/attack-effects/smash.png',
  warriorAttack: './images/attack-effects/warrior-attack.png',
  warriorSmash: './images/attack-effects/warrior-smash.png',
  defend: './images/icons/icon_Block.png'
};
var skillCollectionImages = {
  warrior: preloadSkillImages(skillCollectionLinks.warrior),
  rogue: preloadSkillImages(skillCollectionLinks.rogue),
  mage: preloadSkillImages(skillCollectionLinks.mage)
};
var animationCollectionImages = preloadSkillImages(animationCollectionLinks);

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/game.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map