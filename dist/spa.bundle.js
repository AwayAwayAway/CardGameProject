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

/***/ "./js/SPAcontroller.js":
/*!*****************************!*\
  !*** ./js/SPAcontroller.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation_and_sound_effects/animation.js */ \"./js/animation_and_sound_effects/animation.js\");\n\r\n\r\nlet gameConstructor = {};\r\n\r\ndocument.addEventListener('DOMContentLoaded', gameConstructorInit);\r\n\r\n// change hash\r\ndocument.addEventListener('click', (event) => switchHash(event));\r\n\r\nwindow.addEventListener('hashchange', renderPage);\r\n\r\nfunction renderPage() {\r\n\tconst hash = window.location.hash;\r\n\tconst state = decodeURIComponent(hash.substr(1));\r\n\r\n\tswitch (state) {\r\n\t\tcase '':\r\n\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('mainMenuLoad');\r\n\t\t\tdocument.title = 'Main menu';\r\n\t\t\tsetTimeout(() => createMainPage(gameConstructor.mainMenu), 500)\r\n\t\t\tbreak;\r\n\t\tcase 'choose-menu':\r\n\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('chooseMenuLoad');\r\n\t\t\tsetTimeout(() => createMainPage(gameConstructor.chooseMenu), 500);\r\n\t\t\tbreak;\r\n\t\tcase 'main-menu':\r\n\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('mainMenuLoad');\r\n\t\t\tsetTimeout(() => createMainPage(gameConstructor.mainMenu), 500);\r\n\t\t\tbreak;\r\n\t\tcase 'battle-field':\r\n\t\t\t(0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.loading)('battleFieldLoad');\r\n\t\t\tsetTimeout(() => createMainPage(gameConstructor.battle), 500);\r\n\t\t\tbreak;\r\n\t}\r\n\r\n\tsetTimeout(() => (0,_animation_and_sound_effects_animation_js__WEBPACK_IMPORTED_MODULE_0__.checkBackgroundAudio)(), 550) ;\r\n}\r\n\r\nfunction switchHash(event) {\r\n\tswitch (event.target.className.split(' ')[0]) {\r\n\t\tcase 'startButton':\r\n\t\t\tdocument.title = 'Choose menu';\r\n\t\t\tlocation.hash = decodeURIComponent('choose-menu');\r\n\t\t\tbreak;\r\n\t\tcase 'back-to-main-menu':\r\n\t\t\tdocument.title = 'Main menu';\r\n\t\t\tlocation.hash = decodeURIComponent('main-menu');\r\n\t\t\tbreak;\r\n\t\tcase 'startGame':\r\n\t\t\tdocument.title = 'Battlefield';\r\n\t\t\tlocation.hash = decodeURIComponent('battle-field');\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\nfunction gameConstructorInit() {\r\n\t$.ajax(\r\n\t\t{\r\n\t\t\turl: 'json/main_menu.json',\r\n\t\t\ttype: 'GET',\r\n\t\t\tdataType: 'json',\r\n\t\t\tsuccess: saveMainMenu,\r\n\t\t\terror: errorHandler\r\n\t\t}\r\n\t);\r\n}\r\n\r\nfunction saveMainMenu(data) {\r\n\tgameConstructor.mainMenu = data;\r\n\r\n\t$.ajax(\r\n\t\t{\r\n\t\t\turl: 'json/choose_menu.json',\r\n\t\t\ttype: 'GET',\r\n\t\t\tdataType: 'json',\r\n\t\t\tsuccess: saveChooseMenu,\r\n\t\t\terror: errorHandler\r\n\t\t}\r\n\t);\r\n}\r\n\r\nfunction saveChooseMenu(data) {\r\n\tgameConstructor.chooseMenu = data;\r\n\r\n\t$.ajax(\r\n\t\t{\r\n\t\t\turl: 'json/battle.json',\r\n\t\t\ttype: 'GET',\r\n\t\t\tdataType: 'json',\r\n\t\t\tsuccess: saveBattle,\r\n\t\t\terror: errorHandler\r\n\t\t}\r\n\t);\r\n\r\n}\r\n\r\nfunction saveBattle(data) {\r\n\tgameConstructor.battle = data;\r\n\r\n\trenderPage();\r\n}\r\n\r\nfunction errorHandler(jqXHR, statusStr, errorStr) {\r\n\talert(statusStr + ' ' + errorStr);\r\n}\r\n\r\n// create page from JSON functions\r\nfunction createMainPage(object) {\r\n\tconst body = document.querySelector('body');\r\n\tconst wrapperEl = document.querySelector('.wrapper');\r\n\tconst scriptEl = document.querySelector('.script');\r\n\r\n\tlet parent;\r\n\tlet mainChild;\r\n\tlet child;\r\n\tlet subChild;\r\n\tlet lowestChild;\r\n\tlet script;\r\n\r\n\tfor (let i = 0; i < object.length; i++) {\r\n\t\tfor (let key in object[i]) {\r\n\t\t\tswitch (object[i][key]) {\r\n\t\t\t\tcase 'parent':\r\n\t\t\t\t\tparent = createElement(object[i]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'mainChild':\r\n\t\t\t\t\tmainChild = createElement(object[i]);\r\n\t\t\t\t\tparent.appendChild(mainChild);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'child':\r\n\t\t\t\t\tchild = createElement(object[i]);\r\n\t\t\t\t\tmainChild.appendChild(child);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'subChild':\r\n\t\t\t\t\tsubChild = createElement(object[i]);\r\n\t\t\t\t\tchild.appendChild(subChild);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'lowestChild':\r\n\t\t\t\t\tlowestChild = createElement(object[i]);\r\n\t\t\t\t\tsubChild.appendChild(lowestChild);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'script':\r\n\t\t\t\t\tscript = createElement(object[i]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tif (wrapperEl) {\r\n\t\tbody.replaceChild(parent, wrapperEl);\r\n\t} else {\r\n\t\tbody.appendChild(parent);\r\n\t}\r\n\r\n\tif (scriptEl) {\r\n\t\tbody.replaceChild(script, scriptEl);\r\n\t} else {\r\n\t\tbody.appendChild(script);\r\n\t}\r\n}\r\n\r\nfunction createElement(obj) {\r\n\tlet element = document.createElement(obj.tagName);\r\n\telement.setAttribute('class', obj.class);\r\n\telement.textContent = obj.content || '';\r\n\r\n\tif (obj.source) {\r\n\t\telement.src = obj.source;\r\n\t}\r\n\r\n\tif (obj.data) {\r\n\t\telement.setAttribute(`${obj.data}`, `${obj.dataValue}`);\r\n\t}\r\n\r\n\tif (obj.type) {\r\n\t\telement.setAttribute(`${obj.type}`, `${obj.typeValue}`);\r\n\t}\r\n\r\n\tif (obj.tagName === 'script') {\r\n\t\telement.setAttribute('defer', 'defer');\r\n\t}\r\n\r\n\treturn element;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://cardgameproject/./js/SPAcontroller.js?");

