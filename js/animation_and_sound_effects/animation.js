// animation through all menu loading black screen
const loadingScreenAnimation = target => {
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
};

// starting play backgorundMusic
const playPauseBackgroundAudio = () => {
	const hash = window.location.hash;
	const state = decodeURIComponent(hash.substr(1));
	const soundOffOn = document.querySelector('.sound-icon');
	let backAudio;

	if (state == 'battle-field' || state == 'restoredGame') {
		backAudio = document.querySelector('.background-music-battlefield');
	} else {
		backAudio = document.querySelector('.background-music-main-menu');
	}

	if (backAudio.paused) {
		backAudio.play();

		soundOffOn.className = 'fas fa-volume-up sound-icon';
	} else {
		backAudio.pause();

		soundOffOn.className = 'fas fa-volume-mute sound-icon';
	}
};

const checkBackgroundAudio = (querySelector) => {
	const currentHash = decodeURIComponent(window.location.hash.substr(1));
	const mainAudio = document.querySelector('.background-music-main-menu');
	const audio = document.querySelector('.background-music-battlefield');
	const allAudio = document.querySelectorAll('.music');

	const soundOffOn = document.querySelector(querySelector);

	switch (currentHash) {
		case 'battle-field':
			if (mainAudio.paused && audio.paused) {
				mainAudio.pause();

				audio.pause();
			} else {
				mainAudio.pause();

				audio.play();
			}

			break;
		case 'restoredGame':
			if (mainAudio.paused && audio.paused) {
				mainAudio.pause();

				audio.pause();
			} else {
				mainAudio.pause();

				audio.play();
			}

			break;
		case 'main-menu':
			if (mainAudio.paused && audio.paused) {
				mainAudio.pause();

				audio.pause();
			} else {
				audio.pause();

				mainAudio.play();
			}

			break;
		case 'choose-menu':
			if (mainAudio.paused && audio.paused) {
				mainAudio.pause();

				audio.pause();
			} else {
				audio.pause();

				mainAudio.play();
			}

			break;
	}

	if ([...allAudio].every(element => element.paused)) {
		soundOffOn.className = 'fas fa-volume-mute sound-icon';
	} else {
		soundOffOn.className = 'fas fa-volume-up sound-icon';
	}
};

// shake display when character choosed
const shakeAnimation = (queryElement, direction = 'horizontal') => {
	const element = document.querySelector(queryElement);

	switch (direction) {
		case 'horizontal':
			element.classList.remove('shake-x');

			setTimeout(() => element.classList.add('shake-x'), 0);

			setTimeout(() => element.classList.remove('shake-x'), 400);

			break;
		case 'vertical':
			element.classList.remove('shake-y');

			setTimeout(() => element.classList.add('shake-y'), 0);

			setTimeout(() => element.classList.remove('shake-y'), 400);

			break;
		case 'mix':
			element.classList.remove('shake-mix');

			setTimeout(() => element.classList.add('shake-mix'), 0);

			setTimeout(() => element.classList.remove('shake-mix'), 400);

			break;
	}
};

const createCardAnimation = (querySelector, amount) => {
	let elementAnim = document.querySelector(querySelector);

	switch (amount) {
		case 'single':
			for (let i = 0; i < [...elementAnim.children].length; i++) {
				if (elementAnim.children[i].classList.contains('card-draw-animation')) {
					continue;
				} else {
					elementAnim.children[i].classList.add('card-draw-animation');

					playSoundEffect('.push-card-audio');
				}
			}

			break;
		case 'multiple':
			[...elementAnim.children].forEach((element, index) => setTimeout(() => {
				element.classList.add('card-draw-animation');

				playSoundEffect('.push-card-audio');
			}, 250 * index));

			break;
		case 'overlay':
			[...elementAnim.children].forEach(element => element.classList.add('card-draw-animation'));

			break;
	}
};

const discardCardAnimation = querySelector => {
	querySelector.classList.add('card-discard-animation');
};

const endTurnAnimation = side => {
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

	button.style.display = 'flex';

	setTimeout(() => button.classList.add('end-turn-animation'), 1300);

	setTimeout(() => turnAnnouncer.classList.remove('players-turn-info'), 2100);

	setTimeout(() => button.classList.remove('end-turn-animation'), 1000);
};

const attackInDirectionAnimation = (querySelector, direction) => {
	const container = document.querySelector(querySelector);

	switch (direction) {
		case 'right':
			container.classList.add('attack-right-animation');

			setTimeout(() => container.classList.remove('attack-right-animation'), 1000);

			break;
		case 'left':
			container.classList.add('attack-left-animation');

			setTimeout(() => container.classList.remove('attack-left-animation'), 1000);

			break;
	}
};

const blockAnimation = (querySelector, className, src) => {
	const block = document.querySelector(`.${className}`);

	if(block) {
		block.parentElement.removeChild(block);
	}

	const container = document.querySelector(querySelector).parentElement;
	const image = src;

	image.className = className;

	container.appendChild(image);
};

