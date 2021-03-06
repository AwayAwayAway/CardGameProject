import {playPauseBackgroundAudio, playSoundEffect, shakeAnimation} from '../animation_and_sound_effects/animation.js';
import {media} from '../preloadedMediaContent';

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

		this.aboutGame = document.querySelector('.about-button');

		this.checkContinueCondition();

		this.init('.wrapper-main-menu');

		const {1: soundOffOn} = this.source;

		soundOffOn.addEventListener('click', playPauseBackgroundAudio);

		[...this.mainElement.children].forEach((button) => {
			button.addEventListener('mouseover', () => playSoundEffect(media.audio.btnHover));

			button.addEventListener('click', () => playSoundEffect(media.audio.btnClick));
		});

		this.aboutGame.addEventListener('click', () => this.createAboutRules());

		this.rulesPage = `<div class = "about-game">
			<p>Defeat your opponent by playing <span style="color:brown">Cards</span><img src="./images/cards/warrior/strike.png" alt="card"> from your hand by swipe it up or drag it in the center of battlefield.</p>
			<p>Cards require <span style="color: orange">Energy</span> to play. You can see it on a card in the top left corner. Once you are out of Energy, <img id = "about-game__stamina" src="./images/icons/out-of-energy.png" alt="cards">end your turn.</p>
			<p>At start of your turn, new cards are drawn and your <span>Energy</span> is replenished.</p>
			<p>Play defensive card to gain <span style="color:blue">Block</span><img src="./images/cards/warrior/defend_w.png" alt="card"> <span>Block</span> reduces incoming attack damage.</p>
			<p>If you want to save your game, just use menu <i class="fas fa-bars"></i> and select "save progress" button.</p>
		</div>`;
	}

	checkContinueCondition() {
		fetch('https://parseapi.back4app.com/classes/CardGameContainer/', {
			method: 'GET',
			headers: {
				'X-Parse-Application-Id': 'uU4nbtVfuBneX95bxKyjBuyG82Wr3Wg1JrTjEYr7',
				'X-Parse-REST-API-Key': 'UAnSqROzrtRZuMkgY3MgoEkhsp0040aUBca0dWGm',
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
			})
			.then(data => {
				if (data.results[0].gameSaved.hasOwnProperty('gameFinished')) {
					document.querySelector('.continue-button').addEventListener('click', (event) => event.stopPropagation());

					document.querySelector('.continue-button').style.color = 'grey';
				}
			});
	}

	createAboutRules() {
		const divEl = document.createElement('div');
		const closeBtn = document.createElement('div');
		const content = document.createElement('div');

		divEl.className = 'players-overlay fade-in-animation';
		closeBtn.className = 'close-rule-btn';
		content.innerHTML = `${this.rulesPage}`;

		closeBtn.textContent = 'Close';

		divEl.appendChild(content);
		divEl.appendChild(closeBtn);

		this.mainElement.appendChild(divEl);

		document.querySelector('.close-rule-btn').addEventListener('click', () => this.removeAboutRules());

		document.querySelector('.close-rule-btn').addEventListener('mouseover', () => playSoundEffect(media.audio.btnHover));

		document.querySelector('.close-rule-btn').addEventListener('click', () => playSoundEffect(media.audio.btnClick));
	}

	removeAboutRules() {
		const divEl = document.querySelector('.players-overlay');

		divEl.className = 'players-overlay fade-out-animation';

		setTimeout(() => this.mainElement.removeChild(divEl), 500);
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

		const {0: announcer, 1: description, 2: options, 3: startGame, 4: decision, 6: soundOffOn} = this.source;

		const {firstElementChild: enterNameInput, lastElementChild: applyChoose} = this.source[4];

		enterNameInput.maxLength = '10';

		options.addEventListener('click', (event) => this.setBackground(event));

		options.addEventListener('click', (event) => this.startVisualEffects(event));

		[...options.children].forEach(hover => hover.addEventListener('mouseover', () => playSoundEffect(media.audio.btnHover)));

		applyChoose.addEventListener('click', () => this.playerChooseCharacter());

		soundOffOn.addEventListener('click', playPauseBackgroundAudio);

		document.addEventListener('keypress', (event) => {
			if (event.code === 'Enter') {
				this.playerChooseCharacter();
			}
		});

		[...document.querySelectorAll('.btn')].forEach((button) => {
			button.addEventListener('mouseover', () => playSoundEffect(media.audio.btnHover));
			button.addEventListener('click', () => playSoundEffect(media.audio.btnClick));
		});

		enterNameInput.addEventListener('focus', () => this.clearInput());

		// save name and model of character of each player
		this.playerChooseCharacter = function () {
			const testResult = this.isValidUserName();

			const runAlert = this.runAlert(testResult);

			if(runAlert) { return; }
			
			// help myself with 'data' attribute to set which character player choose
			let temp = [...options.children].filter((child) => {
				if (child.classList.contains('in-focus')) {
					return child;
				}
			});

			this.recordPlayerChoose(temp);

			this.removeStyles();

			this.checkConditionToStartBattle();

			playSoundEffect(media.audio.confirmSucces);
		};

		this.isValidUserName = function () {
			const regexSymbols = /(\W+|\s+)/g;
			const regexEmpty = /(^$)/g;
			const regexNameLength = /(^[a-zA-Z0-9]{1,3}$)/g;
			const regexWarnings = /(Enter your name)|(Name is too short)|(Use alphanumeric approach)/ig;
			const classCheck = [...options.children].some((child) => child.classList.contains('in-focus'));

			const testSymbols = regexSymbols.test(enterNameInput.value);
			const testEmpty = regexEmpty.test(enterNameInput.value);
			const testNameLength = regexNameLength.test(enterNameInput.value);
			const testWarnings = regexWarnings.test(enterNameInput.value);

			let testResult = null;

			//check if input is empty or didnt class chosen
			if(testWarnings) {
				testResult = 'warning'
			} else if (testSymbols) {
				testResult = 'symbols';
			} else if (testNameLength) {
				testResult = 'short';
			} else if (testEmpty) {
				testResult = 'empty';
			} else if (!classCheck) {
				testResult = 'class';
			}

			return testResult;
		}

		this.runAlert = function (testResult) {
			let condition = false;

			switch (testResult) {
				case 'warning':
					this.alertNotification('warning');
					condition = true;
					break;
				case 'symbols':
					this.alertNotification('symbols');
					condition = true;
					break;
				case 'short':
					this.alertNotification('short');
					condition = true;
					break;
				case 'empty':
					this.alertNotification('empty');
					condition = true;
					break;
				case 'class':
					this.alertClassNotification();
					condition = true;
					break;
			}

			return condition;
		}

		// alert for empty input
		this.alertNotification = function (type) {
			playSoundEffect(media.audio.confirmFailed);

			shakeAnimation('.decision__btn', 'horizontal');

			let warningMessage;

			switch (type){
				case 'empty':
					warningMessage = 'Enter your name';
					break;
				case 'short':
					warningMessage = 'Name is too short';
					break;
				case 'symbols':
					warningMessage = 'Use alphanumeric'
					break;
				case 'warning':
					return;
			}

			enterNameInput.value = warningMessage;
			enterNameInput.style.color = 'red';
			enterNameInput.style.fontSize = '1.5rem';
		};

		this.clearInput = function () {
			enterNameInput.value = '';
			enterNameInput.style.color = 'black';
			enterNameInput.style.fontSize = '2rem';
		};

		this.alertClassNotification = function () {
			if ([...options.children].some((child) => child.classList.contains('in-focus'))) {
				return;
			} else {
				playSoundEffect(media.audio.confirmFailed);

				shakeAnimation('.options', 'mix');
			}
		};

		this.recordPlayerChoose = function (temp) {
			// record player's choose
			if (playerOneTurn) {
				playerOneName = enterNameInput.value.trim();
				playerOneClass = temp[0].dataset.class;
				announcer.textContent = 'Player 2: Choose your character';
				enterNameInput.value = '';
			} else {
				playerTwoName = enterNameInput.value.trim();
				playerTwoClass = temp[0].dataset.class;
				announcer.textContent = 'Players chose their characters';
				enterNameInput.value = '';
			}

			playerOneTurn = false;
			playerTwoTurn = true;
		}

		this.removeStyles = function () {
			[...options.children].forEach((child) => {
				child.classList.remove('in-focus');
			});
		};

		// check if both players choose character and enter nicknames, start fight
		this.checkConditionToStartBattle = function () {
			if (playerOneClass && playerTwoClass) {
				const playersChoice = this.prepareToSaveData();

				options.classList.add('hidden');
				decision.classList.add('hidden');
				description.classList.add('hidden');

				localStorage.setItem('playersInfo', JSON.stringify(playersChoice));

				setTimeout(function () {
					startGame.classList.add('visible');
				}, 500);
			}
		};

		// function trigger audio and shake animation
		this.startVisualEffects = function (event) {
			switch (event.target.className.split(' ')[0]) {
				case 'warrior':
					playSoundEffect(media.audio.warriorSelected);

					break;
				case 'rogue':
					playSoundEffect(media.audio.rogueSelected);

					break;
				case 'mage':
					playSoundEffect(media.audio.mageSelected);

					break;
			}
		};

		// set text to describe each character
		this.setCharacterDescription = function (character) {
			const keys = Object.keys(characterDescription[0]);

			switch (character) {
				case 'warrior':
					[...description.children].forEach((element, index) => element.textContent = characterDescription[0][keys[index]]);

					break;
				case 'rogue':
					[...description.children].forEach((element, index) => element.textContent = characterDescription[1][keys[index]]);

					break;
				case 'mage':
					[...description.children].forEach((element, index) => element.textContent = characterDescription[2][keys[index]]);

					break;
			}
		};

		this.setBackground = function (event) {
			if (event.target.className === 'options') {
				return;
			}

			this.removeStyles();

			event.target.classList.add('in-focus');

			this.setCharacterDescription(`${event.target.textContent.toLowerCase()}`);

			this.mainElement.style.backgroundImage = `url(\'./images/backgrounds/${event.target.textContent.toLowerCase()}.jpg\')`;
		};

		this.prepareToSaveData = function () {
			return {
				playerOneClass,
				playerTwoClass,
				playerOneName,
				playerTwoName
			};
		};
	}
}