export default class PlayersView {
	constructor(playerOneModel, playerTwoModel, container) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		const playerContainer = container;

		this.playerOneHPValue = playerContainer.querySelector('.player-1__hp-value');
		this.playerOneDefenceValue = playerContainer.querySelector('.player-1__defence-value');
		this.playerOneStaminaValue = playerContainer.querySelector('.player-1__stamina-value');
		this.playerOneHP = playerContainer.querySelector('.player-1__hp-bar-inner');

		this.playerTwoHPValue = playerContainer.querySelector('.player-2__hp-value');
		this.playerTwoDefenceValue = playerContainer.querySelector('.player-2__defence-value');
		this.playerTwoStaminaValue = playerContainer.querySelector('.player-2__stamina-value');
		this.playerTwoHP = playerContainer.querySelector('.player-2__hp-bar-inner');

		this.playerOneModel.playerViewUpdate.attach(() => this.updateViewPlayer());
		this.playerTwoModel.playerViewUpdate.attach(() => this.updateViewPlayer());

		this.updateViewPlayer()
	}

	// устанавливаем первые параметры здоровье, защита, стамина
	updateViewPlayer() {
		this.playerOneHPValue.textContent = this.playerOneModel.healthPoints;
		this.playerOneDefenceValue.textContent = this.playerOneModel.defendPoints;
		this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;
		this.playerOneHP.style.width = this.playerOneModel.healthPoints + '%';

		this.playerTwoHPValue.textContent = this.playerTwoModel.healthPoints;
		this.playerTwoDefenceValue.textContent = this.playerTwoModel.defendPoints;
		this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
		this.playerTwoHP.style.width = this.playerTwoModel.healthPoints + '%';
	};
}
