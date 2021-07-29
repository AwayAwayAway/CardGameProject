export default class Menu {
	static createMainMenu() {
		const mainMenu = new MainMenu();
	}

	static createChooseMenu() {
		const mainMenu = new ChooseMenu();
	}

	init(parentElement) {
		this.mainElement = document.querySelector(parentElement);
		this.source = {...document.querySelector(parentElement).children};
	}
}

class MainMenu extends Menu {
	constructor() {
		super();

		this.init('.wrapper-main-menu');

		const {1: soundOffOn} = this.source;

		soundOffOn.addEventListener('click', playBackgroundMusic);

		[...this.mainElement.children].forEach((hover) => {
			hover.addEventListener('mouseover', playBtnHover);
		});

		[...this.mainElement.children].forEach((click) => {
			click.addEventListener('click', playBtnClicked);
		});
	}
}

class ChooseMenu extends Menu {
	constructor() {
		super();

		let playerOneTurn = true;
		let playerTwoTurn = false;

		let playerOneClass = null;
		let playerTwoClass = null;

		let playerOneName = null;
		let playerTwoName = null;

		const characterDescription = [
			{
				title: 'The Viking',
				profile: 'The remaining soldier of the Ironclads. Sold his soul to harness demonic energies',
				pross: 'Losing health goes into a rage. Becomes stronger when the enemy has a lot of health'
			},
			{
				title: 'The Silent',
				profile: 'A deadly huntress from the foglands. Eradicates foes with daggers',
				pross: 'Light attacks and the ability to always find the right skill take the enemy by surprise'
			},
			{
				title: 'The Watcher',
				profile: 'A blind ascetic who has come to "Evaluate" the Spire. Master of the divine Stances',
				pross: 'Massive magic  can destroy the enemy in a matter of seconds'
			}
		];

		this.init('.wrapper-choose-menu');

		const {6: soundOffOn, 2: options, 0: announcer, 1: description, 4: decision, 3: startGame} = this.source;

		const {firstElementChild: enterName, lastElementChild: applyChoose} = this.source[4];

		options.addEventListener('click', (event) => this.setBackground(event));

		options.addEventListener('click', (event) => this.startVisualAndSoundEffect(event));

		[...options.children].forEach((hover) => {
			hover.addEventListener('mouseover', playBtnHover);
		});

		//run function to choose character or  alert empty input name
		applyChoose.addEventListener('click', () => this.playerChooseCharacter());

		document.addEventListener('keypress', (event) => {
			if (event.code === 'Enter') {
				this.playerChooseCharacter();
			}
		});

		soundOffOn.addEventListener('click', playBackgroundMusic);

		// set audio effects hover and click
		[...document.querySelectorAll('.btn')].forEach((button) => {
			button.addEventListener('mouseover', playBtnHover);
			button.addEventListener('click', playBtnClicked);
		});

		// save name and model of character of each player
		this.playerChooseCharacter = function() {
			// const announcer = document.querySelector('.playerChoose');
			const check = enterName.value.length >= 1 && enterName.value !== 'You forgot enter name' && [...options.children].some((child) => child.classList.contains('in-focus'));

			//check if input is empty
			if (!check) {
				this.allertEmptyName();
				return;
			}

			// help myself with 'data' attribute to set which character player choose
			let temp = [...options.children].filter((child) => {
				if (child.classList.contains('in-focus')) {
					return child;
				}
			});

			// record player's choose
			if (playerOneTurn) {
				playerOneName = enterName.value;
				playerOneClass = temp[0].dataset.class;
				announcer.textContent = 'Player 2: Choose your character';
				enterName.value = '';
			} else {
				playerTwoName = enterName.value;
				playerTwoClass = temp[0].dataset.class;
				announcer.textContent = 'Players chose their characters';
				enterName.value = '';
			}

			playerOneTurn = false;
			playerTwoTurn = true;

			this.removeStyles();
			this.checkConditionToStartBattle();
		}

		// alert for empty input
		this.allertEmptyName = function() {
			if (enterName.value.length <= 1) {
				shakeAnimation('.decision-btn', 'horizontal');

				enterName.value = 'You forgot enter name';
				enterName.style.color = 'red';
				enterName.style.fontSize = '2rem';

				setTimeout(() => {
					enterName.value = '';
					enterName.style.color = 'black';
					enterName.style.fontSize = '2rem';
				}, 1000);
			}

			if ([...options.children].some((child) => child.classList.contains('in-focus'))) {
				return;
			} else {
				shakeAnimation('.options', 'mix');
			}
		}

		// check if both players choose character and enter nicknames, start fight
		this.checkConditionToStartBattle = function() {
			if (playerOneClass && playerTwoClass) {
				const playersChoice = this.prepareToExtract();

				options.classList.add('hidden');
				decision.classList.add('hidden');
				description.classList.add('hidden');

				localStorage.setItem('playersInfo', JSON.stringify(playersChoice));

				setTimeout(function () {
					startGame.classList.add('visible');
				}, 500);
			}
		}

		this.removeStyles = function() {
			[...options.children].map((child) => {
				child.classList.remove('in-focus');
			});
		}

		// function trigger audio and shake animation
		this.startVisualAndSoundEffect = function(event) {
			switch (event.target.className.split(' ')[0]) {
				case 'warrior':
					shakeAnimation('.wrapper-choose-menu');
					playAudioCharacterSelected('warrior');
					break;
				case 'rogue':
					shakeAnimation('.wrapper-choose-menu');
					playAudioCharacterSelected('rogue');
					break;
				case 'mage':
					shakeAnimation('.wrapper-choose-menu');
					playAudioCharacterSelected('mage');
					break;
			}
		}

		// set text to describe each character
		this.setCharacterDescription = function(character) {
			switch (character) {
				case 'warrior':
					description.children[0].textContent = characterDescription[0].title;
					description.children[1].textContent = characterDescription[0].profile;
					description.children[2].textContent = characterDescription[0].pross;
					break;
				case 'rogue':
					description.children[0].textContent = characterDescription[1].title;
					description.children[1].textContent = characterDescription[1].profile;
					description.children[2].textContent = characterDescription[1].pross;
					break;
				case 'mage':
					description.children[0].textContent = characterDescription[2].title;
					description.children[1].textContent = characterDescription[2].profile;
					description.children[2].textContent = characterDescription[2].pross;
					break;
			}
		}

		this.setBackground = function(event) {
			if (event.target.className === 'options') { return }

			this.removeStyles();

			event.target.classList.add('in-focus');

			this.setCharacterDescription(`${event.target.textContent.toLowerCase()}`);

			this.mainElement.style.backgroundImage = `url(\'images/backgrounds/${event.target.textContent.toLowerCase()}.jpg\')`;
		}

		this.prepareToExtract = function () {
			return {
				playerOneClass,
				playerTwoClass,
				playerOneName,
				playerTwoName
			}
		}
	}
}