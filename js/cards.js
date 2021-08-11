import Cards from './modules/cardsModel';
import {gameObserver} from './game';
import {boardModel} from './game';

//START CREATING WARRIOR'S CARDS
const strike_w = new Cards(0, 'attack', 1, 6, 'images/cards/warrior/Strike.png', 'strike_w');

const bash = new Cards(1, 'attack', 1, 8, 'images/cards/warrior/Bash.png', 'bash');

const anger = new Cards(2, 'attackAddEffect', 1, 6, 'images/cards/warrior/Anger.png', 'anger',
	() => {
		let effect;
		if (gameObserver.activePlayer.healthPoints < 50) {
			effect = 13;
		} else {
			effect = 6;
		}
		return effect;
	});

const bodySlam = new Cards(3, 'attackAddEffect', 2, 0, 'images/cards/warrior/BodySlam.png', 'bodySlam', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints > 0) {
		effect = gameObserver.activePlayer.defendPoints;
	} else {
		effect = 0;
	}
	return effect;
});

const perfecedStrike = new Cards(4, 'attackAddEffect', 1, 6, 'images/cards/warrior/PerfectedStrike.png', 'perfectedStrike', () => 6 + boardModel.cardInHand.children.length);

const bludgeon = new Cards(5, 'attackAddEffect', 3, 12, 'images/cards/warrior/Bludgeon.png', 'bludgeon', () => {
	let effect;
	if (gameObserver.passivePlayer.healthPoints > 50) {
		effect = 17;
	} else {
		effect = 12;
	}
	return effect;
});

const defend_w = new Cards(6, 'defend', 1, 5, 'images/cards/warrior/Defend_R.png', 'defend_w');

const armaments = new Cards(7, 'defendAddEffect', 1, 5, 'images/cards/warrior/Armaments.png', 'armaments', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints === 0) {
		effect = 7;
	} else {
		effect = 5;
	}
	return effect;
});

const ironWave = new Cards(8, 'defendAndAttack', 1, 5, 'images/cards/warrior/IronWave.png', 'ironWave', () => 5);

const warcry = new Cards(9, 'defendDrawDiscard', 0, 1, 'images/cards/warrior/Warcry.png', 'warcry');

const bloodletting = new Cards(10, 'defendDrawDiscard', 0, 3, 'images/cards/warrior/Bloodletting.png', 'bloodletting');

const entrench = new Cards(11, 'defendAddEffect', 2, 2, 'images/cards/warrior/Entrench.png', 'entrench', () => gameObserver.activePlayer.defendPoints * 2 - gameObserver.activePlayer.defendPoints);

//START CREATING ROGUE'S CARDS
const strike_r = new Cards(0, 'attack', 1, 6, 'images/cards/rogue/Strike_G.png', 'strike_r');

const daggerThrow = new Cards(1, 'attackDrawDiscard', 1, 9, 'images/cards/rogue/R_dagger-throw.png', 'daggerThrow');

const flechettes = new Cards(2, 'attackAddEffect', 1, 3, 'images/cards/rogue/Flechettes.png', 'flechettes', () => 3 * boardModel.cardInHand.children.length);

const riddleWithHoles = new Cards(3, 'attackAddEffect', 2, 7, 'images/cards/rogue/RiddleWithHoles.png', 'riddleWithHoles');

const slice = new Cards(4, 'attack', 0, 4, 'images/cards/rogue/Slice.png', 'slice');

const quickSlash = new Cards(5, 'attackDrawDiscard', 1, 7, 'images/cards/rogue/QuickSlash.png', 'quickSlash');

const survivor = new Cards(6, 'defendDrawDiscard', 1, 8, 'images/cards/rogue/Survivor.png', 'survivor');

const deflect = new Cards(7, 'defend', 0, 4, 'images/cards/rogue/Deflect.png', 'deflect');

const backFlip = new Cards(8, 'defendDrawDiscard', 1, 2, 'images/cards/rogue/Backflip.png', 'backFlip', () => 5);

const prepared = new Cards(9, 'defendDrawDiscard', 0, 1, 'images/cards/rogue/Prepared.png', 'prepared');

const expertise = new Cards(10, 'defendDrawDiscard', 1, 5, 'images/cards/rogue/Expertise.png', 'expertise');

const dash = new Cards(11, 'defendAndAttack', 2, 10, 'images/cards/rogue/Dash.png', 'dash', () => 8);

//START CREATING MAGE'S CARDS
const strike_m = new Cards(0, 'attack', 1, 6, 'images/cards/mage/Strike_P.png', 'strike_m');

const cutThroughFate = new Cards(1, 'attackDrawDiscard', 1, 7, 'images/cards/mage/CutThroughFate.png', 'cutThroughFate', () => 2);

const reachHeaven = new Cards(2, 'attack', 2, 12, 'images/cards/mage/ReachHeaven.png', 'reachHeaven');

const signatureMove = new Cards(3, 'attackAddEffect', 2, 0, 'images/cards/mage/SignatureMove.png', 'signatureMove', () => gameObserver.passivePlayer.defendPoints);

const tantrum = new Cards(4, 'attackAddEffect', 1, 3, 'images/cards/mage/Tantrum.png', 'tantrum', () => 3 + (Math.floor(Math.random() * (6 - 1)) + 1));

const judjment = new Cards(5, 'attackAddEffect', 2, 0, 'images/cards/mage/Judgment.png', 'judjment', () => {
	let effect;
	if (gameObserver.passivePlayer.healthPoints <= 15) {
		effect = 0;
	}
	return effect;
});

const masterReality = new Cards(6, 'defendAddEffect', 1, 5, 'images/cards/mage/MasterReality.png', 'masterReality', () => {
	let effect;
	if (gameObserver.activePlayer.defendPoints == 0) {
		effect = 10;
	} else {
		effect = 5;
	}
	return effect;
});

const defend_m = new Cards(7, 'defend', 1, 5, 'images/cards/mage/Defend_P.png', 'defend_m');

const meditate = new Cards(8, 'defendAddEffect', 1, 3, 'images/cards/mage/Meditate.png', 'meditate');

const thirdEye = new Cards(9, 'defendDrawDiscard', 1, 7, 'images/cards/mage/ThirdEye.png', 'thirdEye');

const nirvana = new Cards(10, 'defendAddEffect', 1, 0, 'images/cards/mage/Nirvana.png', 'nirvana', () => gameObserver.passivePlayer.defendPoints);

const alpha = new Cards(11, 'defendDrawDiscard', 1, 4, 'images/cards/mage/Alpha.png', 'alpha');


export const skillCollection = {
	warrior: [strike_w, bash, anger, bodySlam, perfecedStrike, bludgeon, defend_w, armaments, ironWave, warcry, bloodletting, entrench],
	rogue: [strike_r, daggerThrow, flechettes, riddleWithHoles, slice, quickSlash, survivor, deflect, backFlip, prepared, expertise, dash],
	mage: [strike_m, cutThroughFate, reachHeaven, signatureMove, tantrum, judjment, masterReality, defend_m, meditate, thirdEye, nirvana, alpha]
};
