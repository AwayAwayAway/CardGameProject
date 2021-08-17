import {playPauseBackgroundAudio} from '../animation_and_sound_effects/animation.js';

export default class BoardController {
	constructor(game, board, playerModel1, playerModel2, view) {
		this.gameModel = game;
		this.boardModel = board;
		this.player1 = playerModel1;
		this.player2 = playerModel2;
		this.boardView = view;

		if (this.boardView.hasOwnProperty('onLoadCreate')) {
			this.boardView.onLoadCreate.attach((card, place) => this.createCard(card, place));
		}

		if (this.boardView.hasOwnProperty('dropEvent')) {
			this.boardView.dropEvent.attach(() => this.deleteActionCard());
		}

		if (this.boardView.hasOwnProperty('endTurn')) {
			this.boardView.endTurn.attach(() => this.createCardsInHand());
		}

		if (this.boardView.hasOwnProperty('showPlayerDeck')) {
			this.boardView.showPlayerDeck.attach((event) => this.showPlayersDeck(event));
		}

		if (this.boardView.hasOwnProperty('onClosePileCards')) {
			this.boardView.onClosePileCards.attach(() => this.deleteOverlayCards());
		}

		if (this.gameModel.hasOwnProperty('selectionContinue')) {
			this.gameModel.selectionContinue.attach(() => this.createCard());
		}

		if (this.gameModel.hasOwnProperty('selectionEnd')) {
			this.gameModel.selectionEnd.attach((restoredCards) => this.createCardsInHand(restoredCards));
		}

		if (this.player1.hasOwnProperty('cardDraw')) {
			this.player1.cardDraw.attach((card) => this.addCardInHand(card));
		}

		if (this.player2.hasOwnProperty('cardDraw')) {
			this.player2.cardDraw.attach((card) => this.addCardInHand(card));
		}

		if (this.player1.hasOwnProperty('cardDiscard')) {
			this.player1.cardDiscard.attach((card) => this.deleteRandomCard(card));
		}

		if (this.player2.hasOwnProperty('cardDiscard')) {
			this.player2.cardDiscard.attach((card) => this.deleteRandomCard(card));
		}

		if (this.boardView.hasOwnProperty('soundOffOn')) {
			this.boardView.soundOffOn.attach(() => this.turnOnOfSound());
		}
	}

	createCard() {
		this.boardModel.createCardsForChoose(this.gameModel);
	}

	createCardsInHand(restoredCards) {
		if(restoredCards) {
			restoredCards.forEach(element => this.boardModel.createCards(element, 'hand', true));

			this.boardModel.createAnimation.notify('.card-in-hand-field', 'multiple');
		} else {
			this.boardModel.pullRandomCardsInHand();
		}
	}

	deleteActionCard() {
		this.boardModel.deletePlayedCard('playedCard');
	}

	deleteRandomCard(card) {
		this.boardModel.deletePlayedCard('randomCard', card);
	}

	deleteOverlayCards() {
		this.boardModel.removeExtraCards('overlay');
	}

	addCardInHand(card) {
		this.boardModel.createCards(card, 'hand', true);
	}

	showPlayersDeck(eventTarget) {
		this.boardModel.showCardsForPlayers(eventTarget);
	}

	turnOnOfSound() {
		playPauseBackgroundAudio();
	}
}
