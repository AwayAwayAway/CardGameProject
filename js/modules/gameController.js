export default class GameController {
	constructor(model, view) {
		this.gameModel = model;
		this.boardView = view;

		if (this.boardView.hasOwnProperty('onDefineCards')) {
			this.boardView.onDefineCards.attach(() => this.defineCards());
		}

		if (this.boardView.hasOwnProperty('submitCardCheckChoose')) {
			this.boardView.submitCardCheckChoose.attach(() => this.doCardCheckChoose());
		}

		if (this.boardView.hasOwnProperty('grabCardStart')) {
			this.boardView.grabCardStart.attach((eventTarget) => this.actionCard(eventTarget));
		}

		if (this.boardView.hasOwnProperty('endTurn')) {
			this.boardView.endTurn.attach(() => this.doEndTurn());
		}
	}

	// событие на кнопку подтверждения выбора карт, запоминаем что выбрал в масси
	defineCards() {
		this.gameModel.definePlayersCardSet();
	}

	// событие на кнопку подтверждения выбора карт, проверяем оба игрока сделали выбор
	doCardCheckChoose() {
		this.gameModel.checkCardsSelectionEnd();
	}

	actionCard(eventTarget) {
		this.gameModel.initActionCard(eventTarget);
	}

	doEndTurn() {
		this.gameModel.turnEndsNextPlayerTurn();
	}
}
