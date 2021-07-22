{
	function Players(model) {
		this.healthPoints = 100;
		this.staminaPoints = 4;
		this.defendPoints = 7;

		const gameModel = model;

		this.playerViewUpdate = new Events();

		this.init = function () {

			gameModel.setActivePassivePlayer();

			this.updateView();
		};

		this.endTurn = function () {
			gameModel.activePlayer.staminaPoints = 4;
			gameModel.passivePlayer.staminaPoints = 4;

			this.updateView()
		}

		this.updateView = function () {
			this.playerViewUpdate.notify();
		};

		this.doAction = function () {
			switch (gameModel.tempCard.type) {
				case 'attack':
					this.standartAttack(gameModel.tempCard);
					break;
				case 'attackDrawDiscard':
					this.attackDrawDiscard(gameModel.tempCard);
					break;
				case 'attackAddEffect':
					this.sideEffectAttack(gameModel.tempCard);
					break;
				case 'defend':
					this.standartDefend(gameModel.tempCard);
					break;
				case 'defendAddEffect':
					this.sideEffectDefend(gameModel.tempCard);
					break;
				case 'defendDrawDiscard':
					this.defendDrawDiscard(gameModel.tempCard);
					break;
				case 'defendAndAttack':
					this.defendWithAttack(gameModel.tempCard);
			}
		};

		this.standartAttack = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			if (gameModel.passivePlayer.defendPoints) {
				let test = gameModel.passivePlayer.defendPoints - card.effect;

				if (test < 0) {
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
		};

		this.sideEffectAttack = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			if (card.name == 'riddleWithHoles') {
				gameModel.passivePlayer.healthPoints -= card.effect;

				gameModel.activePlayer.staminaPoints -= card.cost;

				this.updateView();

				return;
			}

			if (card.name == 'judjment') {
				let sideEffect = card.sideEffect();

				if (sideEffect == undefined) {
					return;
				}

				gameModel.passivePlayer.healthPoints = sideEffect;

				this.updateView();

				return;
			}

			if (card.sideEffect) {
				let sideEffect = card.sideEffect();

				if (gameModel.passivePlayer.defendPoints) {
					test = gameModel.passivePlayer.defendPoints - sideEffect;

					if (test < 0) {
						gameModel.passivePlayer.defendPoints = 0;

						test = Math.abs(test);
						gameModel.passivePlayer.healthPoints -= test;

					} else {
						gameModel.passivePlayer.defendPoints = test;

					}
				} else {
					if (sideEffect) {
						gameModel.passivePlayer.healthPoints -= sideEffect;
					} else {
						gameModel.passivePlayer.healthPoints -= card.effect;
					}
				}
			}

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};

		this.attackDrawDiscard = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			if (gameModel.passivePlayer.defendPoints) {
				let test = gameModel.passivePlayer.defendPoints - card.effect;

				if (test < 0) {
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

			if (card.name == 'daggerThrow') {
				let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
				let randomCardDraw = Math.floor(Math.random() * gameController.playerOnePullOfCards.length);

				//it will be error if you use DaggerThrow as the last card in hand so w check on this
				if (cardInHand.children.length > 0) {
					cardInHand.removeChild(cardInHand.children[randomDiscard]);
				}

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}
			}

			if (card.name == 'quickSlash') {
				let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}
			}

			if (card.name == 'cutThroughFate') {
				let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);
				let sideEffect = card.sideEffect();

				gameModel.activePlayer.defendPoints += sideEffect;

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}
			}

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};

		this.standartDefend = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			gameModel.activePlayer.defendPoints += card.effect;

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};

		this.sideEffectDefend = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			if (card.name == 'nirvana') {
				let sideEffect = card.sideEffect();

				gameModel.activePlayer.defendPoints = sideEffect;

				gameModel.activePlayer.staminaPoints -= card.cost;

				this.updateView();

				return;
			}

			if (card.name == 'meditate') {
				let test = gameModel.activePlayer.staminaPoints - card.cost + card.effect;

				if (test > 4) {
					gameModel.activePlayer.staminaPoints -= card.cost;

					gameModel.activePlayer.staminaPoints = 4;
				} else {
					gameModel.activePlayer.staminaPoints -= card.cost;

					gameModel.activePlayer.staminaPoints += card.effect;
				}

				this.updateView();

				return;
			}

			if (card.sideEffect) {
				let sideEffect = card.sideEffect();

				gameModel.activePlayer.defendPoints += sideEffect;

				gameModel.activePlayer.staminaPoints -= card.cost;

				this.updateView();

			}
		};

		this.defendWithAttack = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			this.sideEffectAttack(card);
			this.standartDefend(card);

			//compensate for double stamina reduce from methods above
			gameModel.activePlayer.staminaPoints += card.cost;

			this.updateView();
		};

		this.defendDrawDiscard = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) {
				return;
			}

			if (card.name == 'prepared') {
				let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);
				let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);

				if (cardInHand.children.length > 0) {
					cardInHand.removeChild(cardInHand.children[randomDiscard]);
				} //it will be error if you use DaggerThrow as the last card in hand so w check on this

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}

				return;
			}

			if (card.name == 'warcry') {
				let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}

				return;
			}

			if (card.name == 'survivor') {
				let randomDiscard = Math.floor(Math.random() * cardInHand.children.length);

				if (cardInHand.children.length > 0) {
					cardInHand.removeChild(cardInHand.children[randomDiscard]);
				} //it will be error if you use any discard card as the last card in hand so check on this

				gameModel.activePlayer.defendPoints += card.effect;
			}

			if (card.name == 'bloodletting') {
				let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}

				gameModel.activePlayer.healthPoints -= card.cost;

				this.updateView();

				return;
			}

			if (card.name == 'expertise') {
				let tempIndex = [];

				//делаем проверку чтобы карты в руке не повторялись
				for (let i = 0; i < card.effect - cardInHand.children.length; i++) {                  // количество карт в руку
					let n = Math.floor(Math.random() * 8);            // количество набранных карт
					if (tempIndex.indexOf(n) === -1) {
						tempIndex.push(n);
					} else {
						i--;
					}
				}

				if (gameModel.playerOneTurn) {
					for (let i = 0; i < tempIndex.length; i++) {
						gameModel.createCardsInHand(gameModel.playerOnePullOfCards[tempIndex[i]]);
					}
				} else {
					for (let i = 0; i < tempIndex.length; i++) {
						gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[tempIndex[i]]);
					}
				}
			}

			if (card.name == 'alpha') {
				let tempIndex = [];

				// убираем лишние карты из руки
				for (let i = 0; i < cardInHand.children.length; i++) {
					if (cardInHand.children[i].classList.contains('cards-to-play')) {
						cardInHand.removeChild(cardInHand.children[i]);
						i--;
					}
				}

				//делаем проверку чтобы карты в руке не повторялись
				for (let i = 0; i < card.effect; i++) {                  // количество карт в руку
					let n = Math.floor(Math.random() * 8);            // количество набранных карт
					if (tempIndex.indexOf(n) === -1) {
						tempIndex.push(n);
					} else {
						i--;
					}
				}

				if (gameModel.playerOneTurn) {
					for (let i = 0; i < tempIndex.length; i++) {
						gameModel.createCardsInHand(gameModel.playerOnePullOfCards[tempIndex[i]]);
					}
				} else {
					for (let i = 0; i < tempIndex.length; i++) {
						gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[tempIndex[i]]);
					}
				}
			}

			if (card.name == 'backFlip') {
				let sideEffect = card.sideEffect();
				gameModel.activePlayer.defendPoints += sideEffect;

				let tempIndex = [];

				//делаем проверку чтобы карты в руке не повторялись
				for (let i = 0; i < card.effect; i++) {                  // количество карт в руку
					let n = Math.floor(Math.random() * 8);            // количество набранных карт
					if (tempIndex.indexOf(n) === -1) {
						tempIndex.push(n);
					} else {
						i--;
					}
				}

				if (gameModel.playerOneTurn) {
					for (let i = 0; i < tempIndex.length; i++) {
						gameModel.createCardsInHand(gameModel.playerOnePullOfCards[tempIndex[i]]);
					}
				} else {
					for (let i = 0; i < tempIndex.length; i++) {
						gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[tempIndex[i]]);
					}
				}
			}

			if (card.name == 'thirdEye') {
				let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);
				gameModel.activePlayer.defendPoints += card.effect;

				if (gameModel.playerOneTurn) {
					gameModel.createCardsInHand(gameModel.playerOnePullOfCards[randomCardDraw]);
				} else {
					gameModel.createCardsInHand(gameModel.playerTwoPullOfCards[randomCardDraw]);
				}
			}

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};
	}
}

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



const battleContainer = document.querySelector('.wrapper-battle');

let player1 = new Players(gameController1);
let player2 = new Players(gameController1);
let playersView = new PlayersView(player1, player2, battleContainer);

// playersView.init(player1, player2, battleContainer);
player1.init();
player2.init();



let playerController = new PlayersController(player1, boardView);