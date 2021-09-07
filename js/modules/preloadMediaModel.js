export default class Media {
	constructor() {
		this.skillCollectionLinks = {
			warrior: {
				strike_w: './images/cards/warrior/strike.png',
				bash: './images/cards/warrior/bash.png',
				anger: './images/cards/warrior/anger.png',
				bodySlam: './images/cards/warrior/bodySlam.png',
				perfectedStrike: './images/cards/warrior/perfectedStrike.png',
				bludgeon: './images/cards/warrior/bludgeon.png',
				defend_w: './images/cards/warrior/defend_w.png',
				armaments: './images/cards/warrior/armaments.png',
				ironWave: './images/cards/warrior/ironWave.png',
				warcry: './images/cards/warrior/warcry.png',
				bloodletting: './images/cards/warrior/bloodletting.png',
				entrench: './images/cards/warrior/entrench.png'
			},
			rogue: {
				strike_r: './images/cards/rogue/strike_G.png',
				daggerThrow: './images/cards/rogue/r_dagger-throw.png',
				flechettes: './images/cards/rogue/flechettes.png',
				riddleWithHoles: './images/cards/rogue/riddleWithHoles.png',
				slice: './images/cards/rogue/slice.png',
				quickSlash: './images/cards/rogue/quickSlash.png',
				survivor: './images/cards/rogue/survivor.png',
				deflect: './images/cards/rogue/deflect.png',
				backFlip: './images/cards/rogue/backflip.png',
				prepared: './images/cards/rogue/prepared.png',
				expertise: './images/cards/rogue/expertise.png',
				dash: './images/cards/rogue/dash.png'
			},
			mage: {
				strike_m: './images/cards/mage/strike_P.png',
				cutThroughFate: './images/cards/mage/cutThroughFate.png',
				reachHeaven: './images/cards/mage/reachHeaven.png',
				signatureMove: './images/cards/mage/signatureMove.png',
				tantrum: './images/cards/mage/tantrum.png',
				judgment: './images/cards/mage/judgment.png',
				masterReality: './images/cards/mage/masterReality.png',
				defend_m: './images/cards/mage/defend_P.png',
				meditate: './images/cards/mage/meditate.png',
				thirdEye: './images/cards/mage/thirdEye.png',
				nirvana: './images/cards/mage/nirvana.png',
				alpha: './images/cards/mage/alpha.png',
			}
		};

		this.animationCollectionLinks = {
			anger: './images/attack-effects/anger.png',
			bloodletting: './images/attack-effects/bloodletting.png',
			daggersSvg: './images/attack-effects/daggers.svg',
			flash: './images/attack-effects/flash.png',
			judgmentSvg: './images/attack-effects/judgment.svg',
			mageAttack: './images/attack-effects/mage-attack.png',
			mageEffect: './images/attack-effects/mage-effect.png',
			reachHeaven: './images/attack-effects/reach-heaven.png',
			refreshStamina: './images/attack-effects/refresh-stamina.svg',
			serpentRing: './images/attack-effects/serpent-ring.png',
			smash: './images/attack-effects/smash.png',
			warriorAttack: './images/attack-effects/warrior-attack.png',
			warriorSmash: './images/attack-effects/warrior-smash.png',
			defend: './images/icons/icon_Block.png',
			warriorSlash: './images/attack-effects/warrior-second-attack.png'
		};

		this.audioCollectionLinks = {
			anger: './sounds/anger.ogg',
			backStab: './sounds/backstab.ogg',
			bashAttack: './sounds/bash-attack.ogg',
			battleMainTheme: './sounds/battle-main-theme.ogg',
			bloodletting: './sounds/bloodletting.ogg',
			btnClick: './sounds/btn-click.ogg',
			btnHover: './sounds/btn-hover.ogg',
			cardRelease: './sounds/card-grab-cancel.ogg',
			cardGrab: './sounds/card-grabbed.ogg',
			cardSelected: './sounds/card-selected.ogg',
			confirmSucces: './sounds/confirm.ogg',
			confirmFailed: './sounds/confirm-failed.ogg',
			defend: './sounds/defend.ogg',
			discardCard: './sounds/discard-card.ogg',
			endTurn: './sounds/end-turn.ogg',
			expertise: './sounds/expertice.ogg',
			flash: './sounds/flash.ogg',
			ironWave: './sounds/ironwave.ogg',
			judj: './sounds/judj.ogg',
			mageAttack: './sounds/mage-attack.ogg',
			magePunch: './sounds/mage-punch.ogg',
			mageSelected: './sounds/mage-selected.ogg',
			mageStrong: './sounds/mage-strong.ogg',
			mageUltimate: './sounds/mage-ultimate.ogg',
			mainMenuTheme: './sounds/main-menu-theme.ogg',
			meditate: './sounds/meditate.ogg',
			overlayClose: './sounds/overlay-close.ogg',
			overlayOpen: './sounds/overlay-open.ogg',
			pushCard: './sounds/push-card.ogg',
			rogueAttack: './sounds/rogue-attack.ogg',
			rogueSelected: './sounds/rogue-selected.ogg',
			strikeAttack: './sounds/strike-attack.ogg',
			victory: './sounds/victory.ogg',
			warcry: './sounds/warcry.ogg',
			warriorSelected: './sounds/warrior-selected.ogg'
		};

		this.cards = null;

		this.animation = null;

		this.audio = null;

		this.init();
	}

	init() {
		this.cards = {
			warrior: this.preloadSkillImages(this.skillCollectionLinks.warrior),
			rogue: this.preloadSkillImages(this.skillCollectionLinks.rogue),
			mage: this.preloadSkillImages(this.skillCollectionLinks.mage),
		};

		this.animation = this.preloadSkillImages(this.animationCollectionLinks);

		this.audio = this.preloadAudio(this.audioCollectionLinks);
	}

	preloadSkillImages(object) {
		let tempObeject = {};

		for (let key in object) {
			let regex = /(svg)$/ig;

			if (regex.test(key)) {
				let temp = document.createElement('object');

				temp.data = object[key];

				tempObeject[key] = temp;
			} else {
				let img = new Image();

				img.src = object[key];

				tempObeject[key] = img;
			}
		}

		return tempObeject;
	};

	preloadAudio(object) {
		let tempObeject = {};

		for (let key in object) {
			let audio = new Audio();

			audio.src = object[key];

			tempObeject[key] = audio;

		}

		return tempObeject;
	};
}