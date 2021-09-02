import Events from './eventsModel';
import {player1, player2} from '../game';
import {media} from '../preloadedMediaContent';
import {warningUnload, forbidClick} from './observerModel';
import {
	createCardAnimation,
	endTurnAnimation,
	playSoundEffect,
	shakeAnimation
} from '../animation_and_sound_effects/animation';

export default class BoardView {
	constructor(board, game, selector) {
		this.boardModel = board;
		this.gameModel = game;
		this.boardSelector = selector;

		this.deckWrapper = this.boardSelector.querySelector('.cards-choose-field');
		this.acceptChoiceBtn = this.boardSelector.querySelector('.players-draw-info__accept');
		this.cardsChooseCounter = this.boardSelector.querySelector('.players-draw-info__count');
		this.cardInHandField = this.boardSelector.querySelector('.card-in-hand-field');
		this.battleField = this.boardSelector.querySelector('.battle-field');
		this.endTurnBtn = this.boardSelector.querySelector('.end-of-turn-btn');
		this.playersTurnInfo = this.boardSelector.querySelector('.players-action');
		this.cardsPlayField = this.boardSelector.querySelector('.play-field');
		this.soundOffOnIcon = this.boardSelector.querySelector('.sound-icon');
		this.playersOverlay = this.boardSelector.querySelector('.players-overlay');
		this.playersDeck = this.boardSelector.querySelector('.players-overlay__cards');
		this.playersDeckClose = this.boardSelector.querySelector('.players-overlay__close');
		this.menu = this.boardSelector.querySelector('.battle-field-nav');
		this.menuIcon = this.boardSelector.querySelector('.battle-field-nav__icon');
		this.playerOneCollection =this.boardSelector.querySelector('.player-1__pile-of-card');
		this.playerTwoCollection =this.boardSelector.querySelector('.player-2__pile-of-card');

		this.touchEvent = event => {
			event.preventDefault();
			const self = this;
			const coordinateY = event.touches[0].pageY;
			const eventTarget = event.target;

			if (event.target.classList.contains('cards')) {
				this.onTouchCardStart.notify(event.target);

				event.target.classList.add('touch-start-animation');

				playSoundEffect(media.audio.cardGrab);

				function closure() {
					const coordinate = coordinateY;
					const target = eventTarget;

					self.boardSelector.addEventListener('touchend', function touchEnd(event) {
						const comparison = parseFloat(coordinateY) - parseFloat(event.changedTouches[0].pageY);

						eventTarget.classList.remove('touch-start-animation');

						playSoundEffect(media.audio.cardRelease);

						if (comparison > 170) {
							self.onDropCard.notify();
							self.onDropCardAction.notify(self.gameModel.playerOneTurn);
						}

						this.removeEventListener('touchend', touchEnd);
					});
				}

				closure();

			}
		};

		this.onLoadCreate = new Events;

		// событие для this.gameModel закинуть в масиив выбранные карты
		this.onDefineCards = new Events;

		// событие на проверку набрали ли игроки карты
		this.onCheckChosenCards = new Events;

		// навели убрали мышку на карту в руке
		this.onGrabCardStart = new Events();

		this.onTouchCardStart = new Events();

		//удаляем сыгранную карту
		this.onDropCard = new Events();

		// выполняем действие карты
		this.onDropCardAction = new Events();

		this.onEndTurn = new Events();

		this.onClosePileCards = new Events();

		this.onShowPlayerDeck = new Events();

		this.onSoundSwitch = new Events();

		this.onSaveGameProgress = new Events();

		this.onRestoreGameData = new Events();

		this.onRestoreGameDataRejected = new Events();

		this.onConcede = new Events();

		if ('ontouchstart' in window) {
			this.cardInHandField.addEventListener('touchstart', (event) => this.touchEvent(event));

			this.deckWrapper.addEventListener('touchstart', (event) => this.renderCardSelected(event));
		} else {
			this.deckWrapper.addEventListener('click', (event) => this.renderCardSelected(event));

			this.cardInHandField.addEventListener('mouseover', (event) => this.renderCardSelectedInHand(event.target));

			this.cardInHandField.addEventListener('mouseout', (event) => this.renderCardSelectedOutHand(event.target));

			this.cardInHandField.addEventListener('dragstart', (event) => this.renderDragCardStart(event.target));

			this.cardInHandField.addEventListener('dragstart', (event) => this.onGrabCardStart.notify(event.target));

			this.cardInHandField.addEventListener('dragend', (event) => this.renderDragCardEnd(event.target));

			this.cardsPlayField.addEventListener('dragenter', (event) => this.renderDragCardEnterDrop(event));

			this.cardsPlayField.addEventListener('dragover', (event) => event.preventDefault());

			this.cardsPlayField.addEventListener('drop', (event) => {
				event.preventDefault();

				this.onDropCard.notify();

				this.onDropCardAction.notify(this.gameModel.playerOneTurn);

				this.removeDropFieldAnimation();
			});
		}

		this.acceptChoiceBtn.addEventListener('click', () => {
			this.onDefineCards.notify();

			this.onCheckChosenCards.notify();
		});

		this.battleField.addEventListener('click', (event) => {
			this.onShowPlayerDeck.notify(event.target);

			this.renderPlayerCardCollection(event.target);
		});

		this.playersDeckClose.addEventListener('click', (event) => {
			this.onClosePileCards.notify();

			this.renderPlayerCardCollection(event.target);
		});

		this.endTurnBtn.addEventListener('click', () => this.onEndTurn.notify());

		this.soundOffOnIcon.addEventListener('click', () => this.onSoundSwitch.notify());

		this.menuIcon.addEventListener('click', () => {
			playSoundEffect(media.audio.btnClick);

			this.renderBattleMenu();
		});

		this.menu.addEventListener('click', (event) => this.navigateOnBattlefield(event.target));

		[...this.menu.getElementsByTagName('li')].forEach((button) => {
			button.addEventListener('mouseover', () => playSoundEffect(media.audio.btnHover));
			button.addEventListener('click', () => playSoundEffect(media.audio.btnClick));
		});

		this.boardSelector.querySelector('.save-progress').addEventListener('click', forbidClick);

		this.boardSelector.querySelector('.concede').addEventListener('click', forbidClick);

		window.addEventListener('beforeunload', warningUnload);

		this.gameModel.onSelectionEnd.attach(() => this.renderBattlefield());

		this.gameModel.onChangePlayerInfo.attach((text) => this.renderPlayerChooseInfo(text));

		this.gameModel.onUpdatePlayersNames.attach((name1, name2) => this.renderPlayerName(name1, name2));

		this.gameModel.onUpdatePlayersModels.attach((modelPlayer1, modelPlayer2) => this.renderPlayerModels(modelPlayer1, modelPlayer2));

		this.boardModel.onCreateCards.attach((card, place) => this.renderCards(card, place));

		this.boardModel.onRemoveCards.attach((cards, place) => this.renderDeletedCards(cards, place));

		this.boardModel.onRemoveActionCard.attach((card) => this.renderDeletedActionCard(card));

		this.boardModel.onCreateCardAnimation.attach((querySelector, amount) => this.renderCreateCardAnimation(querySelector, amount));

		this.gameModel.onEndTurnAnimation.attach((btnSide, textInfo) => this.renderEndTurnAnimation(btnSide, textInfo));

		this.gameModel.onGameStart.attach((restoreRequest) => this.init(restoreRequest));

		this.gameModel.onRestoredGameFailed.attach(() => this.renderRestoreError());

		this.gameModel.onSaveGameData.attach((state) => this.renderSaveGameResult(state));
	}

