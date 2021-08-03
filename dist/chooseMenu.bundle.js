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

/***/ "./js/choose_menu.js":
/*!***************************!*\
  !*** ./js/choose_menu.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_navigation_modules_menu_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_navigation_modules/menu_modules */ \"./js/game_navigation_modules/menu_modules.js\");\n\r\n\r\ncheckOnAudioPlay();\r\n\r\n_game_navigation_modules_menu_modules__WEBPACK_IMPORTED_MODULE_0__.default.createChooseMenu();\r\n\r\n\n\n//# sourceURL=webpack://cardgameproject/./js/choose_menu.js?");

/***/ }),

/***/ "./js/game_navigation_modules/menu_modules.js":
/*!****************************************************!*\
  !*** ./js/game_navigation_modules/menu_modules.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Menu)\n/* harmony export */ });\nclass Menu {\r\n\tstatic createMainMenu() {\r\n\t\tconst mainMenu = new MainMenu();\r\n\t}\r\n\r\n\tstatic createChooseMenu() {\r\n\t\tconst mainMenu = new ChooseMenu();\r\n\t}\r\n\r\n\tinit(parentElement) {\r\n\t\tthis.mainElement = document.querySelector(parentElement);\r\n\t\tthis.source = {...document.querySelector(parentElement).children};\r\n\t}\r\n}\r\n\r\nclass MainMenu extends Menu {\r\n\tconstructor() {\r\n\t\tsuper();\r\n\r\n\t\tthis.init('.wrapper-main-menu');\r\n\r\n\t\tconst {1: soundOffOn} = this.source;\r\n\r\n\t\tsoundOffOn.addEventListener('click', playBackgroundMusic);\r\n\r\n\t\t[...this.mainElement.children].forEach((button) => {\r\n\t\t\tbutton.addEventListener('mouseover', () => playSoundEffect('.btn-hover-audio'));\r\n\t\t\tbutton.addEventListener('click', () => playSoundEffect('.btn-click-audio'));\r\n\t\t});\r\n\t}\r\n}\r\n\r\nclass ChooseMenu extends Menu {\r\n\tconstructor() {\r\n\t\tsuper();\r\n\r\n\t\tlet playerOneTurn = true;\r\n\t\tlet playerTwoTurn = false;\r\n\r\n\t\tlet playerOneClass = null;\r\n\t\tlet playerTwoClass = null;\r\n\r\n\t\tlet playerOneName = null;\r\n\t\tlet playerTwoName = null;\r\n\r\n\t\tconst characterDescription = [\r\n\t\t\t{\r\n\t\t\t\ttitle: 'The Viking',\r\n\t\t\t\tprofile: 'The remaining soldier of the Ironclads. Sold his soul to harness demonic energies',\r\n\t\t\t\tpross: 'Losing health goes into a rage. Becomes stronger when the enemy has a lot of health'\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\ttitle: 'The Silent',\r\n\t\t\t\tprofile: 'A deadly huntress from the foglands. Eradicates foes with daggers',\r\n\t\t\t\tpross: 'Light attacks and the ability to always find the right skill take the enemy by surprise'\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\ttitle: 'The Watcher',\r\n\t\t\t\tprofile: 'A blind ascetic who has come to \"Evaluate\" the Spire. Master of the divine Stances',\r\n\t\t\t\tpross: 'Massive magic  can destroy the enemy in a matter of seconds'\r\n\t\t\t}\r\n\t\t];\r\n\r\n\t\tthis.init('.wrapper-choose-menu');\r\n\r\n\t\tconst {0: announcer, 1: description, 2: options, 3: startGame, 4: decision, 6: soundOffOn} = this.source;\r\n\r\n\t\tconst {firstElementChild: enterName, lastElementChild: applyChoose} = this.source[4];\r\n\r\n\t\t// save name and model of character of each player\r\n\t\tthis.playerChooseCharacter = function () {\r\n\t\t\t// const announcer = document.querySelector('.playerChoose');\r\n\t\t\tconst check = enterName.value.length >= 1 && enterName.value !== 'You forgot enter name' && [...options.children].some((child) => child.classList.contains('in-focus'));\r\n\r\n\t\t\t//check if input is empty\r\n\t\t\tif (!check) {\r\n\t\t\t\tthis.allertEmptyName();\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\t// help myself with 'data' attribute to set which character player choose\r\n\t\t\tlet temp = [...options.children].filter((child) => {\r\n\t\t\t\tif (child.classList.contains('in-focus')) {\r\n\t\t\t\t\treturn child;\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\t// record player's choose\r\n\t\t\tif (playerOneTurn) {\r\n\t\t\t\tplayerOneName = enterName.value;\r\n\t\t\t\tplayerOneClass = temp[0].dataset.class;\r\n\t\t\t\tannouncer.textContent = 'Player 2: Choose your character';\r\n\t\t\t\tenterName.value = '';\r\n\t\t\t} else {\r\n\t\t\t\tplayerTwoName = enterName.value;\r\n\t\t\t\tplayerTwoClass = temp[0].dataset.class;\r\n\t\t\t\tannouncer.textContent = 'Players chose their characters';\r\n\t\t\t\tenterName.value = '';\r\n\t\t\t}\r\n\r\n\t\t\tplayerOneTurn = false;\r\n\t\t\tplayerTwoTurn = true;\r\n\r\n\t\t\tplaySoundEffect('.confirm')\r\n\t\t\tthis.removeStyles();\r\n\t\t\tthis.checkConditionToStartBattle();\r\n\t\t};\r\n\r\n\t\t// alert for empty input\r\n\t\tthis.allertEmptyName = function () {\r\n\t\t\tplaySoundEffect('.confirm-failed');\r\n\r\n\t\t\tif (enterName.value.length <= 1) {\r\n\t\t\t\tshakeAnimation('.decision-btn', 'horizontal');\r\n\r\n\t\t\t\tenterName.value = 'You forgot enter name';\r\n\t\t\t\tenterName.style.color = 'red';\r\n\t\t\t\tenterName.style.fontSize = '2rem';\r\n\r\n\t\t\t\tsetTimeout(() => {\r\n\t\t\t\t\tenterName.value = '';\r\n\t\t\t\t\tenterName.style.color = 'black';\r\n\t\t\t\t\tenterName.style.fontSize = '2rem';\r\n\t\t\t\t}, 1000);\r\n\t\t\t}\r\n\r\n\t\t\tif ([...options.children].some((child) => child.classList.contains('in-focus'))) {\r\n\t\t\t\treturn;\r\n\t\t\t} else {\r\n\t\t\t\tshakeAnimation('.options', 'mix');\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\t// check if both players choose character and enter nicknames, start fight\r\n\t\tthis.checkConditionToStartBattle = function () {\r\n\t\t\tif (playerOneClass && playerTwoClass) {\r\n\t\t\t\tconst playersChoice = this.prepareToExtract();\r\n\r\n\t\t\t\toptions.classList.add('hidden');\r\n\t\t\t\tdecision.classList.add('hidden');\r\n\t\t\t\tdescription.classList.add('hidden');\r\n\r\n\t\t\t\tlocalStorage.setItem('playersInfo', JSON.stringify(playersChoice));\r\n\r\n\t\t\t\tsetTimeout(function () {\r\n\t\t\t\t\tstartGame.classList.add('visible');\r\n\t\t\t\t}, 500);\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\tthis.removeStyles = function () {\r\n\t\t\t[...options.children].forEach((child) => {\r\n\t\t\t\tchild.classList.remove('in-focus');\r\n\t\t\t});\r\n\t\t};\r\n\r\n\t\t// function trigger audio and shake animation\r\n\t\tthis.startVisualAndSoundEffect = function (event) {\r\n\t\t\tswitch (event.target.className.split(' ')[0]) {\r\n\t\t\t\tcase 'warrior':\r\n\t\t\t\t\tshakeAnimation('.wrapper-choose-menu');\r\n\t\t\t\t\tplaySoundEffect('.warrior-selected');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'rogue':\r\n\t\t\t\t\tshakeAnimation('.wrapper-choose-menu');\r\n\t\t\t\t\tplaySoundEffect('.rogue-selected');\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'mage':\r\n\t\t\t\t\tshakeAnimation('.wrapper-choose-menu');\r\n\t\t\t\t\tplaySoundEffect('.mage-selected');\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\t// set text to describe each character\r\n\t\tthis.setCharacterDescription = function (character) {\r\n\t\t\tconst keys = Object.keys(characterDescription[0]);\r\n\r\n\t\t\tswitch (character) {\r\n\t\t\t\tcase 'warrior':\r\n\t\t\t\t\t[...description.children].forEach((element, index) => element.textContent = characterDescription[0][keys[index]]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'rogue':\r\n\t\t\t\t\t[...description.children].forEach((element, index) => element.textContent = characterDescription[1][keys[index]]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'mage':\r\n\t\t\t\t\t[...description.children].forEach((element, index) => element.textContent = characterDescription[2][keys[index]]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\tthis.setBackground = function (event) {\r\n\t\t\tif (event.target.className === 'options') {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tthis.removeStyles();\r\n\r\n\t\t\tevent.target.classList.add('in-focus');\r\n\r\n\t\t\tthis.setCharacterDescription(`${event.target.textContent.toLowerCase()}`);\r\n\r\n\t\t\tthis.mainElement.style.backgroundImage = `url(\\'images/backgrounds/${event.target.textContent.toLowerCase()}.jpg\\')`;\r\n\t\t};\r\n\r\n\t\tthis.prepareToExtract = function () {\r\n\t\t\treturn {\r\n\t\t\t\tplayerOneClass,\r\n\t\t\t\tplayerTwoClass,\r\n\t\t\t\tplayerOneName,\r\n\t\t\t\tplayerTwoName\r\n\t\t\t};\r\n\t\t};\r\n\r\n\t\toptions.addEventListener('click', (event) => this.setBackground(event));\r\n\r\n\t\toptions.addEventListener('click', (event) => this.startVisualAndSoundEffect(event));\r\n\r\n\t\t[...options.children].forEach(hover => hover.addEventListener('mouseover', () => playSoundEffect('.btn-hover-audio')));\r\n\r\n\t\t//run function to choose character or  alert empty input name\r\n\t\tapplyChoose.addEventListener('click', () => this.playerChooseCharacter());\r\n\r\n\t\tsoundOffOn.addEventListener('click', playBackgroundMusic);\r\n\r\n\t\tdocument.addEventListener('keypress', (event) => {\r\n\t\t\tif (event.code === 'Enter') {\r\n\t\t\t\tthis.playerChooseCharacter();\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\t[...document.querySelectorAll('.btn')].forEach((button) => {\r\n\t\t\tbutton.addEventListener('mouseover', () => playSoundEffect('.btn-hover-audio'));\r\n\t\t\tbutton.addEventListener('click', () => playSoundEffect('.btn-click-audio'));\r\n\t\t});\r\n\t}\r\n}\n\n//# sourceURL=webpack://cardgameproject/./js/game_navigation_modules/menu_modules.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/choose_menu.js");
/******/ 	
/******/ })()
;