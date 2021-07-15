{
	function PlayersController(model, view) {

		const gameModel = model;
		const boardView = view;

		if (boardView.hasOwnProperty('doCardAction')) {
			boardView.doCardAction.attach(() => this.playCard());
		}

		if (boardView.hasOwnProperty('endTurn')) {
			boardView.endTurn.attach(() => this.doEndTurn());
		}

		this.playCard = function () {
			gameModel.doAction();
		};

		this.doEndTurn = function () {
			gameModel.endTurn()
		}
	}
}