function Players() {
	this.healthPoints = 100;
	this.staminaPoints = 4;
	this.defendPoints = 7;

	let gameModel = null;

	let playerView = null;

	this.init = function (view, game) {
		playerView = view;
		gameModel = game;
		// boardModel = board;

		gameModel.setActivePassivePlayer();

		this.updateView();
	}

	this.updateView = function () {
		playerView.updateViewPlayer1()
		playerView.updateViewPlayer2()
	}

	this.standartAttack = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		if(gameModel.passivePlayer.defendPoints) {
			let test = gameModel.passivePlayer.defendPoints - card.effect;

			if(test < 0) {
				gameModel.passivePlayer.defendPoints = 0;

				test = Math.abs(test);
				gameModel.passivePlayer.healthPoints -= test;

			} else {
				gameModel.passivePlayer.defendPoints = test;
			}
		} else {
			gameModel.passivePlayer.healthPoints -= card.effect;
		}

		gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	}

	this.sideEffectAttack = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		if(card.name == 'riddleWithHoles') {
			gameModel.passivePlayer.healthPoints -= card.effect;

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();

			return;
		}

		if(card.name == 'judjment') {
			let sideEffect = card.sideEffect();

			if(sideEffect == undefined) { return }

			gameModel.passivePlayer.healthPoints = sideEffect;

			this.updateView();

			return;
		}

		if(card.sideEffect) {
			let sideEffect = card.sideEffect();

			if(gameModel.passivePlayer.defendPoints) {
				test = gameModel.passivePlayer.defendPoints - sideEffect;

				if(test < 0) {
					gameModel.passivePlayer.defendPoints = 0;

					test = Math.abs(test);
					gameModel.passivePlayer.healthPoints -= test;

				} else {
					gameModel.passivePlayer.defendPoints = test;

				}
			} else {
				if(sideEffect) {
					gameModel.passivePlayer.healthPoints -= sideEffect;
				} else {
					gameModel.passivePlayer.healthPoints -= card.effect;
				}
			}
		}

		gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	}

	this.attackDrawDiscard = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		if(gameModel.passivePlayer.defendPoints) {
			let test = gameModel.passivePlayer.defendPoints - card.effect;

			if(test < 0) {
				gameModel.passivePlayer.defendPoints = 0;

				test = Math.abs(test);
				gameModel.passivePlayer.healthPoints -= test;

			} else {
				gameModel.passivePlayer.defendPoints = test;
			}
		} else {
			gameModel.passivePlayer.healthPoints -= card.effect;
			gameModel.activePlayer.staminaPoints -= card.cost;
		}

		if(card.name == 'daggerThrow') {
			let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
			let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );

			//it will be error if you use DaggerThrow as the last card in hand so w check on this
			if(cardInHand.children.length > 0) {
				cardInHand.removeChild(cardInHand.children[randomDiscard]);
			}

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[randomCardDraw] );
			}
		}

		if(card.name == 'quickSlash') {
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length );

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[randomCardDraw] );
			}
		}

		if(card.name == 'cutThroughFate') {
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length );
			let sideEffect = card.sideEffect()

			gameModel.activePlayer.defendPoints += sideEffect;

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[randomCardDraw] );
			}
		}

		gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	}

	this.standartDefend = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		gameModel.activePlayer.defendPoints += card.effect;

		gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	}

	this.sideEffectDefend = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		if(card.name == 'nirvana') {
			let sideEffect = card.sideEffect();

			gameModel.activePlayer.defendPoints = sideEffect;

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();

			return;
		}

		if(card.name == 'meditate') {
			let test = gameModel.activePlayer.staminaPoints - card.cost + card.effect;

			if(test > 4) {
				gameModel.activePlayer.staminaPoints -= card.cost;

				gameModel.activePlayer.staminaPoints = 4;
			} else {
				gameModel.activePlayer.staminaPoints -= card.cost;

				gameModel.activePlayer.staminaPoints += card.effect;
			}

			this.updateView();

			return;
		}

		if(card.sideEffect) {
			let sideEffect = card.sideEffect();

			gameModel.activePlayer.defendPoints += sideEffect;

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();

		}
	}

	this.defendWithAttack = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		this.sideEffectAttack(card);
		this.standartDefend(card);

		//compensate for double stamina reduce from methods above
		gameModel.activePlayer.staminaPoints += card.cost;

		this.updateView();
	}

	this.defendDrawDiscard = function (card) {
		if(gameModel.activePlayer.staminaPoints < card.cost) { return }

		if(card.name == 'prepared') {
			let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length );

			if(cardInHand.children.length > 0) {
				cardInHand.removeChild(cardInHand.children[randomDiscard]);
			} //it will be error if you use DaggerThrow as the last card in hand so w check on this

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[randomCardDraw] );
			}

			return;
		}

		if(card.name == 'warcry') {
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length );

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[randomCardDraw] );
			}

			return;
		}

		if(card.name == 'survivor') {
			let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);

			if(cardInHand.children.length > 0) {
				cardInHand.removeChild(cardInHand.children[randomDiscard]);
			} //it will be error if you use any discard card as the last card in hand so check on this

			gameModel.activePlayer.defendPoints += card.effect;
		}

		if(card.name == 'bloodletting') {
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length );

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[randomCardDraw] );
			}

			gameModel.activePlayer.healthPoints -= card.cost;

			this.updateView();

			return;
		}

		if(card.name == 'expertise') {
			let tempIndex = [];

			//делаем проверку чтобы карты в руке не повторялись
			for(let i = 0; i < card.effect - cardInHand.children.length; i++) {                  // количество карт в руку
				let n = Math.floor(Math.random() * 8);            // количество набранных карт
				if(tempIndex.indexOf(n) === -1) {
					tempIndex.push(n)
				} else {
					i--;
				}
			}

			if(gameModel.playerOneTurn) {
				for(let i = 0; i < tempIndex.length; i++) {
					gameModel.createCardsInHand( gameModel.playerOnePullOfCards[tempIndex[i]] );
				}
			} else {
				for(let i = 0; i < tempIndex.length; i++) {
					gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[tempIndex[i]] );
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

			if(gameModel.playerOneTurn) {
				for(let i = 0; i < tempIndex.length; i++) {
					gameModel.createCardsInHand( gameModel.playerOnePullOfCards[tempIndex[i]] );
				}
			} else {
				for(let i = 0; i < tempIndex.length; i++) {
					gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[tempIndex[i]] );
				}
			}
		}

		if(card.name == 'backFlip') {
			let sideEffect = card.sideEffect();
			gameModel.activePlayer.defendPoints += sideEffect;

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

			if(gameModel.playerOneTurn) {
				for(let i = 0; i < tempIndex.length; i++) {
					gameModel.createCardsInHand( gameModel.playerOnePullOfCards[tempIndex[i]] );
				}
			} else {
				for(let i = 0; i < tempIndex.length; i++) {
					gameModel.createCardsInHand( gameModel.playerTwoPullOfCards[tempIndex[i]] );
				}
			}
		}

		if(card.name == 'thirdEye') {
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length );
			gameModel.activePlayer.defendPoints += card.effect;

			if(gameModel.playerOneTurn) {
				gameModel.createCardsInHand( gameModel.playerOnePullOfCards[randomCardDraw] );
			} else {
				gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
			}
		}

		gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	}
}

