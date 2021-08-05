/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/animation_and_sound_effects/animation.js":
/*!*****************************************************!*\
  !*** ./js/animation_and_sound_effects/animation.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loading\": () => (/* binding */ loading),\n/* harmony export */   \"switchPlayPause\": () => (/* binding */ switchPlayPause),\n/* harmony export */   \"checkBackgroundAudio\": () => (/* binding */ checkBackgroundAudio),\n/* harmony export */   \"shakeAnimation\": () => (/* binding */ shakeAnimation),\n/* harmony export */   \"createCardAnim\": () => (/* binding */ createCardAnim),\n/* harmony export */   \"endTurnAnim\": () => (/* binding */ endTurnAnim),\n/* harmony export */   \"blockAnimationEffect\": () => (/* binding */ blockAnimationEffect),\n/* harmony export */   \"attackAnimation\": () => (/* binding */ attackAnimation),\n/* harmony export */   \"playSoundEffect\": () => (/* binding */ playSoundEffect),\n/* harmony export */   \"attackAnimationEffect\": () => (/* binding */ attackAnimationEffect)\n/* harmony export */ });\n// #TODO normalize all sounds and music\r\n// animation through all menu loading black screen\r\nfunction loading(target) {\r\n\tswitch (target) {\r\n\t\tcase 'mainMenuLoad':\r\n\t\t\tlet mainEl = document.createElement('div');\r\n\r\n\t\t\tmainEl.className = 'back-main-menu-anim';\r\n\r\n\t\t\tdocument.body.insertBefore(mainEl, document.querySelector('.wrapper-choose-menu'));\r\n\r\n\t\t\tsetTimeout(() => document.body.removeChild(mainEl), 1100);\r\n\t\t\tbreak;\r\n\t\tcase 'chooseMenuLoad':\r\n\t\t\tlet chooseEl = document.createElement('div');\r\n\r\n\t\t\tchooseEl.className = 'go-to-choose-menu-anim';\r\n\r\n\t\t\tdocument.body.insertBefore(chooseEl, document.querySelector('.wrapper-main-menu'));\r\n\r\n\t\t\tsetTimeout(() => document.body.removeChild(chooseEl), 1100);\r\n\t\t\tbreak;\r\n\t\tcase 'battleFieldLoad':\r\n\t\t\tlet battleEl = document.createElement('div');\r\n\r\n\t\t\tbattleEl.className = 'start-game-anim';\r\n\r\n\t\t\tdocument.body.insertBefore(battleEl, document.querySelector('.wrapper-choose-menu'));\r\n\r\n\t\t\tsetTimeout(() => document.body.removeChild(battleEl), 1100);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\n// starting play backgorundMusic\r\nfunction switchPlayPause() {\r\n\tconst hash = window.location.hash;\r\n\tconst state = decodeURIComponent(hash.substr(1));\r\n\tconst soundOffOn = document.querySelector('.soundIcon');\r\n\tlet backAudio;\r\n\r\n\tif (state == 'battle-field') {\r\n\t\tbackAudio = document.querySelector('.background-music-battlefield');\r\n\t} else {\r\n\t\tbackAudio = document.querySelector('.background-music-main-menu');\r\n\t}\r\n\r\n\tif (backAudio.paused) {\r\n\t\tbackAudio.play();\r\n\t\tsoundOffOn.className = 'fas fa-volume-up soundIcon';\r\n\t} else {\r\n\t\tbackAudio.pause();\r\n\t\tsoundOffOn.className = 'fas fa-volume-mute soundIcon';\r\n\t}\r\n}\r\n\r\nlet checkBackgroundAudio = (function (querySelector) {\r\n\tconst currentHash = [];\r\n\tconst mainAudio = document.querySelector('.background-music-main-menu');\r\n\tconst audio = document.querySelector('.background-music-battlefield');\r\n\tconst allAudio = document.querySelectorAll('.music');\r\n\r\n\treturn function () {\r\n\t\tcurrentHash.push(decodeURIComponent(window.location.hash.substr(1)));\r\n\r\n\t\tconst soundOffOn = document.querySelector(querySelector);\r\n\r\n\t\tif (currentHash[currentHash.length - 1] === 'battle-field' && [...allAudio].every(element => element.paused)) {\r\n\t\t\tmainAudio.pause();\r\n\t\t\taudio.pause();\r\n\t\t} else if (currentHash[currentHash.length - 1] === 'battle-field' && [...allAudio].some(element => element.paused)){\r\n\t\t\tmainAudio.pause();\r\n\t\t\taudio.play();\r\n\t\t} else if (currentHash[currentHash.length - 1] === 'choose-menu' &&\r\n\t\t\tcurrentHash[currentHash.length - 2] === 'battle-field' && [...allAudio].every(element => element.paused)) {\r\n\t\t\tmainAudio.pause();\r\n\t\t\taudio.pause();\r\n\t\t} else if (currentHash[currentHash.length - 1] === 'choose-menu' &&\r\n\t\t\tcurrentHash[currentHash.length - 2] === 'battle-field' && [...allAudio].some(element => element.paused)) {\r\n\t\t\tmainAudio.play();\r\n\t\t\taudio.pause();\r\n\t\t}\r\n\r\n\t\tif ([...allAudio].every(element => element.paused)) {\r\n\t\t\tsoundOffOn.className = 'fas fa-volume-mute soundIcon';\r\n\t\t} else {\r\n\t\t\tsoundOffOn.className = 'fas fa-volume-up soundIcon';\r\n\t\t}\r\n\t}\r\n}('.soundIcon'));\r\n\r\n// shake display when character choosed\r\nfunction shakeAnimation(queryElement, direction = 'horizontal') {\r\n\tconst element = document.querySelector(queryElement);\r\n\r\n\tswitch (direction) {\r\n\t\tcase 'horizontal':\r\n\t\t\telement.classList.remove('shakeX');\r\n\t\t\tsetTimeout(() => element.classList.add('shakeX'), 0);\r\n\t\t\tsetTimeout(() => element.classList.remove('shakeX'), 400);\r\n\t\t\tbreak;\r\n\t\tcase 'vertical':\r\n\t\t\telement.classList.remove('shakeY');\r\n\t\t\tsetTimeout(() => element.classList.add('shakeY'), 0);\r\n\t\t\tsetTimeout(() => element.classList.remove('shakeY'), 400);\r\n\t\t\tbreak;\r\n\t\tcase 'mix':\r\n\t\t\telement.classList.remove('shakeMix');\r\n\t\t\tsetTimeout(() => element.classList.add('shakeMix'), 0);\r\n\t\t\tsetTimeout(() => element.classList.remove('shakeMix'), 400);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\nfunction createCardAnim(querySelector, amount) {\r\n\tlet elementAnim = document.querySelector(querySelector);\r\n\r\n\tswitch (amount) {\r\n\t\tcase 'single':\r\n\t\t\tfor (let i = 0; i < [...elementAnim.children].length; i++) {\r\n\t\t\t\tif (elementAnim.children[i].classList.contains('cardsDrawAnim')) {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t} else {\r\n\t\t\t\t\telementAnim.children[i].classList.add('cardsDrawAnim');\r\n\r\n\t\t\t\t\tplaySoundEffect('.push-card-audio');\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tbreak;\r\n\t\tcase 'multiple':\r\n\t\t\t[...elementAnim.children].forEach((element, index) => setTimeout(() => {\r\n\t\t\t\telement.classList.add('cardsDrawAnim');\r\n\r\n\t\t\t\tplaySoundEffect('.push-card-audio');\r\n\t\t\t}, 250 * index));\r\n\t\t\tbreak;\r\n\t\tcase 'overlay':\r\n\t\t\t[...elementAnim.children].forEach(element => element.classList.add('cardsDrawAnim'));\r\n\t}\r\n}\r\n\r\nfunction endTurnAnim(side) {\r\n\tconst button = document.querySelector('.end-of-turn-btn');\r\n\tconst turnAnnouncer = document.querySelector('.players-action');\r\n\r\n\tturnAnnouncer.classList.add('players-turn-info');\r\n\r\n\tswitch (side) {\r\n\t\tcase 'left':\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\tbutton.style.removeProperty('right');\r\n\t\t\t\tbutton.style.left = '5%';\r\n\t\t\t}, 500);\r\n\t\t\tbreak;\r\n\t\tcase 'right':\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\tbutton.style.removeProperty('left');\r\n\t\t\t\tbutton.style.right = '5%';\r\n\t\t\t}, 500);\r\n\t\t\tbreak;\r\n\t}\r\n\r\n\tsetTimeout(() => button.classList.add('endTurnAnim'), 1300);\r\n\r\n\tsetTimeout(() => turnAnnouncer.classList.remove('players-turn-info'), 2100);\r\n\r\n\tsetTimeout(() => button.classList.remove('endTurnAnim'), 1000);\r\n}\r\n\r\nfunction blockAnimationEffect(querySelector) {\r\n\tconst container = document.querySelector(querySelector).parentElement;\r\n\tconst image = document.createElement('img');\r\n\r\n\timage.src = '../images/icons/Icon_Block.png';\r\n\timage.className = 'shield';\r\n\r\n\tcontainer.appendChild(image);\r\n\r\n\tsetTimeout(() => container.removeChild(image), 1000);\r\n}\r\n\r\nfunction attackAnimation(querySelector, className, src) {\r\n\tconst container = document.querySelector(querySelector).parentElement;\r\n\tconst image = document.createElement('img');\r\n\r\n\timage.src = src;\r\n\timage.className = className;\r\n\r\n\tcontainer.appendChild(image);\r\n\r\n\tsetTimeout(() => container.removeChild(image), 600);\r\n}\r\n\r\nfunction playSoundEffect(querySelector) {\r\n\tconst soundEffect = document.querySelector(querySelector);\r\n\r\n\tsoundEffect.currentTime = 0;\r\n\r\n\tsoundEffect.play();\r\n}\r\n\r\nfunction attackAnimationEffect(querySelector, direction) {\r\n\tconst container = document.querySelector(querySelector);\r\n\r\n\tswitch (direction) {\r\n\t\tcase 'right':\r\n\t\t\tcontainer.classList.add('attackRight');\r\n\r\n\t\t\tsetTimeout(() => container.classList.remove('attackRight'), 1000);\r\n\t\t\tbreak;\r\n\t\tcase 'left':\r\n\t\t\tcontainer.classList.add('attackLeft');\r\n\r\n\t\t\tsetTimeout(() => container.classList.remove('attackLeft'), 1000);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://cardgameproject/./js/animation_and_sound_effects/animation.js?");

