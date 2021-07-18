let gameConstructor = {};

document.addEventListener('DOMContentLoaded', gameConstructorInit);

// load page on click
document.addEventListener('click', (event) => gameNavigator(event));

function gameNavigator(event) {
	if (event.target.classList.contains('startButton')) {
		createMainMenu(gameConstructor.chooseMenu);
	}

	if (event.target.classList.contains('back-to-main-menu')) {
		createMainMenu(gameConstructor.mainMenu);
	}

	if (event.target.classList.contains('startGame')) {
		createMainMenu(gameConstructor.battle);
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

	createMainMenu(gameConstructor.mainMenu);
}

function errorHandler(jqXHR, statusStr, errorStr) {
	alert(statusStr + ' ' + errorStr);
}

// create page from JSON functions
function createMainMenu(object) {
	const body = document.querySelector('body');
	body.removeChild(body.lastChild);
	body.removeChild(body.lastChild);
	let parent;
	let mainChild;
	let child;
	let subChild;
	let lowestChild;

	for (let i = 0; i < object.length; i++) {
		for (let key in object[i]) {
			switch (object[i][key]) {
				case 'parent':
					parent = createElement(object[i]);
					body.appendChild(parent);
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
			}
		}
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