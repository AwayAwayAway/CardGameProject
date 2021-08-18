const preloadSkillImages = object => {
	let tempObeject = {};

	for (let key in object) {
		let regex = /(svg)$/ig;

		if(regex.test(key)) {
			let temp = document.createElement('object');

			temp.data = object[key];

			tempObeject[key] = temp;
		} else  {
			let img = new Image();

			img.src = object[key];

			tempObeject[key] = img;
		}
	}

	return tempObeject;
};

const skillCollectionLinks = {
	warrior: {
		strike_w: '../../images/cards/warrior/strike.png',
		bash: '../../images/cards/warrior/bash.png',
		anger: '../../images/cards/warrior/anger.png',
		bodySlam: '../../images/cards/warrior/bodySlam.png',
		perfectedStrike: '../../images/cards/warrior/perfectedStrike.png',
		bludgeon: '../../images/cards/warrior/bludgeon.png',
		defend_w: '../../images/cards/warrior/defend_w.png',
		armaments: '../../images/cards/warrior/armaments.png',
		ironWave: '../../images/cards/warrior/ironWave.png',
		warcry: '../../../../images/cards/warrior/warcry.png',
		bloodletting: '../../../../images/cards/warrior/bloodletting.png',
		entrench: '../../images/cards/warrior/entrench.png'
	},
	rogue: {
		strike_r: '../../images/cards/rogue/strike_G.png',
		daggerThrow: '../../images/cards/rogue/r_dagger-throw.png',
		flechettes: '../../images/cards/rogue/flechettes.png',
		riddleWithHoles: '../../images/cards/rogue/riddleWithHoles.png',
		slice: '../../../../images/cards/rogue/slice.png',
		quickSlash: '../../images/cards/rogue/quickSlash.png',
		survivor: '../../images/cards/rogue/survivor.png',
		deflect: '../../images/cards/rogue/deflect.png',
		backFlip: '../../images/cards/rogue/backFlip.png',
		prepared: '../../images/cards/rogue/prepared.png',
		expertise: '../../images/cards/rogue/expertise.png',
		dash: '../../images/cards/rogue/dash.png'
	},
	mage: {
		strike_m: '../../images/cards/mage/strike_P.png',
		cutThroughFate: '../../images/cards/mage/cutThroughFate.png',
		reachHeaven: '../../images/cards/mage/reachHeaven.png',
		signatureMove: '../../images/cards/mage/signatureMove.png',
		tantrum: '../../images/cards/mage/tantrum.png',
		judgment: '../../images/cards/mage/judgment.png',
		masterReality: '../../images/cards/mage/masterReality.png',
		defend_m: '../../images/cards/mage/defend_P.png',
		meditate: '../../../../images/cards/mage/meditate.png',
		thirdEye: '../../images/cards/mage/thirdEye.png',
		nirvana: '../../images/cards/mage/nirvana.png',
		alpha: '../../images/cards/mage/alpha.png',
	}
};

const animationCollectionLinks = {
	anger: '../../images/attack-effects/anger.png',
	bloodletting: '../../images/attack-effects/bloodletting.png',
	daggersSvg: '../../images/attack-effects/daggers.svg',
	flash: '../../images/attack-effects/flash.png',
	judgmentSvg: '../../images/attack-effects/judgment.svg',
	mageAttack: '../../images/attack-effects/mage-attack.png',
	mageEffect: '../../images/attack-effects/mage-effect.png',
	reachHeaven: '../../images/attack-effects/reach-heaven.png',
	refreshStamina: '../../images/attack-effects/refresh-stamina.svg',
	serpentRing: '../../images/attack-effects/serpent-ring.png',
	smash: '../../images/attack-effects/smash.png',
	warriorAttack: '../../images/attack-effects/warrior-attack.png',
	warriorSmash: '../../images/attack-effects/warrior-smash.png',
	defend: '../../images/icons/icon_Block.png'
};

export const skillCollectionImages = {
	warrior: preloadSkillImages(skillCollectionLinks.warrior),
	rogue: preloadSkillImages(skillCollectionLinks.rogue),
	mage: preloadSkillImages(skillCollectionLinks.mage),
};

export const animationCollectionImages = preloadSkillImages(animationCollectionLinks);

console.log(skillCollectionImages);
console.log(animationCollectionImages);