function PlayersView() {
	let modelPlayer1 = null;
	let modelPlayer2 = null;
	let playerContainer = null;

	let player1HP = null;                          // red line HP player 1
	let player1HPValue = null;                    // value(number) HP player 1
	let player1DefenceValue = null;              // defend(number) value player 1
	let player1StaminaValue = null;             // stamina(number) value player 1

	let player2HP = null;                      // red line HP player 2
	let player2HPValue = null;                // value(number) HP player 2
	let player2DefenceValue = null;          // defend(number) value player 2
	let player2StaminaValue = null;         // stamina(number) value player 2

	this.init = function (model1, model2, container) {
		modelPlayer1 = model1;
		modelPlayer2 = model2;
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
		player1HPValue.textContent = modelPlayer1.healthPoints;
		player1DefenceValue.textContent = modelPlayer1.defendPoints;
		player1StaminaValue.textContent = modelPlayer1.staminaPoints;
		player1HP.style.width = modelPlayer1.healthPoints + '%';
	}

	this.updateViewPlayer2 = function () {
		player2HPValue.textContent = modelPlayer2.healthPoints;
		player2DefenceValue.textContent = modelPlayer2.defendPoints;
		player2StaminaValue.textContent = modelPlayer2.staminaPoints;
		player2HP.style.width = modelPlayer2.healthPoints + '%';
	}

}