	// need for start render cards when page is loaded
	init(restoreRequest) {
		if (restoreRequest) {
			this.renderRestoreNotification();
		} else {
			this.onLoadCreate.notify();
		}
	};

	renderCards(card, place) {
		switch (place) {
			case 'board':
				this.deckWrapper.appendChild(card);

				break;
			case 'hand':
				this.cardInHandField.appendChild(card);

				break;
			case 'overlay':
				this.playersDeck.appendChild(card);

				break;
		}

		this.cardsChooseCounter.textContent = '0';

		this.cardsChooseCounter.style = 'color: white';
	};

	renderCreateCardAnimation(querySelector, amount) {
		createCardAnimation(querySelector, amount);
	}

	renderCardSelected(event) {
		event.preventDefault();

		let target = event.target;

		if (target !== this.deckWrapper) {
			target.classList.toggle('card-to-select');
		}

		if (target.classList.contains('card-to-select')) {
			playSoundEffect(media.audio.cardSelected);
		}

		let counter = document.getElementsByClassName('card-to-select').length;

		let counterInfo = {};

		counterInfo.number = counter;

		if (counter > 8) {
			counterInfo.color = 'red';
		} else if (counter == 8) {
			counterInfo.color = 'green';
		} else if (counter > 0 && counter < 8) {
			counterInfo.color = 'cyan';
		} else {
			counterInfo.color = 'white';
		}

		this.renderCardCounterInfo(counterInfo);
	}

