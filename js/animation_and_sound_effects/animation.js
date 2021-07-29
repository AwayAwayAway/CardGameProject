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

// soundsHover and click buttons
	function playBtnClicked() {
		const btnClick = document.querySelector('.btn-click-audio');
		btnClick.play();
	}
	function playBtnHover() {
		const btnHover = document.querySelector('.btn-hover-audio');
		btnHover.play();
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

	// audio effect when character choosed /** choose menu **/
	function playAudioCharacterSelected(character) {
		let warriorSelected = document.querySelector('.warrior-selected');
		let rogueSelected = document.querySelector('.rogue-selected');
		let mageSelected = document.querySelector('.mage-selected');

		switch (character) {
			case 'warrior':
				warriorSelected.play();
				break;
			case 'rogue':
				rogueSelected.play();
				break;
			case 'mage':
				mageSelected.play();
				break;
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
}