const attackAnimation = (querySelector, className, src) => {
	const container = document.querySelector(querySelector).parentElement;
	const image = src;

	image.style.transform = `rotate(${Math.floor(Math.random() * (360 - 1) + 1)}deg)`;
	image.className = className;

	container.appendChild(image);

	window.navigator.vibrate([400]);

	setTimeout(() => container.removeChild(image), 600);
};

const standardAttackAnimation = (querySelector, className, src) => {
	const container = document.querySelector(querySelector).parentElement;
	const image = src;

	image.className = className;

	container.appendChild(image);

	window.navigator.vibrate([400]);

	setTimeout(() => container.removeChild(image), 400);
};

const multipleAttackAnimation = (querySelector, className, src, amountEffect) => {
	const container = document.querySelector(querySelector).parentElement;
	const image = src;

	for (let i = 0; i < amountEffect; i++) {
		setTimeout(() => {
			if (i === 1) {
				image.style.transform = 'rotate(30deg)';
			} else if (i === 2) {
				image.style.transform = 'rotate(315deg)';
			}

			image.className = className;

			container.appendChild(image);

			window.navigator.vibrate([200]);

			playSoundEffect('.strike-attack-audio');
		}, i * 300);
	}

	setTimeout(() => container.removeChild(image), 1300);
};

const ultimateSkillAnimation = (querySelector, className, src, audio) => {
	const container = document.querySelector(querySelector).parentElement;
	const overlay = document.querySelector('.players-overlay');
	const overlayClose = document.querySelector('.players-overlay__close');
	const image = src;

	image.className = className;

	overlay.classList.remove('hidden');
	overlay.classList.add('fade-in-animation');
	overlayClose.classList.add('hidden');

	setTimeout(() => {
		container.appendChild(image);

		window.navigator.vibrate(800);

		shakeAnimation(querySelector);

		playSoundEffect(audio);
	}, 200);

	setTimeout(() => {
		container.removeChild(image);

		overlay.classList.add('fade-out-animation');
	}, 1250);

	setTimeout(() => {
		overlay.classList.add('hidden');
		overlay.classList.remove('fade-in-animation');
		overlay.classList.remove('fade-out-animation');
		overlayClose.classList.remove('hidden');
	}, 1850);
};

const playSoundEffect = querySelector => {
	const soundEffect = document.querySelector(querySelector);

	if (!soundEffect) { return; }

	soundEffect.currentTime = 0;

	soundEffect.play();
};

const damageNumbersAnimation = (querySelector, className, content) => {
	const container = document.querySelector(querySelector).parentElement;
	const divEl = document.createElement('div');

	divEl.textContent = content;
	divEl.className = className;

	container.appendChild(divEl);

	setTimeout(() => container.removeChild(divEl), 1500);
};

const notEnoughStaminaAnimation = (player) => {
	let activePlayerUI;
	const divEl = document.createElement('div');
	const fistBubble = document.createElement('div');
	const secondBubble = document.createElement('div');
	const thirdBubble = document.createElement('div');

	if (player === 'player1') {
		activePlayerUI = document.querySelector('.player-1__model').parentElement;

		divEl.className = 'not-enough-stamina-player-1 fade-in-animation';
		fistBubble.className = 'not-enough-stamina-player-1__first-bubble';
		secondBubble.className = 'not-enough-stamina-player-1__second-bubble';
		thirdBubble.className = 'not-enough-stamina-player-1__third-bubble';
	} else {
		activePlayerUI = document.querySelector('.player-2__model').parentElement;

		divEl.className = 'not-enough-stamina-player-2 fade-in-animation';
		fistBubble.className = 'not-enough-stamina-player-2__first-bubble';
		secondBubble.className = 'not-enough-stamina-player-2__second-bubble';
		thirdBubble.className = 'not-enough-stamina-player-2__third-bubble';
	}

	thirdBubble.innerHTML = 'Not enough <span style = "color: brown;"> Energy</span>';

	divEl.appendChild(fistBubble);
	divEl.appendChild(secondBubble);
	divEl.appendChild(thirdBubble);

	activePlayerUI.appendChild(divEl);

	setTimeout(() => divEl.classList.add('fade-out-animation'), 1500);

	setTimeout(() => activePlayerUI.removeChild(divEl), 2000);
};

export {
	loadingScreenAnimation, playPauseBackgroundAudio, checkBackgroundAudio, shakeAnimation,
	createCardAnimation, discardCardAnimation, endTurnAnimation, attackInDirectionAnimation,
	blockAnimation, attackAnimation, standardAttackAnimation, multipleAttackAnimation,
	ultimateSkillAnimation, playSoundEffect, damageNumbersAnimation, notEnoughStaminaAnimation
};




