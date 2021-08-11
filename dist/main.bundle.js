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


 //START CREATING WARRIOR'S CARDS

var strike_w = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(0, 'attack', 1, 6, 'images/cards/warrior/Strike.png', 'strike_w');
var bash = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(1, 'attack', 1, 8, 'images/cards/warrior/Bash.png', 'bash');
var anger = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(2, 'attackAddEffect', 1, 6, 'images/cards/warrior/Anger.png', 'anger', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.healthPoints < 50) {
    effect = 13;
  } else {
    effect = 6;
  }

  return effect;
});
var bodySlam = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(3, 'attackAddEffect', 2, 0, 'images/cards/warrior/BodySlam.png', 'bodySlam', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints > 0) {
    effect = _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints;
  } else {
    effect = 0;
  }

  return effect;
});
var perfecedStrike = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(4, 'attackAddEffect', 1, 6, 'images/cards/warrior/PerfectedStrike.png', 'perfectedStrike', function () {
  return 6 + _game__WEBPACK_IMPORTED_MODULE_1__.boardModel.cardInHand.children.length;
});
var bludgeon = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(5, 'attackAddEffect', 3, 12, 'images/cards/warrior/Bludgeon.png', 'bludgeon', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.healthPoints > 50) {
    effect = 17;
  } else {
    effect = 12;
  }

  return effect;
});
var defend_w = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(6, 'defend', 1, 5, 'images/cards/warrior/Defend_R.png', 'defend_w');
var armaments = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(7, 'defendAddEffect', 1, 5, 'images/cards/warrior/Armaments.png', 'armaments', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints === 0) {
    effect = 7;
  } else {
    effect = 5;
  }

  return effect;
});
var ironWave = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(8, 'defendAndAttack', 1, 5, 'images/cards/warrior/IronWave.png', 'ironWave', function () {
  return 5;
});
var warcry = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(9, 'defendDrawDiscard', 0, 1, 'images/cards/warrior/Warcry.png', 'warcry');
var bloodletting = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(10, 'defendDrawDiscard', 0, 3, 'images/cards/warrior/Bloodletting.png', 'bloodletting');
var entrench = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(11, 'defendAddEffect', 2, 2, 'images/cards/warrior/Entrench.png', 'entrench', function () {
  return _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints * 2 - _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints;
}); //START CREATING ROGUE'S CARDS

var strike_r = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(0, 'attack', 1, 6, 'images/cards/rogue/Strike_G.png', 'strike_r');
var daggerThrow = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(1, 'attackDrawDiscard', 1, 9, 'images/cards/rogue/R_dagger-throw.png', 'daggerThrow');
var flechettes = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(2, 'attackAddEffect', 1, 3, 'images/cards/rogue/Flechettes.png', 'flechettes', function () {
  return 3 * _game__WEBPACK_IMPORTED_MODULE_1__.boardModel.cardInHand.children.length;
});
var riddleWithHoles = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(3, 'attackAddEffect', 2, 7, 'images/cards/rogue/RiddleWithHoles.png', 'riddleWithHoles');
var slice = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(4, 'attack', 0, 4, 'images/cards/rogue/Slice.png', 'slice');
var quickSlash = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(5, 'attackDrawDiscard', 1, 7, 'images/cards/rogue/QuickSlash.png', 'quickSlash');
var survivor = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(6, 'defendDrawDiscard', 1, 8, 'images/cards/rogue/Survivor.png', 'survivor');
var deflect = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(7, 'defend', 0, 4, 'images/cards/rogue/Deflect.png', 'deflect');
var backFlip = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(8, 'defendDrawDiscard', 1, 2, 'images/cards/rogue/Backflip.png', 'backFlip', function () {
  return 5;
});
var prepared = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(9, 'defendDrawDiscard', 0, 1, 'images/cards/rogue/Prepared.png', 'prepared');
var expertise = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(10, 'defendDrawDiscard', 1, 5, 'images/cards/rogue/Expertise.png', 'expertise');
var dash = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(11, 'defendAndAttack', 2, 10, 'images/cards/rogue/Dash.png', 'dash', function () {
  return 8;
}); //START CREATING MAGE'S CARDS

