import Events from './eventsModel';
import {skillCollection} from '../cards';
import {playSoundEffect} from '../animation_and_sound_effects/animation.js';

export default class Board {
	constructor(model) {
		this.gameModel = model;

		this.deckWrapper = document.querySelector('.cards-choose-field');        // field for cards at the start when players are choosing
		this.cardInHand = document.querySelector('.card-in-hand-field');              // field for cards in hand each player
		this.playersTurnInfo = document.querySelector('.players-action');
		this.playersDeck = document.querySelector('.players-overlay__cards');

		this.onCreateCards = new Events();

		this.removeCards = new Events();
		this.removeActionCard = new Events();
		this.createAnimation = new Events();
		// this.endTurnAnimation = new Events();
	}

	// создаем деку в начале игры для игрока согласно классу
	createCardsForChoose(playerClassInfo) {
		this.removeExtraCards('board');

		if (this.gameModel.playerOneTurn) {
			setTimeout(() => {
				skillCollection[playerClassInfo.playerOneClass].forEach((element) => this.createCards(element, 'board'));

				this.createAnimation.notify('.cards-choose-field', 'multiple');
			}, 500)
		} else {
			setTimeout(() => {
				skillCollection[playerClassInfo.playerTwoClass].forEach((element) => this.createCards(element, 'board'));

				this.createAnimation.notify('.cards-choose-field', 'multiple');
			}, 500)
		}
	}

	showCardsForPlayers(eventTarget) {
		if (eventTarget.classList.contains('player-1__pile-of-card')) {
			this.gameModel.playerOnePullOfCards.forEach((element) => this.createCards(element, 'overlay'));

			this.createAnimation.notify('.players-overlay__cards', 'overlay')
		}

		if (eventTarget.classList.contains('player-2__pile-of-card')) {
			this.gameModel.playerTwoPullOfCards.forEach((element) => this.createCards(element, 'overlay'));

			this.createAnimation.notify('.players-overlay__cards', 'overlay')
		}
	}

	createCards(card, appendPlace, draggable = false) {
		let elDiv = card.icon;

		if(appendPlace === 'hand') {
			elDiv.setAttribute('class', 'cards-hand');
		} else {
			elDiv.setAttribute('class', 'cards');
		}

		elDiv.setAttribute('data-info', `${card.id}`);

		if (draggable) {
			elDiv.setAttribute('draggable', 'true');
		} else {
			elDiv.setAttribute('draggable', 'false');
		}

		this.onCreateCards.notify(elDiv, appendPlace);
	}

	// кидаем карты в руку
	pullRandomCardsInHand() {
		this.removeExtraCards('hand');

		let tempIndex = [];

		//делаем проверку чтобы карты в руке не повторялись
		for (let i = 0; i < 4; i++) {                  // количество карт в руку
			let n = Math.floor(Math.random() * 8);   // количество набранных карт
			if (tempIndex.indexOf(n) == -1) {
				tempIndex.push(n);
			} else {
				i--;
			}
		}

		// создаем карты в руке согласно игрока чей ход
		if (this.gameModel.playerOneTurn) {
			for (let i = 0; i < tempIndex.length; i++) {
				this.createCards(this.gameModel.playerOnePullOfCards[tempIndex[i]], 'hand', true);
			}

			this.createAnimation.notify('.card-in-hand-field', 'multiple');
		} else {
			for (let i = 0; i < tempIndex.length; i++) {
				this.createCards(this.gameModel.playerTwoPullOfCards[tempIndex[i]], 'hand', true);
			}

			this.createAnimation.notify('.card-in-hand-field', 'multiple');
		}
	}

	// убираем лишние карты с доски или из руки
	removeExtraCards(place) {
		let orderToRemove = [];

		switch (place) {
			case 'board':
				orderToRemove = [...this.deckWrapper.children];
				break;
			case 'hand':
				orderToRemove = [...this.cardInHand.children];
				break;
			case 'overlay':
				orderToRemove = [...this.playersDeck.children];
				break;
		}

		this.removeCards.notify(orderToRemove, place);
	}

	//удаляем сыгранные карты из руки с проверкой
	deletePlayedCard(condition, card) {
		if (this.gameModel.tempCard.cost > this.gameModel.activePlayer.staminaPoints) {

			return;
		}

		switch (condition) {
			case 'playedCard':
				this.removeActionCard.notify(this.gameModel.dragCard);
				break;
			case 'randomCard':
				this.removeActionCard.notify(card);
				break;
		}
	}
}