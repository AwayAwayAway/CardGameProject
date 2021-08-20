import {player1, player2} from '../game';

export default class PlayersController {
	constructor(playerOneModel, playerTwoModel, boardView, playerView) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		this.boardView = boardView;
		this.playersView = playerView;

		if (this.boardView.hasOwnProperty('onDropCardAction')) {
			this.boardView.onDropCardAction.attach((priority) => this.doPlayCardAction(priority));
		}

		if (this.boardView.hasOwnProperty('onEndTurn')) {
			this.boardView.onEndTurn.attach(() => this.doEndTurn());
		}

		if (this.playersView.hasOwnProperty('onUpdateInitialValue')) {
			this.playersView.onUpdateInitialValue.attach(() => this.doUpdateInitialValue());
		}

		if (this.boardView.hasOwnProperty('onSaveGameProgress')) {
			this.boardView.onSaveGameProgress.attach(() => this.doSavePlayerData());
		}

		if (this.boardView.hasOwnProperty('onConcede')) {
			this.boardView.onConcede.attach((player) => this.doConcede(player));
		}
	}

	doPlayCardAction(priority) {
		if (priority) {
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

	doUpdateInitialValue() {
		this.playerOneModel.updateInitialValues();
		this.playerTwoModel.updateInitialValues();
	}

	doSavePlayerData() {
		this.playerOneModel.savePlayerData();
		this.playerTwoModel.savePlayerData();
	}

	doConcede(player) {
		if (player === 'player1') {
			player1.concede();
		} else {
			player2.concede();
		}
	}
}
