import Events from './eventsModel';
import {
	playSoundEffect,
	createCardAnimation,
	discardCardAnimation,
	notEnoughStaminaAnimation
} from '../animation_and_sound_effects/animation.js';

export default class Players {
	constructor(game, board) {
		this.healthPoints = 100;
		this.staminaPoints = 4;
		this.defendPoints = 7;

		this.gameModel = game;
		this.boardModel = board;

		this.onPlayerViewUpdate = new Events();
		this.onCardDraw = new Events();
		this.onCardDiscard = new Events();
		this.onCardActionAnimation = new Events();

		this.initialHP = 100;
		this.initialDP = 7;
	}

	endTurn() {
		this.gameModel.activePlayer.staminaPoints = 4;
		this.gameModel.passivePlayer.staminaPoints = 4;

		this.updateView();
	}

	updateView(state) {
		if (state) {
			this.onPlayerViewUpdate.notify('concede');
		} else {
			this.onPlayerViewUpdate.notify();
		}

	};

	updateInitialValues() {
		this.initialHP = this.healthPoints;
		this.initialDP = this.defendPoints;
	};

	doAction() {
		if (this.gameModel.activePlayer.staminaPoints < this.gameModel.tempCard.cost) {
			playSoundEffect('.card-grab-cancel-audio');

			(this.gameModel.playerOneTurn) ? notEnoughStaminaAnimation('player1') : notEnoughStaminaAnimation();

			return;
		}

		switch (this.gameModel.tempCard.type) {
			case 'attack':
				this.standartAttack(this.gameModel.tempCard);

				break;
			case 'attackDrawDiscard':
				this.attackDrawDiscard(this.gameModel.tempCard);

				break;
			case 'attackAddEffect':
				this.sideEffectAttack(this.gameModel.tempCard);

				break;
			case 'defend':
				this.standartDefend(this.gameModel.tempCard);

				break;
			case 'defendAddEffect':
				this.sideEffectDefend(this.gameModel.tempCard);

				break;
			case 'defendDrawDiscard':
				this.defendDrawDiscard(this.gameModel.tempCard);

				break;
			case 'defendAndAttack':
				this.defendWithAttack(this.gameModel.tempCard);

				break;
		}
	};

	randomCardDraw() {
		let randomCardDraw = Math.floor(Math.random() * this.gameModel.playerOnePullOfCards.length);

		if (this.gameModel.playerOneTurn) {
			this.onCardDraw.notify(this.gameModel.playerOnePullOfCards[randomCardDraw]);
		} else {
			this.onCardDraw.notify(this.gameModel.playerTwoPullOfCards[randomCardDraw]);
		}

		createCardAnimation('.card-in-hand-field', 'single');
	}

	massiveRandomDraw(card, condition) {
		let tempIndex = [...this.boardModel.cardInHand.children].map((element) => element.dataset.info);

		const newTemp = tempIndex.map(element => parseInt(element, 10));

		let pull = [...this.gameModel.playerOnePullOfCards].map((element) => element.id);

		let onDrawArray = [];

		//делаем проверку чтобы карты в руке не повторялись
		for (let i = 0; i < card.effect - condition; i++) {                  // количество карт в руку
			let n = Math.floor(Math.random() * pull.length);
			// количество набранных карт
			if (newTemp.indexOf(pull[n]) === -1 && onDrawArray.indexOf(pull[n]) === -1) {
				onDrawArray.push(pull[n]);
			} else {
				i--;
			}
		}

		if (this.gameModel.playerOneTurn) {
			onDrawArray = this.gameModel.checkOnSelectedCards(onDrawArray, this.gameModel.playerOneClass);

			for (let i = 0; i < onDrawArray.length; i++) {
				this.onCardDraw.notify(onDrawArray[i]);
			}
		} else {
			onDrawArray = this.gameModel.checkOnSelectedCards(onDrawArray, this.gameModel.playerTwoClass);

			for (let i = 0; i < onDrawArray.length; i++) {
				this.onCardDraw.notify(onDrawArray[i]);
			}
		}

		createCardAnimation('.card-in-hand-field', 'single');
	}

	randomCardDiscard() {
		let randomDiscard = Math.floor(Math.random() * this.boardModel.cardInHand.children.length);

		//it will be error if you use DaggerThrow as the last card in hand so w check on this
		if (this.boardModel.cardInHand.children.length > 0) {
			discardCardAnimation(this.boardModel.cardInHand.children[randomDiscard]);

			playSoundEffect('.discard-card-audio');

			setTimeout(() => this.onCardDiscard.notify(this.boardModel.cardInHand.children[randomDiscard]), 300);
		}
	}

	cardRemove(element) {
		//it will be error if you use DaggerThrow as the last card in hand so w check on this
		if (this.boardModel.cardInHand.children.length > 0) {
			discardCardAnimation(element);

			playSoundEffect('.discard-card-audio');

			this.onCardDiscard.notify(element);
		}
	}