	renderCardSelectedInHand(eventTarget) {
		let target = eventTarget;

		if (target !== this.cardInHandField) {
			target.classList.add('card-to-action');
		}
	}

	renderCardSelectedOutHand(eventTarget) {
		let target = eventTarget;

		if (target !== this.cardInHandField) {
			target.classList.remove('card-to-action');
		}
	}

	renderDeletedCards(cards, place) {

		if (place == 'board' && cards.length > 0) {
			for (let i = 0; i < cards.length; i++) {
				this.deckWrapper.removeChild(cards[i]);
			}
		}

		if (place == 'hand' && cards.length > 0) {
			for (let i = 0; i < cards.length; i++) {
				this.cardInHandField.removeChild(cards[i]);
			}
		}

		if (place == 'overlay' && cards.length > 0) {
			for (let i = 0; i < cards.length; i++) {
				this.playersDeck.removeChild(cards[i]);
			}
		}
	}

	renderDeletedActionCard(card) {
		this.cardInHandField.removeChild(card);
	}

	renderBattlefield() {
		this.deckWrapper.style.display = 'none';

		this.battleField.classList.remove('hidden');

		this.boardSelector.querySelector('.players-draw-info').style.display = 'none';
	}

	renderCardCounterInfo(info) {
		this.cardsChooseCounter.textContent = info.number;

		this.cardsChooseCounter.style = `color: ${info.color}`;
	};

	renderPlayerChooseInfo(text) {
		this.boardSelector.querySelector('.players-draw-info__name').textContent = text;
	}

	renderPlayerName(name1, name2) {
		this.boardSelector.querySelector('.player-1__name').textContent = name1;

		this.boardSelector.querySelector('.player-2__name').textContent = name2;
	}

	renderPlayerModels(modelPlayer1, modelPlayer2) {
		const player1Model = this.boardSelector.querySelector('.player-1__model');
		const player2Model = this.boardSelector.querySelector('.player-2__model');

		player1Model.type = 'image/svg+xml';
		player2Model.type = 'image/svg+xml';

		switch (modelPlayer1) {
			case 'warrior':
				player1Model.data = 'images/models/viking.svg';

				break;
			case 'rogue':
				player1Model.data = 'images/models/rogue.svg';

				break;
			case 'mage':
				player1Model.data = 'images/models/mage.svg';

				break;
			default:
				console.log('models not found');
		}

		switch (modelPlayer2) {
			case 'warrior':
				player2Model.data = 'images/models/viking.svg';

				break;
			case 'rogue':
				player2Model.data = 'images/models/rogue.svg';

				break;
			case 'mage':
				player2Model.data = 'images/models/mage.svg';

				break;
			default:
				console.log('models not found');
		}
	}

	renderEndTurnAnimation(btnSide, textInfo) {
		endTurnAnimation(btnSide);

		playSoundEffect(media.audio.endTurn);

		this.playersTurnInfo.textContent = textInfo;
	}

	renderBattleMenu() {
		const menuIcon = this.boardSelector.querySelector('.battle-field-nav__icon');
		const menuList = this.boardSelector.querySelector('.battle-field-nav__list');

		if (menuIcon.classList.contains('fa-times-circle')) {
			menuList.classList.add('hidden');
			menuIcon.className = 'fas fa-bars battle-field-nav__icon';
		} else {
			menuList.classList.remove('hidden');
			menuIcon.className = 'far fa-times-circle battle-field-nav__icon';
		}
	}

