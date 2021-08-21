import {playPauseBackgroundAudio} from '../animation_and_sound_effects/animation.js';

export default class BoardController {
	constructor(game, board, playerModel1, playerModel2, view) {
		this.gameModel = game;
		this.boardModel = board;
		this.boardView = view;
		this.player1 = playerModel1;
		this.player2 = playerModel2;

		if (this.boardView.hasOwnProperty('onLoadCreate')) {
			this.boardView.onLoadCreate.attach((card, place) => this.doCreateCardsForChoose(card, place));
		}

		if (this.gameModel.hasOwnProperty('onSelectionContinue')) {
			this.gameModel.onSelectionContinue.attach(() => this.doCreateCardsForChoose());
		}

		if (this.gameModel.hasOwnProperty('onSelectionEnd')) {
			this.gameModel.onSelectionEnd.attach((restoredCards) => this.doCreateCardsInHand(restoredCards));
		}

		if (this.boardView.hasOwnProperty('onDropCard')) {
			this.boardView.onDropCard.attach(() => this.doDeleteActionCard());
		}

		if (this.boardView.hasOwnProperty('onEndTurn')) {
			this.boardView.onEndTurn.attach(() => this.doCreateCardsInHand());
		}

		if (this.boardView.hasOwnProperty('onShowPlayerDeck')) {
			this.boardView.onShowPlayerDeck.attach((event) => this.doShowPlayersDeck(event));
		}

		if (this.boardView.hasOwnProperty('onClosePileCards')) {
			this.boardView.onClosePileCards.attach(() => this.doDeleteOverlayCards());
		}

		if (this.player1.hasOwnProperty('onCardDraw')) {
			this.player1.onCardDraw.attach((card) => this.doSkillCreateCardInHand(card));
		}

		if (this.player2.hasOwnProperty('onCardDraw')) {
			this.player2.onCardDraw.attach((card) => this.doSkillCreateCardInHand(card));
		}

		if (this.player1.hasOwnProperty('onCardDiscard')) {
			this.player1.onCardDiscard.attach((card) => this.doDeleteRandomCard(card));
		}

		if (this.player2.hasOwnProperty('onCardDiscard')) {
			this.player2.onCardDiscard.attach((card) => this.doDeleteRandomCard(card));
		}

		if (this.boardView.hasOwnProperty('onSoundSwitch')) {
			this.boardView.onSoundSwitch.attach(() => this.doTurnOnOfSound());
		}
	}

	doCreateCardsForChoose() {
		this.boardModel.createCardsForChoose(this.gameModel);
	}

	doCreateCardsInHand(restoredCards) {
		if(restoredCards) {
			restoredCards.forEach(element => this.boardModel.createCards(element, 'hand', true));

			this.boardModel.onCreateCardAnimation.notify('.card-in-hand-field', 'multiple');
		} else {
			this.boardModel.pullRandomCardsInHand();
		}
	}

	doDeleteActionCard() {
		this.boardModel.deletePlayedCard('playedCard');
	}

	doDeleteRandomCard(card) {
		this.boardModel.deletePlayedCard('randomCard', card);
	}

	doDeleteOverlayCards() {
		this.boardModel.removeExtraCards('overlay');

		this.boardModel.restoreHand();
	}

	doSkillCreateCardInHand(card) {
		this.boardModel.createCards(card, 'hand', true);
	}

	doShowPlayersDeck(eventTarget) {
		this.boardModel.showCardsForPlayers(eventTarget);
	}

	doTurnOnOfSound() {
		playPauseBackgroundAudio();
	}
}
