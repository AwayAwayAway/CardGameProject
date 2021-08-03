import Events from './eventsModel';

export default class Players {
	constructor(game, board) {
		this.healthPoints = 100;
		this.staminaPoints = 4;
		this.defendPoints = 7;

		this.gameModel = game;
		this.boardModel = board;

		this.playerViewUpdate = new Events();
		this.cardDraw = new Events();
		this.cardDiscard = new Events();
	}

	endTurn() {
		this.gameModel.activePlayer.staminaPoints = 4;
		this.gameModel.passivePlayer.staminaPoints = 4;

		this.updateView();
	}

	updateView() {
		this.playerViewUpdate.notify();
	};

	doAction() {
		if (this.gameModel.activePlayer.staminaPoints < this.gameModel.tempCard.cost) {
			playSoundEffect('.card-grabb-cancel');
			return;
		}

		// let activePlayerUI;
		// let passivePlayerUI;
		// let direction;
		//
		// if(this.gameModel.playerOneTurn) {
		// 	activePlayerUI = '.player-1__model';
		// 	passivePlayerUI = '.player-2__model';
		// 	direction = 'right'
		// } else {
		// 	activePlayerUI = '.player-2__model';
		// 	passivePlayerUI = '.player-1__model';
		// 	direction = 'left'
		// }


		switch (this.gameModel.tempCard.type) {
			case 'attack':
				this.standartAttack(this.gameModel.tempCard);
				// attackAnimationEffect(activePlayerUI, direction);
				//
				// setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				// setTimeout(() => playSoundEffect('.bash-attack') , 200);
				break;
			case 'attackDrawDiscard':
				this.attackDrawDiscard(this.gameModel.tempCard);
				attackAnimationEffect(activePlayerUI, direction);

				setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				setTimeout(() => playSoundEffect('.bash-attack') , 200);
				break;
			case 'attackAddEffect':
				this.sideEffectAttack(this.gameModel.tempCard);
				attackAnimationEffect(activePlayerUI, direction);

				setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				setTimeout(() => playSoundEffect('.bash-attack') , 200);
				break;
			case 'defend':
				this.standartDefend(this.gameModel.tempCard);

				blockAnimationEffect(activePlayerUI);
				playSoundEffect('.defend-sound')
				break;
			case 'defendAddEffect':
				this.sideEffectDefend(this.gameModel.tempCard);

				blockAnimationEffect(activePlayerUI);
				playSoundEffect('.defend-sound')
				break;
			case 'defendDrawDiscard':
				this.defendDrawDiscard(this.gameModel.tempCard);
				break;
			case 'defendAndAttack':
				this.defendWithAttack(this.gameModel.tempCard);
		}
	};

	randomCardDraw() {
		let randomCardDraw = Math.floor(Math.random() * this.gameModel.playerOnePullOfCards.length);

		if (this.gameModel.playerOneTurn) {
			this.cardDraw.notify(this.gameModel.playerOnePullOfCards[randomCardDraw]);
		} else {
			this.cardDraw.notify(this.gameModel.playerTwoPullOfCards[randomCardDraw]);
		}

		createCardAnim('.card-in-hand-field', 'single');
	}

	randomCardDiscard() {
		let randomDiscard = Math.floor(Math.random() * this.boardModel.cardInHand.children.length);

		//it will be error if you use DaggerThrow as the last card in hand so w check on this
		if (this.boardModel.cardInHand.children.length > 0) {
			this.cardDiscard.notify(this.boardModel.cardInHand.children[randomDiscard]);
		}
	}

	// we take condition only for card "expertise"
	massiveRandomDraw(card, condition) {
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

		if (this.gameModel.playerOneTurn) {
			for (let i = 0; i < tempIndex.length; i++) {
				this.cardDraw.notify(this.gameModel.playerOnePullOfCards[tempIndex[i]]);
			}
		} else {
			for (let i = 0; i < tempIndex.length; i++) {
				this.cardDraw.notify(this.gameModel.playerTwoPullOfCards[tempIndex[i]]);
			}
		}

		createCardAnim('.card-in-hand-field', 'single');
	}

	standartAttack(card) {
		let activePlayerUI;
		let passivePlayerUI;
		let direction;

		if(this.gameModel.playerOneTurn) {
			activePlayerUI = '.player-1__model';
			passivePlayerUI = '.player-2__model';
			direction = 'right'
		} else {
			activePlayerUI = '.player-2__model';
			passivePlayerUI = '.player-1__model';
			direction = 'left'
		}

		attackAnimationEffect(activePlayerUI, direction);
		attackAnimation(passivePlayerUI, 'attack', '../images/attack-effects/warrior-attack.png')

		setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
		setTimeout(() => playSoundEffect('.strike-attack') , 200);

		if (this.gameModel.passivePlayer.defendPoints) {
			let test = this.gameModel.passivePlayer.defendPoints - card.effect;

			if (test < 0) {
				this.gameModel.passivePlayer.defendPoints = 0;

				test = Math.abs(test);
				this.gameModel.passivePlayer.healthPoints -= test;
			} else {
				this.gameModel.passivePlayer.defendPoints = test;
			}
		} else {
			this.gameModel.passivePlayer.healthPoints -= card.effect;
		}

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	};