var strike_m = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(0, 'attack', 1, 6, 'images/cards/mage/Strike_P.png', 'strike_m');
var cutThroughFate = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(1, 'attackDrawDiscard', 1, 7, 'images/cards/mage/CutThroughFate.png', 'cutThroughFate', function () {
  return 2;
});
var reachHeaven = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(2, 'attack', 2, 10, 'images/cards/mage/ReachHeaven.png', 'reachHeaven');
var signatureMove = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(3, 'attackAddEffect', 2, 0, 'images/cards/mage/SignatureMove.png', 'signatureMove', function () {
  return _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.defendPoints;
});
var tantrum = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(4, 'attackAddEffect', 1, 3, 'images/cards/mage/Tantrum.png', 'tantrum', function () {
  return 3 + (Math.floor(Math.random() * (6 - 1)) + 1);
});
var judjment = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(5, 'attackAddEffect', 2, 0, 'images/cards/mage/Judgment.png', 'judjment', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.healthPoints <= 15) {
    effect = 0;
  }

  return effect;
});
var masterReality = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(6, 'defendAddEffect', 1, 5, 'images/cards/mage/MasterReality.png', 'masterReality', function () {
  var effect;

  if (_game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.activePlayer.defendPoints == 0) {
    effect = 10;
  } else {
    effect = 5;
  }

  return effect;
});
var defend_m = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(7, 'defend', 1, 5, 'images/cards/mage/Defend_P.png', 'defend_m');
var meditate = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(8, 'defendAddEffect', 1, 3, 'images/cards/mage/Meditate.png', 'meditate');
var thirdEye = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(9, 'defendDrawDiscard', 1, 7, 'images/cards/mage/ThirdEye.png', 'thirdEye');
var nirvana = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(10, 'defendAddEffect', 1, 0, 'images/cards/mage/Nirvana.png', 'nirvana', function () {
  return _game__WEBPACK_IMPORTED_MODULE_1__.gameObserver.passivePlayer.defendPoints;
});
var alpha = new _modules_cardsModel__WEBPACK_IMPORTED_MODULE_0__.default(11, 'defendDrawDiscard', 1, 4, 'images/cards/mage/Alpha.png', 'alpha');
var skillCollection = {
  warrior: [strike_w, bash, anger, bodySlam, perfecedStrike, bludgeon, defend_w, armaments, ironWave, warcry, bloodletting, entrench],
  rogue: [strike_r, daggerThrow, flechettes, riddleWithHoles, slice, quickSlash, survivor, deflect, backFlip, prepared, expertise, dash],
  mage: [strike_m, cutThroughFate, reachHeaven, signatureMove, tantrum, judjment, masterReality, defend_m, meditate, thirdEye, nirvana, alpha]
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








var gameObserver = new _modules_gameModel__WEBPACK_IMPORTED_MODULE_0__.default();
var boardModel = new _modules_boardModel__WEBPACK_IMPORTED_MODULE_1__.default(gameObserver);
var boardView = new _modules_boardView__WEBPACK_IMPORTED_MODULE_2__.default(boardModel, gameObserver, document.querySelector('.wrapper-battle'));
var gameController = new _modules_gameController__WEBPACK_IMPORTED_MODULE_3__.default(gameObserver, boardView);
var player1 = new _modules_playerModel__WEBPACK_IMPORTED_MODULE_4__.default(gameObserver, boardModel);
var player2 = new _modules_playerModel__WEBPACK_IMPORTED_MODULE_4__.default(gameObserver, boardModel);
var playersView = new _modules_playerView__WEBPACK_IMPORTED_MODULE_5__.default(player1, player2, gameObserver, document.querySelector('.wrapper-battle'));
var playersController = new _modules_playerController__WEBPACK_IMPORTED_MODULE_6__.default(player1, player2, boardView);
var boardController = new _modules_boardController__WEBPACK_IMPORTED_MODULE_7__.default(gameObserver, boardModel, player1, player2, boardView);
gameObserver.start();
boardView.init();

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

    if (this.boardView.hasOwnProperty('onAnimCards')) {
      this.boardView.onAnimCards.attach(function (event) {
        return _this.cardAnimBoard(event);
      });
    }

    if (this.boardView.hasOwnProperty('cardInHandChoosen')) {
      this.boardView.cardInHandChoosen.attach(function (event, state) {
        return _this.cardAnimHand(event, state);
      });
    }

    if (this.boardView.hasOwnProperty('grabCardStart')) {
      this.boardView.grabCardStart.attach(function (event, state) {
        return _this.grabedCardAnim(event, state);
      });
    }

    if (this.boardView.hasOwnProperty('grabCardEnd')) {
      this.boardView.grabCardEnd.attach(function (event, state) {
        return _this.grabedCardAnim(event, state);
      });
    }

    if (this.boardView.hasOwnProperty('preventDrag')) {
      this.boardView.preventDrag.attach(function (event) {
        return _this.preventDrag(event);
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
      this.boardView.endTurn.attach(function () {
        return _this.setPlayersTurnInfo();
      });
    }

    if (this.boardView.hasOwnProperty('showPlayerDeck')) {
      this.boardView.showPlayerDeck.attach(function (event) {
        return _this.showPlayersDeck(event);
      });
    }

    if (this.boardView.hasOwnProperty('showPlayerDeck')) {
      this.boardView.showPlayerDeck.attach(function (event) {
        return _this.closePlayersDeck(event);
      });
    }

    if (this.gameModel.hasOwnProperty('selectionContinue')) {
      this.gameModel.selectionContinue.attach(function () {
        return _this.createCard();
      });
    }

    if (this.gameModel.hasOwnProperty('selectionEnd')) {
      this.gameModel.selectionEnd.attach(function () {
        return _this.createCardsInHand();
      });
      this.gameModel.selectionEnd.attach(function () {
        return _this.setPlayersTurnInfo();
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
    key: "cardAnimBoard",
    value: function cardAnimBoard(event) {
      this.boardModel.cardChooseAnim(event);
    }
  }, {
    key: "cardAnimHand",
    value: function cardAnimHand(event, state) {
      switch (state) {
        case 'focus':
          this.boardModel.cardChooseAnimInHandAdd(event);
          break;

        case 'blur':
          this.boardModel.cardChooseAnimInHandRemove(event);
          break;
      }
    }
  }, {
    key: "createCardsInHand",
    value: function createCardsInHand() {
      this.boardModel.pullRandomCardsInHand();
    }
  }, {
    key: "grabedCardAnim",
    value: function grabedCardAnim(event, state) {
      switch (state) {
        case 'focus':
          this.boardModel.dragCardStart(event);
          break;

        case 'blur':
          this.boardModel.dragCardEnd(event);
          break;
      }
    }
  }, {
    key: "preventDrag",
    value: function preventDrag(event) {
      this.boardModel.dragPreventAction(event);
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
    key: "closePlayersDeck",
    value: function closePlayersDeck(event) {
      if (event == this.boardModel.showDeckPlayer1 || event == this.boardModel.showDeckPlayer2) {
        this.boardModel.openCloseOverlay('open');
      }

      if (event == this.boardModel.playersDeckClose) {
        this.boardModel.openCloseOverlay('close');
      }
    }
  }, {
    key: "setPlayersTurnInfo",
    value: function setPlayersTurnInfo() {
      this.boardModel.showWhichTurn();
    }
  }, {
    key: "turnOnOfSound",
    value: function turnOnOfSound() {
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.switchPlayPause)();
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
    this.decWrapper = document.querySelector('.cards-choose-field'); // field for cards at the start when players are choosing

    this.btnAccept = document.querySelector('.accept'); // player accept cards he chose

    this.cardsChooseCounter = document.querySelector('.count'); // counter for amount of cards have been chosen(needs for alert)

    this.cardInHand = document.querySelector('.card-in-hand-field'); // field for cards in hand each player

    this.battleField = document.querySelector('.battle-field'); // play field

    this.endTurn = document.querySelector('.end-of-turn-btn'); // end turn button

    this.playersTurnInfo = document.querySelector('.players-action');
    this.cardsPlayField = document.querySelector('.play-field'); // area for cards to drop and play their actions

    this.soundOffOn = document.querySelector('.soundIcon');
    this.playersOverlay = document.querySelector('.players-overlay');
    this.playersDeck = document.querySelector('.players-overlay__cards');
    this.playersDeckClose = document.querySelector('.overlay__close');
    this.showDeckPlayer1 = document.querySelector('.player-1__pile-of-car'); // возможность в игре посмотреть какие карты ты выбрал

    this.showDeckPlayer2 = document.querySelector('.player-2__pile-of-car'); // возможность в игре посмотреть какие карты ты выбрал
    // создаем событие на создание карт

    this.onCreateCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.onCounterChange = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.removeCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.removeActionCard = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.createAnimation = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.endTurnAnimation = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
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

          _this.createAnimation.notify('.cards-choose-field', 'multiple'); // createCardAnim('.cards-choose-field', 'multiple');

        }, 500);
      } else {
        setTimeout(function () {
          _cards__WEBPACK_IMPORTED_MODULE_1__.skillCollection[playerClassInfo.playerTwoClass].forEach(function (element) {
            return _this.createCards(element, 'board');
          });

          _this.createAnimation.notify('.cards-choose-field', 'multiple'); // createCardAnim('.cards-choose-field', 'multiple');

        }, 500);
      }
    }
  }, {
    key: "showCardsForPlayers",
    value: function showCardsForPlayers(eventTarget) {
      var _this2 = this;

      this.removeExtraCards('overlay');
      var target = eventTarget;

      if (target.classList.contains('player-1__pile-of-car')) {
        this.gameModel.playerOnePullOfCards.forEach(function (element) {
          return _this2.createCards(element, 'overlay');
        });
        this.createAnimation.notify('.players-overlay__cards', 'overlay'); // createCardAnim('.players-overlay__cards', 'overlay');
      }

      if (target.classList.contains('player-2__pile-of-car')) {
        this.gameModel.playerTwoPullOfCards.forEach(function (element) {
          return _this2.createCards(element, 'overlay');
        });
        this.createAnimation.notify('.players-overlay__cards', 'overlay'); // createCardAnim('.players-overlay__cards', 'overlay');
      }
    }
  }, {
    key: "openCloseOverlay",
    value: function openCloseOverlay(state) {
      switch (state) {
        case 'open':
          this.playersOverlay.classList.remove('hidden');
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__.playSoundEffect)('.overlay-open-audio');
          break;

        case 'close':
          this.playersOverlay.classList.add('hidden');
          (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__.playSoundEffect)('.overlay-close-audio');
          break;
      }
    }
  }, {
    key: "createCards",
    value: function createCards(card, appendPlace) {
      var draggable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var elDiv = document.createElement('div');
      elDiv.setAttribute('class', 'cards');
      elDiv.setAttribute('data-info', "".concat(card.id));
      elDiv.style.backgroundImage = "url(".concat(card.icon, ")");

      if (draggable) {
        elDiv.setAttribute('draggable', 'true');
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

        this.createAnimation.notify('.card-in-hand-field', 'multiple'); // createCardAnim('.card-in-hand-field', 'multiple');
      } else {
        for (var _i2 = 0; _i2 < tempIndex.length; _i2++) {
          this.createCards(this.gameModel.playerTwoPullOfCards[tempIndex[_i2]], 'hand', true);
        }

        this.createAnimation.notify('.card-in-hand-field', 'multiple'); // createCardAnim('.card-in-hand-field', 'multiple');
      }
    } // убираем лишние карты с доски или из руки

  }, {
    key: "removeExtraCards",
    value: function removeExtraCards(place) {
      var orderToRemove = [];

      switch (place) {
        case 'board':
          orderToRemove = _toConsumableArray(this.decWrapper.children);
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
    } // подсветка выбранных карт

  }, {
    key: "cardChooseAnim",
    value: function cardChooseAnim(eventTarget) {
      var target = eventTarget;

      if (target !== this.decWrapper) {
        target.classList.toggle('card-to-select');
      }

      if (target.classList.contains('card-to-select')) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__.playSoundEffect)('.card-selected-audio');
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

      this.onCounterChange.notify(counterInfo);
    } //анимация выбора только одной карты для игры в руке

  }, {
    key: "cardChooseAnimInHandAdd",
    value: function cardChooseAnimInHandAdd(eventTarget) {
      var target = eventTarget;

      if (target !== this.cardInHand) {
        target.classList.add('card-to-action');
      }
    } //анимация выбора только одной карты для игры в руке

  }, {
    key: "cardChooseAnimInHandRemove",
    value: function cardChooseAnimInHandRemove(eventTarget) {
      var target = eventTarget;

      if (target !== this.cardInHand) {
        target.classList.remove('card-to-action');
      }
    } //добавляем стили для перетаскивания

  }, {
    key: "dragCardStart",
    value: function dragCardStart(eventTarget) {
      var target = eventTarget;

      if (target !== this.cardInHand) {
        setTimeout(function () {
          return target.classList.add('invisible');
        }, 0);
      }

      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__.playSoundEffect)('.drag-audio');
    } //у ираем стили для перетаскивания

  }, {
    key: "dragCardEnd",
    value: function dragCardEnd(eventTarget) {
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__.playSoundEffect)('.card-grab-cancel-audio');
      var target = eventTarget;

      if (target !== this.cardInHand) {
        target.classList.remove('invisible');
      }
    }
  }, {
    key: "dragPreventAction",
    value: function dragPreventAction(event) {
      event.preventDefault();
    }
  }, {
    key: "showWhichTurn",
    value: function showWhichTurn() {
      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_2__.playSoundEffect)('.end-turn-audio');

      if (this.gameModel.playerOneTurn) {
        this.playersTurnInfo.textContent = "".concat(this.gameModel.playersInfo.playerOneName, "'s Turn");
        this.endTurnAnimation.notify('left'); // endTurnAnim('left');
      } else {
        this.playersTurnInfo.textContent = "".concat(this.gameModel.playersInfo.playerTwoName, "'s Turn");
        this.endTurnAnimation.notify('right'); // endTurnAnim('right');
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
/* harmony import */ var _animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation_and_sound_effects/animation */ "./js/animation_and_sound_effects/animation.js");
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
    this.onLoadCreate = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие для this.gameModel закинуть в масиив выбранные карты

    this.onDefineCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие на анимацию(подсветку выбора карт)

    this.onAnimCards = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // событие на проверку набрали ли игроки карты

    this.submitCardCheckChoose = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // навели убрали мышку на карту в руке

    this.cardInHandChoosen = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // навели убрали мышку на карту в руке

    this.grabCardStart = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.grabCardEnd = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.preventDrag = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); //удаляем сыгранную карту

    this.dropEvent = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default(); // выполняем действие карты

    this.doCardAction = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.endTurn = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.showPlayerDeck = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.soundOffOn = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
    this.boardModel.btnAccept.addEventListener('click', function () {
      return _this.onDefineCards.notify();
    });
    this.boardModel.btnAccept.addEventListener('click', function () {
      return _this.submitCardCheckChoose.notify();
    }); // событие клик подстветка выбора карт

    this.boardModel.decWrapper.addEventListener('click', function (event) {
      return _this.onAnimCards.notify(event.target);
    }); // показываем карты какие наюрал игрок на этапе выбора

    this.boardModel.battleField.addEventListener('click', function (event) {
      return _this.showPlayerDeck.notify(event.target);
    });
    this.boardModel.playersDeckClose.addEventListener('click', function (event) {
      return _this.showPlayerDeck.notify(event.target);
    }); // анимация карт в руке при наведении

    this.boardModel.cardInHand.addEventListener('mouseover', function (event) {
      return _this.cardInHandChoosen.notify(event.target, 'focus');
    });
    this.boardModel.cardInHand.addEventListener('mouseout', function (event) {
      return _this.cardInHandChoosen.notify(event.target, 'blur');
    }); // анимация карт при перетаскивании плюс узнаем какую карту перетавскиваем

    this.boardModel.cardInHand.addEventListener('dragstart', function (event) {
      return _this.grabCardStart.notify(event.target, 'focus');
    });
    this.boardModel.cardInHand.addEventListener('dragend', function (event) {
      return _this.grabCardEnd.notify(event.target, 'blur');
    }); // prevent default behavior

    this.boardModel.cardsPlayField.addEventListener('dragenter', function (event) {
      return _this.preventDrag.notify(event);
    });
    this.boardModel.cardsPlayField.addEventListener('dragover', function (event) {
      return _this.preventDrag.notify(event);
    }); // играем карты

    this.boardModel.cardsPlayField.addEventListener('drop', function () {
      return _this.dropEvent.notify();
    });
    this.boardModel.cardsPlayField.addEventListener('drop', function () {
      return _this.doCardAction.notify(_this.gameModel.playerOneTurn);
    });
    this.boardModel.endTurn.addEventListener('click', function () {
      return _this.endTurn.notify();
    });
    this.boardModel.soundOffOn.addEventListener('click', function () {
      return _this.soundOffOn.notify();
    }); // подписываемся на событие в модели
    // this.boardModel создала карты надо их отобразить

    this.boardModel.onCreateCards.attach(function (card, place) {
      return _this.drawCards(card, place);
    }); // модель меняет количество набранных карт отображаем

    this.boardModel.onCounterChange.attach(function (info) {
      return _this.counterUpdate(info);
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
    this.boardModel.endTurnAnimation.attach(function (side) {
      return _this.endTurnAnimation(side);
    });
  } // need for start render cards when page is loaded


  _createClass(BoardView, [{
    key: "init",
    value: function init() {
      this.onLoadCreate.notify();
    }
  }, {
    key: "drawCards",
    value: function drawCards(card, place) {
      switch (place) {
        case 'board':
          this.boardModel.decWrapper.appendChild(card);
          break;

        case 'hand':
          this.boardModel.cardInHand.appendChild(card);
          break;

        case 'overlay':
          this.boardModel.playersDeck.appendChild(card);
          break;
      }

      this.boardModel.cardsChooseCounter.textContent = 0;
      this.boardModel.cardsChooseCounter.style = 'color: white';
    }
  }, {
    key: "extraCardsToRemove",
    value: function extraCardsToRemove(cards, place) {
      if (place == 'board' && cards.length > 0) {
        for (var i = 0; i < cards.length; i++) {
          this.boardModel.decWrapper.removeChild(cards[i]);
        }
      }

      if (place == 'hand' && cards.length > 0) {
        for (var _i = 0; _i < cards.length; _i++) {
          this.boardModel.cardInHand.removeChild(cards[_i]);
        }
      }

      if (place == 'overlay' && cards.length > 0) {
        for (var _i2 = 0; _i2 < cards.length; _i2++) {
          this.boardModel.playersDeck.removeChild(cards[_i2]);
        }
      }
    }
  }, {
    key: "deleteActionCard",
    value: function deleteActionCard(card) {
      this.boardModel.cardInHand.removeChild(card);
    }
  }, {
    key: "counterUpdate",
    value: function counterUpdate(info) {
      this.boardModel.cardsChooseCounter.textContent = info.number;
      this.boardModel.cardsChooseCounter.style = "color: ".concat(info.color);
    }
  }, {
    key: "selectionEndUpdate",
    value: function selectionEndUpdate() {
      this.boardModel.decWrapper.style.display = 'none';
      this.boardModel.battleField.classList.remove('hidden'); // this.boardSelector.querySelector('.card-counter').classList.add('hidden');

      this.boardSelector.querySelector('.card-counter').style.display = 'none';
    }
  }, {
    key: "playerChooseInfoUpdate",
    value: function playerChooseInfoUpdate(text) {
      this.boardSelector.querySelector('.player-name-choosing').textContent = text;
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
    key: "createAnimation",
    value: function createAnimation(querySelector, amount) {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.createCardAnim)(querySelector, amount);
    }
  }, {
    key: "endTurnAnimation",
    value: function endTurnAnimation(side) {
      (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_1__.endTurnAnim)(side);
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

    if (this.boardView.hasOwnProperty('endTurn')) {
      this.boardView.endTurn.attach(function () {
        return _this.doEndTurn();
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

    this.updatePlayersModels = new _eventsModel__WEBPACK_IMPORTED_MODULE_0__.default();
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
    key: "setActivePassivePlayer",
    value: // линкуем player1 & player2 в gamemodel
    function setActivePassivePlayer() {
      this.activePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player1;
      this.passivePlayer = _game__WEBPACK_IMPORTED_MODULE_2__.player2;
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
    key: "definePlayersCardSet",
    value: // пулим карты выбранные ироком на старте игры в gameControl, этими картами игроки будут играть дальше
    function definePlayersCardSet() {
      var cards = document.querySelectorAll('.cards'); //счетчик выбранных карт

      var counter = document.getElementsByClassName('card-to-select').length; // если выбрано больше или недобор указанных карт запрещает пулить в переменную

      if (counter < 8 || counter >= 9) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_3__.playSoundEffect)('.confirm-failed-audio');
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_3__.shakeAnimation)('.accept', 'horizontal');
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
  }]);

  return Game;
}();



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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PlayersController = /*#__PURE__*/function () {
  function PlayersController(playerOneModel, playerTwoModel, view) {
    var _this = this;

    _classCallCheck(this, PlayersController);

    this.playerOneModel = playerOneModel;
    this.playerTwoModel = playerTwoModel;
    this.boardView = view;

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
    value: function updateView() {
      this.playerViewUpdate.notify();
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
      }

      this.updateInitialValues();
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

      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.createCardAnim)('.card-in-hand-field', 'single');
    }
  }, {
    key: "randomCardDiscard",
    value: function randomCardDiscard() {
      var _this = this;

      var randomDiscard = Math.floor(Math.random() * this.boardModel.cardInHand.children.length); //it will be error if you use DaggerThrow as the last card in hand so w check on this

      if (this.boardModel.cardInHand.children.length > 0) {
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.discardCardAnim)(this.boardModel.cardInHand.children[randomDiscard]);
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
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.discardCardAnim)(element);
        (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.playSoundEffect)('.discard-card-audio'); // setTimeout(() => this.cardDiscard.notify(element), 300)

        this.cardDiscard.notify(element);
      }
    } // we take condition only for card "expertise"

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

      (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_1__.createCardAnim)('.card-in-hand-field', 'single');
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

      if (card.name == 'judjment') {
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
/* harmony import */ var _animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation_and_sound_effects/animation */ "./js/animation_and_sound_effects/animation.js");
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
    this.playerOneHPValue = playerContainer.querySelector('.player-1__hp-value');
    this.playerOneDefenceValue = playerContainer.querySelector('.player-1__defence-value');
    this.playerOneStaminaValue = playerContainer.querySelector('.player-1__stamina-value');
    this.playerOneHP = playerContainer.querySelector('.player-1__hp-bar-inner');
    this.playerTwoHPValue = playerContainer.querySelector('.player-2__hp-value');
    this.playerTwoDefenceValue = playerContainer.querySelector('.player-2__defence-value');
    this.playerTwoStaminaValue = playerContainer.querySelector('.player-2__stamina-value');
    this.playerTwoHP = playerContainer.querySelector('.player-2__hp-bar-inner');
    this.playerOneModel.playerViewUpdate.attach(function () {
      _this.updateViewStamina();
    });
    this.playerTwoModel.playerViewUpdate.attach(function () {
      _this.updateViewStamina();
    });
    this.playerOneModel.actionAnimation.attach(function () {
      return _this.doAnimation();
    });
    this.playerTwoModel.actionAnimation.attach(function () {
      return _this.doAnimation();
    });
    this.updateViewHP();
    this.updateViewDef();
    this.updateViewStamina();
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
      this.playerOneDefenceValue.classList.remove('defendValueNegative');
      this.playerOneDefenceValue.classList.remove('defendValuePositive');
      this.playerTwoDefenceValue.classList.remove('defendValueNegative');
      this.playerTwoDefenceValue.classList.remove('defendValuePositive');

      if (this.playerOneModel.initialDP > this.playerOneModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerOneDefenceValue.className = 'player-1__defence-value defendValueNegative';
        }, 0);
      } else if (this.playerOneModel.initialDP < this.playerOneModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerOneDefenceValue.className = 'player-1__defence-value defendValuePositive';
        }, 0);
      } else if (this.playerTwoModel.initialDP > this.playerTwoModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerTwoDefenceValue.className = 'player-2__defence-value defendValueNegative';
        }, 0);
      } else if (this.playerTwoModel.initialDP < this.playerTwoModel.defendPoints) {
        setTimeout(function () {
          return _this2.playerTwoDefenceValue.className = 'player-2__defence-value defendValuePositive';
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
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimation)(passivePlayerUI, 'attack', 'images/attack-effects/warrior-attack.png');
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.strike-attack-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
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
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.blockAnimationEffect)(activePlayerUI, 'shield', 'images/icons/Icon_Block.png');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.defend-audio');
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'bodySlam':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimation)(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.bash-attack-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'slice':
        case 'strike_m':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimation)(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.mage-punch-audio');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'daggerThrow':
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimation)(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.bash-attack-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'anger':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.standartAttackAnimation)(passivePlayerUI, 'angerAttack', 'images/attack-effects/anger.png');
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.anger-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'reachHeaven':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.standartAttackAnimation)(passivePlayerUI, 'angerAttack', 'images/attack-effects/reach-heaven.png');
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.mage-strong-audio');
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'ironWave':
        case 'dash':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.blockAnimationEffect)(activePlayerUI, 'shield', 'images/icons/Icon_Block.png');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.defend-audio');
          this.updateViewDef();
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          }, 400);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.standartAttackAnimation)(passivePlayerUI, 'angerAttack', 'images/attack-effects/anger.png');
          }, 400);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
          }, 400);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.bash-attack-audio');
          }, 400);
          setTimeout(function () {
            return _this3.updateViewHP();
          }, 400);
          setTimeout(function () {
            return _this3.updateViewDef();
          }, 400);
          setTimeout(function () {
            return _this3.updateViewStamina();
          }, 400);
          break;

        case 'bloodletting':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.standartAttackAnimation)(activePlayerUI, 'shield', 'images/attack-effects/bloodletting.png');
          setTimeout(function () {
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(activePlayerUI);
            (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.bloodletting-audio');
          }, 200);
          this.updateViewHP();
          break;

        case 'warcry':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(activePlayerUI);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.warcry-audio');
          this.updateViewStamina();
          break;

        case 'meditate':
        case 'alpha':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.blockAnimationEffect)(activePlayerUI, 'expertice', 'images/attack-effects/refresh-stamina.svg');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.meditate-audio');
          this.updateViewStamina();
          break;

        case 'cutThroughFate':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.blockAnimationEffect)(activePlayerUI, 'shield', 'images/icons/Icon_Block.png');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.defend-audio');
          this.updateViewDef();
          this.updateViewStamina();
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          }, 400);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.standartAttackAnimation)(passivePlayerUI, 'angerAttack', 'images/attack-effects/mageEffect.png');
          }, 400);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
          }, 400);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.mage-attack-audio');
          }, 400);
          setTimeout(function () {
            return _this3.updateViewHP();
          }, 400);
          setTimeout(function () {
            return _this3.updateViewDef();
          }, 400);
          break;

        case 'perfectedStrike':
        case 'tantrum':
        case 'flechettes':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.multipleAttackAnimation)(passivePlayerUI, 'attack', 'images/attack-effects/warrior-attack.png', 3);
          setTimeout(function () {
            return (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)(passivePlayerUI);
          }, 200);
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'expertise':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.blockAnimationEffect)(activePlayerUI, 'expertice', 'images/attack-effects/serpent_ring.png');
          this.updateViewStamina();
          break;

        case 'bludgeon':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.warcry-audio');
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.ultimateSkillAnimation)(passivePlayerUI, 'warriorUltimate', 'images/attack-effects/flash.png', '.flash-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'riddleWithHoles':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.ultimateSkillAnimation)(passivePlayerUI, 'rogueUltimate', 'images/attack-effects/daggers.svg', '.backstab-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'signatureMove':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.ultimateSkillAnimation)(passivePlayerUI, 'mageUltimate', 'images/attack-effects/mage-attack.png', '.mage-ultimate-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;

        case 'judjment':
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.attackAnimationEffect)(activePlayerUI, direction);
          (0,_animation_and_sound_effects_animation__WEBPACK_IMPORTED_MODULE_0__.ultimateSkillAnimation)(passivePlayerUI, 'rogueUltimate', 'images/attack-effects/judjment.svg', '.judj-audio');
          this.updateViewHP();
          this.updateViewDef();
          this.updateViewStamina();
          break;
      }
    }
  }]);

  return PlayersView;
}();



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