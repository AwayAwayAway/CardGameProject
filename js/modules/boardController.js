import {switchPlayPause} from '../animation_and_sound_effects/animation.js';

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

		if (this.boardView.hasOwnProperty('onAnimCards')) {
			this.boardView.onAnimCards.attach((event) => this.cardAnimBoard(event));
		}

		if (this.boardView.hasOwnProperty('cardInHandChoosen')) {
			this.boardView.cardInHandChoosen.attach((event, state) => this.cardAnimHand(event, state));
		}

		if (this.boardView.hasOwnProperty('grabCardStart')) {
			this.boardView.grabCardStart.attach((event, state) => this.grabbedCardAnim(event, state));
		}

		if (this.boardView.hasOwnProperty('grabCardEnd')) {
			this.boardView.grabCardEnd.attach((event, state) => this.grabbedCardAnim(event, state));
		}

		if (this.boardView.hasOwnProperty('preventDrag')) {
			this.boardView.preventDrag.attach((event) => this.preventDrag(event));
		}

		if (this.boardView.hasOwnProperty('dropEvent')) {
			this.boardView.dropEvent.attach(() => this.deleteActionCard());
		}

		if (this.boardView.hasOwnProperty('endTurn')) {
			this.boardView.endTurn.attach(() => this.createCardsInHand());
			this.boardView.endTurn.attach(() => this.setPlayersTurnInfo());
		}

		if (this.boardView.hasOwnProperty('showPlayerDeck')) {
			this.boardView.showPlayerDeck.attach((event) => this.showPlayersDeck(event));
		}

		if (this.boardView.hasOwnProperty('showPlayerDeck')) {
			this.boardView.showPlayerDeck.attach((event) => this.closePlayersDeck(event));
		}

		if (this.gameModel.hasOwnProperty('selectionContinue')) {
			this.gameModel.selectionContinue.attach(() => this.createCard());
		}

		if (this.gameModel.hasOwnProperty('selectionEnd')) {
			this.gameModel.selectionEnd.attach(() => this.createCardsInHand());
			this.gameModel.selectionEnd.attach(() => this.setPlayersTurnInfo());
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

	cardAnimBoard(event) {
		this.boardModel.cardChooseAnim(event);
	}

	cardAnimHand(event, state) {
		switch (state) {
			case 'focus':
				this.boardModel.cardChooseAnimInHandAdd(event);
				break;
			case 'blur':
				this.boardModel.cardChooseAnimInHandRemove(event);
				break;
		}
	}

	createCardsInHand() {
		this.boardModel.pullRandomCardsInHand();
	}

	grabbedCardAnim(event, state) {
		switch (state) {
			case 'focus':
				this.boardModel.dragCardStart(event);
				break;
			case 'blur':
				this.boardModel.dragCardEnd(event);
				break;
		}
	}

	preventDrag(event) {
		this.boardModel.dragPreventAction(event);
	}

	deleteActionCard() {
		this.boardModel.deletePlayedCard('playedCard');
	}

	deleteRandomCard(card) {
		this.boardModel.deletePlayedCard('randomCard', card);
	}

	addCardInHand(card) {
		this.boardModel.createCards(card, 'hand', true);
	}

	showPlayersDeck(eventTarget) {
		this.boardModel.showCardsForPlayers(eventTarget);
	}

	closePlayersDeck(event) {
		if (event == this.boardModel.showDeckPlayer1 || event == this.boardModel.showDeckPlayer2) {
			this.boardModel.openCloseOverlay('open');
		}
		if (event == this.boardModel.playersDeckClose) {
			this.boardModel.openCloseOverlay('close');
		}
	}

	setPlayersTurnInfo() {
		this.boardModel.showWhichTurn();
	}

	turnOnOfSound() {
		switchPlayPause();
	}
}
