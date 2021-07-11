function Players() {
	this.healthPoints = 100;
	this.staminaPoints = 4;
	this.defendPoints = 7;

	let playerView = null;

	this.init = function (view) {
		playerView = view;
		this.updateView();
	}

	this.updateView = function () {
		playerView.updateViewPlayer1()
		playerView.updateViewPlayer2()
	}
}

function PlayersView() {
	let playerModel = null;
	let playerContainer = null;

	let player1HP = null;                          // red line HP player 1
	let player1HPValue = null;                    // value(number) HP player 1
	let player1DefenceValue = null;              // defend(number) value player 1
	let player1StaminaValue = null;             // stamina(number) value player 1

	let player2HP = null;                      // red line HP player 2
	let player2HPValue = null;                // value(number) HP player 2
	let player2DefenceValue = null;          // defend(number) value player 2
	let player2StaminaValue = null;         // stamina(number) value player 2

	this.init = function (model, container) {
		playerModel = model;
		playerContainer = container;

		player1HP = playerContainer.querySelector('.player-1__hp-bar-inner');
		player1HPValue = playerContainer.querySelector('.player-1__hp-value');
		player1DefenceValue = playerContainer.querySelector('.player-1__defence-value');
		player1StaminaValue = playerContainer.querySelector('.player-1__stamina-value');

		player2HP = playerContainer.querySelector('.player-2__hp-bar-inner');
		player2HPValue = playerContainer.querySelector('.player-2__hp-value');
		player2DefenceValue = playerContainer.querySelector('.player-2__defence-value');
		player2StaminaValue = playerContainer.querySelector('.player-2__stamina-value');
	}

	// устанавливаем первые параметры здоровье, защита, стамина
	this.updateViewPlayer1 = function () {
		this.player1HPValue.textContent = playerModel.healthPoints;
		this.player1DefenceValue.textContent = playerModel.defendPoints;
		this.player1StaminaValue.textContent = playerModel.staminaPoints;
	}

		this.updateViewPlayer2 = function () {
		this.player2HPValue.textContent = playerModel.healthPoints;
		this.player2DefenceValue.textContent = playerModel.defendPoints;
		this.player2StaminaValue.textContent = playerModel.staminaPoints;
	}

}









let player1 = new Players();
let player2 = new Players();

