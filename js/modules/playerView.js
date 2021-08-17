import Events from './eventsModel';
import {
	attackAnimation, attackInDirectionAnimation, blockAnimation,
	playSoundEffect, shakeAnimation, multipleAttackAnimation, standardAttackAnimation,
	ultimateSkillAnimation, damageNumbersAnimation
} from '../animation_and_sound_effects/animation';


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

		this.playerOneModel.playerViewUpdate.attach((state) => {
			if(state) {
				this.updateViewHP();
			} else {
				this.updateViewStamina();
			}
		});
		this.playerTwoModel.playerViewUpdate.attach((state) => {
			if(state) {
				this.updateViewHP();
			} else {
				this.updateViewStamina();
			}
		});

		this.playerOneModel.actionAnimation.attach(() => this.doAnimation());
		this.playerTwoModel.actionAnimation.attach(() => this.doAnimation());

		this.gameModel.selectionEnd.attach(() => {
			this.updateViewHP();
			this.updateViewDef();
			this.updateViewStamina();
		})
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

		this.playerOneDefenceValue.classList.remove('defend-value-negative-animation');
		this.playerOneDefenceValue.classList.remove('defend-value-positive-animation');
		this.playerTwoDefenceValue.classList.remove('defend-value-negative-animation');
		this.playerTwoDefenceValue.classList.remove('defend-value-positive-animation');

		if (this.playerOneModel.initialDP > this.playerOneModel.defendPoints) {
			setTimeout(() => this.playerOneDefenceValue.className = 'player-1__defence-value defend-value-negative-animation', 0);
		}

		if (this.playerOneModel.initialDP < this.playerOneModel.defendPoints) {
			setTimeout(() => this.playerOneDefenceValue.className = 'player-1__defence-value defend-value-positive-animation', 0);
		}

		if (this.playerTwoModel.initialDP > this.playerTwoModel.defendPoints) {
			setTimeout(() => this.playerTwoDefenceValue.className = 'player-2__defence-value defend-value-negative-animation', 0);
		}

		if (this.playerTwoModel.initialDP < this.playerTwoModel.defendPoints) {
			setTimeout(() => this.playerTwoDefenceValue.className = 'player-2__defence-value defend-value-positive-animation', 0);
		}
	};

	updateViewStamina() {
		this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;

		this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
	};

	updateDamageNumbers(passivePlayerUI) {
		let calcDP = this.gameModel.passivePlayer.initialDP - this.gameModel.passivePlayer.defendPoints;
		const calcHP = this.gameModel.passivePlayer.initialHP - this.gameModel.passivePlayer.healthPoints;

		if (calcDP <= 0) {
			calcDP = 0;
		}
		const resultContent = calcHP + calcDP;

		damageNumbersAnimation(passivePlayerUI, 'damage-number-animation', resultContent);
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
				attackInDirectionAnimation(activePlayerUI, direction);
				attackAnimation(passivePlayerUI, 'attack-animation', './images/attack-effects/warrior-attack.png');

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
				blockAnimation(activePlayerUI, 'shield-animation', './images/icons/icon_Block.png');
				playSoundEffect('.defend-audio');

				this.updateViewDef();
				this.updateViewStamina();
				this.updateInitialValue.notify();

				break;
			case 'bodySlam':
				attackInDirectionAnimation(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smash-attack-animation', './images/attack-effects/smash.png');

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
				attackInDirectionAnimation(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smash-attack-animation', './images/attack-effects/smash.png');

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
					attackInDirectionAnimation(activePlayerUI, direction);
					attackAnimation(passivePlayerUI, 'smash-attack-animation', './images/attack-effects/smash.png');

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
				attackInDirectionAnimation(activePlayerUI, direction);

				standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', './images/attack-effects/anger.png');

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
				attackInDirectionAnimation(activePlayerUI, direction);

				standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', './images/attack-effects/reach-heaven.png');

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
				blockAnimation(activePlayerUI, 'shield-animation', './images/icons/icon_Block.png');

				playSoundEffect('.defend-audio');

				setTimeout(() => {
					attackInDirectionAnimation(activePlayerUI, direction);
					standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', './images/attack-effects/anger.png');
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.bash-attack-audio');

					this.updateViewHP();
					this.updateViewDef();
					this.updateViewStamina();
					this.updateDamageNumbers(passivePlayerUI);
					this.updateInitialValue.notify();
				}, 400);

				break;
			case 'bloodletting':
				standardAttackAnimation(activePlayerUI, 'shield-animation', './images/attack-effects/bloodletting.png');

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
				blockAnimation(activePlayerUI, 'refresh-skill-animation', './images/attack-effects/refresh-stamina.svg');

				playSoundEffect('.meditate-audio');

				this.updateViewStamina();

				break;
			case 'cutThroughFate':
				blockAnimation(activePlayerUI, 'shield-animation', './images/icons/icon_Block.png');

				playSoundEffect('.defend-audio');

				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				setTimeout(() => {
					attackInDirectionAnimation(activePlayerUI, direction);
					standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', './images/attack-effects/mageEffect.png');
					shakeAnimation(passivePlayerUI);
					playSoundEffect('.mage-attack-audio');

					this.updateViewHP();
					this.updateViewDef();
					this.updateInitialValue.notify();
				}, 400);

				break;
			case 'perfectedStrike':
			case 'tantrum':
			case 'flechettes':
				attackInDirectionAnimation(activePlayerUI, direction);

				multipleAttackAnimation(passivePlayerUI, 'attack-animation', './images/attack-effects/warrior-attack.png', 3);

				setTimeout(() => shakeAnimation(passivePlayerUI), 200);

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;
			case 'expertise':
				blockAnimation(activePlayerUI, 'refresh-skill-animation', './images/attack-effects/serpent_ring.png');

				this.updateViewStamina();

				break;
			case 'bludgeon':
				attackInDirectionAnimation(activePlayerUI, direction);

				playSoundEffect('.warcry-audio');

				ultimateSkillAnimation(passivePlayerUI, 'warrior-ultimate-animation', './images/attack-effects/flash.png', '.flash-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;
			case 'riddleWithHoles':
				attackInDirectionAnimation(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogue-ultimate-animation', './images/attack-effects/daggers.svg', '.backstab-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;
			case 'signatureMove':
				attackInDirectionAnimation(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'mage-ultimate-animation', './images/attack-effects/mage-attack.png', '.mage-ultimate-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;
			case 'judjment':
				attackInDirectionAnimation(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogue-ultimate-animation', './images/attack-effects/judjment.svg', '.judj-audio');

				this.updateViewHP();
				this.updateViewDef();
				this.updateViewStamina();
				this.updateDamageNumbers(passivePlayerUI);
				this.updateInitialValue.notify();

				break;
		}
	}
}
