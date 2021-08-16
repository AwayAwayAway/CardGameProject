// animation through all menu loading black screen
function loading(target) {
	switch (target) {
		case 'mainMenuLoad':
			let mainEl = document.createElement('div');

			mainEl.className = 'back-main-menu-anim';

			document.body.insertBefore(mainEl, document.querySelector('.wrapper-choose-menu'));

			setTimeout(() => document.body.removeChild(mainEl), 1100);
			break;
		case 'chooseMenuLoad':
			let chooseEl = document.createElement('div');

			chooseEl.className = 'go-to-choose-menu-anim';

			document.body.insertBefore(chooseEl, document.querySelector('.wrapper-main-menu'));

			setTimeout(() => document.body.removeChild(chooseEl), 1100);
			break;
		case 'battleFieldLoad':
			let battleEl = document.createElement('div');

			battleEl.className = 'start-game-anim';

			document.body.insertBefore(battleEl, document.querySelector('.wrapper-choose-menu'));

			setTimeout(() => document.body.removeChild(battleEl), 1100);
			break;
	}
}

// starting play backgorundMusic
function switchPlayPause() {
	const hash = window.location.hash;
	const state = decodeURIComponent(hash.substr(1));
	const soundOffOn = document.querySelector('.soundIcon');
	let backAudio;

	if (state == 'battle-field' || state == 'restoredGame') {
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

//# добавить вибрацию
const checkBackgroundAudio = (function (querySelector) {
	const currentHash = [];
	const mainAudio = document.querySelector('.background-music-main-menu');
	const audio = document.querySelector('.background-music-battlefield');
	const allAudio = document.querySelectorAll('.music');

	return function () {
		currentHash.push(decodeURIComponent(window.location.hash.substr(1)));

		const soundOffOn = document.querySelector(querySelector);

		if (currentHash[currentHash.length - 1] === 'battle-field' && [...allAudio].every(element => element.paused)) {
			mainAudio.pause();
			audio.pause();
		} else if (currentHash[currentHash.length - 1] === 'battle-field' && [...allAudio].some(element => element.paused)) {
			mainAudio.pause();
			audio.play();
		} else if (currentHash[currentHash.length - 1] === 'restoredGame' && [...allAudio].every(element => element.paused)) {
			mainAudio.pause();
			audio.pause();
		} else if (currentHash[currentHash.length - 1] === 'restoredGame' && [...allAudio].some(element => element.paused)) {
			mainAudio.pause();
			audio.play();
		} else if (currentHash[currentHash.length - 1] === 'main-menu' &&
			currentHash[currentHash.length - 2] === 'battle-field' ||  currentHash[currentHash.length - 2] === 'restoredGame' && [...allAudio].every(element => element.paused)) {
			mainAudio.pause();
			audio.pause();
		} else if (currentHash[currentHash.length - 1] === 'main-menu' &&
			currentHash[currentHash.length - 2] === 'battle-field' ||  currentHash[currentHash.length - 2] === 'restoredGame' && [...allAudio].some(element => element.paused)) {
			mainAudio.play();
			audio.pause();
		} else if (currentHash[currentHash.length - 1] === 'choose-menu' &&
			currentHash[currentHash.length - 2] === 'battle-field' ||  currentHash[currentHash.length - 2] === 'restoredGame' && [...allAudio].some(element => element.paused)) {
			mainAudio.play();
			audio.pause();
		} else if (currentHash[currentHash.length - 1] === 'choose-menu' &&
			currentHash[currentHash.length - 2] === 'battle-field' ||  currentHash[currentHash.length - 2] === 'restoredGame' && [...allAudio].every(element => element.paused)) {
			mainAudio.pause();
			audio.pause();
		}

		if ([...allAudio].every(element => element.paused)) {
			soundOffOn.className = 'fas fa-volume-mute soundIcon';
		} else {
			soundOffOn.className = 'fas fa-volume-up soundIcon';
		}
	};
}('.soundIcon'));

// shake display when character choosed
function shakeAnimation(queryElement, direction = 'horizontal') {
	const element = document.querySelector(queryElement);

	switch (direction) {
		case 'horizontal':
			element.classList.remove('shakeX');
			setTimeout(() => element.classList.add('shakeX'), 0);
			setTimeout(() => element.classList.remove('shakeX'), 400);
			break;
		case 'vertical':
			element.classList.remove('shakeY');
			setTimeout(() => element.classList.add('shakeY'), 0);
			setTimeout(() => element.classList.remove('shakeY'), 400);
			break;
		case 'mix':
			element.classList.remove('shakeMix');
			setTimeout(() => element.classList.add('shakeMix'), 0);
			setTimeout(() => element.classList.remove('shakeMix'), 400);
			break;
	}
}

function createCardAnim(querySelector, amount) {
	let elementAnim = document.querySelector(querySelector);

	switch (amount) {
		case 'single':
			for (let i = 0; i < [...elementAnim.children].length; i++) {
				if (elementAnim.children[i].classList.contains('cardsDrawAnim')) {
					continue;
				} else {
					elementAnim.children[i].classList.add('cardsDrawAnim');

					playSoundEffect('.push-card-audio');
				}
			}
			break;
		case 'multiple':
			[...elementAnim.children].forEach((element, index) => setTimeout(() => {
				element.classList.add('cardsDrawAnim');

				playSoundEffect('.push-card-audio');
			}, 250 * index));
			break;
		case 'overlay':
			[...elementAnim.children].forEach(element => element.classList.add('cardsDrawAnim'));
	}
}

function discardCardAnim(querySelector) {
	querySelector.classList.add('cardDiscard');
}

function endTurnAnim(side) {
	const button = document.querySelector('.end-of-turn-btn');
	const turnAnnouncer = document.querySelector('.players-action');

	turnAnnouncer.classList.add('players-turn-info');

	switch (side) {
		case 'left':
			setTimeout(() => {
				button.style.removeProperty('right');
				button.style.left = '2%';
			}, 500);
			break;
		case 'right':
			setTimeout(() => {
				button.style.removeProperty('left');
				button.style.right = '2%';
			}, 500);
			break;
	}

	setTimeout(() => button.classList.add('endTurnAnim'), 1300);

	setTimeout(() => turnAnnouncer.classList.remove('players-turn-info'), 2100);

	setTimeout(() => button.classList.remove('endTurnAnim'), 1000);
}

function attackAnimationEffect(querySelector, direction) {
	const container = document.querySelector(querySelector);

	switch (direction) {
		case 'right':
			container.classList.add('attackRight');

			setTimeout(() => container.classList.remove('attackRight'), 1000);
			break;
		case 'left':
			container.classList.add('attackLeft');

			setTimeout(() => container.classList.remove('attackLeft'), 1000);
			break;
	}
}

function blockAnimationEffect(querySelector, className, src) {
	const container = document.querySelector(querySelector).parentElement;
	const image = document.createElement('img');

	image.src = src;
	image.className = className;

	container.appendChild(image);

	setTimeout(() => container.removeChild(image), 1000);
}

function attackAnimation(querySelector, className, src) {
	const container = document.querySelector(querySelector).parentElement;
	const image = document.createElement('img');

	image.src = src;
	image.style.transform = `rotate(${Math.floor(Math.random() * (360 - 1) + 1)}deg)`;
	image.className = className;

	container.appendChild(image);

	window.navigator.vibrate([400]);

	setTimeout(() => container.removeChild(image), 600);
}

function standartAttackAnimation(querySelector, className, src) {
	const container = document.querySelector(querySelector).parentElement;
	const image = document.createElement('img');

	image.src = src;
	image.className = className;

	container.appendChild(image);

	window.navigator.vibrate([400]);

	setTimeout(() => container.removeChild(image), 400);
}

function multipleAttackAnimation(querySelector, className, src, amountEffect) {
	const container = document.querySelector(querySelector).parentElement;

	let effectStorage = [];

	for (let i = 0; i < amountEffect; i++) {
		const image = document.createElement('img');
		effectStorage.push(image);
	}

	effectStorage.forEach((elem, index) => {
		elem.src = src;

		if (index === 1) {
			elem.style.transform = 'rotate(30deg)';
		} else if (index === 2) {
			elem.style.transform = 'rotate(315deg)';
		}

		elem.className = className;

		setTimeout(() => {
			container.appendChild(elem);

			window.navigator.vibrate([300, 150, 300, 150, 300]);

			playSoundEffect('.strike-attack-audio');

			setTimeout(() => container.removeChild(elem), 400);
		}, index * 300);
	});
}

function ultimateSkillAnimation(querySelector, className, src, audio) {
	const container = document.querySelector(querySelector).parentElement;
	const overlay = document.querySelector('.players-overlay');
	const overlayClose = document.querySelector('.players-overlay__close');
	const image = document.createElement('img');

	image.src = src;
	image.className = className;

	overlay.classList.remove('hidden');
	overlay.classList.add('fade-in');
	overlayClose.classList.add('hidden');

	setTimeout(() => {
		container.appendChild(image);

		window.navigator.vibrate(1000);

		shakeAnimation(querySelector)

		playSoundEffect(audio);
	}, 200);

	setTimeout(() => {
		container.removeChild(image);
		overlay.classList.add('fade-out');

	}, 1250);

	setTimeout(() => {
		overlay.classList.add('hidden');
		overlay.classList.remove('fade-in');
		overlay.classList.remove('fade-out');
		overlayClose.classList.remove('hidden');
	}, 1600);
}

function playSoundEffect(querySelector) {
	const soundEffect = document.querySelector(querySelector);

	if (!soundEffect) {
		return;
	}

	soundEffect.currentTime = 0;

	soundEffect.play();
}

function damageNumbersAnimation(querySelector, className, content) {
	const container = document.querySelector(querySelector).parentElement;

	const divEl = document.createElement('div');
	divEl.textContent = content;
	divEl.className = className;

	container.appendChild(divEl);

	setTimeout(() => container.removeChild(divEl), 1500);
}

export {
	loading, switchPlayPause, checkBackgroundAudio, shakeAnimation,
	createCardAnim, endTurnAnim, blockAnimationEffect, attackAnimation,
	playSoundEffect, attackAnimationEffect, multipleAttackAnimation, discardCardAnim,
	standartAttackAnimation, ultimateSkillAnimation, damageNumbersAnimation
};




