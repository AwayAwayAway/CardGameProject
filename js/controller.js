// first page load
const xhr = new XMLHttpRequest();

xhr.open('get', 'js/battle.json');
xhr.onload = function () {
	let resObj = {};
	if(this.status === 200) {
		resObj = JSON.parse(xhr.responseText);
		createMainMenu(resObj);
	} else {
		console.log('json doesnt loaded')
	}
}
xhr.send();

// load page on click
document.addEventListener('click', function (e) {

	if(e.target.classList.contains('startButton')) {
		const xhr = new XMLHttpRequest();

		xhr.open('get', 'js/choose_menu.json');

		xhr.onload = function () {
			let resObj = {};
			if(this.status === 200) {
				document.title = 'Card game - choose menu'
				resObj = JSON.parse(xhr.responseText);
				createMainMenu(resObj);
			} else {
				console.log('json doesnt loaded')
			}
		}

		xhr.send();
	}
})

document.addEventListener('click', function (e) {

	if(e.target.classList.contains('back-to-main-menu')) {
		const xhr = new XMLHttpRequest();

		xhr.open('get', 'js/main_menu.json');

		xhr.onload = function () {
			let resObj = {};
			if(this.status === 200) {
				document.title = 'Card game - choose menu'
				resObj = JSON.parse(xhr.responseText);
				createMainMenu(resObj);
			} else {
				console.log('json doesnt loaded')
			}
		}

		xhr.send();
	}
})

document.addEventListener('click', function (e) {

	if(e.target.classList.contains('startGame')) {
		const xhr = new XMLHttpRequest();

		xhr.open('get', 'js/battle.json');

		xhr.onload = function () {
			let resObj = {};
			if(this.status === 200) {
				document.title = 'Card game - choose menu'
				resObj = JSON.parse(xhr.responseText);
				createMainMenu(resObj);
			} else {
				console.log('json doesnt loaded')
			}
		}

		xhr.send();
	}
})

// create page from JSON functions
function createMainMenu (object) {
	const body = document.querySelector('body');
	body.removeChild(body.lastChild);
	body.removeChild(body.lastChild);
	let parent;
	let mainChild;
	let child;
	let subChild;
	let lowestChild;

	for(let i = 0; i < object.length; i++) {
		for(let key in object[i]) {
			switch (object[i][key] ) {
				case 'parent':
					parent = createElement(object[i]);
					body.appendChild( parent );
					break;
				case 'mainChild':
					mainChild = createElement(object[i]);
					parent.appendChild( mainChild );
					break;
				case 'child':
					child = createElement(object[i]);
					mainChild.appendChild( child );
					break;
				case 'subChild':
					subChild = createElement(object[i]);
					child.appendChild( subChild );
					break;
				case 'lowestChild':
					lowestChild = createElement(object[i]);
					subChild.appendChild( lowestChild );
					break;
			}
		}
	}
}

function createElement(obj) {
	let element = document.createElement(obj.tagName);
	element.setAttribute('class', obj.class);
	element.textContent = obj.content || '';

	if(obj.source) {
		element.src = obj.source;
	}

	if(obj.data) {
		element.setAttribute(`${obj.data}`, `${obj.dataValue}`)
	}

	if(obj.type) {
		element.setAttribute(`${obj.type}`, `${obj.typeValue}`)
	}

	return element;
}

function createSvg(obj) {
	let element = document.createElement(obj.tagName);
	element.setAttribute('class', obj.class);
	element.setAttribute('type', obj.type);
	element.setAttribute('data', obj.source);

	return element;
}