Players.prototype.standartAttack = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ')
	const defenceValuePassivePlayer = document.querySelector('.passive-Def')
	const healthValuePassivePlayer = document.querySelector('.passive-HPval')
	const healthBarPassivePlayer = document.querySelector('.passive-HPbar')

	if(gameController.passivePlayer.defendPoints) {
		let test = gameController.passivePlayer.defendPoints - card.effect;

		if(test < 0) {
			gameController.passivePlayer.defendPoints = 0;
			defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;

			test = Math.abs(test);
			gameController.passivePlayer.healthPoints -= test;
			healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
			healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
		} else {
			gameController.passivePlayer.defendPoints = test;
			defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;
		}
	} else {
		gameController.passivePlayer.healthPoints -= card.effect;
		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
	}

	gameController.activePlayer.staminaPoints -= card.cost;
	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
}
Players.prototype.sideEffectAttack = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ');
	const defenceValuePassivePlayer = document.querySelector('.passive-Def');
	const healthValuePassivePlayer = document.querySelector('.passive-HPval');
	const healthBarPassivePlayer = document.querySelector('.passive-HPbar');

	if(card.name == 'riddleWithHoles') {
		gameController.passivePlayer.healthPoints -= card.effect;
		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';

		gameController.activePlayer.staminaPoints -= card.cost;
		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;

		return;
	}

	if(card.name == 'judjment') {
		let sideEffect = card.sideEffect();

		if(sideEffect == undefined) { return }

		gameController.passivePlayer.healthPoints = sideEffect;
		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';

		return;
	}

	if(card.sideEffect) {
		let sideEffect = card.sideEffect();

		if(gameController.passivePlayer.defendPoints) {
			test = gameController.passivePlayer.defendPoints - sideEffect;

			if(test < 0) {
				gameController.passivePlayer.defendPoints = 0;
				defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;

				test = Math.abs(test);
				gameController.passivePlayer.healthPoints -= test;
				healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
				healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
			} else {
				gameController.passivePlayer.defendPoints = test;
				defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;
			}
		} else {
			if(sideEffect) {
				gameController.passivePlayer.healthPoints -= sideEffect;
				healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
				healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
			} else {
				gameController.passivePlayer.healthPoints -= card.effect;
				healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
				healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
			}
		}
	}

	gameController.activePlayer.staminaPoints -= card.cost;
	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
}
Players.prototype.attackDrawDiscard = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ')
	const defenceActivePlayer = document.querySelector('.activDefend');
	const defenceValuePassivePlayer = document.querySelector('.passive-Def')
	const healthValuePassivePlayer = document.querySelector('.passive-HPval')
	const healthBarPassivePlayer = document.querySelector('.passive-HPbar')

	if(gameController.passivePlayer.defendPoints) {
		let test = gameController.passivePlayer.defendPoints - card.effect;

		if(test < 0) {
			gameController.passivePlayer.defendPoints = 0;
			defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;

			test = Math.abs(test);
			gameController.passivePlayer.healthPoints -= test;
			healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
			healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';

			// gameController.activePlayer.staminaPoints -= card.cost;
			// staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
		} else {
			gameController.passivePlayer.defendPoints = test;
			defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;

			// gameController.activePlayer.staminaPoints -= card.cost;
			// staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
		}
	} else {
		gameController.passivePlayer.healthPoints -= card.effect;
		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';

		gameController.activePlayer.staminaPoints -= card.cost;
		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
	}

	if(card.name == 'daggerThrow') {
		let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );

		//it will be error if you use DaggerThrow as the last card in hand so w check on this
		if(cardInHand.children.length > 0) {
			cardInHand.removeChild(cardInHand.children[randomDiscard]);
		}

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
		}
	}
	if(card.name == 'quickSlash') {
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
		}
	}

	if(card.name == 'cutThroughFate') {
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
		let sideEffect = card.sideEffect()

		gameController.activePlayer.defendPoints += sideEffect;
		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
		}
	}

	gameController.activePlayer.staminaPoints -= card.cost;
	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
}

