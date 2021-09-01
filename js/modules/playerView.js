import Events from './eventsModel';
import {
	attackAnimation, attackInDirectionAnimation, blockAnimation,
	playSoundEffect, shakeAnimation, multipleAttackAnimation, standardAttackAnimation,
	ultimateSkillAnimation, damageNumbersAnimation
} from '../animation_and_sound_effects/animation';
import {media} from '../preloadedMediaContent';

export default class PlayersView {
	constructor(playerOneModel, playerTwoModel, gameModel, container) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		this.gameModel = gameModel;
		this.playerContainer = container;

		this.onUpdateInitialValue = new Events();

		this.playerOneHPValue = this.playerContainer.querySelector('.player-1__hp-value');
		this.playerOneDefenceValue = this.playerContainer.querySelector('.player-1__defence-value');
		this.playerOneStaminaValue = this.playerContainer.querySelector('.player-1__stamina-value');
		this.playerOneHP = this.playerContainer.querySelector('.player-1__hp-bar-inner');

		this.playerTwoHPValue = this.playerContainer.querySelector('.player-2__hp-value');
		this.playerTwoDefenceValue = this.playerContainer.querySelector('.player-2__defence-value');
		this.playerTwoStaminaValue = this.playerContainer.querySelector('.player-2__stamina-value');
		this.playerTwoHP = this.playerContainer.querySelector('.player-2__hp-bar-inner');

		this.playerOneModel.onPlayerViewUpdate.attach((state) => {
			if (state) {
				this.renderViewHP();
			} else {
				this.renderViewStamina();
			}
		});
		this.playerTwoModel.onPlayerViewUpdate.attach((state) => {
			if (state) {
				this.renderViewHP();
			} else {
				this.renderViewStamina();
			}
		});

		this.playerOneModel.onCardActionAnimation.attach(() => this.renderAnimation());
		this.playerTwoModel.onCardActionAnimation.attach(() => this.renderAnimation());

