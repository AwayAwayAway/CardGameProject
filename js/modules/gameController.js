export default class GameController {
	constructor(model, view) {
		this.gameModel = model;
		this.boardView = view;

		if (this.boardView.hasOwnProperty('onDefineCards')) {
			this.boardView.onDefineCards.attach(() => this.doDefineCards());
		}

		if (this.boardView.hasOwnProperty('onCheckChosenCards')) {
			this.boardView.onCheckChosenCards.attach(() => this.doCardCheckChoose());
		}

		if (this.boardView.hasOwnProperty('onGrabCardStart')) {
			this.boardView.onGrabCardStart.attach((eventTarget) => this.doInitActionCard(eventTarget));
		}

		if (this.boardView.hasOwnProperty('onTouchCardStart')) {
			this.boardView.onTouchCardStart.attach((eventTarget) => this.doInitActionCard(eventTarget));
		}

		if (this.boardView.hasOwnProperty('onEndTurn')) {
			this.boardView.onEndTurn.attach(() => this.doEndTurn());
		}

		if (this.boardView.hasOwnProperty('onSaveGameProgress')) {
			this.boardView.onSaveGameProgress.attach(() => this.doSaveGameData());
		}

		if (this.boardView.hasOwnProperty('onRestoreGameData')) {
			this.boardView.onRestoreGameData.attach(() => this.doStartRestoreData());
		}

		if (this.boardView.hasOwnProperty('onRestoreGameDataRejected')) {
			this.boardView.onRestoreGameDataRejected.attach(() => this.doStartGame());
		}
	}

	// событие на кнопку подтверждения выбора карт, запоминаем что выбрал в масси
	doDefineCards() {
		this.gameModel.definePlayersCardSet();
	}

	// событие на кнопку подтверждения выбора карт, проверяем оба игрока сделали выбор
	doCardCheckChoose() {
		this.gameModel.checkCardsSelectionEnd();
	}

	doInitActionCard(eventTarget) {
		this.gameModel.initActionCard(eventTarget);
	}

	doEndTurn() {
		this.gameModel.setTurnPriority();

		this.gameModel.setTextTurnInfo();
	}

	doSaveGameData() {
		this.gameModel.saveGameData();
	}

	doStartRestoreData() {
		this.gameModel.doRestoreGameData()
	}

	doStartGame() {
		this.gameModel.init();
	}
}
