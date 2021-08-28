import {checkBackgroundAudio, loadingScreenAnimation} from './animation_and_sound_effects/animation.js';
import '../scss/main.scss';

let gameConstructor = {};

document.addEventListener('DOMContentLoaded', gameConstructorInit);

// change hash
document.addEventListener('click', (event) => switchHash(event));

window.addEventListener('hashchange', renderPage);

function renderPage() {
	const hash = decodeURIComponent(window.location.hash.substr(1));

	switch (hash) {
		case '':
			loadingScreenAnimation('mainMenuLoad');

			document.title = 'Main menu';

			setTimeout(() => createMainPage(gameConstructor.mainMenu), 500)

			break;
		case 'choose-menu':
			loadingScreenAnimation('chooseMenuLoad');

			setTimeout(() => createMainPage(gameConstructor.chooseMenu), 500);

			break;
		case 'main-menu':
			loadingScreenAnimation('mainMenuLoad');

			setTimeout(() => createMainPage(gameConstructor.mainMenu), 500);

			break;
		case 'battle-field':
			loadingScreenAnimation('battleFieldLoad');

			setTimeout(() => createMainPage(gameConstructor.battle), 500);

			break;
		case 'restoredGame':
			loadingScreenAnimation('battleFieldLoad');

			setTimeout(() => createMainPage(gameConstructor.battle), 500);

			break;
	}

	setTimeout(() => checkBackgroundAudio('.sound-icon'), 600);
}

function switchHash(event) {
	switch (event.target.className.split(' ')[0]) {
		case 'start-button':
			document.title = 'Choose menu';
			location.hash = decodeURIComponent('choose-menu');

			break;
		case 'back-to-main-menu':
			document.title = 'Main menu';
			location.hash = decodeURIComponent('main-menu');

			break;
		case 'start-game':
			document.title = 'Battlefield';
			location.hash = decodeURIComponent('battle-field');

			break;
		case 'continue-button':
			document.title = 'Battlefield';
			location.hash = decodeURIComponent('restoredGame');

			break;
	}
}

function gameConstructorInit() {
	fetch('json/main_menu.json')
		.then(res => res.json())
		.then(data => {
			gameConstructor.mainMenu = data;

			fetch('json/choose_menu.json')
				.then(res => res.json())
				.then(data => {
					gameConstructor.chooseMenu = data;

					fetch('json/battle.json')
						.then(res => res.json())
						.then(data => {
							gameConstructor.battle = data;

							renderPage()
						});
				});
		});
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

