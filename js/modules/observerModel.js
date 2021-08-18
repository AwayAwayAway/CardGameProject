import {gameObserver, boardView} from '../game';
import {playSoundEffect} from '../animation_and_sound_effects/animation';

const endGame = mutations => {
	if (mutations[0]['target'].classList.contains('player-1__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
		boardView.playersTurnInfo.textContent = `${gameObserver.playersInfo.playerTwoName} is a winner`;

		boardView.playersTurnInfo.classList.add('win-info-animation');

		hideInterfaceElements();

		proposePlayAgain();

		forbidSaveConcede();
	}

	if (mutations[0]['target'].classList.contains('player-2__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
		boardView.playersTurnInfo.textContent = `${gameObserver.playersInfo.playerOneName} is a winner`;

		boardView.playersTurnInfo.classList.add('win-info-animation');

		hideInterfaceElements();

		proposePlayAgain();

		forbidSaveConcede();
	}
}

const allowSaveConcede = () => {
	document.querySelector('.save-progress').removeEventListener('click',  forbidClick);
	document.querySelector('.concede').removeEventListener('click',  forbidClick);

	document.querySelector('.save-progress').classList.add('save-progress-allow');
	document.querySelector('.concede').classList.add('concede-allow');
}

const forbidSaveConcede = () => {
	document.querySelector('.save-progress').addEventListener('click',  forbidClick);
	document.querySelector('.concede').addEventListener('click',  forbidClick);

	document.querySelector('.save-progress').classList.remove('save-progress-allow');
	document.querySelector('.concede').classList.remove('concede-allow');
}

const hideInterfaceElements = () => {
	boardView.cardInHandField.classList.add('hidden');

	boardView.endTurnBtn.classList.add('hidden')

	document.querySelector('.background-music-battlefield').pause();

	playSoundEffect('.victory-audio');

	localStorage.removeItem('gameData');
}

const proposePlayAgain = () => {
	const divEl = document.createElement('div');

	divEl.className = 'play-again';
	divEl.textContent = 'Do you want to play one more battle?';

	const choiceYes = document.createElement('button');

	choiceYes.className = 'play-again__accept';
	choiceYes.textContent = 'Yes';

	const choiceNo = document.createElement('button');

	choiceNo.className = 'play-again__reject';
	choiceNo.textContent = 'No';

	divEl.appendChild(choiceYes);
	divEl.appendChild(choiceNo);

	boardView.boardSelector.appendChild(divEl);

	choiceYes.addEventListener('click', () => {
		window.removeEventListener('beforeunload', warningUnload);

		window.location.reload();
	});

	choiceNo.addEventListener('click', () => {
		window.removeEventListener('beforeunload', warningUnload);
		boardView.playersTurnInfo.display= 'none';
		divEl.style.display = 'none';
		document.title = 'Main menu';
		location.hash = decodeURIComponent('main-menu');
	});
}

const warningUnload = event => {
	event.preventDefault();
	event.returnValue = '';
}

const forbidClick = event => event.stopPropagation();

export {endGame, allowSaveConcede, warningUnload, forbidClick}