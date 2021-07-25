/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/SPAcontroller.js":
/*!*****************************!*\
  !*** ./js/SPAcontroller.js ***!
  \*****************************/
/***/ (() => {

eval("let gameConstructor = {};\r\n\r\ndocument.addEventListener('DOMContentLoaded', gameConstructorInit);\r\n\r\n// change hash\r\ndocument.addEventListener('click', (event) => gameNavigator(event));\r\n\r\nwindow.addEventListener('hashchange', renderPage);\r\n\r\nfunction renderPage() {\r\n\tconst hash = window.location.hash;\r\n\tconst state = decodeURIComponent(hash.substr(1));\r\n\r\n\tswitch (state) {\r\n\t\tcase '':\r\n\t\t\tloading('mainMenuLoad');\r\n\t\t\tdocument.title = 'Main menu';\r\n\t\t\tcreateMainMenu(gameConstructor.mainMenu);\r\n\t\t\tbreak;\r\n\t\tcase 'choose-menu':\r\n\t\t\tloading('chooseMenuLoad');\r\n\t\t\tsetTimeout(() => createMainMenu(gameConstructor.chooseMenu), 500);\r\n\t\t\tbreak;\r\n\t\tcase 'main-menu':\r\n\t\t\tloading('mainMenuLoad');\r\n\t\t\tsetTimeout(() => createMainMenu(gameConstructor.mainMenu), 500);\r\n\t\t\tbreak;\r\n\t\tcase 'battle-field':\r\n\t\t\tloading('battleFieldLoad');\r\n\t\t\tsetTimeout(() => createMainMenu(gameConstructor.battle), 500);\r\n\t\t\tbreak;\r\n\t}\r\n}\r\n\r\nfunction gameNavigator(event) {\r\n\tif (event.target.classList.contains('startButton')) {\r\n\t\tdocument.title = 'Choose menu';\r\n\t\tlocation.hash = decodeURIComponent('choose-menu');\r\n\t}\r\n\r\n\tif (event.target.classList.contains('back-to-main-menu')) {\r\n\t\tdocument.title = 'Main menu';\r\n\t\tlocation.hash = decodeURIComponent('main-menu');\r\n\t}\r\n\r\n\tif (event.target.classList.contains('startGame')) {\r\n\t\tdocument.title = 'Battlefield';\r\n\t\tlocation.hash = decodeURIComponent('battle-field');\r\n\t}\r\n}\r\n\r\nfunction gameConstructorInit() {\r\n\t$.ajax(\r\n\t\t{\r\n\t\t\turl: 'json/main_menu.json',\r\n\t\t\ttype: 'GET',\r\n\t\t\tdataType: 'json',\r\n\t\t\tsuccess: saveMainMenu,\r\n\t\t\terror: errorHandler\r\n\t\t}\r\n\t);\r\n}\r\n\r\nfunction saveMainMenu(data) {\r\n\tgameConstructor.mainMenu = data;\r\n\r\n\t$.ajax(\r\n\t\t{\r\n\t\t\turl: 'json/choose_menu.json',\r\n\t\t\ttype: 'GET',\r\n\t\t\tdataType: 'json',\r\n\t\t\tsuccess: saveChooseMenu,\r\n\t\t\terror: errorHandler\r\n\t\t}\r\n\t);\r\n}\r\n\r\nfunction saveChooseMenu(data) {\r\n\tgameConstructor.chooseMenu = data;\r\n\r\n\t$.ajax(\r\n\t\t{\r\n\t\t\turl: 'json/battle.json',\r\n\t\t\ttype: 'GET',\r\n\t\t\tdataType: 'json',\r\n\t\t\tsuccess: saveBattle,\r\n\t\t\terror: errorHandler\r\n\t\t}\r\n\t);\r\n\r\n}\r\n\r\nfunction saveBattle(data) {\r\n\tgameConstructor.battle = data;\r\n\r\n\trenderPage();\r\n}\r\n\r\nfunction errorHandler(jqXHR, statusStr, errorStr) {\r\n\talert(statusStr + ' ' + errorStr);\r\n}\r\n\r\n// create page from JSON functions\r\nfunction createMainMenu(object) {\r\n\tconst body = document.querySelector('body');\r\n\tconst wrapperEl = document.querySelector('.wrapper');\r\n\tconst scriptEl = document.querySelector('.script');\r\n\r\n\tlet parent;\r\n\tlet mainChild;\r\n\tlet child;\r\n\tlet subChild;\r\n\tlet lowestChild;\r\n\tlet script;\r\n\r\n\tfor (let i = 0; i < object.length; i++) {\r\n\t\tfor (let key in object[i]) {\r\n\t\t\tswitch (object[i][key]) {\r\n\t\t\t\tcase 'parent':\r\n\t\t\t\t\tparent = createElement(object[i]);\r\n\t\t\t\t\t// body.appendChild(parent);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'mainChild':\r\n\t\t\t\t\tmainChild = createElement(object[i]);\r\n\t\t\t\t\tparent.appendChild(mainChild);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'child':\r\n\t\t\t\t\tchild = createElement(object[i]);\r\n\t\t\t\t\tmainChild.appendChild(child);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'subChild':\r\n\t\t\t\t\tsubChild = createElement(object[i]);\r\n\t\t\t\t\tchild.appendChild(subChild);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'lowestChild':\r\n\t\t\t\t\tlowestChild = createElement(object[i]);\r\n\t\t\t\t\tsubChild.appendChild(lowestChild);\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tcase 'script':\r\n\t\t\t\t\tscript = createElement(object[i]);\r\n\t\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tif (wrapperEl) {\r\n\t\tbody.replaceChild(parent, wrapperEl);\r\n\t} else {\r\n\t\tbody.appendChild(parent);\r\n\t}\r\n\r\n\tif (scriptEl) {\r\n\t\tbody.replaceChild(script, scriptEl);\r\n\t} else {\r\n\t\tbody.appendChild(script);\r\n\t}\r\n}\r\n\r\nfunction createElement(obj) {\r\n\tlet element = document.createElement(obj.tagName);\r\n\telement.setAttribute('class', obj.class);\r\n\telement.textContent = obj.content || '';\r\n\r\n\tif (obj.source) {\r\n\t\telement.src = obj.source;\r\n\t}\r\n\r\n\tif (obj.data) {\r\n\t\telement.setAttribute(`${obj.data}`, `${obj.dataValue}`);\r\n\t}\r\n\r\n\tif (obj.type) {\r\n\t\telement.setAttribute(`${obj.type}`, `${obj.typeValue}`);\r\n\t}\r\n\r\n\tif (obj.tagName === 'script') {\r\n\t\telement.setAttribute('defer', 'defer');\r\n\t}\r\n\r\n\treturn element;\r\n}\r\n\n\n//# sourceURL=webpack://cardgameproject/./js/SPAcontroller.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/SPAcontroller.js"]();
/******/ 	
/******/ })()
;