/***/ }),

/***/ "./js/game_navigation_modules/menu_modules.js":
/*!****************************************************!*\
  !*** ./js/game_navigation_modules/menu_modules.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Menu)\n/* harmony export */ });\n/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation_and_sound_effects/animation.js */ \"./js/animation_and_sound_effects/animation.js\");\n\r\n\r\nclass Menu {\r\n\tstatic createMainMenu() {\r\n\t\tconst mainMenu = new MainMenu();\r\n\t}\r\n\r\n\tstatic createChooseMenu() {\r\n\t\tconst mainMenu = new ChooseMenu();\r\n\t}\r\n\r\n\tinit(parentElement) {\r\n\t\tthis.mainElement = document.querySelector(parentElement);\r\n\t\tthis.source = {...document.querySelector(parentElement).children};\r\n\t}\r\n}\r\n\r\nclass MainMenu extends Menu {\r\n\tconstructor() {\r\n\t\tsuper();\r\n\r\n\t\tthis.init('.wrapper-main-menu');\r\n\r\n\t\tconst {1: soundOffOn} = this.source;\r\n\r\n\t\tsoundOffOn.addEventListener('click', _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.switchPlayPause);\r\n\r\n\t\t[...this.mainElement.children].forEach((button) => {\r\n\t\t\tbutton.addEventListener('mouseover', () => (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio'));\r\n\t\t\tbutton.addEventListener('click', () => (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-click-audio'));\r\n\t\t});\r\n\t}\r\n}\r\n\r\nclass ChooseMenu extends Menu {\r\n\tconstructor() {\r\n\t\tsuper();\r\n\r\n\t\tlet playerOneTurn = true;\r\n\t\tlet playerTwoTurn = false;\r\n\r\n\t\tlet playerOneClass = null;\r\n\t\tlet playerTwoClass = null;\r\n\r\n\t\tlet playerOneName = null;\r\n\t\tlet playerTwoName = null;\r\n\r\n\t\tconst characterDescription = [\r\n\t\t\t{\r\n\t\t\t\ttitle: 'The Viking',\r\n\t\t\t\tprofile: 'The remaining soldier of the Ironclads. Sold his soul to harness demonic energies',\r\n\t\t\t\tpross: 'Losing health goes into a rage. Becomes stronger when the enemy has a lot of health'\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\ttitle: 'The Silent',\r\n\t\t\t\tprofile: 'A deadly huntress from the foglands. Eradicates foes with daggers',\r\n\t\t\t\tpross: 'Light attacks and the ability to always find the right skill take the enemy by surprise'\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\ttitle: 'The Watcher',\r\n\t\t\t\tprofile: 'A blind ascetic who has come to \"Evaluate\" the Spire. Master of the divine Stances',\r\n\t\t\t\tpross: 'Massive magic  can destroy the enemy in a matter of seconds'\r\n\t\t\t}\r\n\t\t];\r\n\r\n\t\tthis.init('.wrapper-choose-menu');\r\n\r\n\t\tconst {0: announcer, 1: description, 2: options, 3: startGame, 4: decision, 6: soundOffOn} = this.source;\r\n\r\n\t\tconst {firstElementChild: enterName, lastElementChild: applyChoose} = this.source[4];\r\n\r\n\t\t// save name and model of character of each player\r\n\t\tthis.playerChooseCharacter = function () {\r\n\t\t\t// const announcer = document.querySelector('.playerChoose');\r\n\t\t\tconst check = enterName.value.length >= 1 && enterName.value !== 'You forgot enter name' && [...options.children].some((child) => child.classList.contains('in-focus'));\r\n\r\n\t\t\t//check if input is empty\r\n\t\t\tif (!check) {\r\n\t\t\t\tthis.allertEmptyName();\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\t// help myself with 'data' attribute to set which character player choose\r\n\t\t\tlet temp = [...options.children].filter((child) => {\r\n\t\t\t\tif (child.classList.contains('in-focus')) {\r\n\t\t\t\t\treturn child;\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\t// record player's choose\r\n\t\t\tif (playerOneTurn) {\r\n\t\t\t\tplayerOneName = enterName.value;\r\n\t\t\t\tplayerOneClass = temp[0].dataset.class;\r\n\t\t\t\tannouncer.textContent = 'Player 2: Choose your character';\r\n\t\t\t\tenterName.value = '';\r\n\t\t\t} else {\r\n\t\t\t\tplayerTwoName = enterName.value;\r\n\t\t\t\tplayerTwoClass = temp[0].dataset.class;\r\n\t\t\t\tannouncer.textContent = 'Players chose their characters';\r\n\t\t\t\tenterName.value = '';\r\n\t\t\t}\r\n\r\n\t\t\tplayerOneTurn = false;\r\n\t\t\tplayerTwoTurn = true;\r\n\r\n\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-audio')\r\n\t\t\tthis.removeStyles();\r\n\t\t\tthis.checkConditionToStartBattle();\r\n\t\t};\r\n\r\n\t\t// alert for empty input\r\n\t\tthis.allertEmptyName = function () {\r\n\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.confirm-failed-audio');\r\n\r\n\t\t\tif (enterName.value.length <= 1) {\r\n\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.decision-btn', 'horizontal');\r\n\r\n\t\t\t\tenterName.value = 'You forgot enter name';\r\n\t\t\t\tenterName.style.color = 'red';\r\n\t\t\t\tenterName.style.fontSize = '2rem';\r\n\r\n\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\tenterName.value = '';\r\n\t\t\t\t\tenterName.style.color = 'black';\r\n\t\t\t\t\tenterName.style.fontSize = '2rem';\r\n\t\t\t\t}, 1000);\r\n\t\t\t}\r\n\r\n\t\t\tif ([...options.children].some((child) => child.classList.contains('in-focus'))) {\r\n\t\t\t\treturn;\r\n\t\t\t} else {\r\n\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.options', 'mix');\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\t// check if both players choose character and enter nicknames, start fight\r\n\t\tthis.checkConditionToStartBattle = function () {\r\n\t\t\tif (playerOneClass && playerTwoClass) {\r\n\t\t\t\tconst playersChoice = this.prepareToExtract();\r\n\r\n\t\t\t\toptions.classList.add('hidden');\r\n\t\t\t\tdecision.classList.add('hidden');\r\n\t\t\t\tdescription.classList.add('hidden');\r\n\r\n\t\t\t\tlocalStorage.setItem('playersInfo', JSON.stringify(playersChoice));\r\n\r\n\t\t\t\tsetTimeout(function () {\r\n\t\t\t\t\tstartGame.classList.add('visible');\r\n\t\t\t\t}, 500);\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\tthis.removeStyles = function () {\r\n\t\t\t[...options.children].forEach((child) => {\r\n\t\t\t\tchild.classList.remove('in-focus');\r\n\t\t\t});\r\n\t\t};\r\n\r\n\t\t// function trigger audio and shake animation\r\n\t\tthis.startVisualAndSoundEffect = function (event) {\r\n\t\t\tswitch (event.target.className.split(' ')[0]) {\r\n\t\t\t\tcase 'warrior':\r\n\t\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.wrapper-choose-menu');\r\n\t\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.warrior-selected-audio');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'rogue':\r\n\t\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.wrapper-choose-menu');\r\n\t\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.rogue-selected-audio');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'mage':\r\n\t\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.shakeAnimation)('.wrapper-choose-menu');\r\n\t\t\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.mage-selected-audio');\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\t// set text to describe each character\r\n\t\tthis.setCharacterDescription = function (character) {\r\n\t\t\tconst keys = Object.keys(characterDescription[0]);\r\n\r\n\t\t\tswitch (character) {\r\n\t\t\t\tcase 'warrior':\r\n\t\t\t\t\t[...description.children].forEach((element, index) => element.textContent = characterDescription[0][keys[index]]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'rogue':\r\n\t\t\t\t\t[...description.children].forEach((element, index) => element.textContent = characterDescription[1][keys[index]]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'mage':\r\n\t\t\t\t\t[...description.children].forEach((element, index) => element.textContent = characterDescription[2][keys[index]]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\tthis.setBackground = function (event) {\r\n\t\t\tif (event.target.className === 'options') {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.removeStyles();\r\n\r\n\t\t\tevent.target.classList.add('in-focus');\r\n\r\n\t\t\tthis.setCharacterDescription(`${event.target.textContent.toLowerCase()}`);\r\n\r\n\t\t\tthis.mainElement.style.backgroundImage = `url(\\'images/backgrounds/${event.target.textContent.toLowerCase()}.jpg\\')`;\r\n\t\t};\r\n\r\n\t\tthis.prepareToExtract = function () {\r\n\t\t\treturn {\r\n\t\t\t\tplayerOneClass,\r\n\t\t\t\tplayerTwoClass,\r\n\t\t\t\tplayerOneName,\r\n\t\t\t\tplayerTwoName\r\n\t\t\t};\r\n\t\t};\r\n\r\n\t\toptions.addEventListener('click', (event) => this.setBackground(event));\r\n\r\n\t\toptions.addEventListener('click', (event) => this.startVisualAndSoundEffect(event));\r\n\r\n\t\t[...options.children].forEach(hover => hover.addEventListener('mouseover', () => (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio')));\r\n\r\n\t\t//run function to choose character or  alert empty input name\r\n\t\tapplyChoose.addEventListener('click', () => this.playerChooseCharacter());\r\n\r\n\t\tsoundOffOn.addEventListener('click', _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.switchPlayPause);\r\n\r\n\t\tdocument.addEventListener('keypress', (event) => {\r\n\t\t\tif (event.code === 'Enter') {\r\n\t\t\t\tthis.playerChooseCharacter();\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\t[...document.querySelectorAll('.btn')].forEach((button) => {\r\n\t\t\tbutton.addEventListener('mouseover', () => (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-hover-audio'));\r\n\t\t\tbutton.addEventListener('click', () => (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.playSoundEffect)('.btn-click-audio'));\r\n\t\t});\r\n\t}\r\n}\n\n//# sourceURL=webpack://cardgameproject/./js/game_navigation_modules/menu_modules.js?");

/***/ }),

/***/ "./js/main_menu.js":
/*!*************************!*\
  !*** ./js/main_menu.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_navigation_modules_menu_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_navigation_modules/menu_modules */ \"./js/game_navigation_modules/menu_modules.js\");\n\r\n\r\n_game_navigation_modules_menu_modules__WEBPACK_IMPORTED_MODULE_0__.default.createMainMenu();\n\n//# sourceURL=webpack://cardgameproject/./js/main_menu.js?");

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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main_menu.js");
/******/ 	
/******/ })()
;