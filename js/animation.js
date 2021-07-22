{
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

	// pause backgorundMusic
	function stopPlayBackgroundMusic() {
		const audio = document.querySelector('.background-music');
		const soundOffOn = document.querySelector('.soundIcon');

		if (!audio.paused) {
			audio.pause();
			soundOffOn.className = 'fas fa-volume-mute soundIcon';
		} else {
			audio.play();
			soundOffOn.className = 'fas fa-volume-up soundIcon';
		}
	}

	// player turn start
	function startTurnAnimation() {

	}
}

