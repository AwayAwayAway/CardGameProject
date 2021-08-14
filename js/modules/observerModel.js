import {boardModel} from '../game';
import {gameObserver} from '../game';
import {playSoundEffect} from '../animation_and_sound_effects/animation';
import {boardView} from '../game';

const player1HPstatus = document.querySelector('.player-1__hp');
const player2HPstatus = document.querySelector('.player-2__hp');
const battleground = document.querySelector('.battle-field');

function endGame(mutations) {
	if (mutations[0]['target'].classList.contains('player-1__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
		document.querySelector('.players-action').textContent = `${gameObserver.playersInfo.playerTwoName} is a winner`;

		boardModel.cardInHand.classList.add('hidden');

		playSoundEffect('.victory-audio');

		localStorage.removeItem('gameData');
	}

	if (mutations[0]['target'].classList.contains('player-2__hp-value') && mutations[0].target.childNodes[0].data <= 0) {
		document.querySelector('.players-action').textContent = `${gameObserver.playersInfo.playerOneName} is a winner`;

		boardModel.cardInHand.classList.add('hidden');

		playSoundEffect('.victory-audio');

		localStorage.removeItem('gameData');
	}
}

function allowSaveConcede() {
	document.querySelector('.save-progress').removeEventListener('click',  boardView.forbidClick);
	document.querySelector('.concede').removeEventListener('click',  boardView.forbidClick);

	document.querySelector('.save-progress').classList.add('save-progress-allow');
	document.querySelector('.concede').classList.add('concede-allow');
}

export {player1HPstatus, player2HPstatus, endGame, battleground, allowSaveConcede}