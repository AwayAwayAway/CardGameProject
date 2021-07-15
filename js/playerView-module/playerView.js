{
	function PlayersView(model1, model2, container) {

		const modelPlayer1 = model1;
		const modelPlayer2 = model2;
		const playerContainer = container;

		this.player1HP = playerContainer.querySelector('.player-1__hp-bar-inner');
		this.player1HPValue = playerContainer.querySelector('.player-1__hp-value');
		this.player1DefenceValue = playerContainer.querySelector('.player-1__defence-value');
		this.player1StaminaValue = playerContainer.querySelector('.player-1__stamina-value');

		this.player2HP = playerContainer.querySelector('.player-2__hp-bar-inner');
		this.player2HPValue = playerContainer.querySelector('.player-2__hp-value');
		this.player2DefenceValue = playerContainer.querySelector('.player-2__defence-value');
		this.player2StaminaValue = playerContainer.querySelector('.player-2__stamina-value');

		modelPlayer1.playerViewUpdate.attach(() => this.updateViewPlayer1());
		modelPlayer2.playerViewUpdate.attach(() => this.updateViewPlayer2());

		// устанавливаем первые параметры здоровье, защита, стамина
		this.updateViewPlayer1 = function () {
			this.player1HPValue.textContent = modelPlayer1.healthPoints;
			this.player1DefenceValue.textContent = modelPlayer1.defendPoints;
			this.player1StaminaValue.textContent = modelPlayer1.staminaPoints;
			this.player1HP.style.width = modelPlayer1.healthPoints + '%';
		};

		this.updateViewPlayer2 = function () {
			this.player2HPValue.textContent = modelPlayer2.healthPoints;
			this.player2DefenceValue.textContent = modelPlayer2.defendPoints;
			this.player2StaminaValue.textContent = modelPlayer2.staminaPoints;
			this.player2HP.style.width = modelPlayer2.healthPoints + '%';
		};
	}
}