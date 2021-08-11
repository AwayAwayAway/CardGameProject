import {
	attackAnimation, attackAnimationEffect, blockAnimationEffect,
	playSoundEffect, shakeAnimation, multipleAttackAnimation, standartAttackAnimation,
	ultimateSkillAnimation, damageNumbersAnimation
} from '../animation_and_sound_effects/animation';
import Events from './eventsModel';

export default class PlayersView {
	constructor(playerOneModel, playerTwoModel, gameModel, container) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		this.gameModel = gameModel;
		const playerContainer = container;

		this.updateInitialValue = new Events();

		this.playerOneHPValue = playerContainer.querySelector('.player-1__hp-value');
		this.playerOneDefenceValue = playerContainer.querySelector('.player-1__defence-value');
		this.playerOneStaminaValue = playerContainer.querySelector('.player-1__stamina-value');
		this.playerOneHP = playerContainer.querySelector('.player-1__hp-bar-inner');

		this.playerTwoHPValue = playerContainer.querySelector('.player-2__hp-value');
		this.playerTwoDefenceValue = playerContainer.querySelector('.player-2__defence-value');
		this.playerTwoStaminaValue = playerContainer.querySelector('.player-2__stamina-value');
		this.playerTwoHP = playerContainer.querySelector('.player-2__hp-bar-inner');

		this.playerOneModel.playerViewUpdate.attach(() => {
			this.updateViewStamina();
		});
		this.playerTwoModel.playerViewUpdate.attach(() => {
			this.updateViewStamina();
		});

		this.playerOneModel.actionAnimation.attach(() => this.doAnimation());
		this.playerTwoModel.actionAnimation.attach(() => this.doAnimation());

