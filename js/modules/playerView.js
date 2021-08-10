import {
	attackAnimation, attackAnimationEffect, blockAnimationEffect,
	playSoundEffect, shakeAnimation, multipleAttackAnimation, standartAttackAnimation,
	ultimateSkillAnimation
} from '../animation_and_sound_effects/animation';

export default class PlayersView {
	constructor(playerOneModel, playerTwoModel, gameModel, container) {
		this.playerOneModel = playerOneModel;
		this.playerTwoModel = playerTwoModel;
		this.gameModel = gameModel;
		const playerContainer = container;

		this.playerOneHPValue = playerContainer.querySelector('.player-1__hp-value');
		this.playerOneDefenceValue = playerContainer.querySelector('.player-1__defence-value');
		this.playerOneStaminaValue = playerContainer.querySelector('.player-1__stamina-value');
		this.playerOneHP = playerContainer.querySelector('.player-1__hp-bar-inner');

		this.playerTwoHPValue = playerContainer.querySelector('.player-2__hp-value');
		this.playerTwoDefenceValue = playerContainer.querySelector('.player-2__defence-value');
		this.playerTwoStaminaValue = playerContainer.querySelector('.player-2__stamina-value');
		this.playerTwoHP = playerContainer.querySelector('.player-2__hp-bar-inner');

		this.playerOneModel.playerViewUpdate.attach(() => {
			this.updateViewHP();
			this.updateViewDef();
		});
		this.playerTwoModel.playerViewUpdate.attach(() => {
			this.updateViewHP();
			this.updateViewDef();
		});

		this.playerTwoModel.actionAnimation.attach(() => this.doAnimation());
		this.playerTwoModel.actionAnimation.attach(() => this.doAnimation());

		this.updateViewHP();
		this.updateViewDef();

	}

	// устанавливаем первые параметры здоровье, защита, стамина
	updateViewHP() {
		this.playerOneHPValue.textContent = this.playerOneModel.healthPoints;
		this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;
		this.playerOneHP.style.width = this.playerOneModel.healthPoints + '%';

		this.playerTwoHPValue.textContent = this.playerTwoModel.healthPoints;
		this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
		this.playerTwoHP.style.width = this.playerTwoModel.healthPoints + '%';
	};

	updateViewDef() {
		this.playerOneDefenceValue.textContent = this.playerOneModel.defendPoints;
		this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;

		this.playerTwoDefenceValue.textContent = this.playerTwoModel.defendPoints;
		this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
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

				break;

			case 'slice':
			case 'strike_m':
				attackAnimationEffect(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smashAttack', 'images/attack-effects/smash.png');

				playSoundEffect('.mage-punch-audio');

				shakeAnimation(passivePlayerUI);

				this.updateViewHP();
				this.updateViewDef();

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

				break;

			case 'ironWave':
			case 'dash':
				blockAnimationEffect(activePlayerUI,'shield','images/icons/Icon_Block.png');

				playSoundEffect('.defend-audio');

				this.updateViewDef();

				setTimeout(() => attackAnimationEffect(activePlayerUI, direction), 400);

				setTimeout(() => standartAttackAnimation(passivePlayerUI, 'angerAttack', 'images/attack-effects/anger.png'), 400);

				setTimeout(() => shakeAnimation(passivePlayerUI), 400);

				setTimeout(() => playSoundEffect('.bash-attack-audio'), 400);

				setTimeout(() => this.updateViewHP(), 400);

				setTimeout(() => this.updateViewDef(), 400);

				break;

			case 'bloodletting':
				standartAttackAnimation(activePlayerUI, 'shield', 'images/attack-effects/bloodletting.png');

				setTimeout(() => {
					shakeAnimation(activePlayerUI);
					playSoundEffect('.bloodletting-audio');
				}, 200);

				this.updateViewHP();

				break;

			case 'warcry':
				shakeAnimation(activePlayerUI);

				playSoundEffect('.warcry-audio');

				this.updateViewHP();

				break;

			case 'meditate':
			case 'alpha':
				blockAnimationEffect(activePlayerUI, 'expertice', 'images/attack-effects/refresh-stamina.svg');

				playSoundEffect('.meditate-audio');

				this.updateViewHP();

				break;

			case 'cutThroughFate':
				blockAnimationEffect(activePlayerUI,'shield','images/icons/Icon_Block.png');

				playSoundEffect('.defend-audio');

				this.updateViewDef();

				setTimeout(() => attackAnimationEffect(activePlayerUI, direction), 400);

				setTimeout(() => standartAttackAnimation(passivePlayerUI, 'angerAttack', 'images/attack-effects/mageEffect.png'), 400);

				setTimeout(() => shakeAnimation(passivePlayerUI), 400);

				setTimeout(() => playSoundEffect('.mage-attack-audio'), 400);

				setTimeout(() => this.updateViewHP(), 400);

				setTimeout(() => this.updateViewDef(), 400);

				break;

			case 'perfectedStrike':
			case 'tantrum':
			case 'flechettes':
				attackAnimationEffect(activePlayerUI, direction);

				multipleAttackAnimation(passivePlayerUI, 'attack', 'images/attack-effects/warrior-attack.png', 3);

				setTimeout(() => shakeAnimation(passivePlayerUI), 200);

				this.updateViewHP();
				this.updateViewDef();

				break;

			case 'expertise':
				blockAnimationEffect(activePlayerUI, 'expertice', 'images/attack-effects/serpent_ring.png');

				this.updateViewHP();

				break;

			case 'bludgeon':
				attackAnimationEffect(activePlayerUI, direction);

				playSoundEffect('.warcry-audio');

				ultimateSkillAnimation(passivePlayerUI, 'warriorUltimate', 'images/attack-effects/flash.png', '.flash-audio');

				this.updateViewHP();
				this.updateViewDef();

				break;

			case 'riddleWithHoles':
				attackAnimationEffect(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogueUltimate', 'images/attack-effects/daggers.svg', '.backstab-audio');

				this.updateViewHP();
				this.updateViewDef();

				break;

			case 'signatureMove':
				attackAnimationEffect(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'mageUltimate', 'images/attack-effects/mage-attack.png', '.mage-ultimate-audio');

				this.updateViewHP();
				this.updateViewDef();

				break;

			case 'judjment':
				attackAnimationEffect(activePlayerUI, direction);

				ultimateSkillAnimation(passivePlayerUI, 'rogueUltimate', 'images/attack-effects/judjment.svg', '.judj-audio');

				this.updateViewHP();
				this.updateViewDef();

				break;
		}
	}
}