	sideEffectAttack(card) {
		// some of cards have special side effects, so we do additional if check
		// to make for them special methods

		if (card.name == 'riddleWithHoles') {
			this.gameModel.passivePlayer.healthPoints -= card.effect;

			this.gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();

			return;
		}

		if (card.name == 'judjment') {
			let sideEffect = card.sideEffect();

			if (sideEffect == undefined) {
				return;
			}

			this.gameModel.passivePlayer.healthPoints = sideEffect;

			this.updateView();

			return;
		}

		// some of cards havee common side effect so we can group it in one method
		if (card.sideEffect) {
			let sideEffect = card.sideEffect();

			if (this.gameModel.passivePlayer.defendPoints) {
				let test = this.gameModel.passivePlayer.defendPoints - sideEffect;

				if (test < 0) {
					this.gameModel.passivePlayer.defendPoints = 0;

					test = Math.abs(test);
					this.gameModel.passivePlayer.healthPoints -= test;
				} else {
					this.gameModel.passivePlayer.defendPoints = test;
				}
			} else {
				if (sideEffect) {
					this.gameModel.passivePlayer.healthPoints -= sideEffect;
				} else {
					this.gameModel.passivePlayer.healthPoints -= card.effect;
				}
			}
		}

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	};

	attackDrawDiscard(card) {
		// some of cards have special side effect, so we do additional if check
		// to make for them special methods
		// if (this.gameModel.activePlayer.staminaPoints < card.cost) {
		// 	return;
		// }

		if (this.gameModel.passivePlayer.defendPoints) {
			let test = this.gameModel.passivePlayer.defendPoints - card.effect;

			if (test < 0) {
				this.gameModel.passivePlayer.defendPoints = 0;

				test = Math.abs(test);
				this.gameModel.passivePlayer.healthPoints -= test;
			} else {
				this.gameModel.passivePlayer.defendPoints = test;
			}
		} else {
			this.gameModel.passivePlayer.healthPoints -= card.effect;
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
			this.gameModel.activePlayer.defendPoints += sideEffect;
			this.randomCardDraw();
		}

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	};

	standartDefend(card) {
		this.gameModel.activePlayer.defendPoints += card.effect;
		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	};

	sideEffectDefend(card) {
		if (card.name == 'nirvana') {
			let sideEffect = card.sideEffect();

			this.gameModel.activePlayer.defendPoints = sideEffect;
			this.gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();

			return;
		}

		if (card.name == 'meditate') {
			let test = this.gameModel.activePlayer.staminaPoints - card.cost + card.effect;

			if (test > 4) {
				this.gameModel.activePlayer.staminaPoints -= card.cost;
				this.gameModel.activePlayer.staminaPoints = 4;
			} else {
				this.gameModel.activePlayer.staminaPoints -= card.cost;
				this.gameModel.activePlayer.staminaPoints += card.effect;
			}

			this.updateView();

			return;
		}

		if (card.sideEffect) {
			let sideEffect = card.sideEffect();

			this.gameModel.activePlayer.defendPoints += sideEffect;
			this.gameModel.activePlayer.staminaPoints -= card.cost;

			this.updateView();
		}
	};

	defendWithAttack(card) {
		this.sideEffectAttack(card);
		this.standartDefend(card);

		//compensate for double stamina reduce from methods above
		this.gameModel.activePlayer.staminaPoints += card.cost;

		this.updateView();
	};

	defendDrawDiscard(card) {
		// some of cards have special side effect, so we do additional if check
		// to make for them special methods
		// if (this.gameModel.activePlayer.staminaPoints < card.cost) {
		// 	return;
		// }

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

			this.gameModel.activePlayer.defendPoints += card.effect;
		}

		if (card.name == 'bloodletting') {
			this.randomCardDraw();

			this.gameModel.activePlayer.healthPoints -= card.effect;

			this.updateView();

			return;
		}

		if (card.name == 'expertise') {
			this.massiveRandomDraw(card, this.boardModel.cardInHand.children.length);
		}

		if (card.name == 'alpha') {

			// убираем лишние карты из руки
			for (let i = 0; i < this.boardModel.cardInHand.children.length; i++) {
				if (this.boardModel.cardInHand.children[i].classList.contains('cards-to-play')) {
					this.randomCardDiscard(this.boardModel.cardInHand.children[i]);
					i--;
				}
			}

			this.massiveRandomDraw(card, 0);
		}

		if (card.name == 'backFlip') {
			let sideEffect = card.sideEffect();
			this.gameModel.activePlayer.defendPoints += sideEffect;

			this.massiveRandomDraw(card, 0);
		}

		if (card.name == 'thirdEye') {
			this.gameModel.activePlayer.defendPoints += card.effect;

			this.randomCardDraw();
		}

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.updateView();
	};
}
