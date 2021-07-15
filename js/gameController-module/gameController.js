{
	function GameController(model, view) {
		const gameModel = model;
		const boardView = view;

		this.init = function (view) {
			this.boardView = view;
		};

		if (boardView.hasOwnProperty('onDefineCards')) {
			boardView.onDefineCards.attach(() => this.defineCards());
		}

		if (boardView.hasOwnProperty('submitCardCheckChoose')) {
			boardView.submitCardCheckChoose.attach(() => this.doCardCheckChoose());
		}

		if (boardView.hasOwnProperty('grabCardStart')) {
			boardView.grabCardStart.attach((eventTarget) => this.actionCard(eventTarget));
		}

		if (boardView.hasOwnProperty('endTurn')) {
			boardView.endTurn.attach(() => this.doEndTurn());
		}

		// событие на кнопку подтверждения выбора карт, запоминаем что выбрал в масси
		this.defineCards = function () {
			gameModel.definePlayersCardSet();
		}

		// событие на кнопку подтверждения выбора карт, проверяем оба игрока сделали выбор
		this.doCardCheckChoose = function () {
			gameModel.checkCardsSelectionEnd();
		}

		this.actionCard = function (eventTarget) {
			gameModel.initActionCard(eventTarget);
		}

		this.doEndTurn = function () {
			gameModel.turnEndsNextPlayerTurn();
		}
	}
}