Players.prototype.standartDefend = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ');
	const defenceActivePlayer = document.querySelector('.activDefend');

	gameController.activePlayer.defendPoints += card.effect;
	defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;

	gameController.activePlayer.staminaPoints -= card.cost;
	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
}
Players.prototype.sideEffectDefend = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ');
	const defenceActivePlayer = document.querySelector('.activDefend');

	if(card.name == 'nirvana') {
		let sideEffect = card.sideEffect();

		gameController.activePlayer.defendPoints = sideEffect;
		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;

		gameController.activePlayer.staminaPoints -= card.cost;
		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;

		return;
	}

	if(card.name == 'meditate') {
		let test = gameController.activePlayer.staminaPoints - card.cost + card.effect;

		if(test > 4) {
			gameController.activePlayer.staminaPoints -= card.cost;
			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;

			gameController.activePlayer.staminaPoints = 4;
			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
		} else {
			gameController.activePlayer.staminaPoints -= card.cost;
			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;

			gameController.activePlayer.staminaPoints += card.effect;
			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
		}

		return;
	}

	if(card.sideEffect) {
		let sideEffect = card.sideEffect();


		gameController.activePlayer.defendPoints += sideEffect;
		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;

		gameController.activePlayer.staminaPoints -= card.cost;
		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
	}
}
Players.prototype.defendWithAttack = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ');

	Players.prototype.sideEffectAttack(card);
	Players.prototype.standartDefend(card);

	//compensate for double stamina reduce from methods above
	gameController.activePlayer.staminaPoints += card.cost;
	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
}
Players.prototype.defendDrawDiscard = function (card) {
	if(gameController.activePlayer.staminaPoints < card.cost) { return }

	const staminaValueActivePlayer = document.querySelector('.activ');
	const defenceActivePlayer = document.querySelector('.activDefend');

	if(card.name == 'prepared') {
		let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );

		if(cardInHand.children.length > 0) {
			cardInHand.removeChild(cardInHand.children[randomDiscard]);
		} //it will be error if you use DaggerThrow as the last card in hand so w check on this

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
		}

		return;
	}

	if(card.name == 'warcry') {
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
		}

		return;
	}

	if(card.name == 'survivor') {
		let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);

		if(cardInHand.children.length > 0) {
			cardInHand.removeChild(cardInHand.children[randomDiscard]);
		} //it will be error if you use any discard card as the last card in hand so check on this

		gameController.activePlayer.defendPoints += card.effect;
		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
	}

	if(card.name == 'bloodletting') {
		const healthBarActivePlayer = document.querySelector('.activHPbar');
		const healthValueActivePlayer = document.querySelector('.activHPvalue');
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
		}

		gameController.activePlayer.healthPoints -= card.cost;
		healthValueActivePlayer.textContent = gameController.activePlayer.healthPoints;
		healthBarActivePlayer.style.width = gameController.activePlayer.healthPoints + '%';

		return;
	}

	if(card.name == 'expertise') {
		let tempIndex = [];

		//убираем лишние карты из руки
		// for(let i = 0; i < cardInHand.children.length; i++) {
		// 	if(cardInHand.children[i].classList.contains('cards-to-play')) {
		// 		cardInHand.removeChild(cardInHand.children[i]);
		// 		i--;
		// 	}
		// }

		//делаем проверку чтобы карты в руке не повторялись
		for(let i = 0; i < card.effect - cardInHand.children.length; i++) {                  // количество карт в руку
			let n = Math.floor(Math.random() * 8);            // количество набранных карт
			if(tempIndex.indexOf(n) === -1) {
				tempIndex.push(n)
			} else {
				i--;
			}
		}

		if(gameController.playerOneTurn) {
			for(let i = 0; i < tempIndex.length; i++) {
				gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
			}
		} else {
			for(let i = 0; i < tempIndex.length; i++) {
				gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
			}
		}
	}

	if(card.name == 'alpha') {
		let tempIndex = [];

		// убираем лишние карты из руки
		for(let i = 0; i < cardInHand.children.length; i++) {
			if(cardInHand.children[i].classList.contains('cards-to-play')) {
				cardInHand.removeChild(cardInHand.children[i]);
				i--;
			}
		}

		//делаем проверку чтобы карты в руке не повторялись
		for(let i = 0; i < card.effect; i++) {                  // количество карт в руку
			let n = Math.floor(Math.random() * 8);            // количество набранных карт
			if(tempIndex.indexOf(n) === -1) {
				tempIndex.push(n)
			} else {
				i--;
			}
		}

		if(gameController.playerOneTurn) {
			for(let i = 0; i < tempIndex.length; i++) {
				gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
			}
		} else {
			for(let i = 0; i < tempIndex.length; i++) {
				gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
			}
		}
	}

	if(card.name == 'backFlip') {
		let sideEffect = card.sideEffect();
		gameController.activePlayer.defendPoints += sideEffect;
		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;

		let tempIndex = [];

		//делаем проверку чтобы карты в руке не повторялись
		for(let i = 0; i < card.effect; i++) {                  // количество карт в руку
			let n = Math.floor(Math.random() * 8);            // количество набранных карт
			if(tempIndex.indexOf(n) === -1) {
				tempIndex.push(n)
			} else {
				i--;
			}
		}

		if(gameController.playerOneTurn) {
			for(let i = 0; i < tempIndex.length; i++) {
				gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
			}
		} else {
			for(let i = 0; i < tempIndex.length; i++) {
				gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
			}
		}
	}

	if(card.name == 'thirdEye') {
		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
		gameController.activePlayer.defendPoints += card.effect;
		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;

		if(gameController.playerOneTurn) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
		} else {
			gameController.pullCardsInHand(gameController.playerTwoPullOfCards[randomCardDraw]);
		}
	}

	gameController.activePlayer.staminaPoints -= card.cost;
	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
}