function PlayersController() {

}







const battleContainer = document.querySelector('.wrapper-battle');

let player1 = new Players();
let player2 = new Players();
let playersView = new PlayersView()

playersView.init(player1, player2, battleContainer);
player1.init(playersView, gameController);
player2.init(playersView, gameController);




// Players.prototype.standartAttack = function (card) {
// 		if(gameModel.activePlayer.staminaPoints < card.cost) { return }
//
// 		if(gameModel.passivePlayer.defendPoints) {
// 			let test = gameModel.passivePlayer.defendPoints - card.effect;
//
// 			if(test < 0) {
// 				gameModel.passivePlayer.defendPoints = 0;
//
// 				test = Math.abs(test);
// 				gameModel.passivePlayer.healthPoints -= test;
//
// 			} else {
// 				gameModel.passivePlayer.defendPoints = test;
// 			}
// 		} else {
// 			gameModel.passivePlayer.healthPoints -= card.effect;
// 		}
//
// 		gameModel.activePlayer.staminaPoints -= card.cost;
//
// 		this.updateView();
// 	}
// Players.prototype.sideEffectAttack = function (card) {
// 	if(gameController.activePlayer.staminaPoints < card.cost) { return }
//
// 	const staminaValueActivePlayer = document.querySelector('.activ');
// 	const defenceValuePassivePlayer = document.querySelector('.passive-Def');
// 	const healthValuePassivePlayer = document.querySelector('.passive-HPval');
// 	const healthBarPassivePlayer = document.querySelector('.passive-HPbar');
//
// 	if(card.name == 'riddleWithHoles') {
// 		gameController.passivePlayer.healthPoints -= card.effect;
// 		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
//
// 		gameController.activePlayer.staminaPoints -= card.cost;
// 		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
//
// 		return;
// 	}
//
// 	if(card.name == 'judjment') {
// 		let sideEffect = card.sideEffect();
//
// 		if(sideEffect == undefined) { return }
//
// 		gameController.passivePlayer.healthPoints = sideEffect;
// 		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
//
// 		return;
// 	}
//
// 	if(card.sideEffect) {
// 		let sideEffect = card.sideEffect();
//
// 		if(gameController.passivePlayer.defendPoints) {
// 			test = gameController.passivePlayer.defendPoints - sideEffect;
//
// 			if(test < 0) {
// 				gameController.passivePlayer.defendPoints = 0;
// 				defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;
//
// 				test = Math.abs(test);
// 				gameController.passivePlayer.healthPoints -= test;
// 				healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 				healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
// 			} else {
// 				gameController.passivePlayer.defendPoints = test;
// 				defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;
// 			}
// 		} else {
// 			if(sideEffect) {
// 				gameController.passivePlayer.healthPoints -= sideEffect;
// 				healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 				healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
// 			} else {
// 				gameController.passivePlayer.healthPoints -= card.effect;
// 				healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 				healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
// 			}
// 		}
// 	}
//
// 	gameController.activePlayer.staminaPoints -= card.cost;
// 	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// }
// Players.prototype.attackDrawDiscard = function (card) {
// 	if(gameController.activePlayer.staminaPoints < card.cost) { return }
//
// 	const staminaValueActivePlayer = document.querySelector('.activ')
// 	const defenceActivePlayer = document.querySelector('.activDefend');
// 	const defenceValuePassivePlayer = document.querySelector('.passive-Def')
// 	const healthValuePassivePlayer = document.querySelector('.passive-HPval')
// 	const healthBarPassivePlayer = document.querySelector('.passive-HPbar')
//
// 	if(gameController.passivePlayer.defendPoints) {
// 		let test = gameController.passivePlayer.defendPoints - card.effect;
//
// 		if(test < 0) {
// 			gameController.passivePlayer.defendPoints = 0;
// 			defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;
//
// 			test = Math.abs(test);
// 			gameController.passivePlayer.healthPoints -= test;
// 			healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 			healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
//
// 			// gameController.activePlayer.staminaPoints -= card.cost;
// 			// staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// 		} else {
// 			gameController.passivePlayer.defendPoints = test;
// 			defenceValuePassivePlayer.textContent = gameController.passivePlayer.defendPoints;
//
// 			// gameController.activePlayer.staminaPoints -= card.cost;
// 			// staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// 		}
// 	} else {
// 		gameController.passivePlayer.healthPoints -= card.effect;
// 		healthValuePassivePlayer.textContent = gameController.passivePlayer.healthPoints;
// 		healthBarPassivePlayer.style.width = gameController.passivePlayer.healthPoints + '%';
//
// 		gameController.activePlayer.staminaPoints -= card.cost;
// 		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// 	}
//
// 	if(card.name == 'daggerThrow') {
// 		let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
//
// 		//it will be error if you use DaggerThrow as the last card in hand so w check on this
// 		if(cardInHand.children.length > 0) {
// 			cardInHand.removeChild(cardInHand.children[randomDiscard]);
// 		}
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
// 		}
// 	}
// 	if(card.name == 'quickSlash') {
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
// 		}
// 	}
//
// 	if(card.name == 'cutThroughFate') {
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
// 		let sideEffect = card.sideEffect()
//
// 		gameController.activePlayer.defendPoints += sideEffect;
// 		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
// 		}
// 	}
//
// 	gameController.activePlayer.staminaPoints -= card.cost;
// 	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// }

