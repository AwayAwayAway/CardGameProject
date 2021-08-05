import Events from './eventsModel';

export default class BoardView {
	constructor(board, game, selector) {
		this.boardModel = board;
		this.gameModel = game;
		this.boardSelector = selector;

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

		//удаляем сыгранную карту
		this.dropEvent = new Events();

		// выполняем действие карты
		this.doCardAction = new Events();

		this.endTurn = new Events();

		this.showPlayerDeck = new Events();

		this.soundOffOn = new Events();

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

		// this.boardModel.cardsCreated.attach((querySelector, amount) => this.createCardAnim(querySelector, amount));

		// событие клик кнопки подтверждения выбора карт разсылаем уведомление что событие сработало
		this.boardModel.btnAccept.addEventListener('click', () => this.onDefineCards.notify());
		this.boardModel.btnAccept.addEventListener('click', () => this.submitCardCheckChoose.notify());

		// событие клик подстветка выбора карт
		this.boardModel.decWrapper.addEventListener('click', (event) => this.onAnimCards.notify(event.target));

		// показываем карты какие наюрал игрок на этапе выбора
		this.boardModel.battleField.addEventListener('click', (event) => this.showPlayerDeck.notify(event.target));
		this.boardModel.playersDeckClose.addEventListener('click', (event) => this.showPlayerDeck.notify(event.target));

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
		this.boardModel.cardsPlayField.addEventListener('drop', () => this.dropEvent.notify());
		this.boardModel.cardsPlayField.addEventListener('drop', () => this.doCardAction.notify(this.gameModel.playerOneTurn));

		this.boardModel.endTurn.addEventListener('click', () => this.endTurn.notify());

		this.boardModel.soundOffOn.addEventListener('click', () => this.soundOffOn.notify());

	}

	// need for start render cards when page is loaded
	init() {
		this.onLoadCreate.notify();
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

		this.boardModel.cardsChooseCounter.textContent = 0;
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
		this.boardSelector.querySelector('.card-counter').classList.add('hidden');
		this.boardSelector.querySelector('.card-counter').style.display = 'none';
	}

	playerChooseInfoUpdate(text) {
		this.boardSelector.querySelector('.player-name-choosing').textContent = text;
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

	// createCardAnim(querySelector, amount) {
	// 	let elementAnim = document.querySelector(querySelector);
	//
	// 	switch (amount) {
	// 		case 'single':
	// 			for(let i = 0; i < elementAnim.length; i++) {
	// 				if(elementAnim.children[i].classList.contains('cardsDrawAnim')) {
	// 					continue;
	// 				} else {
	// 					elementAnim.children[i].classList.add('cardsDrawAnim')
	// 				}
	// 			}
	// 			break;
	// 		case 'multiple':
	// 			[...elementAnim.children].forEach((element, index) => setTimeout(() => element.classList.add('cardsDrawAnim'), 300 * index));
	// 			break;
	// 	}
	// }
}
