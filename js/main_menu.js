{
	const main_menu = document.querySelector('.wrapper-main-menu');

	const soundOffOn = document.querySelector('.soundIcon');

	const audio = document.querySelector('.background-music');

	// check on sound on/off icon
	if (audio.paused) {
		soundOffOn.className = 'fas fa-volume-mute soundIcon';
	} else {
		soundOffOn.className = 'fas fa-volume-up soundIcon';
	}

	// // starting play backgorundMusic
	// function playBackgroundMusic() {
	// 	audio.autoplay = true;
	// 	audio.loop = true;
	// 	audio.play();
	// 	document.removeEventListener('click', playBackgroundMusic);
	// 	if (audio.paused) {
	// 		soundOffOn.className = 'fas fa-volume-mute soundIcon';
	// 	} else {
	// 		soundOffOn.className = 'fas fa-volume-up soundIcon';
	// 	}
	// }
	//
	// // pause backgorundMusic
	// function stopPlayBackgroundMusic() {
	// 	if (!audio.paused) {
	// 		audio.pause();
	// 		soundOffOn.className = 'fas fa-volume-mute soundIcon';
	// 	} else {
	// 		audio.play();
	// 		soundOffOn.className = 'fas fa-volume-up soundIcon';
	// 	}
	// }

	// // soundsHover and click buttons
	// function playBtnClicked() {
	// 	const btnClick = document.querySelector('.btn-click-audio');
	// 	btnClick.play();
	// }
	//
	// function playBtnHover() {
	// 	const btnHover = document.querySelector('.btn-hover-audio');
	// 	btnHover.play();
	// }

	soundOffOn.addEventListener('click', playBackgroundMusic);

	// soundOffOn.addEventListener('click', stopPlayBackgroundMusic);

	[...main_menu.children].forEach((hover) => {
		hover.addEventListener('mouseover', playBtnHover);
	});

	[...main_menu.children].forEach((click) => {
		click.addEventListener('click', playBtnClicked);
	});
}