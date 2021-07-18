{
	function Players(game, board) {
		this.healthPoints = 100;
		this.staminaPoints = 4;
		this.defendPoints = 7;

		const gameModel = game;
		const boardModel = board;

		this.playerViewUpdate = new Events();
		this.cardDraw = new Events();
		this.cardDiscard = new Events();

		this.init = function () {
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

		this.randomCardDraw = function () {
			let randomCardDraw = Math.floor(Math.random() * gameModel.playerOnePullOfCards.length);

			if (gameModel.playerOneTurn) {
				this.cardDraw.notify(gameModel.playerOnePullOfCards[randomCardDraw]);
			} else {
				this.cardDraw.notify(gameModel.playerTwoPullOfCards[randomCardDraw]);
			}
		}

		this.randomCardDiscard = function () {
			let randomDiscard = Math.floor(Math.random() * boardModel.cardInHand.children.length);

			//it will be error if you use DaggerThrow as the last card in hand so w check on this
			if (boardModel.cardInHand.children.length > 0) {
				this.cardDiscard.notify(boardModel.cardInHand.children[randomDiscard]);
			}
		}

		// we take condition only for card "expertise"
		this.massiveRandomDraw = function (card, condition) {
			let tempIndex = [];

			//делаем проверку чтобы карты в руке не повторялись
			for (let i = 0; i < card.effect - condition; i++) {                  // количество карт в руку
				let n = Math.floor(Math.random() * 8);            // количество набранных карт
				if (tempIndex.indexOf(n) === -1) {
					tempIndex.push(n);
				} else {
					i--;
				}
			}

			if (gameModel.playerOneTurn) {
				for (let i = 0; i < tempIndex.length; i++) {
					this.cardDraw.notify(gameModel.playerOnePullOfCards[tempIndex[i]]);
				}
			} else {
				for (let i = 0; i < tempIndex.length; i++) {
					this.cardDraw.notify(gameModel.playerTwoPullOfCards[tempIndex[i]]);
				}
			}
		}

		this.standartAttack = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) { return }

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
			// some of cards have special side effect, so we do additional if check
			// to make for them special methods
			if (gameModel.activePlayer.staminaPoints < card.cost) { return }

			if (card.name == 'riddleWithHoles') {
				gameModel.passivePlayer.healthPoints -= card.effect;

				gameModel.activePlayer.staminaPoints -= card.cost;

				this.updateView();

				return;
			}

			if (card.name == 'judjment') {
				let sideEffect = card.sideEffect();

				if (sideEffect == undefined) { return }

				gameModel.passivePlayer.healthPoints = sideEffect;

				this.updateView();

				return;
			}

			// some of cards havee common side effect so we can grooup it in one method
			if (card.sideEffect) {
				let sideEffect = card.sideEffect();

				if (gameModel.passivePlayer.defendPoints) {
					let test = gameModel.passivePlayer.defendPoints - sideEffect;

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
			// some of cards have special side effect, so we do additional if check
			// to make for them special methods
			if (gameModel.activePlayer.staminaPoints < card.cost) { return }

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

			if (card.name == 'daggerThrow') {
				this.randomCardDiscard();
				this.randomCardDraw();
			}

			if (card.name == 'quickSlash') {
				this.randomCardDraw();
			}

			if (card.name == 'cutThroughFate') {
				let sideEffect = card.sideEffect();
				gameModel.activePlayer.defendPoints += sideEffect;
				this.randomCardDraw();
			}

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};

		this.standartDefend = function (card) {
			if (gameModel.activePlayer.staminaPoints < card.cost) { return }

			gameModel.activePlayer.defendPoints += card.effect;
			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};

		this.sideEffectDefend = function (card) {
			// some of cards have special side effect, so we do additional if check
			// to make for them special methods
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
			if (gameModel.activePlayer.staminaPoints < card.cost) { return }

			this.sideEffectAttack(card);
			this.standartDefend(card);

			//compensate for double stamina reduce from methods above
			gameModel.activePlayer.staminaPoints += card.cost;

			this.updateView();
		};

		this.defendDrawDiscard = function (card) {
			// some of cards have special side effect, so we do additional if check
			// to make for them special methods
			if (gameModel.activePlayer.staminaPoints < card.cost) { return }

			if (card.name == 'prepared') {
				this.randomCardDiscard();
				this.randomCardDraw();

				return;
			}

			if (card.name == 'warcry') {
				this.randomCardDraw();

				return;
			}

			if (card.name == 'survivor') {
				this.randomCardDiscard();

				gameModel.activePlayer.defendPoints += card.effect;
			}

			if (card.name == 'bloodletting') {
				this.randomCardDraw();

				gameModel.activePlayer.healthPoints -= card.cost;

				this.updateView();

				return;
			}

			if (card.name == 'expertise') {
				this.massiveRandomDraw(card, boardModel.cardInHand.children.length)
			}

			if (card.name == 'alpha') {

				// убираем лишние карты из руки
				for (let i = 0; i < boardModel.cardInHand.children.length; i++) {
					if (boardModel.cardInHand.children[i].classList.contains('cards-to-play')) {
						this.randomCardDiscard(boardModel.cardInHand.children[i]);
						i--;
					}
				}

				this.massiveRandomDraw(card, 0)
			}

			if (card.name == 'backFlip') {
				let sideEffect = card.sideEffect();
				gameModel.activePlayer.defendPoints += sideEffect;

				this.massiveRandomDraw(card, 0)
			}

			if (card.name == 'thirdEye') {
				gameModel.activePlayer.defendPoints += card.effect;

				this.randomCardDraw();
			}

			gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		};
	}
}