// Players.prototype.standartDefend = function (card) {
// 	if(gameController.activePlayer.staminaPoints < card.cost) { return }
//
// 	const staminaValueActivePlayer = document.querySelector('.activ');
// 	const defenceActivePlayer = document.querySelector('.activDefend');
//
// 	gameController.activePlayer.defendPoints += card.effect;
// 	defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
//
// 	gameController.activePlayer.staminaPoints -= card.cost;
// 	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// }
// Players.prototype.sideEffectDefend = function (card) {
// 	if(gameController.activePlayer.staminaPoints < card.cost) { return }
//
// 	const staminaValueActivePlayer = document.querySelector('.activ');
// 	const defenceActivePlayer = document.querySelector('.activDefend');
//
// 	if(card.name == 'nirvana') {
// 		let sideEffect = card.sideEffect();
//
// 		gameController.activePlayer.defendPoints = sideEffect;
// 		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
//
// 		gameController.activePlayer.staminaPoints -= card.cost;
// 		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
//
// 		return;
// 	}
//
// 	if(card.name == 'meditate') {
// 		let test = gameController.activePlayer.staminaPoints - card.cost + card.effect;
//
// 		if(test > 4) {
// 			gameController.activePlayer.staminaPoints -= card.cost;
// 			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
//
// 			gameController.activePlayer.staminaPoints = 4;
// 			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// 		} else {
// 			gameController.activePlayer.staminaPoints -= card.cost;
// 			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
//
// 			gameController.activePlayer.staminaPoints += card.effect;
// 			staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// 		}
//
// 		return;
// 	}
//
// 	if(card.sideEffect) {
// 		let sideEffect = card.sideEffect();
//
//
// 		gameController.activePlayer.defendPoints += sideEffect;
// 		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
//
// 		gameController.activePlayer.staminaPoints -= card.cost;
// 		staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// 	}
// }
// Players.prototype.defendWithAttack = function (card) {
// 	if(gameController.activePlayer.staminaPoints < card.cost) { return }
//
// 	const staminaValueActivePlayer = document.querySelector('.activ');
//
// 	Players.prototype.sideEffectAttack(card);
// 	Players.prototype.standartDefend(card);
//
// 	//compensate for double stamina reduce from methods above
// 	gameController.activePlayer.staminaPoints += card.cost;
// 	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// }
// Players.prototype.defendDrawDiscard = function (card) {
// 	if(gameController.activePlayer.staminaPoints < card.cost) { return }
//
// 	const staminaValueActivePlayer = document.querySelector('.activ');
// 	const defenceActivePlayer = document.querySelector('.activDefend');
//
// 	if(card.name == 'prepared') {
// 		let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
//
// 		if(cardInHand.children.length > 0) {
// 			cardInHand.removeChild(cardInHand.children[randomDiscard]);
// 		} //it will be error if you use DaggerThrow as the last card in hand so w check on this
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
// 		}
//
// 		return;
// 	}
//
// 	if(card.name == 'warcry') {
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
// 		}
//
// 		return;
// 	}
//
// 	if(card.name == 'survivor') {
// 		let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
//
// 		if(cardInHand.children.length > 0) {
// 			cardInHand.removeChild(cardInHand.children[randomDiscard]);
// 		} //it will be error if you use any discard card as the last card in hand so check on this
//
// 		gameController.activePlayer.defendPoints += card.effect;
// 		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
// 	}
//
// 	if(card.name == 'bloodletting') {
// 		const healthBarActivePlayer = document.querySelector('.activHPbar');
// 		const healthValueActivePlayer = document.querySelector('.activHPvalue');
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[randomCardDraw] );
// 		}
//
// 		gameController.activePlayer.healthPoints -= card.cost;
// 		healthValueActivePlayer.textContent = gameController.activePlayer.healthPoints;
// 		healthBarActivePlayer.style.width = gameController.activePlayer.healthPoints + '%';
//
// 		return;
// 	}
//
// 	if(card.name == 'expertise') {
// 		let tempIndex = [];
//
// 		//убираем лишние карты из руки
// 		// for(let i = 0; i < cardInHand.children.length; i++) {
// 		// 	if(cardInHand.children[i].classList.contains('cards-to-play')) {
// 		// 		cardInHand.removeChild(cardInHand.children[i]);
// 		// 		i--;
// 		// 	}
// 		// }
//
// 		//делаем проверку чтобы карты в руке не повторялись
// 		for(let i = 0; i < card.effect - cardInHand.children.length; i++) {                  // количество карт в руку
// 			let n = Math.floor(Math.random() * 8);            // количество набранных карт
// 			if(tempIndex.indexOf(n) === -1) {
// 				tempIndex.push(n)
// 			} else {
// 				i--;
// 			}
// 		}
//
// 		if(gameController.playerOneTurn) {
// 			for(let i = 0; i < tempIndex.length; i++) {
// 				gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
// 			}
// 		} else {
// 			for(let i = 0; i < tempIndex.length; i++) {
// 				gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
// 			}
// 		}
// 	}
//
// 	if(card.name == 'alpha') {
// 		let tempIndex = [];
//
// 		// убираем лишние карты из руки
// 		for(let i = 0; i < cardInHand.children.length; i++) {
// 			if(cardInHand.children[i].classList.contains('cards-to-play')) {
// 				cardInHand.removeChild(cardInHand.children[i]);
// 				i--;
// 			}
// 		}
//
// 		//делаем проверку чтобы карты в руке не повторялись
// 		for(let i = 0; i < card.effect; i++) {                  // количество карт в руку
// 			let n = Math.floor(Math.random() * 8);            // количество набранных карт
// 			if(tempIndex.indexOf(n) === -1) {
// 				tempIndex.push(n)
// 			} else {
// 				i--;
// 			}
// 		}
//
// 		if(gameController.playerOneTurn) {
// 			for(let i = 0; i < tempIndex.length; i++) {
// 				gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
// 			}
// 		} else {
// 			for(let i = 0; i < tempIndex.length; i++) {
// 				gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
// 			}
// 		}
// 	}
//
// 	if(card.name == 'backFlip') {
// 		let sideEffect = card.sideEffect();
// 		gameController.activePlayer.defendPoints += sideEffect;
// 		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
//
// 		let tempIndex = [];
//
// 		//делаем проверку чтобы карты в руке не повторялись
// 		for(let i = 0; i < card.effect; i++) {                  // количество карт в руку
// 			let n = Math.floor(Math.random() * 8);            // количество набранных карт
// 			if(tempIndex.indexOf(n) === -1) {
// 				tempIndex.push(n)
// 			} else {
// 				i--;
// 			}
// 		}
//
// 		if(gameController.playerOneTurn) {
// 			for(let i = 0; i < tempIndex.length; i++) {
// 				gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
// 			}
// 		} else {
// 			for(let i = 0; i < tempIndex.length; i++) {
// 				gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
// 			}
// 		}
// 	}
//
// 	if(card.name == 'thirdEye') {
// 		let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length );
// 		gameController.activePlayer.defendPoints += card.effect;
// 		defenceActivePlayer.textContent = gameController.activePlayer.defendPoints;
//
// 		if(gameController.playerOneTurn) {
// 			gameController.pullCardsInHand( gameController.playerOnePullOfCards[randomCardDraw] );
// 		} else {
// 			gameController.pullCardsInHand(gameController.playerTwoPullOfCards[randomCardDraw]);
// 		}
// 	}
//
// 	gameController.activePlayer.staminaPoints -= card.cost;
// 	staminaValueActivePlayer.textContent = gameController.activePlayer.staminaPoints;
// }