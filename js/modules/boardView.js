import Events from './eventsModel';
import {createCardAnim, endTurnAnim, playSoundEffect} from '../animation_and_sound_effects/animation';
import {gameObserver, player1} from '../game';
import {player2} from '../game';

export default class BoardView {
	constructor(board, game, selector) {
		this.boardModel = board;

		this.gameModel = game;

		this.boardSelector = selector;

		this.forbidClick = event => event.stopPropagation();

		this.touchEvent = event => {
			const self = this;
			const coordinateY = event.touches[0].pageY;
			const eventTarget = event.target;

			if(event.target.classList.contains('cards')) {
				this.touchCardStart.notify(event.target);

				event.target.classList.add('touchStartAnim');

				playSoundEffect('.drag-audio')

				function closure() {
					const coordinate = coordinateY;
					const target = eventTarget;

					self.boardSelector.addEventListener('touchend',  function touchEnd (event) {
						const comparison = parseFloat(coordinateY)  - parseFloat(event.changedTouches[0].pageY);

						eventTarget.classList.remove('touchStartAnim');

						playSoundEffect('.card-grab-cancel-audio');

						if(comparison > 170) {
							self.dropEvent.notify()
							self.doCardAction.notify(self.gameModel.playerOneTurn)
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

		// событие на анимацию(подсветку выбора карт)
		this.onAnimCards = new Events;

		// событие на проверку набрали ли игроки карты
		this.submitCardCheckChoose = new Events;

		// навели убрали мышку на карту в руке
		this.cardInHandChoosen = new Events();

		// навели убрали мышку на карту в руке
		this.grabCardStart = new Events();

		this.grabCardEnd = new Events();

		this.preventDrag = new Events();

		this.touchCardStart = new Events();

		//удаляем сыгранную карту
		this.dropEvent = new Events();

		// выполняем действие карты
		this.doCardAction = new Events();

		this.endTurn = new Events();

		this.showPlayerDeck = new Events();

		this.soundOffOn = new Events();

		this.saveGameProgres = new Events();

		this.onRestoreGameData = new Events();

		this.onConcede = new Events();

		this.boardModel.btnAccept.addEventListener('click', () => this.onDefineCards.notify());

		this.boardModel.btnAccept.addEventListener('click', () => this.submitCardCheckChoose.notify());

		// событие клик подстветка выбора карт
		this.boardModel.decWrapper.addEventListener('click', (event) => this.onAnimCards.notify(event.target));

		// показываем карты какие наюрал игрок на этапе выбора
		this.boardModel.battleField.addEventListener('click', (event) => this.showPlayerDeck.notify(event.target));

		this.boardModel.playersDeckClose.addEventListener('click', (event) => this.showPlayerDeck.notify(event.target));

		if("ontouchstart" in window) {
			this.boardModel.cardInHand.addEventListener('touchstart', (event) => this.touchEvent(event));
		} else {
			// анимация карт в руке при наведении
			this.boardModel.cardInHand.addEventListener('mouseover', (event) => this.cardInHandChoosen.notify(event.target, 'focus'));

			this.boardModel.cardInHand.addEventListener('mouseout', (event) => this.cardInHandChoosen.notify(event.target, 'blur'));

			// анимация карт при перетаскивании плюс узнаем какую карту перетавскиваем
			this.boardModel.cardInHand.addEventListener('dragstart', (event) => this.grabCardStart.notify(event.target, 'focus'));

			this.boardModel.cardInHand.addEventListener('dragend', (event) => this.grabCardEnd.notify(event.target, 'blur'));

			// prevent default behavior
			this.boardModel.cardsPlayField.addEventListener('dragenter', (event) => this.preventDrag.notify(event));

			this.boardModel.cardsPlayField.addEventListener('dragover', (event) => this.preventDrag.notify(event));

			// играем карты
			this.boardModel.cardsPlayField.addEventListener('drop', () => {
				this.dropEvent.notify();
				this.doCardAction.notify(this.gameModel.playerOneTurn);
			})
		}

		this.boardModel.endTurn.addEventListener('click', () => this.endTurn.notify());

		this.boardModel.soundOffOn.addEventListener('click', () => this.soundOffOn.notify());

		this.boardModel.menuIcon.addEventListener('click', () => {
			playSoundEffect('.btn-click-audio');
			this.showMenu()
		});

		this.boardModel.menu.addEventListener('click', (event) => this.navigateGame(event.target));

		[...this.boardModel.menu.getElementsByTagName('li')].forEach((button) => {
			button.addEventListener('mouseover', () => playSoundEffect('.btn-hover-audio'));
			button.addEventListener('click', () => playSoundEffect('.btn-click-audio'));
		});

		this.boardSelector.querySelector('.save-progress').addEventListener('click', this.forbidClick);

		this.boardSelector.querySelector('.concede').addEventListener('click', this.forbidClick);

		window.addEventListener('beforeunload', (event) => {
			event.preventDefault();
			event.returnValue = '';
		});


		// подписываемся на событие в модели
		// this.boardModel создала карты надо их отобразить
		this.boardModel.onCreateCards.attach((card, place) => this.drawCards(card, place));

		// модель меняет количество набранных карт отображаем
		this.boardModel.onCounterChange.attach((info) => this.counterUpdate(info));

		// событие this.gameModel проверяет набранны ли у игроков карты
		this.gameModel.selectionEnd.attach(() => this.selectionEndUpdate());

		// событие на удаление лишних карт
		this.boardModel.removeCards.attach((cards, place) => this.extraCardsToRemove(cards, place));

		// событие на отображение инфо кто выбирает карты
		this.gameModel.choosePlayerInfo.attach((text) => this.playerChooseInfoUpdate(text));

		// событие на отображение никнеймов игроков
		this.gameModel.updatePlayersNames.attach((name1, name2) => this.playerNameUpdate(name1, name2));

		// событие на отображение моделек персонажей
		this.gameModel.updatePlayersModels.attach((modelPlayer1, modelPlayer2) => this.playerModelsUpdate(modelPlayer1, modelPlayer2));

		// удаление сыгранной карты
		this.boardModel.removeActionCard.attach((card) => this.deleteActionCard(card));

		this.boardModel.createAnimation.attach((querySelector, amount) => this.createAnimation(querySelector, amount));

		this.boardModel.endTurnAnimation.attach((side) => this.endTurnAnimation(side));

		this.boardModel.notEnoughStamina.attach(() => this.notEnoughStamina());
	}

	// need for start render cards when page is loaded
	init() {
		this.onLoadCreate.notify();
		this.checkRestoreGame();
	};

	drawCards(card, place) {
		switch (place) {
			case 'board':
				this.boardModel.decWrapper.appendChild(card);

				break;
			case 'hand':
				this.boardModel.cardInHand.appendChild(card);

				break;
			case 'overlay':
				this.boardModel.playersDeck.appendChild(card);

				break;
		}

		this.boardModel.cardsChooseCounter.textContent = '0';

		this.boardModel.cardsChooseCounter.style = 'color: white';
	};

	extraCardsToRemove(cards, place) {

		if (place == 'board' && cards.length > 0) {
			for (let i = 0; i < cards.length; i++) {
				this.boardModel.decWrapper.removeChild(cards[i]);
			}
		}

		if (place == 'hand' && cards.length > 0) {
			for (let i = 0; i < cards.length; i++) {
				this.boardModel.cardInHand.removeChild(cards[i]);
			}
		}

		if (place == 'overlay' && cards.length > 0) {
			for (let i = 0; i < cards.length; i++) {
				this.boardModel.playersDeck.removeChild(cards[i]);
			}
		}
	}

	deleteActionCard(card) {
		this.boardModel.cardInHand.removeChild(card);
	}

	counterUpdate(info) {
		this.boardModel.cardsChooseCounter.textContent = info.number;

		this.boardModel.cardsChooseCounter.style = `color: ${info.color}`;
	};

	selectionEndUpdate() {
		this.boardModel.decWrapper.style.display = 'none';

		this.boardModel.battleField.classList.remove('hidden');

		this.boardSelector.querySelector('.players-draw-info').style.display = 'none';
	}

	playerChooseInfoUpdate(text) {
		this.boardSelector.querySelector('.players-draw-info__name').textContent = text;
	}

	playerNameUpdate(name1, name2) {
		this.boardSelector.querySelector('.player-1__name').textContent = name1;

		this.boardSelector.querySelector('.player-2__name').textContent = name2;
	}

	playerModelsUpdate(modelPlayer1, modelPlayer2) {
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

	doConcede() {
		if(this.gameModel.playerOneTurn) {
			this.onConcede.notify('player1');
		} else {
			this.onConcede.notify('player2');
		}
	}

	createAnimation(querySelector, amount) {
		createCardAnim(querySelector, amount);
	}

	endTurnAnimation(side) {
		endTurnAnim(side);
	}

	showMenu() {
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

	navigateGame(eventTarget) {
		switch (eventTarget.className.split(' ')[0]) {
			case 'return-to-main-menu':
				document.title = 'Main menu';
				location.hash = decodeURIComponent('main-menu');

				break;
			case 'return-to-choose-menu':
				document.title = 'Choose menu';
				location.hash = decodeURIComponent('choose-menu');

				break;
			case 'save-progress':
				this.saveGameProgres.notify();

				break;
			case 'concede':
				this.doConcede();

				break;
		}
	}

	checkRestoreGame() {
		const hash = window.location.hash;
		const state = decodeURIComponent(hash.substr(1));
		const overlay = document.querySelector('.players-overlay');
		const overlayClose = document.querySelector('.players-overlay__close');

		if (state === 'restoredGame') {
			overlay.classList.remove('hidden');
			overlay.classList.add('fade-in');
			overlayClose.classList.add('hidden');

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

			overlay.appendChild(divEl);

			this.boardSelector.querySelector('.confirm-continue').addEventListener('click', (event) => this.doContinueDecision(event.target));
		}
	}

	doContinueDecision(eventTarget) {
		const overlay = document.querySelector('.players-overlay');
		const overlayClose = document.querySelector('.players-overlay__close');
		const divEl = document.querySelector('.confirm-continue');

		switch (eventTarget.className) {
			case 'confirm-continue__reject':
				overlay.removeChild(divEl);

				overlay.classList.add('hidden');
				overlayClose.classList.remove('hidden');

				break;
			case 'confirm-continue__accept':
				this.onRestoreGameData.notify();

				break;
		}
	}

	notEnoughStamina() {
		this.gameModel.a
	}

}
