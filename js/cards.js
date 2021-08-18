import Cards from './modules/cardsModel';
import {gameObserver} from './game';
import {boardModel} from './game';
import {skillCollectionImages} from './modules/preloadImages';

//START CREATING WARRIOR'S CARDS
const strike_w = new Cards(0, 'attack', 1, 6, skillCollectionImages.warrior.strike_w, 'strike_w');

const bash = new Cards(1, 'attack', 1, 8, skillCollectionImages.warrior.bash, 'bash');

const anger = new Cards(2, 'attackAddEffect', 1, 6, skillCollectionImages.warrior.anger, 'anger',
	() => {
		let effect;
		if (gameObserver.activePlayer.healthPoints < 40) {
			effect = 13;
		} else {
			effect = 6;
		}
		return effect;
	});

const bodySlam = new Cards(3, 'attackAddEffect', 2, 0, skillCollectionImages.warrior.bodySlam, 'bodySlam', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints > 0) {
		effect = gameObserver.activePlayer.defendPoints;
	} else {
		effect = 0;
	}
	return effect;
});

const perfectedStrike = new Cards(4, 'attackAddEffect', 1, 6, skillCollectionImages.warrior.perfectedStrike, 'perfectedStrike', () => 6 + boardModel.cardInHand.children.length);

const bludgeon = new Cards(5, 'attackAddEffect', 3, 12, skillCollectionImages.warrior.bludgeon, 'bludgeon', () => {
	let effect;
	if (gameObserver.passivePlayer.healthPoints > 50) {
		effect = 17;
	} else {
		effect = 12;
	}
	return effect;
});

const defend_w = new Cards(6, 'defend', 1, 5, skillCollectionImages.warrior.defend_w, 'defend_w');

const armaments = new Cards(7, 'defendAddEffect', 1, 5, skillCollectionImages.warrior.armaments, 'armaments', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints === 0) {
		effect = 7;
	} else {
		effect = 5;
	}
	return effect;
});

const ironWave = new Cards(8, 'defendAndAttack', 1, 5, skillCollectionImages.warrior.ironWave, 'ironWave', () => 5);

const warcry = new Cards(9, 'defendDrawDiscard', 0, 1, skillCollectionImages.warrior.warcry, 'warcry');

const bloodletting = new Cards(10, 'defendDrawDiscard', 0, 3, skillCollectionImages.warrior.bloodletting, 'bloodletting');

const entrench = new Cards(11, 'defendAddEffect', 2, 2, skillCollectionImages.warrior.entrench, 'entrench', () => gameObserver.activePlayer.defendPoints * 2 - gameObserver.activePlayer.defendPoints);

//START CREATING ROGUE'S CARDS
const strike_r = new Cards(0, 'attack', 1, 6, skillCollectionImages.rogue.strike_r, 'strike_r');

const daggerThrow = new Cards(1, 'attackDrawDiscard', 1, 9, skillCollectionImages.rogue.daggerThrow, 'daggerThrow');

const flechettes = new Cards(2, 'attackAddEffect', 1, 3, skillCollectionImages.rogue.flechettes, 'flechettes', () => 3 * boardModel.cardInHand.children.length);

const riddleWithHoles = new Cards(3, 'attackAddEffect', 2, 7, skillCollectionImages.rogue.riddleWithHoles, 'riddleWithHoles');

const slice = new Cards(4, 'attack', 0, 4, skillCollectionImages.rogue.slice, 'slice');

const quickSlash = new Cards(5, 'attackDrawDiscard', 1, 7, skillCollectionImages.rogue.quickSlash, 'quickSlash');

const survivor = new Cards(6, 'defendDrawDiscard', 1, 8, skillCollectionImages.rogue.survivor, 'survivor');

const deflect = new Cards(7, 'defend', 0, 4, skillCollectionImages.rogue.deflect, 'deflect');

const backFlip = new Cards(8, 'defendDrawDiscard', 1, 1, skillCollectionImages.rogue.backFlip, 'backFlip', () => 5);

const prepared = new Cards(9, 'defendDrawDiscard', 0, 1, skillCollectionImages.rogue.prepared, 'prepared');

const expertise = new Cards(10, 'defendDrawDiscard', 1, 5, skillCollectionImages.rogue.expertise, 'expertise');

const dash = new Cards(11, 'defendAndAttack', 2, 10, skillCollectionImages.rogue.dash, 'dash', () => 8);

//START CREATING MAGE'S CARDS
const strike_m = new Cards(0, 'attack', 1, 6, skillCollectionImages.mage.strike_m, 'strike_m');

const cutThroughFate = new Cards(1, 'attackDrawDiscard', 1, 7, skillCollectionImages.mage.cutThroughFate, 'cutThroughFate', () => 2);

const reachHeaven = new Cards(2, 'attack', 2, 12, skillCollectionImages.mage.reachHeaven, 'reachHeaven');

const signatureMove = new Cards(3, 'attackAddEffect', 2, 0, skillCollectionImages.mage.signatureMove, 'signatureMove', () => gameObserver.passivePlayer.defendPoints);

const tantrum = new Cards(4, 'attackAddEffect', 1, 3, skillCollectionImages.mage.tantrum, 'tantrum', () => 3 + (Math.floor(Math.random() * (6 - 1)) + 1));

const judgment = new Cards(5, 'attackAddEffect', 2, 0, skillCollectionImages.mage.judgment, 'judgment', () => {
	let effect;
	if (gameObserver.passivePlayer.healthPoints <= 15) {
		effect = 0;
	}
	return effect;
});

const masterReality = new Cards(6, 'defendAddEffect', 1, 5, skillCollectionImages.mage.masterReality, 'masterReality', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints == 0) {
		effect = 10;
	} else {
		effect = 5;
	}
	return effect;
});

const defend_m = new Cards(7, 'defend', 1, 5, skillCollectionImages.mage.defend_m, 'defend_m');

const meditate = new Cards(8, 'defendAddEffect', 1, 3, skillCollectionImages.mage.meditate, 'meditate');

const thirdEye = new Cards(9, 'defendDrawDiscard', 1, 7, skillCollectionImages.mage.thirdEye, 'thirdEye');

const nirvana = new Cards(10, 'defendAddEffect', 1, 0, skillCollectionImages.mage.nirvana, 'nirvana', () => gameObserver.passivePlayer.defendPoints);

const alpha = new Cards(11, 'defendDrawDiscard', 1, 4, skillCollectionImages.mage.alpha, 'alpha');

export const skillCollection = {
	warrior: [strike_w, bash, anger, bodySlam, perfectedStrike, bludgeon, defend_w, armaments, ironWave, warcry, bloodletting, entrench],
	rogue: [strike_r, daggerThrow, flechettes, riddleWithHoles, slice, quickSlash, survivor, deflect, backFlip, prepared, expertise, dash],
	mage: [strike_m, cutThroughFate, reachHeaven, signatureMove, tantrum, judgment, masterReality, defend_m, meditate, thirdEye, nirvana, alpha]
};

