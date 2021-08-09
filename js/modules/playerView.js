import {
	attackAnimation,  attackAnimationEffect, blockAnimationEffect,
	playSoundEffect,  shakeAnimation, multipleAttackAnimation, standartAttackAnimation,
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

		this.playerOneModel.playerViewUpdate.attach(() => this.updateViewPlayer());
		this.playerTwoModel.playerViewUpdate.attach(() => this.updateViewPlayer());

		this.playerTwoModel.actionAnimation.attach(() => this.doAnimation());
		this.playerTwoModel.actionAnimation.attach(() => this.doAnimation());

		this.updateViewPlayer();
	}

	// устанавливаем первые параметры здоровье, защита, стамина
	updateViewPlayer() {
		this.playerOneHPValue.textContent = this.playerOneModel.healthPoints;
		this.playerOneDefenceValue.textContent = this.playerOneModel.defendPoints;
		this.playerOneStaminaValue.textContent = this.playerOneModel.staminaPoints;
		this.playerOneHP.style.width = this.playerOneModel.healthPoints + '%';

		this.playerTwoHPValue.textContent = this.playerTwoModel.healthPoints;
		this.playerTwoDefenceValue.textContent = this.playerTwoModel.defendPoints;
		this.playerTwoStaminaValue.textContent = this.playerTwoModel.staminaPoints;
		this.playerTwoHP.style.width = this.playerTwoModel.healthPoints + '%';
	};

	doAnimation() {
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
			direction = 'left';
		}

		switch (this.gameModel.tempCard.name) {
			case 'strike_w':
			case 'bash':
			case 'slice':
			case 'strike_r':
			case 'quickSlash':
			case 'strike_m':
				attackAnimationEffect(activePlayerUI, direction);
				attackAnimation(passivePlayerUI, 'attack', '../images/attack-effects/warrior-attack.png');

				setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				setTimeout(() => playSoundEffect('.strike-attack-audio') , 200);
				break;
			case 'defend_w':
			case 'armaments':
			case 'entrench':
			case 'deflect':
			case 'backFlip':
			case 'defend_m':
			case 'masterReality':
			case 'thirdEye':
			case 'survivor':
				blockAnimationEffect(activePlayerUI);
				playSoundEffect('.defend-audio');

				break;
			case 'bodySlam':
				attackAnimationEffect(activePlayerUI, direction);

				attackAnimation(passivePlayerUI, 'smashAttack', '../images/attack-effects/smash.png')

				setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				setTimeout(() => playSoundEffect('.bash-attack-audio') , 200);

				break;
			case 'anger':
				attackAnimationEffect(activePlayerUI, direction);

				standartAttackAnimation(passivePlayerUI, 'angerAttack', '../images/attack-effects/anger.png');

				setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				setTimeout(() => playSoundEffect('.anger-audio') , 200);

				break;
			case 'bloodletting':
				standartAttackAnimation(activePlayerUI, 'shield', '../images/attack-effects/bloodletting.png');

				setTimeout(() => shakeAnimation(activePlayerUI) , 100);
				setTimeout(() => playSoundEffect('.bloodletting-audio') , 100);

				break;
			case 'warcry':
				shakeAnimation(activePlayerUI);
				playSoundEffect('.warcry-audio');

				break;
			case 'perfectedStrike':
			case 'flechettes':
			case 'riddleWithHoles':
				attackAnimationEffect(activePlayerUI, direction);

				multipleAttackAnimation(passivePlayerUI, 'attack', '../images/attack-effects/warrior-attack.png', 3);

				setTimeout(() => shakeAnimation(passivePlayerUI) , 200);
				break;
			case 'bludgeon':
				ultimateSkillAnimation(passivePlayerUI, 'warriorUltimate', '../images/attack-effects/flash.png');

				break;
		}
	}
}
