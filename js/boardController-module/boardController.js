{
	function BoardController(game, board, playerModel1, playerModel2, view) {

		const gameModel = game;
		const boardModel = board;
		const player1 = playerModel1;
		const player2 = playerModel2;
		const boardView = view;

		if (boardView.hasOwnProperty('onLoadCreate')) {
			boardView.onLoadCreate.attach((card, place) => this.createCard(card, place));
		}

		if (boardView.hasOwnProperty('onAnimCards')) {
			boardView.onAnimCards.attach((event) => this.cardAnimBoard(event));
		}

		if (boardView.hasOwnProperty('cardInHandChoosen')) {
			boardView.cardInHandChoosen.attach((event, state) => this.cardAnimHand(event, state));
		}

		if (boardView.hasOwnProperty('grabCardStart')) {
			boardView.grabCardStart.attach((event, state) => this.grabbedCardAnim(event, state));
		}

		if (boardView.hasOwnProperty('grabCardEnd')) {
			boardView.grabCardEnd.attach((event, state) => this.grabbedCardAnim(event, state));
		}

		if (boardView.hasOwnProperty('preventDrag')) {
			boardView.preventDrag.attach((event) => this.preventDrag(event));
		}

		if (boardView.hasOwnProperty('dropEvent')) {
			boardView.dropEvent.attach(() => this.deleteActionCard());
		}

		if (boardView.hasOwnProperty('endTurn')) {
			boardView.endTurn.attach(() => this.createCardsInHand());
		}


		if (boardView.hasOwnProperty('showPlayerDeck')) {
			boardView.showPlayerDeck.attach((event) => this.showPlayersDeck(event));
		}
		if (boardView.hasOwnProperty('showPlayerDeck')) {
			boardView.showPlayerDeck.attach((event) => this.closePlayersDeck(event));
		}

		if (gameModel.hasOwnProperty('selectionContinue')) {
			gameModel.selectionContinue.attach( () => this.createCard());
		}

		if (gameModel.hasOwnProperty('selectionEnd')) {
			gameModel.selectionEnd.attach( () => this.createCardsInHand());
		}

		if (player1.hasOwnProperty('cardDraw')) {
			player1.cardDraw.attach( (card) => this.addCardInHand(card));
		}

		if (player2.hasOwnProperty('cardDraw')) {
			player2.cardDraw.attach( (card) => this.addCardInHand(card));
		}
		if (player1.hasOwnProperty('randomCardDiscard')) {
			player1.cardDiscard.attach( (card) => this.deleteRandomCard(card));
		}

		if (player2.hasOwnProperty('randomCardDiscard')) {
			player2.cardDiscard.attach( (card) => this.deleteRandomCard(card));
		}

		this.createCard = function () {
			boardModel.createCardsForChoose(gameModel);
		}

		this.cardAnimBoard = function (event) {
			boardModel.cardChooseAnim(event);
		}

		this.cardAnimHand = function (event, state) {
			switch (state) {
				case 'focus':
					boardModel.cardChooseAnimInHandAdd(event);
					break;
				case 'blur':
					boardModel.cardChooseAnimInHandRemove(event);
					break;
			}
		}

		this.createCardsInHand = function () {
			boardModel.pullRandomCardsInHand();
		}

		this.grabbedCardAnim = function (event, state) {
			switch (state) {
				case 'focus':
					boardModel.dragCardStart(event);
					break;
				case 'blur':
					boardModel.dragCardEnd(event);
					break;
			}
		}

		this.preventDrag = function (event) {
			boardModel.dragPreventAction(event);
		}

		this.deleteActionCard = function () {
			boardModel.deletePlayedCard('playedCard');
		}

		this.deleteRandomCard = function (card) {
			boardModel.deletePlayedCard('randomCard', card);
		}

		this.addCardInHand = function (card) {
			boardModel.createCardsInHand(card);
		}

		this.showPlayersDeck = function (eventTarget) {
			// this.closePlayersDeck('open');
			boardModel.showCardsForPlayers(eventTarget);
		}

		this.closePlayersDeck = function (event) {
			if(event == boardModel.showDeckPlayer1 || event == boardModel.showDeckPlayer2) {
				boardModel.openCloseOverlay('open');
			}
			if(event == boardModel.playersDeckClose) {
				boardModel.openCloseOverlay('close');
			}

		}
	}
}