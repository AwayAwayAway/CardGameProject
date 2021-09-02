import Events from './eventsModel';
import {skillCollection} from '../cards';
import {player1, player2} from '../game';
import {playSoundEffect, shakeAnimation} from '../animation_and_sound_effects/animation.js';
import {media} from '../preloadedMediaContent';

export default class Game {
	constructor() {
		this.activePlayer = null;
		this.passivePlayer = null;

		this.playerOneTurn = true;
		this.playerTwoTurn = false;

		this.playerOneClass = null;
		this.playerTwoClass = null;

		this.playerOnePullOfCards = [];
		this.playerTwoPullOfCards = [];

		this.restoredGameData = null;

		this.playersInfo = {};

		this.dragCard = null;

		this.tempCard = null;

		// событие выбор карт завершен
		this.onSelectionEnd = new Events();

		// событие выбор карт продолжается
		this.onSelectionContinue = new Events();

		// событие изменить кто выбирает карты
		this.onChangePlayerInfo = new Events();

		// событие установить никнеймы игрокам
		this.onUpdatePlayersNames = new Events();

		// событие установить модельки персонажей игрокам
		this.onUpdatePlayersModels = new Events();

		// анимация конца хода
		this.onEndTurnAnimation = new Events();

		this.onGameStart = new Events();

		this.onRestoredGameFailed = new Events();

		this.onSaveGameData = new Events();
	}

	start() {
		if (window.location.hash.substr(1) === 'restoredGame') {
			this.readGameDataFromServer();
		} else {
			this.init();
		}
	};

	init() {
		this.onGameStart.notify();

		this.setPlayersChoiceInfo('playersInfo');

		this.setPlayersClasses();

		this.setPlayersNames();

		this.setPlayersModels();

		this.setTextChooseInfo();

		this.setActivePassivePlayer();
	};

	setPlayersChoiceInfo(object) {
		let temp = localStorage.getItem(object);

		this.playersInfo = JSON.parse(temp);
	};

	setPlayersClasses() {
		this.playerOneClass = this.playersInfo.playerOneClass;

		this.playerTwoClass = this.playersInfo.playerTwoClass;
	};

	setPlayersNames() {
		this.onUpdatePlayersNames.notify(this.playersInfo.playerOneName, this.playersInfo.playerTwoName);
	};

	setPlayersModels() {
		this.onUpdatePlayersModels.notify(this.playersInfo.playerOneClass, this.playersInfo.playerTwoClass);
	};

	setTextChooseInfo() {
		if (this.playerOneTurn) {
			this.onChangePlayerInfo.notify(`${this.playersInfo.playerOneName} is choosing`);
		} else {
			this.onChangePlayerInfo.notify(`${this.playersInfo.playerTwoName} is choosing`);
		}
	};

	setTextTurnInfo() {
		if (this.playerOneTurn) {
			this.onEndTurnAnimation.notify('left', `${this.playersInfo.playerOneName}'s Turn`);
		} else {
			this.onEndTurnAnimation.notify('right', `${this.playersInfo.playerTwoName}'s Turn`);
		}
	};

	setActivePassivePlayer() {
		if (this.playerOneTurn) {
			this.activePlayer = player1;
			this.passivePlayer = player2;
		} else {
			this.activePlayer = player2;
			this.passivePlayer = player1;
		}
	};

	definePlayersCardSet() {
		let counter = document.getElementsByClassName('card-to-select').length;

		if (counter < 8 || counter >= 9) {
			playSoundEffect(media.audio.confirmFailed);

			shakeAnimation('.players-draw-info__accept', 'horizontal');

			return;
		}

		this.pushCardsIntoCollection()

		this.setTurnPriority();

		this.checkCardsSelectionEnd();
	};

	pushCardsIntoCollection() {
		let cards = document.querySelectorAll('.cards');
		let tempCardChoosePlayer = [];

		if (this.playerOneTurn) {
			for (let i = 0; i < cards.length; i++) {
				if (cards[i].classList.contains('card-to-select')) {
					tempCardChoosePlayer.push(cards[i].dataset.info);
				}
			}

			this.playerOnePullOfCards = this.checkOnSelectedCards(tempCardChoosePlayer, this.playerOneClass);
		} else {
			for (let i = 0; i < cards.length; i++) {
				if (cards[i].classList.contains('card-to-select')) {
					tempCardChoosePlayer.push(cards[i].dataset.info);
				}
			}

			this.playerTwoPullOfCards = this.checkOnSelectedCards(tempCardChoosePlayer, this.playerTwoClass);
		}

		playSoundEffect(media.audio.confirmSucces);
	}

	checkOnSelectedCards(dataInfo, search) {
		let temp = [];

		for (let i = 0; i < skillCollection[search].length; i++) {
			for (let j = 0; j < dataInfo.length; j++) {
				if (skillCollection[search][i]['id'] == dataInfo[j]) {
					temp.push(skillCollection[search][i]);
				}
			}
		}

		return temp;
	};

	checkCardsSelectionEnd() {
		let counter = document.getElementsByClassName('card-to-select').length;

		if (counter < 8 || counter >= 9) {
			return;
		}

		if (this.playerOnePullOfCards.length > 1 && this.playerTwoPullOfCards.length > 1) {
			this.onSelectionEnd.notify();

			this.setTextTurnInfo();
		} else {
			this.onSelectionContinue.notify();

			this.setTextChooseInfo();
		}
	};