		this.updateViewHP();
		this.updateViewDef();
		this.updateViewStamina();
	}

	// устанавливаем первые параметры здоровье, защита, стамина
	updateViewHP() {
		this.playerOneHPValue.textContent = this.playerOneModel.healthPoints;

		this.playerOneHP.style.width = this.playerOneModel.healthPoints + '%';

		this.playerTwoHPValue.textContent = this.playerTwoModel.healthPoints;

		this.playerTwoHP.style.width = this.playerTwoModel.healthPoints + '%';
	};

	updateViewDef() {
		this.playerOneDefenceValue.textContent = this.playerOneModel.defendPoints;

		this.playerTwoDefenceValue.textContent = this.playerTwoModel.defendPoints;

		this.playerOneDefenceValue.classList.remove('defendValueNegative');
		this.playerOneDefenceValue.classList.remove('defendValuePositive');
		this.playerTwoDefenceValue.classList.remove('defendValueNegative');
		this.playerTwoDefenceValue.classList.remove('defendValuePositive');

		if(this.playerOneModel.initialDP > this.playerOneModel.defendPoints) {
			setTimeout(() => this.playerOneDefenceValue.className = 'player-1__defence-value defendValueNegative', 0);
		}

		if (this.playerOneModel.initialDP < this.playerOneModel.defendPoints) {
			setTimeout(() => this.playerOneDefenceValue.className = 'player-1__defence-value defendValuePositive', 0);
		}

		if (this.playerTwoModel.initialDP > this.playerTwoModel.defendPoints) {
			setTimeout(() => this.playerTwoDefenceValue.className = 'player-2__defence-value defendValueNegative', 0);
		}

		if (this.playerTwoModel.initialDP < this.playerTwoModel.defendPoints) {
			setTimeout(() => this.playerTwoDefenceValue.className = 'player-2__defence-value defendValuePositive', 0);
		}
	};

	updateViewStamina() {
		this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;

		this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
	};

	updateDamageNumbers(passivePlayerUI) {
		let calcDP = this.gameModel.passivePlayer.initialDP - this.gameModel.passivePlayer.defendPoints;
		const calcHP = this.gameModel.passivePlayer.initialHP - this.gameModel.passivePlayer.healthPoints;

		if(calcDP <= 0) {
			calcDP = 0;
		}
		const resultContent = calcHP + calcDP;

		damageNumbersAnimation(passivePlayerUI, 'damageNumberAnimate', resultContent)
	};

	doAnimation() {
		let activePlayerUI;
		let passivePlayerUI;
		let direction;

		if (this.gameModel.playerOneTurn) {
			activePlayerUI = '.player-1__model';
			passivePlayerUI = '.player-2__model';
			direction = 'right';
		} else {
			activePlayerUI = '.player-2__model';
			passivePlayerUI = '.player-1__model';
			direction = 'left';
		}

		switch (this.gameModel.tempCard.name) {
			case 'strike_w':
			case 'bash':
			case 'strike_r':
			case 'quickSlash':
				attackAnimationEffect(activePlayerUI, direction);
				attackAnimation(passivePlayerUI, 'attack', 'images/attack-effects/warrior-attack.png');

				setTimeout(() => {
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.strike-attack-audio');
				}, 200);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'defend_w':
			case 'armaments':
			case 'entrench':
			case 'deflect':
			case 'backFlip':
			case 'defend_m':
			case 'nirvana':
			case 'masterReality':
			case 'thirdEye':
			case 'survivor':
				blockAnimationEffect(activePlayerUI, 'shield','images/icons/Icon_Block.png');
				playSoundEffect('.defend-audio');

				this.updateViewDef();
				this.updateViewStamina();

				this.updateInitialValue.notify();

				break;

			case 'bodySlam':
				attackAnimationEffect(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');

				setTimeout(() => {
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.bash-attack-audio');
				}, 200);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'slice':
			case 'strike_m':
				attackAnimationEffect(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');

				playSoundEffect('.mage-punch-audio');

				shakeAnimation(passivePlayerUI);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'daggerThrow':
				setTimeout(() => {
					attackAnimationEffect(activePlayerUI, direction);
					attackAnimation(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');

					shakeAnimation(passivePlayerUI);
					playSoundEffect('.bash-attack-audio');
				}, 200);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'anger':
				attackAnimationEffect(activePlayerUI, direction);

				standartAttackAnimation(passivePlayerUI, 'angerAttack', 'images/attack-effects/anger.png');

				setTimeout(() => {
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.anger-audio');
				}, 200);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'reachHeaven':
				attackAnimationEffect(activePlayerUI, direction);

				standartAttackAnimation(passivePlayerUI, 'angerAttack', 'images/attack-effects/reach-heaven.png');

				setTimeout(() => {
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.mage-strong-audio');
				}, 200);



				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'ironWave':
			case 'dash':
				blockAnimationEffect(activePlayerUI,'shield','images/icons/Icon_Block.png');

				playSoundEffect('.defend-audio');

				setTimeout(()=> {
					attackAnimationEffect(activePlayerUI, direction);
					standartAttackAnimation(passivePlayerUI, 'angerAttack', 'images/attack-effects/anger.png');
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.bash-attack-audio');

					this.updateViewHP();
					this.updateViewDef();
					this.updateViewStamina();
					this.updateDamageNumbers(passivePlayerUI);
					this.updateInitialValue.notify();
				},400)



				break;

			case 'bloodletting':
				standartAttackAnimation(activePlayerUI, 'shield', 'images/attack-effects/bloodletting.png');

				setTimeout(() => {
					shakeAnimation(activePlayerUI);
					playSoundEffect('.bloodletting-audio');
				}, 200);



				this.updateViewHP();

				this.updateInitialValue.notify();

				break;

			case 'warcry':
				shakeAnimation(activePlayerUI);

				playSoundEffect('.warcry-audio');

				this.updateViewStamina();

				break;

			case 'meditate':
			case 'alpha':
				blockAnimationEffect(activePlayerUI, 'expertice', 'images/attack-effects/refresh-stamina.svg');

				playSoundEffect('.meditate-audio');

				this.updateViewStamina();

				break;

			case 'cutThroughFate':
				blockAnimationEffect(activePlayerUI,'shield','images/icons/Icon_Block.png');

				playSoundEffect('.defend-audio');

				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				setTimeout(()=> {
					attackAnimationEffect(activePlayerUI, direction);
					standartAttackAnimation(passivePlayerUI, 'angerAttack', 'images/attack-effects/mageEffect.png');
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.mage-attack-audio');

					this.updateViewHP();
					this.updateViewDef();
					this.updateInitialValue.notify();
				},400)

				break;

			case 'perfectedStrike':
			case 'tantrum':
			case 'flechettes':
				attackAnimationEffect(activePlayerUI, direction);

				multipleAttackAnimation(passivePlayerUI, 'attack', 'images/attack-effects/warrior-attack.png', 3);

				setTimeout(() => shakeAnimation(passivePlayerUI), 200);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'expertise':
				blockAnimationEffect(activePlayerUI, 'expertice', 'images/attack-effects/serpent_ring.png');

				this.updateViewStamina();

				break;

			case 'bludgeon':
				attackAnimationEffect(activePlayerUI, direction);

				playSoundEffect('.warcry-audio');

				ultimateSkillAnimation(passivePlayerUI, 'warriorUltimate', 'images/attack-effects/flash.png', '.flash-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'riddleWithHoles':
				attackAnimationEffect(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogueUltimate', 'images/attack-effects/daggers.svg', '.backstab-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'signatureMove':
				attackAnimationEffect(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'mageUltimate', 'images/attack-effects/mage-attack.png', '.mage-ultimate-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;

			case 'judjment':
				attackAnimationEffect(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogueUltimate', 'images/attack-effects/judjment.svg', '.judj-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;
		}
	}
}
