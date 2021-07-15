{
	function BoardController(gamemodel, boardmodel, view) {

		const gameModel = gamemodel;
		const boardModel = boardmodel;
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
			boardView.preventDrag.attach((event) => this.preventDrag(event))
		}

		if (boardView.hasOwnProperty('dropEvent')) {
			boardView.dropEvent.attach(() => this.deleteActionCard());
		}

		if (boardView.hasOwnProperty('endTurn')) {
			boardView.endTurn.attach(() => this.createCardsInHand());
		}

		if (gameModel.hasOwnProperty('selectionContinue')) {
			gameModel.selectionContinue.attach( () => this.createCard())
		}

		if (gameModel.hasOwnProperty('selectionEnd')) {
			gameModel.selectionEnd.attach( () => this.createCardsInHand())
		}



		this.createCard = function () {
			boardModel.createCardsForChoose(gameModel);
		};

		this.cardAnimBoard = function (event) {
			boardModel.cardChooseAnim(event);
		};

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
		};

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
			boardModel.deletePlayedCard();
		}
	}
}