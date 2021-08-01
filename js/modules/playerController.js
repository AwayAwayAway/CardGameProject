export default class PlayersController {
	constructor(playerOneModel, playerTwoModel, view) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		this.boardView = view;

		if (this.boardView.hasOwnProperty('doCardAction')) {
			this.boardView.doCardAction.attach(() => this.playCard());
		}

		if (this.boardView.hasOwnProperty('endTurn')) {
			this.boardView.endTurn.attach(() => this.doEndTurn());
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
	}
}