	standartAttack(card) {
		this.attackThroughDefendPoints(card);

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.onCardActionAnimation.notify();
	};

	sideEffectAttack(card) {
		// some of cards have special side effects, so we do additional if check
		// to make for them special methods
		if (card.name == 'riddleWithHoles') {
			this.gameModel.passivePlayer.healthPoints -= card.effect;

			this.gameModel.activePlayer.staminaPoints -= card.cost;

			this.onCardActionAnimation.notify();

			return;
		}

		if (card.name == 'judgment') {
			let sideEffect = card.sideEffect();

			if (sideEffect == undefined) {
				this.onCardActionAnimation.notify();

				return;
			}

			this.gameModel.passivePlayer.healthPoints = sideEffect;

			this.onCardActionAnimation.notify();

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

		this.onCardActionAnimation.notify();
	};

	attackDrawDiscard(card) {
		this.attackThroughDefendPoints(card);

		if (card.name == 'daggerThrow') {
			setTimeout(() => this.randomCardDiscard(), 300);

			setTimeout(() => this.randomCardDraw(), 800);
		}

		if (card.name == 'quickSlash') {
			this.randomCardDraw();
		}

		if (card.name == 'cutThroughFate') {
			let sideEffect = card.sideEffect();

			this.gameModel.activePlayer.defendPoints += sideEffect;

			setTimeout(() => this.randomCardDraw(), 600);
		}

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.onCardActionAnimation.notify();
	};

	standartDefend(card) {
		this.gameModel.activePlayer.defendPoints += card.effect;
		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.onCardActionAnimation.notify();
	};

	sideEffectDefend(card) {
		if (card.name == 'nirvana') {
			let sideEffect = card.sideEffect();

			this.gameModel.activePlayer.defendPoints = sideEffect;
			this.gameModel.activePlayer.staminaPoints -= card.cost;

			this.onCardActionAnimation.notify();

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

			this.onCardActionAnimation.notify();

			return;
		}

		if (card.sideEffect) {
			let sideEffect = card.sideEffect();

			this.gameModel.activePlayer.defendPoints += sideEffect;
			this.gameModel.activePlayer.staminaPoints -= card.cost;

			this.onCardActionAnimation.notify();
		}
	};

	defendWithAttack(card) {
		this.attackThroughDefendPoints(card)

		this.gameModel.activePlayer.defendPoints += card.effect;
		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.onCardActionAnimation.notify();
	};

	defendDrawDiscard(card) {
		// some of cards have special side effect, so we do additional if check
		// to make for them special methods

		if (card.name == 'prepared') {
			this.randomCardDiscard();
			setTimeout(() => this.randomCardDraw(), 300);

			return;
		}

		if (card.name == 'warcry') {
			this.randomCardDraw();

			this.onCardActionAnimation.notify();

			return;
		}

		if (card.name == 'survivor') {
			setTimeout(() => this.randomCardDiscard(), 300);

			this.gameModel.activePlayer.defendPoints += card.effect;
		}

		if (card.name == 'bloodletting') {
			this.randomCardDraw();

			this.gameModel.activePlayer.healthPoints -= card.effect;

			this.onCardActionAnimation.notify();

			return;
		}

		if (card.name == 'expertise') {
			this.massiveRandomDraw(card, this.boardModel.cardInHand.children.length);
		}

		if (card.name == 'alpha') {

			// убираем лишние карты из руки
			for (let i = 0; i < this.boardModel.cardInHand.children.length; i++) {
				if (this.boardModel.cardInHand.children[i].classList.contains('cards')) {
					this.cardRemove(this.boardModel.cardInHand.children[i]);
					i--;
				}
			}

			this.massiveRandomDraw(card, 0);
		}

		if (card.name == 'backFlip') {
			let sideEffect = card.sideEffect();
			this.gameModel.activePlayer.defendPoints += sideEffect;

			setTimeout(() => this.massiveRandomDraw(card, 0), 300);
		}

		if (card.name == 'thirdEye') {
			this.gameModel.activePlayer.defendPoints += card.effect;

			this.randomCardDraw();
		}

		this.gameModel.activePlayer.staminaPoints -= card.cost;

		this.onCardActionAnimation.notify();
	};

	attackThroughDefendPoints(card) {
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
	}

	savePlayerData() {
		return {
			healthPoints: this.healthPoints,
			staminaPoints: this.staminaPoints,
			defendPoints: this.defendPoints,
			initialHP: this.initialHP,
			initialDP: this.initialDP
		};
	}

	doRestorePlayerData(savedData, player) {
		this.healthPoints = savedData[player].healthPoints;
		this.staminaPoints = savedData[player].staminaPoints;
		this.defendPoints = savedData[player].defendPoints;
		this.initialHP = savedData[player].initialHP;
		this.initialDP = savedData[player].initialDP;
	}

	concede() {
		this.healthPoints = 0;

		this.updateView('concede');
	}
}