		this.gameModel.onSelectionEnd.attach(() => this.renderWholeUI(false));
	}

	// устанавливаем первые параметры здоровье, защита, стамина
	renderViewHP() {
		this.playerOneHPValue.textContent = this.playerOneModel.healthPoints;

		this.playerOneHP.style.width = this.playerOneModel.healthPoints + '%';

		this.playerTwoHPValue.textContent = this.playerTwoModel.healthPoints;

		this.playerTwoHP.style.width = this.playerTwoModel.healthPoints + '%';
	};

	renderViewDef() {
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

	renderViewStamina() {
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

	renderWholeUI(damage, passivePlayerUI) {
		this.renderViewHP();
		this.renderViewDef();
		this.renderViewStamina();

		if (damage) {
			this.updateDamageNumbers(passivePlayerUI);
		}
	}

	renderAnimation() {
		let activePlayerUI;
		let passivePlayerUI;
		let direction;
		const animationPromise = timer => {
			const promise = new Promise((resolve, reject) => {
				setTimeout(() => resolve(), timer);
			})

			return promise;
		}

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

				attackAnimation(passivePlayerUI, 'attack-animation', media.animation.warriorAttack);

				animationPromise(200).then(() => {
					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.strikeAttack);

					return 'true';
				})
					.then(() => {
						this.renderWholeUI(true, passivePlayerUI);

						this.onUpdateInitialValue.notify();
					})

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
				blockAnimation(activePlayerUI, 'shield-animation', media.animation.defend);

				playSoundEffect(media.audio.defend);

				this.renderViewDef();

				this.renderViewStamina();

				this.onUpdateInitialValue.notify();

				break;
			case 'bodySlam':
				attackInDirectionAnimation(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smash-attack-animation', media.animation.smash);

				animationPromise(200).then(() => {
					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.bashAttack);

					return 'true';
				})
					.then(() => {
						this.renderWholeUI();

						this.updateDamageNumbers(passivePlayerUI);

						this.onUpdateInitialValue.notify();
					})

				break;
			case 'slice':
			case 'strike_m':
				attackInDirectionAnimation(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smash-attack-animation', media.animation.smash);

				playSoundEffect(media.audio.magePunch);

				shakeAnimation(passivePlayerUI);

				this.renderWholeUI(true, passivePlayerUI);

				this.onUpdateInitialValue.notify();

				break;
			case 'daggerThrow':
				animationPromise(200).then(() => {
					attackInDirectionAnimation(activePlayerUI, direction);

					attackAnimation(passivePlayerUI, 'smash-attack-animation', media.animation.smash);

					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.bashAttack);

					return 'true';
				})
					.then(() => {
						this.renderWholeUI();

						this.updateDamageNumbers(passivePlayerUI);

						this.onUpdateInitialValue.notify();
					})

				break;
			case 'anger':
				attackInDirectionAnimation(activePlayerUI, direction);

				standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', media.animation.anger);

				animationPromise(200).then(() => {
					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.anger);

					return 'true';
				})
					.then(() => {
						this.renderWholeUI(true, passivePlayerUI);

						this.onUpdateInitialValue.notify();
					})

				break;
			case 'reachHeaven':
				attackInDirectionAnimation(activePlayerUI, direction);

				standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', media.animation.reachHeaven);

				animationPromise(200).then(() => {
					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.mageStrong);

					return 'true';
				})
					.then(() => {
						this.renderWholeUI(true, passivePlayerUI);

						this.onUpdateInitialValue.notify();
					})

				break;
			case 'ironWave':
			case 'dash':
				blockAnimation(activePlayerUI, 'shield-animation', media.animation.defend);

				playSoundEffect(media.audio.defend);

				animationPromise(400).then(() => {
					attackInDirectionAnimation(activePlayerUI, direction);

					standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', media.animation.anger);

					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.bashAttack);

					this.renderWholeUI(true, passivePlayerUI);

					this.onUpdateInitialValue.notify();
				})

				break;
			case 'bloodletting':
				standardAttackAnimation(activePlayerUI, 'shield-animation', media.animation.bloodletting);

				animationPromise(200).then(() => {
					shakeAnimation(activePlayerUI);

					playSoundEffect(media.audio.bloodletting);

					return 'true';
				})
					.then(() => {
						this.renderViewHP();

						this.onUpdateInitialValue.notify();
					})

				break;
			case 'warcry':
				shakeAnimation(activePlayerUI);

				playSoundEffect(media.audio.warcry);

				this.renderViewStamina();

				break;
			case 'meditate':
			case 'alpha':
				blockAnimation(activePlayerUI, 'refresh-skill-animation', media.animation.refreshStamina);

				playSoundEffect(media.audio.meditate);

				this.renderViewStamina();

				break;
			case 'cutThroughFate':
				blockAnimation(activePlayerUI, 'shield-animation', media.animation.defend);

				playSoundEffect(media.audio.defend);

				this.renderViewDef();

				this.renderViewStamina();

				this.updateDamageNumbers(passivePlayerUI);

				this.onUpdateInitialValue.notify();

				animationPromise(400).then(() => {
					attackInDirectionAnimation(activePlayerUI, direction);

					standardAttackAnimation(passivePlayerUI, 'anger-attack-animation', media.animation.mageEffect);

					shakeAnimation(passivePlayerUI);

					playSoundEffect(media.audio.mageAttack);

					this.renderViewHP();

					this.renderViewDef();

					this.onUpdateInitialValue.notify();
				})

				break;
			case 'perfectedStrike':
			case 'tantrum':
			case 'flechettes':
				attackInDirectionAnimation(activePlayerUI, direction);

				multipleAttackAnimation(passivePlayerUI, 'attack-animation', media.animation.warriorAttack, 3);

				setTimeout(() => shakeAnimation(passivePlayerUI), 200);

				this.renderWholeUI(true, passivePlayerUI);

				this.onUpdateInitialValue.notify();

				break;
			case 'expertise':
				blockAnimation(activePlayerUI, 'refresh-skill-animation', media.animation.serpentRing);

				this.renderViewStamina();

				break;
			case 'bludgeon':
				attackInDirectionAnimation(activePlayerUI, direction);

				playSoundEffect(media.audio.warcry);

				ultimateSkillAnimation(passivePlayerUI, 'warrior-ultimate-animation', media.animation.flash, media.audio.flash);

				this.renderWholeUI(true, passivePlayerUI);

				this.onUpdateInitialValue.notify();

				break;
			case 'riddleWithHoles':
				attackInDirectionAnimation(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogue-ultimate-animation', media.animation.daggersSvg, media.audio.backStab);

				this.renderWholeUI(true, passivePlayerUI);

				this.onUpdateInitialValue.notify();

				break;
			case 'signatureMove':
				attackInDirectionAnimation(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'mage-ultimate-animation', media.animation.mageAttack, media.audio.mageUltimate);

				this.renderWholeUI(true, passivePlayerUI);

				this.onUpdateInitialValue.notify();

				break;
			case 'judgment':
				attackInDirectionAnimation(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogue-ultimate-animation', media.animation.judgmentSvg, media.audio.judj);

				this.renderWholeUI(true, passivePlayerUI);

				this.onUpdateInitialValue.notify();

				break;
		}
	}
}