/***/ }),

/***/ "./js/animation_and_sound_effects/animation.js":
/*!*****************************************************!*\
  !*** ./js/animation_and_sound_effects/animation.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loading\": () => (/* binding */ loading),\n/* harmony export */   \"switchPlayPause\": () => (/* binding */ switchPlayPause),\n/* harmony export */   \"checkBackgroundAudio\": () => (/* binding */ checkBackgroundAudio),\n/* harmony export */   \"shakeAnimation\": () => (/* binding */ shakeAnimation),\n/* harmony export */   \"createCardAnim\": () => (/* binding */ createCardAnim),\n/* harmony export */   \"endTurnAnim\": () => (/* binding */ endTurnAnim),\n/* harmony export */   \"blockAnimationEffect\": () => (/* binding */ blockAnimationEffect),\n/* harmony export */   \"attackAnimation\": () => (/* binding */ attackAnimation),\n/* harmony export */   \"playSoundEffect\": () => (/* binding */ playSoundEffect),\n/* harmony export */   \"attackAnimationEffect\": () => (/* binding */ attackAnimationEffect)\n/* harmony export */ });\n// #TODO normalize all sounds and music\r\n// animation through all menu loading black screen\r\nfunction loading(target) {\r\n\tswitch (target) {\r\n\t\tcase 'mainMenuLoad':\r\n\t\t\tlet mainEl = document.createElement('div');\r\n\r\n\t\t\tmainEl.className = 'back-main-menu-anim';\r\n\r\n\t\t\tdocument.body.insertBefore(mainEl, document.querySelector('.wrapper-choose-menu'));\r\n\r\n\t\t\tsetTimeout(() => document.body.removeChild(mainEl), 1100);\r\n\t\t\tbreak;\r\n\t\tcase 'chooseMenuLoad':\r\n\t\t\tlet chooseEl = document.createElement('div');\r\n\r\n\t\t\tchooseEl.className = 'go-to-choose-menu-anim';\r\n\r\n\t\t\tdocument.body.insertBefore(chooseEl, document.querySelector('.wrapper-main-menu'));\r\n\r\n\t\t\tsetTimeout(() => document.body.removeChild(chooseEl), 1100);\r\n\t\t\tbreak;\r\n\t\tcase 'battleFieldLoad':\r\n\t\t\tlet battleEl = document.createElement('div');\r\n\r\n\t\t\tbattleEl.className = 'start-game-anim';\r\n\r\n\t\t\tdocument.body.insertBefore(battleEl, document.querySelector('.wrapper-choose-menu'));\r\n\r\n\t\t\tsetTimeout(() => document.body.removeChild(battleEl), 1100);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\n// starting play backgorundMusic\r\nfunction switchPlayPause() {\r\n\tconst hash = window.location.hash;\r\n\tconst state = decodeURIComponent(hash.substr(1));\r\n\tconst soundOffOn = document.querySelector('.soundIcon');\r\n\tlet backAudio;\r\n\r\n\tif (state == 'battle-field') {\r\n\t\tbackAudio = document.querySelector('.background-music-battlefield');\r\n\t} else {\r\n\t\tbackAudio = document.querySelector('.background-music-main-menu');\r\n\t}\r\n\r\n\tif (backAudio.paused) {\r\n\t\tbackAudio.play();\r\n\t\tsoundOffOn.className = 'fas fa-volume-up soundIcon';\r\n\t} else {\r\n\t\tbackAudio.pause();\r\n\t\tsoundOffOn.className = 'fas fa-volume-mute soundIcon';\r\n\t}\r\n}\r\n\r\nlet checkBackgroundAudio = (function (querySelector) {\r\n\tconst currentHash = [];\r\n\tconst mainAudio = document.querySelector('.background-music-main-menu');\r\n\tconst audio = document.querySelector('.background-music-battlefield');\r\n\tconst allAudio = document.querySelectorAll('.music');\r\n\r\n\treturn function () {\r\n\t\tcurrentHash.push(decodeURIComponent(window.location.hash.substr(1)));\r\n\r\n\t\tconst soundOffOn = document.querySelector(querySelector);\r\n\r\n\t\tif (currentHash[currentHash.length - 1] === 'battle-field' && [...allAudio].every(element => element.paused)) {\r\n\t\t\tmainAudio.pause();\r\n\t\t\taudio.pause();\r\n\t\t} else if (currentHash[currentHash.length - 1] === 'battle-field' && [...allAudio].some(element => element.paused)){\r\n\t\t\tmainAudio.pause();\r\n\t\t\taudio.play();\r\n\t\t} else if (currentHash[currentHash.length - 1] === 'choose-menu' &&\r\n\t\t\tcurrentHash[currentHash.length - 2] === 'battle-field' && [...allAudio].every(element => element.paused)) {\r\n\t\t\tmainAudio.pause();\r\n\t\t\taudio.pause();\r\n\t\t} else if (currentHash[currentHash.length - 1] === 'choose-menu' &&\r\n\t\t\tcurrentHash[currentHash.length - 2] === 'battle-field' && [...allAudio].some(element => element.paused)) {\r\n\t\t\tmainAudio.play();\r\n\t\t\taudio.pause();\r\n\t\t}\r\n\r\n\t\tif ([...allAudio].every(element => element.paused)) {\r\n\t\t\tsoundOffOn.className = 'fas fa-volume-mute soundIcon';\r\n\t\t} else {\r\n\t\t\tsoundOffOn.className = 'fas fa-volume-up soundIcon';\r\n\t\t}\r\n\t}\r\n}('.soundIcon'));\r\n\r\n// shake display when character choosed\r\nfunction shakeAnimation(queryElement, direction = 'horizontal') {\r\n\tconst element = document.querySelector(queryElement);\r\n\r\n\tswitch (direction) {\r\n\t\tcase 'horizontal':\r\n\t\t\telement.classList.remove('shakeX');\r\n\t\t\tsetTimeout(() => element.classList.add('shakeX'), 0);\r\n\t\t\tsetTimeout(() => element.classList.remove('shakeX'), 400);\r\n\t\t\tbreak;\r\n\t\tcase 'vertical':\r\n\t\t\telement.classList.remove('shakeY');\r\n\t\t\tsetTimeout(() => element.classList.add('shakeY'), 0);\r\n\t\t\tsetTimeout(() => element.classList.remove('shakeY'), 400);\r\n\t\t\tbreak;\r\n\t\tcase 'mix':\r\n\t\t\telement.classList.remove('shakeMix');\r\n\t\t\tsetTimeout(() => element.classList.add('shakeMix'), 0);\r\n\t\t\tsetTimeout(() => element.classList.remove('shakeMix'), 400);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\nfunction createCardAnim(querySelector, amount) {\r\n\tlet elementAnim = document.querySelector(querySelector);\r\n\r\n\tswitch (amount) {\r\n\t\tcase 'single':\r\n\t\t\tfor (let i = 0; i < [...elementAnim.children].length; i++) {\r\n\t\t\t\tif (elementAnim.children[i].classList.contains('cardsDrawAnim')) {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t} else {\r\n\t\t\t\t\telementAnim.children[i].classList.add('cardsDrawAnim');\r\n\r\n\t\t\t\t\tplaySoundEffect('.push-card-audio');\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tbreak;\r\n\t\tcase 'multiple':\r\n\t\t\t[...elementAnim.children].forEach((element, index) => setTimeout(() => {\r\n\t\t\t\telement.classList.add('cardsDrawAnim');\r\n\r\n\t\t\t\tplaySoundEffect('.push-card-audio');\r\n\t\t\t}, 250 * index));\r\n\t\t\tbreak;\r\n\t\tcase 'overlay':\r\n\t\t\t[...elementAnim.children].forEach(element => element.classList.add('cardsDrawAnim'));\r\n\t}\r\n}\r\n\r\nfunction endTurnAnim(side) {\r\n\tconst button = document.querySelector('.end-of-turn-btn');\r\n\tconst turnAnnouncer = document.querySelector('.players-action');\r\n\r\n\tturnAnnouncer.classList.add('players-turn-info');\r\n\r\n\tswitch (side) {\r\n\t\tcase 'left':\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\tbutton.style.removeProperty('right');\r\n\t\t\t\tbutton.style.left = '5%';\r\n\t\t\t}, 500);\r\n\t\t\tbreak;\r\n\t\tcase 'right':\r\n\t\t\tsetTimeout(() => {\r\n\t\t\t\tbutton.style.removeProperty('left');\r\n\t\t\t\tbutton.style.right = '5%';\r\n\t\t\t}, 500);\r\n\t\t\tbreak;\r\n\t}\r\n\r\n\tsetTimeout(() => button.classList.add('endTurnAnim'), 1300);\r\n\r\n\tsetTimeout(() => turnAnnouncer.classList.remove('players-turn-info'), 2100);\r\n\r\n\tsetTimeout(() => button.classList.remove('endTurnAnim'), 1000);\r\n}\r\n\r\nfunction blockAnimationEffect(querySelector) {\r\n\tconst container = document.querySelector(querySelector).parentElement;\r\n\tconst image = document.createElement('img');\r\n\r\n\timage.src = '../images/icons/Icon_Block.png';\r\n\timage.className = 'shield';\r\n\r\n\tcontainer.appendChild(image);\r\n\r\n\tsetTimeout(() => container.removeChild(image), 1000);\r\n}\r\n\r\nfunction attackAnimation(querySelector, className, src) {\r\n\tconst container = document.querySelector(querySelector).parentElement;\r\n\tconst image = document.createElement('img');\r\n\r\n\timage.src = src;\r\n\timage.className = className;\r\n\r\n\tcontainer.appendChild(image);\r\n\r\n\tsetTimeout(() => container.removeChild(image), 600);\r\n}\r\n\r\nfunction playSoundEffect(querySelector) {\r\n\tconst soundEffect = document.querySelector(querySelector);\r\n\r\n\tsoundEffect.currentTime = 0;\r\n\r\n\tsoundEffect.play();\r\n}\r\n\r\nfunction attackAnimationEffect(querySelector, direction) {\r\n\tconst container = document.querySelector(querySelector);\r\n\r\n\tswitch (direction) {\r\n\t\tcase 'right':\r\n\t\t\tcontainer.classList.add('attackRight');\r\n\r\n\t\t\tsetTimeout(() => container.classList.remove('attackRight'), 1000);\r\n\t\t\tbreak;\r\n\t\tcase 'left':\r\n\t\t\tcontainer.classList.add('attackLeft');\r\n\r\n\t\t\tsetTimeout(() => container.classList.remove('attackLeft'), 1000);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://cardgameproject/./js/animation_and_sound_effects/animation.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./js/SPAcontroller.js");
/******/ 	
/******/ })()
;