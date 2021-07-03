const mainMenu = [
	{
		id: 0,
		role: 'parent',
		tagName: 'div',
		class: 'wrapper',
		content: null,
	},
	{
		id: 2,
		role: 'mainChild',
		tagName: 'div',
		class: 'main-menu',
		content: null,
	},
	{
		id: 3,
		role: 'child',
		tagName: 'div',
		class: 'start',
		content: 'Start battle',
	},
	{
		id: 4,
		role: 'child',
		tagName: 'div',
		class: 'about',
		content: 'About game',
	},
	{
		id: 1,
		// role: 'mainChild',
		tagName: 'object',
		source: 'css/images/icons/icon-sound.svg',
		type: 'image/svg+xml',
		class: 'soundIcon',
		content: null,
	},
	{
		id: 5,
		role: 'mainChild',
		tagName: 'audio',
		source: 'sounds/main-menu-theme.ogg',
		class: 'background-music',
		content: null,
	},
	{
		id: 5,
		role: 'mainChild',
		tagName: 'audio',
		source: 'sounds/btn-hover.ogg',
		class: 'btn-hover',
		content: null,
	},
	{
		id: 5,
		role: 'mainChild',
		tagName: 'audio',
		source: 'sounds/btn-click.ogg',
		class: 'btn-click',
		content: null,
	}
]

createMainMenu(mainMenu);

function createMainMenu (object) {
	const body = document.querySelector('body');
	let parent;
	let mainChild;
	let child;

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
				case 'object':
					mainChild = createSvg(object[i]);
					parent.appendChild( mainChild );
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

	return element;
}

function createSvg(obj) {
	let element = document.createElement(obj.tagName);
	element.setAttribute('class', obj.class);
	element.setAttribute('type', obj.type);
	element.setAttribute('data', obj.source);

	return element;
}



// const audio = document.querySelector('.background-music');
// const start = document.querySelector('.start');
// const about = document.querySelector('.about');
// const mainSound = document.querySelector('#soundIcon1');
//
//

//
// function playBackgroundMusic() {
// 	const audio = document.querySelector('.background-music');
// 	audio.autoplay = true;
// 	audio.loop = true;
// 	audio.play();
// }
//
// function stopPlayBackgroundMusic() {
// 	const audio = document.querySelector('.background-music');
// 	if(audio.play) {
// 		audio.pause();
// 	} else {
// 		audio.play
// 	}
//
// }
//
// function playBtnClicked() {
// 	const btnClick = document.querySelector('.btn-click');
// 	btnClick.play()
// }
//
// function playBtnHover() {
// 	const btnHover = document.querySelector('.btn-hover');
// 	btnHover.play()
// }
//
// document.addEventListener('click', playBackgroundMusic)
// start.addEventListener('mouseover', playBtnHover);
// start.addEventListener('click', playBtnClicked);
// mainSound.addEventListener('click', stopPlayBackgroundMusic);





