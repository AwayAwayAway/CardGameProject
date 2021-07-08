function CreateCardSkills(id, type, cost, effect, icon, name, sideEffect) {
	this.id = id;
	this.cost = cost;
	this.type = type;
	this.effect = effect;
	this.icon = icon;
	this.name = name;
	this.sideEffect = sideEffect
}

//START CREATING WARRIOR'S CARDS
const strike_w = new CreateCardSkills(0, 'attack',1, 6,"css/images/cards/warrior/Strike.png", 'strike_w');
const bash = new CreateCardSkills(1, 'attack',1, 8,"css/images/cards/warrior/Bash.png", 'bash');
const anger = new CreateCardSkills(2, 'attackAddEffect',1, 6,"css/images/cards/warrior/Anger.png", 'anger', () => { let effect; if(gameController.activePlayer.healthPoints < 50) { effect = 13 } else { effect = 6 } return effect} );
const bodySlam = new CreateCardSkills(3,'attackAddEffect',2, 0, "css/images/cards/warrior/BodySlam.png", 'bodySlam', () => { let effect; if(gameController.activePlayer.defendPoints > 0) { effect = gameController.activePlayer.defendPoints} else { effect = 0 } return effect });
const perfecedStrike = new CreateCardSkills(4,'attackAddEffect',1, 6, "css/images/cards/warrior/PerfectedStrike.png", 'perfecedStrike', () => 6 + cardInHand.children.length);
const bludgeon = new CreateCardSkills(5,'attackAddEffect',3, 12, "css/images/cards/warrior/Bludgeon.png", 'bludgeon', () => { let effect; if(gameController.passivePlayer.healthPoints > 50) { effect = 17 } else { effect = 12 } return effect} );
const defend_w = new CreateCardSkills(6,'defend',1, 5, "css/images/cards/warrior/Defend_R.png", 'defend_w');
const armaments = new CreateCardSkills(7,'defendAddEffect',1, 5, "css/images/cards/warrior/Armaments.png", 'armaments', () => { let effect; if(gameController.activePlayer.defendPoints === 0) { effect = 7 } else { effect = 5 } return effect});
const ironWave = new CreateCardSkills(8,'defendAndAttack',1, 5, "css/images/cards/warrior/IronWave.png", 'ironWave', () => 5);
const warcry = new CreateCardSkills(9,'defendDrawDiscard',0, 1, "css/images/cards/warrior/Warcry.png", 'warcry');
const bloodletting = new CreateCardSkills(10,'defendDrawDiscard',3, 1, "css/images/cards/warrior/Bloodletting.png", 'bloodletting');
const entrench = new CreateCardSkills(11,'defendAddEffect',2, 2, "css/images/cards/warrior/Entrench.png", 'entrench', () => gameController.activePlayer.defendPoints * 2 - gameController.activePlayer.defendPoints );
//END CREATING WARRIOR'S CARDS

//START CREATING ROGUE'S CARDS
const strike_r = new CreateCardSkills(0,'attack',1, 6,"css/images/cards/rogue/Strike_G.png", 'strike_r');
const daggerThrow = new CreateCardSkills(1, 'attackDrawDiscard',1, 9,"css/images/cards/rogue/R_dagger-throw.png", 'daggerThrow');
const flechettes = new CreateCardSkills(2, 'attackAddEffect',1, 3,"css/images/cards/rogue/Flechettes.png", 'flechettes', () => 3 * cardInHand.children.length);
const riddleWithHoles = new CreateCardSkills(3,'attackAddEffect',2, 7, "css/images/cards/rogue/RiddleWithHoles.png", 'riddleWithHoles');
const slice = new CreateCardSkills(4,'attack',0, 4, "css/images/cards/rogue/Slice.png", 'slice');
const quickSlash = new CreateCardSkills(5,'attackDrawDiscard',1, 7, "css/images/cards/rogue/QuickSlash.png", 'quickSlash');
const survivor = new CreateCardSkills(6,'defendDrawDiscard',1, 8, "css/images/cards/rogue/Survivor.png", 'survivor');
const deflect = new CreateCardSkills(7,'defend',0, 4, "css/images/cards/rogue/Deflect.png", 'deflect');
const backFlip = new CreateCardSkills(8,'defendDrawDiscard',1, 2, "css/images/cards/rogue/Backflip.png", 'backFlip', () => 5);
const prepared = new CreateCardSkills(9,'defendDrawDiscard',0, 1, "css/images/cards/rogue/Prepared.png", 'prepared');
const expertise = new CreateCardSkills(10,'defendDrawDiscard',1, 5, "css/images/cards/rogue/Expertise.png", 'expertise');
const dash = new CreateCardSkills(11,'defendAndAttack',2, 10, "css/images/cards/rogue/Dash.png", 'dash', () => 8);
//END CREATING ROGUE'S CARDS
//
// START CREATING ROGUE'S CARDS

