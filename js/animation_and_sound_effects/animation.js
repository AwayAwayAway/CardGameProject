{
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
	function playBackgroundMusic() {
		const audio = document.querySelector('.background-music');
		const soundOffOn = document.querySelector('.soundIcon');

		// audio.autoplay = true;
		// audio.loop = true;
		// audio.play();
		// document.removeEventListener('click', playBackgroundMusic);

		if (audio.paused) {
			audio.play();
			soundOffOn.className = 'fas fa-volume-up soundIcon';
		} else {
			audio.pause();
			soundOffOn.className = 'fas fa-volume-mute soundIcon';
		}
	}

	function checkOnAudioPlay() {
		const soundOffOn = document.querySelector('.soundIcon');
		const backAudio = document.querySelector('.background-music');

		if (backAudio.paused) {
			soundOffOn.className = 'fas fa-volume-mute soundIcon';
		} else {
			soundOffOn.className = 'fas fa-volume-up soundIcon';
		}
	}

	// shake display when character choosed
	function shakeAnimation(queryElement, direction = 'horizontal') {
		const element = document.querySelector(queryElement)

		switch (direction) {
			case 'horizontal':
				element.classList.remove('shakeX');
				setTimeout(() =>  element.classList.add('shakeX'), 0);
				setTimeout(() => element.classList.remove('shakeX'), 400);
				break;
			case 'vertical':
				element.classList.remove('shakeY');
				setTimeout(() =>  element.classList.add('shakeY'), 0);
				setTimeout(() => element.classList.remove('shakeY'), 400);
				break;
			case 'mix':
				element.classList.remove('shakeMix');
				setTimeout(() =>  element.classList.add('shakeMix'), 0);
				setTimeout(() => element.classList.remove('shakeMix'), 400);
				break;
		}
	}

	function createCardAnim(querySelector, amount) {
		let elementAnim = document.querySelector(querySelector);

		switch (amount) {
			case 'single':
				for(let i = 0; i < [...elementAnim.children].length; i++) {
					if(elementAnim.children[i].classList.contains('cardsDrawAnim')) {
						continue;
					} else {
						elementAnim.children[i].classList.add('cardsDrawAnim');

						playSoundEffect('.push-card')
					}
				}
				break;
			case 'multiple':
				[...elementAnim.children].forEach((element, index) => setTimeout(() => {
					element.classList.add('cardsDrawAnim');

					playSoundEffect('.push-card');
				}, 250 * index));
				break;
			case 'overlay':
				[...elementAnim.children].forEach(element => element.classList.add('cardsDrawAnim') );
		}
	}

	function endTurnAnim(side) {
		const button = document.querySelector('.end-of-turn-btn');
		const turnAnnouncer = document.querySelector('.players-action');

		turnAnnouncer.classList.add('players-turn-info');

		switch (side) {
			case 'left':
				setTimeout(() => {
					button.style.removeProperty('right');
					button.style.left = '5%';
				}, 500);
				break;
			case 'right':
				setTimeout(() => {
					button.style.removeProperty('left');
					button.style.right = '5%';
				}, 500);
				break;
		}

		setTimeout(() => button.classList.add('endTurnAnim'), 1300);

		setTimeout(() => turnAnnouncer.classList.remove('players-turn-info'), 2100);

		setTimeout(() => button.classList.remove('endTurnAnim'), 1000);
	}


	function blockAnimationEffect(querySelector) {
		const container = document.querySelector(querySelector).parentElement;
		const image = document.createElement('img');

		image.src = '../images/icons/Icon_Block.png';
		image.className = 'shield';

		container.appendChild(image);

		setTimeout(() =>  container.removeChild(image), 1000);
	}

	function attackAnimation(querySelector, className, src) {
		const container = document.querySelector(querySelector).parentElement;
		const image = document.createElement('img');

		image.src = src;
		image.className = className;

		container.appendChild(image);

		setTimeout(() =>  container.removeChild(image), 600);
	}

	function playSoundEffect(querySelector) {
		const soundEffect = document.querySelector(querySelector);

		soundEffect.currentTime = 0;

		soundEffect.play();
	}

	function attackAnimationEffect(querySelector, direction) {
		const container = document.querySelector(querySelector);

		switch (direction) {
			case 'right':
				container.classList.add('attackRight');

				setTimeout(() =>  container.classList.remove('attackRight'), 1000);
				break;
			case 'left':
				container.classList.add('attackLeft');

				setTimeout(() =>  container.classList.remove('attackLeft'), 1000);
				break;
		}
	}
}
