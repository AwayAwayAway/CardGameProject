import {checkBackgroundAudio, loading} from './animation_and_sound_effects/animation.js';
import '../scss/main.scss';

let gameConstructor = {};

document.addEventListener('DOMContentLoaded', gameConstructorInit);

// change hash
document.addEventListener('click', (event) => switchHash(event));

window.addEventListener('hashchange', renderPage);

function renderPage() {
	const hash = window.location.hash;
	const state = decodeURIComponent(hash.substr(1));

	switch (state) {
		case '':
			loading('mainMenuLoad');
			document.title = 'Main menu';
			setTimeout(() => createMainPage(gameConstructor.mainMenu), 500)
			break;
		case 'choose-menu':
			loading('chooseMenuLoad');
			setTimeout(() => createMainPage(gameConstructor.chooseMenu), 500);
			break;
		case 'main-menu':
			loading('mainMenuLoad');
			setTimeout(() => createMainPage(gameConstructor.mainMenu), 500);
			break;
		case 'battle-field':
			loading('battleFieldLoad');
			setTimeout(() => createMainPage(gameConstructor.battle), 500);
			break;
	}

	setTimeout(() => checkBackgroundAudio(), 550) ;
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
	}
}

function gameConstructorInit() {
	$.ajax(
		{
			url: 'json/main_menu.json',
			type: 'GET',
			dataType: 'json',
			success: saveMainMenu,
			error: errorHandler
		}
	);
}

function saveMainMenu(data) {
	gameConstructor.mainMenu = data;

	$.ajax(
		{
			url: 'json/choose_menu.json',
			type: 'GET',
			dataType: 'json',
			success: saveChooseMenu,
			error: errorHandler
		}
	);
}

function saveChooseMenu(data) {
	gameConstructor.chooseMenu = data;

	$.ajax(
		{
			url: 'json/battle.json',
			type: 'GET',
			dataType: 'json',
			success: saveBattle,
			error: errorHandler
		}
	);

}

function saveBattle(data) {
	gameConstructor.battle = data;

	renderPage();
}

function errorHandler(jqXHR, statusStr, errorStr) {
	alert(statusStr + ' ' + errorStr);
}

// create page from JSON functions
function createMainPage(object) {
	const body = document.querySelector('body');
	const wrapperEl = document.querySelector('.wrapper');
	const scriptEl = document.querySelector('.script');

	let parent;
	let mainChild;
	let child;
	let subChild;
	let lowestChild;
	let script;

	for (let i = 0; i < object.length; i++) {
		for (let key in object[i]) {
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
	let element = document.createElement(obj.tagName);
	element.setAttribute('class', obj.class);
	element.textContent = obj.content || '';

	if (obj.source) {
		element.src = obj.source;
	}

	if (obj.data) {
		element.setAttribute(`${obj.data}`, `${obj.dataValue}`);
	}

	if (obj.type) {
		element.setAttribute(`${obj.type}`, `${obj.typeValue}`);
	}

	if (obj.tagName === 'script') {
		element.setAttribute('defer', 'defer');
	}

	return element;
}