//START CREATING MAGE'S CARDS
const strike_m = new CreateCardSkills(0,'attack',1, 6,"css/images/cards/mage/Strike_P.png", 'strike_m');
const cutThroughFate = new CreateCardSkills(1, 'attackDrawDiscard',1, 7,"css/images/cards/mage/CutThroughFate.png", 'cutThroughFate', () => 2);
const reachHeaven = new CreateCardSkills(2, 'attack',2, 10,"css/images/cards/mage/ReachHeaven.png", 'reachHeaven');
const signatureMove = new CreateCardSkills(3,'attackAddEffect',2, 0, "css/images/cards/mage/SignatureMove.png", 'signatureMove', () => gameController.passivePlayer.defendPoints);
const tantrum = new CreateCardSkills(4,'attackAddEffect',1, 3, "css/images/cards/mage/Tantrum.png", 'tantrum', () => 3 + Math.floor(Math.random() * 6));
const judjment = new CreateCardSkills(5,'attackAddEffect',2, 0, "css/images/cards/mage/Judgment.png", 'judjment', () => { let effect; if(gameController.passivePlayer.healthPoints <= 15) { effect = 0 } return effect });
const masterReality = new CreateCardSkills(6,'defendAddEffect',1, 5, "css/images/cards/mage/MasterReality.png", 'masterReality', () => { let effect; if(gameController.activePlayer.defendPoints == 0) { effect = 10 } else { effect = 5 } return effect });
const defend_m = new CreateCardSkills(7,'defend',1, 5, "css/images/cards/mage/Defend_P.png", 'defend_m');
const meditate = new CreateCardSkills(8,'defendAddEffect',1, 3, "css/images/cards/mage/Meditate.png", 'meditate');
const thirdEye = new CreateCardSkills(9,'defendDrawDiscard',1, 7, "css/images/cards/mage/ThirdEye.png", 'thirdEye');
const nirvana = new CreateCardSkills(10,'defendAddEffect',1, 0, "css/images/cards/mage/Nirvana.png", 'nirvana', () => gameController.passivePlayer.defendPoints);
const alpha = new CreateCardSkills(11,'defendDrawDiscard',1, 4, "css/images/cards/mage/Alpha.png", 'alpha');
//END CREATING MAGE'S CARDS

// список строго упорядочен, менять НЕЛЬЗЯ!!!, индекс согласно класа игрока выбранного игроком в "меню выбора персонажа"
const skillCollection = {
	warrior: [strike_w, bash, anger, bodySlam, perfecedStrike, bludgeon, defend_w, armaments, ironWave, warcry, bloodletting, entrench],             //0   playersInfo.playerOneCharacter
	rogue: [strike_r, daggerThrow, flechettes, riddleWithHoles, slice, quickSlash, survivor, deflect, backFlip, prepared, expertise, dash],          //1    playersInfo.playerOneCharacter
	mage: [strike_m, cutThroughFate, reachHeaven, signatureMove, tantrum, judjment, masterReality, defend_m, meditate, thirdEye, nirvana, alpha]     //2    playersInfo.playerOneCharacter
}