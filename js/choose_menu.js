const wrapper = document.querySelector('.wrapper-choose-menu');
const soundOffOnC = document.querySelector('.soundIcon');
const audioC = document.querySelector('.background-music');

const options = document.querySelector('.options');         // div with characters buttons
const warrior = document.querySelector('.warrior');         // choose warrior button
const rogue = document.querySelector('.rogue');             // choose rogue button
const mage = document.querySelector('.mage');               // choose mage button

const inputMenu = document.querySelector('.decision');        // div with input and submit button
const enterName = document.querySelector('.enterName');       // input for nickname
const applyChoose = document.querySelector('.decision-btn');  // submit button for input

const announcer = document.querySelector('.playerChoose');    // announcement which player choose now

// check on sound on/off icon
if(audioC.paused) {
	soundOffOnC.className = 'fas fa-volume-mute soundIcon';
} else {
	soundOffOnC.className = 'fas fa-volume-up soundIcon';
}

//save all info about what players chose and  functions with how to choose
let playersChoice = {
	playerOneTurn: true,
	playerTwoTurn: false,

	playerOneChoice: null,
	playerTwoChoice: null,

	playerOneName: null,
	playerTwoName: null,

	// save choosen character of each player
	playersChooseCharacter() {
		//check if input is empty
		if(enterName.value.length < 1 || enterName.value == 'You forgot enter name') { return }

		// help myself with 'data' attribute to set which character player choose
		let temp = [...options.children].filter((child) => {
			if (child.classList.contains('in-focus')) {
				return child;
			}
		});

		// record player's choose
		if(this.playerOneTurn) {
			this.playerOneChoice = temp[0].dataset.class;
			announcer.textContent = 'Player 2: Choose your character';
			enterName.value = '';
		} else {
			this.playerTwoChoice = temp[0].dataset.class;
			announcer.textContent = 'Players chose their characters';
			enterName.value = ''
		}

		this.playerOneTurn = false;
		this.playerTwoTurn = true;

		this.checkConditionToStartBattle();
	},

	// check if both players choose character and enter nicknames, start fight
	checkConditionToStartBattle() {
		if(this.playerOneChoice && this.playerTwoChoice) {
			options.classList.add('hidden');
			inputMenu.classList.add('hidden');

			localStorage.setItem('playersInfo', JSON.stringify(playersChoice));

			setTimeout(function(){
				document.querySelector('.startGame').classList.add('visible')
			}, 500);
		} else {
			return;
		}
	},

	// save nickname of each player
	playersChooseName() {
		// alert if input is empty
		if(enterName.value.length < 1) { allertEmptyName() }

		if(this.playerOneTurn && enterName.value.length > 0 && enterName.value !== 'You forgot enter name') {
			this.playerOneName = enterName.value;
		} else {
			this.playerTwoName = enterName.value;
		}
	}
}

//backgorund change
warrior.addEventListener('click',  () => {
	removeStyles();
	warrior.classList.add('in-focus');

	wrapper.style.backgroundImage = "url('css/images/backgrounds/warrior.jpg')"
})

rogue.addEventListener('click',  () => {
	removeStyles();
	rogue.classList.add('in-focus');

	wrapper.style.backgroundImage = "url('css/images/backgrounds/rogue.jpg')";
})

mage.addEventListener('click',  () => {
	removeStyles();
	mage.classList.add('in-focus');

	wrapper.style.backgroundImage = "url('css/images/backgrounds/mage.jpg')"
})

//run function to choose character or  alert empty input name
applyChoose.addEventListener('click', checkPlayersChoose)

//remove anim
applyChoose.addEventListener('click', removeStyles);

// sound and shake animation when character selected
options.addEventListener('click', startVisualAndSoundEffect);

soundOffOnC.addEventListener('click', stopPlayBackgroundMusic);

// run function to choose character and save nickname or  alert empty input name
function checkPlayersChoose() {
	playersChoice.playersChooseName();
	playersChoice.playersChooseCharacter();
}

// alert for empty input
function allertEmptyName() {
	enterName.value = 'You forgot enter name'
	enterName.style.color = 'red';
	enterName.style.fontSize = '2rem';

	setTimeout(setEmptyInput, 1000);
}

// set back font color, size and empty input after alert
function setEmptyInput() {
	enterName.value = ''
	enterName.style.color = 'black';
	enterName.style.fontSize = '1rem';
}

// remove styles 'in-focus' on character's button
function removeStyles() {
	[...options.children].forEach( (child) => { child.classList.remove('in-focus') });
}

// function trigger audio and shake animation
function startVisualAndSoundEffect(e) {
	if(e.target.classList.contains('warrior')) {
		shakeAnimation();
		playAudioCharacterSelected('warrior');
	} else if(e.target.classList.contains('rogue')) {
		shakeAnimation();
		playAudioCharacterSelected('rogue');
	} else if(e.target.classList.contains('mage')) {
		shakeAnimation();
		playAudioCharacterSelected('mage');
	} else {
		return;
	}
}

// audio effect when character choosed
function playAudioCharacterSelected(character) {
	let warriorSelected = document.querySelector('.warrior-selected');
	let rogueSelected = document.querySelector('.rogue-selected');
	let mageSelected = document.querySelector('.mage-selected');

	switch (character) {
		case 'warrior':
			warriorSelected.play();
			break;
		case 'rogue':
			rogueSelected.play();
			break;
		case 'mage':
			mageSelected.play();
			break;
	}
}

// shake display when character choosed
function shakeAnimation() {
	// run immedeatly
	setTimeout(() => { wrapper.classList.add('shake') }, 0);

	//remove class cuz we want run animation again and use delay we need animation runs and ends
	setTimeout(() => { wrapper.classList.remove('shake') }, 400);
}

// pause backgorundMusic
function stopPlayBackgroundMusic() {
	if(!audioC.paused) {
		audioC.pause();
		soundOffOnC.className = 'fas fa-volume-mute soundIcon';
	} else {
		audioC.play();
		soundOffOnC.className = 'fas fa-volume-up soundIcon';
	}
}