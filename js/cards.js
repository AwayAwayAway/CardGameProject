import Cards from './modules/cardsModel';
import {gameObserver} from './game';
import {boardModel} from './game';

//#TODO refactor "backflip"

//START CREATING WARRIOR'S CARDS
const strike_w = new Cards(0, 'attack', 1, 6, './images/cards/warrior/strike.png', 'strike_w');

const bash = new Cards(1, 'attack', 1, 8, './images/cards/warrior/bash.png', 'bash');

const anger = new Cards(2, 'attackAddEffect', 1, 6, './images/cards/warrior/anger.png', 'anger',
	() => {
		let effect;
		if (gameObserver.activePlayer.healthPoints < 40) {
			effect = 13;
		} else {
			effect = 6;
		}
		return effect;
	});

const bodySlam = new Cards(3, 'attackAddEffect', 2, 0, './images/cards/warrior/bodySlam.png', 'bodySlam', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints > 0) {
		effect = gameObserver.activePlayer.defendPoints;
	} else {
		effect = 0;
	}
	return effect;
});

const perfecedStrike = new Cards(4, 'attackAddEffect', 1, 6, './images/cards/warrior/perfectedStrike.png', 'perfectedStrike', () => 6 + boardModel.cardInHand.children.length);

const bludgeon = new Cards(5, 'attackAddEffect', 3, 12, './images/cards/warrior/bludgeon.png', 'bludgeon', () => {
	let effect;
	if (gameObserver.passivePlayer.healthPoints > 50) {
		effect = 17;
	} else {
		effect = 12;
	}
	return effect;
});

const defend_w = new Cards(6, 'defend', 1, 5, './images/cards/warrior/defend_R.png', 'defend_w');

const armaments = new Cards(7, 'defendAddEffect', 1, 5, './images/cards/warrior/armaments.png', 'armaments', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints === 0) {
		effect = 7;
	} else {
		effect = 5;
	}
	return effect;
});

const ironWave = new Cards(8, 'defendAndAttack', 1, 5, './images/cards/warrior/ironWave.png', 'ironWave', () => 5);

const warcry = new Cards(9, 'defendDrawDiscard', 0, 1, './images/cards/warrior/warcry.png', 'warcry');

const bloodletting = new Cards(10, 'defendDrawDiscard', 0, 3, './images/cards/warrior/bloodletting.png', 'bloodletting');

const entrench = new Cards(11, 'defendAddEffect', 2, 2, './images/cards/warrior/entrench.png', 'entrench', () => gameObserver.activePlayer.defendPoints * 2 - gameObserver.activePlayer.defendPoints);

//START CREATING ROGUE'S CARDS
const strike_r = new Cards(0, 'attack', 1, 6, './images/cards/rogue/strike_G.png', 'strike_r');

const daggerThrow = new Cards(1, 'attackDrawDiscard', 1, 9, './images/cards/rogue/r_dagger-throw.png', 'daggerThrow');

const flechettes = new Cards(2, 'attackAddEffect', 1, 3, './images/cards/rogue/flechettes.png', 'flechettes', () => 3 * boardModel.cardInHand.children.length);

const riddleWithHoles = new Cards(3, 'attackAddEffect', 2, 7, './images/cards/rogue/riddleWithHoles.png', 'riddleWithHoles');

const slice = new Cards(4, 'attack', 0, 4, './images/cards/rogue/slice.png', 'slice');

const quickSlash = new Cards(5, 'attackDrawDiscard', 1, 7, './images/cards/rogue/quickSlash.png', 'quickSlash');

const survivor = new Cards(6, 'defendDrawDiscard', 1, 8, './images/cards/rogue/survivor.png', 'survivor');

const deflect = new Cards(7, 'defend', 0, 4, './images/cards/rogue/deflect.png', 'deflect');

const backFlip = new Cards(8, 'defendDrawDiscard', 1, 1, './images/cards/rogue/backflip.png', 'backFlip', () => 5);

const prepared = new Cards(9, 'defendDrawDiscard', 0, 1, './images/cards/rogue/prepared.png', 'prepared');

const expertise = new Cards(10, 'defendDrawDiscard', 1, 5, './images/cards/rogue/expertise.png', 'expertise');

const dash = new Cards(11, 'defendAndAttack', 2, 10, './images/cards/rogue/dash.png', 'dash', () => 8);

//START CREATING MAGE'S CARDS
const strike_m = new Cards(0, 'attack', 1, 6, './images/cards/mage/strike_P.png', 'strike_m');

const cutThroughFate = new Cards(1, 'attackDrawDiscard', 1, 7, './images/cards/mage/cutThroughFate.png', 'cutThroughFate', () => 2);

const reachHeaven = new Cards(2, 'attack', 2, 12, './images/cards/mage/reachHeaven.png', 'reachHeaven');

const signatureMove = new Cards(3, 'attackAddEffect', 2, 0, './images/cards/mage/signatureMove.png', 'signatureMove', () => gameObserver.passivePlayer.defendPoints);

const tantrum = new Cards(4, 'attackAddEffect', 1, 3, './images/cards/mage/tantrum.png', 'tantrum', () => 3 + (Math.floor(Math.random() * (6 - 1)) + 1));

const judjment = new Cards(5, 'attackAddEffect', 2, 0, './images/cards/mage/judgment.png', 'judjment', () => {
	let effect;
	if (gameObserver.passivePlayer.healthPoints <= 15) {
		effect = 0;
	}
	return effect;
});

const masterReality = new Cards(6, 'defendAddEffect', 1, 5, './images/cards/mage/masterReality.png', 'masterReality', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints == 0) {
		effect = 10;
	} else {
		effect = 5;
	}
	return effect;
});

const defend_m = new Cards(7, 'defend', 1, 5, './images/cards/mage/defend_P.png', 'defend_m');

const meditate = new Cards(8, 'defendAddEffect', 1, 3, './images/cards/mage/meditate.png', 'meditate');

const thirdEye = new Cards(9, 'defendDrawDiscard', 1, 7, './images/cards/mage/thirdEye.png', 'thirdEye');

const nirvana = new Cards(10, 'defendAddEffect', 1, 0, './images/cards/mage/nirvana.png', 'nirvana', () => gameObserver.passivePlayer.defendPoints);

const alpha = new Cards(11, 'defendDrawDiscard', 1, 4, './images/cards/mage/alpha.png', 'alpha');


export const skillCollection = {
	warrior: [strike_w, bash, anger, bodySlam, perfecedStrike, bludgeon, defend_w, armaments, ironWave, warcry, bloodletting, entrench],
	rogue: [strike_r, daggerThrow, flechettes, riddleWithHoles, slice, quickSlash, survivor, deflect, backFlip, prepared, expertise, dash],
	mage: [strike_m, cutThroughFate, reachHeaven, signatureMove, tantrum, judjment, masterReality, defend_m, meditate, thirdEye, nirvana, alpha]
};
