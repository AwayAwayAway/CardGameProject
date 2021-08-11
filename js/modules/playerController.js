export default class PlayersController {
	constructor(playerOneModel, playerTwoModel, boardView, playerView) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		this.boardView = boardView;
		this.playersView = playerView;

		if (this.boardView.hasOwnProperty('doCardAction')) {
			this.boardView.doCardAction.attach((priority) => this.playCard(priority));
		}

		if (this.boardView.hasOwnProperty('endTurn')) {
			this.boardView.endTurn.attach(() => this.doEndTurn());
		}

		if (this.playersView.hasOwnProperty('updateInitialValue')) {
			this.playersView.updateInitialValue.attach(() => this.updateInitialValue());
		}
	}

	playCard(priority) {
		if(priority) {
			this.playerOneModel.doAction();
		} else {
			this.playerTwoModel.doAction();
		}
	}

	doEndTurn() {
		this.playerOneModel.endTurn();
		this.playerOneModel.updateInitialValues();
		this.playerTwoModel.updateInitialValues();
	}

	updateInitialValue() {
		this.playerOneModel.updateInitialValues();
		this.playerTwoModel.updateInitialValues();
	}
}