	initActionCard(eventTarget) {
		this.dragCard = eventTarget;

		if (this.playerOneTurn) {
			this.tempCard = this.playerOnePullOfCards.find(element => element.id == this.dragCard.dataset.info);
		} else {
			this.tempCard = this.playerTwoPullOfCards.find((element) => element.id == this.dragCard.dataset.info);
		}
	};

	setTurnPriority() {
		if (this.playerOneTurn) {
			this.playerOneTurn = false;
			this.playerTwoTurn = true;
			this.activePlayer = player2;
			this.passivePlayer = player1;
		} else {
			this.playerOneTurn = true;
			this.playerTwoTurn = false;
			this.activePlayer = player1;
			this.passivePlayer = player2;
		}
	};

	saveGameData() {
		const savedInfo = {
			playerOneTurn: this.playerOneTurn,
			playerTwoTurn: this.playerTwoTurn,
			playerOnePullOfCards: this.playerOnePullOfCards.map((element) => element.id),
			playerTwoPullOfCards: this.playerTwoPullOfCards.map((element) => element.id),
			activePlayerCardsHand: this.saveActivePlayerCardsHand(),
			player1: player1.savePlayerData(),
			player2: player2.savePlayerData(),
			player1Name: this.playersInfo.playerOneName,
			player2Name: this.playersInfo.playerTwoName,
			player1Class: this.playersInfo.playerOneClass,
			player2Class: this.playersInfo.playerTwoClass,
		};

		this.saveGameDataToServer(savedInfo);
	}

	saveActivePlayerCardsHand() {
		const cardInfo = document.querySelector('.card-in-hand-field');
		const cardID = [...cardInfo.children].map((element) => element.dataset.info);

		return cardID;
	}

	doRestoreGameData() {
		const overlay = document.querySelector('.players-overlay');
		const overlayClose = document.querySelector('.players-overlay__close');
		const divEl = document.querySelector('.confirm-continue');
		let activePlayerHand;

		this.playerOneTurn = this.restoredGameData.playerOneTurn;
		this.playerTwoTurn = this.restoredGameData.playerTwoTurn;
		this.playersInfo.playerOneClass = this.restoredGameData.player1Class;
		this.playersInfo.playerTwoClass = this.restoredGameData.player2Class;
		this.playersInfo.playerOneName = this.restoredGameData.player1Name;
		this.playersInfo.playerTwoName = this.restoredGameData.player2Name;
		this.playerOnePullOfCards = this.checkOnSelectedCards(this.restoredGameData.playerOnePullOfCards, this.restoredGameData.player1Class);
		this.playerTwoPullOfCards = this.checkOnSelectedCards(this.restoredGameData.playerTwoPullOfCards, this.restoredGameData.player2Class);

		if (this.playerOneTurn) {
			activePlayerHand = this.checkOnSelectedCards(this.restoredGameData.activePlayerCardsHand, this.restoredGameData.player1Class);
		} else {
			activePlayerHand = this.checkOnSelectedCards(this.restoredGameData.activePlayerCardsHand, this.restoredGameData.player2Class);
		}

		player1.doRestorePlayerData(this.restoredGameData, 'player1');
		player2.doRestorePlayerData(this.restoredGameData, 'player2');

		this.setActivePassivePlayer();

		this.setTextTurnInfo();

		this.setPlayersClasses();

		this.setPlayersNames();

		this.setPlayersModels();

		this.onSelectionEnd.notify(activePlayerHand);

		overlay.removeChild(divEl);

		overlay.classList.add('hidden');
		overlayClose.classList.remove('hidden');
	}

	saveGameDataToServer(savedGameData) {
		fetch('https://parseapi.back4app.com/classes/CardGameContainer/QCWoJhzpd2', {
			method: 'PUT',
			headers: {
				'X-Parse-Application-Id': 'uU4nbtVfuBneX95bxKyjBuyG82Wr3Wg1JrTjEYr7',
				'X-Parse-REST-API-Key': 'UAnSqROzrtRZuMkgY3MgoEkhsp0040aUBca0dWGm',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				gameSaved: savedGameData
			})
		})
			.then(res => {
				if (res.ok) {
					console.log('OK');

					this.onSaveGameData.notify(true);
				} else {
					console.log('Not OK, save error');
					this.onSaveGameData.notify(false);
				}
			});
	}

	readGameDataFromServer() {
		let self = this;

		fetch('https://parseapi.back4app.com/classes/CardGameContainer/', {
			method: 'GET',
			headers: {
				'X-Parse-Application-Id': 'uU4nbtVfuBneX95bxKyjBuyG82Wr3Wg1JrTjEYr7',
				'X-Parse-REST-API-Key': 'UAnSqROzrtRZuMkgY3MgoEkhsp0040aUBca0dWGm',
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				} else {
					this.onRestoredGameFailed.notify();
				}
			})
			.then(data => {
				if (data.results[0].gameSaved.hasOwnProperty('gameFinished')) {
					self.init();
				} else {
					self.restoredGameData = data.results[0].gameSaved;

					self.onGameStart.notify(true);
				}
			});
	}
}



