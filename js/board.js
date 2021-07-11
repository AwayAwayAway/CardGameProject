function Board() {

	let myView = null;
	let myModel = null;

	this.init = function (model, view) {
		myModel = model;
		myView = view;
	}

	this.updateView = function () {
		myView.updateView();
	}

	//устанавливает классы активного и пассивного игрока, чтобы игра понимала куда наносить урон или добавлять защиту
	this.setActivePassiveClasses = function() {
		if(myModel.playerTwoTurn) {
			this.player1StaminaValue.textContent = player1.staminaPoints;

			this.player1StaminaValue.classList.remove('activ');
			this.player1DefenceValue.classList.remove('activDefend');
			this.player1HP.classList.remove('activHPbar');
			this.player1HPValue.classList.remove('activHPvalue');

			this.player2StaminaValue.classList.add('activ');
			this.player2DefenceValue.classList.add('activDefend');
			this.player2HP.classList.add('activHPbar');
			this.player2HPValue.classList.add('activHPvalue');

			this.player1HP.classList.add('passive-HPbar');
			this.player1HPValue.classList.add('passive-HPval');
			this.player1DefenceValue.classList.add('passive-Def');

			this.player2HP.classList.remove('passive-HPbar');
			this.player2HPValue.classList.remove('passive-HPval');
			this.player2DefenceValue.classList.remove('passive-Def');
		} else {
			this.player2StaminaValue.textContent = player2.staminaPoints;

			this.player2StaminaValue.classList.remove('activ');
			this.player2DefenceValue.classList.remove('activDefend');
			this.player2HP.classList.remove('activHPbar');
			this.player2HPValue.classList.remove('activHPvalue');

			this.player1StaminaValue.classList.add('activ');
			this.player1DefenceValue.classList.add('activDefend');
			this.player1HP.classList.add('activHPbar');
			this.player1HPValue.classList.add('activHPvalue');

			this.player2HP.classList.add('passive-HPbar');
			this.player2HPValue.classList.add('passive-HPval');
			this.player2DefenceValue.classList.add('passive-Def');

			this.player1HP.classList.remove('passive-HPbar');
			this.player1HPValue.classList.remove('passive-HPval');
			this.player1DefenceValue.classList.remove('passive-Def');
		}
	}

}