	navigateOnBattlefield(eventTarget) {
		switch (eventTarget.className.split(' ')[0]) {
			case 'return-to-main-menu':
				this.renderBattleMenu();

				document.title = 'Main menu';
				location.hash = decodeURIComponent('main-menu');

				break;
			case 'return-to-choose-menu':
				this.renderBattleMenu();

				document.title = 'Choose menu';
				location.hash = decodeURIComponent('choose-menu');

				break;
			case 'save-progress':
				this.onSaveGameProgress.notify();

				break;
			case 'concede':
				this.renderBattleMenu();

				this.doConcede();

				break;
		}
	}

	renderRestoreNotification() {
		this.playersOverlay.classList.remove('hidden');
		this.playersOverlay.classList.add('fade-in-animation');
		this.playersDeckClose.classList.add('hidden');

		const divEl = document.createElement('div');

		divEl.className = 'confirm-continue';
		divEl.textContent = 'Do you want to continue the last game?';

		const choiceYes = document.createElement('button');

		choiceYes.className = 'confirm-continue__accept';
		choiceYes.textContent = 'Yes';

		const choiceNo = document.createElement('button');

		choiceNo.className = 'confirm-continue__reject';
		choiceNo.textContent = 'No';

		divEl.appendChild(choiceYes);
		divEl.appendChild(choiceNo);

		this.playersOverlay.appendChild(divEl);

		this.boardSelector.querySelector('.confirm-continue').addEventListener('click', (event) => this.renderRestoreGameDecision(event.target));
	}

	renderRestoreGameDecision(eventTarget) {
		const divEl = document.querySelector('.confirm-continue');

		switch (eventTarget.className) {
			case 'confirm-continue__reject':
				this.playersOverlay.removeChild(divEl);

				this.playersOverlay.classList.add('hidden');

				this.playersDeckClose.classList.remove('hidden');

				this.onRestoreGameDataRejected.notify();

				break;
			case 'confirm-continue__accept':
				this.playersOverlay.classList.remove('fade-in-animation');

				this.onRestoreGameData.notify();

				break;
		}
	}

	renderDragCardStart(eventTarget) {
		playSoundEffect(media.audio.cardGrab);

		if (eventTarget !== this.cardInHandField) {
			setTimeout(() => eventTarget.classList.add('invisible'), 0);

			this.cardsPlayField.classList.add('pulse-animation');
		}
	}

	renderDragCardEnd(eventTarget) {
		playSoundEffect(media.audio.cardRelease);

		if (eventTarget !== this.cardInHandField) {
			eventTarget.classList.remove('invisible');
		}

		this.removeDropFieldAnimation();
	}

	renderDragCardEnterDrop(event) {
		event.preventDefault();

		this.cardsPlayField.classList.add('pulse-animation-enter');
	}

	removeDropFieldAnimation() {
		this.cardsPlayField.classList.remove('pulse-animation-enter');

		this.cardsPlayField.classList.remove('pulse-animation');
	}

	renderPlayerCardCollection(target) {
		if (target.classList.contains('player-1__pile-of-card') || target.classList.contains('player-2__pile-of-card')) {
			this.playersOverlay.classList.remove('hidden');
			this.playersOverlay.classList.add('fade-in-pile-animation');

			playSoundEffect(media.audio.overlayOpen);
		}

		if (target.classList.contains('players-overlay__close')) {
			this.playersOverlay.classList.remove('fade-in-pile-animation');
			this.playersOverlay.classList.add('hidden');

			playSoundEffect(media.audio.overlayClose);
		}
	}

	renderRestoreError() {
		this.deckWrapper.textContent = 'Game restoration failed, please reload page or go back to choose menu and start new Game'
	}

	renderSaveGameResult(state) {
		const iEl = document.createElement('i');

		if(state) {
			iEl.className = "fas fa-check save-progress-success";

			setTimeout(() => this.renderBattleMenu(), 800);
		} else {
			iEl.className = "fas fa-times save-progress-failed";

			shakeAnimation('.save-progress');
		}

		this.boardSelector.querySelector('.save-progress').appendChild(iEl);

		setTimeout(() => this.boardSelector.querySelector('.save-progress').removeChild(iEl), 1500);
	}

	doConcede() {
		if (this.gameModel.playerOneTurn) {
			this.onConcede.notify('player1');
		} else {
			this.onConcede.notify('player2');
		}
	}
}
