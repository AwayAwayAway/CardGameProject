import Events from './eventsModel';
import {skillCollection} from '../cards';

export default class Board {
	constructor(model) {
		this.gameModel = model;
		this.currentHand = null;

		this.deckWrapper = document.querySelector('.cards-choose-field');        // field for cards at the start when players are choosing
		this.cardInHand = document.querySelector('.card-in-hand-field');              // field for cards in hand each player
		this.playersDeck = document.querySelector('.players-overlay__cards');

		this.onCreateCards = new Events();
		this.onRemoveCards = new Events();
		this.onRemoveActionCard = new Events();
		this.onCreateCardAnimation = new Events();
	}

	// создаем деку в начале игры для игрока согласно классу
	createCardsForChoose(playerClassInfo) {
		this.removeExtraCards('board');

		if (this.gameModel.playerOneTurn) {
			setTimeout(() => {
				skillCollection[playerClassInfo.playerOneClass].forEach((element) => this.createCards(element, 'board'));

				this.onCreateCardAnimation.notify('.cards-choose-field', 'multiple');
			}, 500)
		} else {
			setTimeout(() => {
				skillCollection[playerClassInfo.playerTwoClass].forEach((element) => this.createCards(element, 'board'));

				this.onCreateCardAnimation.notify('.cards-choose-field', 'multiple');
			}, 500)
		}
	}

	showCardsForPlayers(eventTarget) {
		this.currentHand = [...this.cardInHand.children];

		if (eventTarget.classList.contains('player-1__pile-of-card')) {
			this.gameModel.playerOnePullOfCards.forEach((element) => this.createCards(element, 'overlay'));

			this.onCreateCardAnimation.notify('.players-overlay__cards', 'overlay')
		}

		if (eventTarget.classList.contains('player-2__pile-of-card')) {
			this.gameModel.playerTwoPullOfCards.forEach((element) => this.createCards(element, 'overlay'));

			this.onCreateCardAnimation.notify('.players-overlay__cards', 'overlay')
		}
	}

	createCards(card, appendPlace, draggable = false) {
		let elDiv = card.icon;

		elDiv.setAttribute('class', 'cards');
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

			this.onCreateCardAnimation.notify('.card-in-hand-field', 'multiple');
		} else {
			for (let i = 0; i < tempIndex.length; i++) {
				this.createCards(this.gameModel.playerTwoPullOfCards[tempIndex[i]], 'hand', true);
			}

			this.onCreateCardAnimation.notify('.card-in-hand-field', 'multiple');
		}
	}

	restoreHand() {
		if([...this.cardInHand.children].length === 0) {
			this.currentHand.forEach((element) => {
				element.className = 'cards cards-restored';
				element.setAttribute('draggable', 'true')
			});
			this.currentHand.forEach((element) => this.cardInHand.appendChild(element));
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

		this.onRemoveCards.notify(orderToRemove, place);
	}

	//удаляем сыгранные карты из руки с проверкой
	deletePlayedCard(condition, card) {
		if (this.gameModel.tempCard.cost > this.gameModel.activePlayer.staminaPoints) {

			return;
		}

		switch (condition) {
			case 'playedCard':
				this.onRemoveActionCard.notify(this.gameModel.dragCard);
				break;
			case 'randomCard':
				this.onRemoveActionCard.notify(card);
				break;
		}
	}
}