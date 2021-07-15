{
	function BoardView(board, game, selector) {

		const boardModel = board;
		const gameModel = game;
		const boardSelector = selector;

		this.onLoadCreate = new Events;

		// событие для gameModel закинуть в масиив выбранные карты
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

		// подписываемся на событие в модели
		// boardModel создала карты надо их отобразить
		boardModel.onCreateCards.attach((card, place) => this.drawCards(card, place));

		// модель меняет количество набранных карт отображаем
		boardModel.onCounterChange.attach((info) => this.counterUpdate(info));

		// событие gameModel проверяет набранны ли у игроков карты
		gameModel.selectionEnd.attach(() => this.selectionEndUpdate());

		// событие на удаление лишних карт
		boardModel.removeCards.attach((cards, place) => this.extraCardsToRemove(cards, place));

		// событие на отображение инфо кто выбирает карты
		gameModel.choosePlayerInfo.attach((text) => this.playerChooseInfoUpdate(text));

		// событие на отображение никнеймов игроков
		gameModel.updatePlayersNames.attach((name1, name2) => this.playerNameUpdate(name1, name2));

		// событие на отображение моделек персонажей
		gameModel.updatePlayersModels.attach((modelPlayer1, modelPlayer2) => this.playerModelsUpdate(modelPlayer1, modelPlayer2));

		//preventDefault
		gameModel.updatePlayersModels.attach((modelPlayer1, modelPlayer2) => this.playerModelsUpdate(modelPlayer1, modelPlayer2));

		// удаление сыгранной карты
		boardModel.removeActionCard.attach((card) => this.deleteActionCard(card));

		// событие клик кнопки подтверждения выбора карт разсылаем уведомление что событие сработало
		boardModel.btnAccept.addEventListener('click', () => this.onDefineCards.notify());
		boardModel.btnAccept.addEventListener('click', () => this.submitCardCheckChoose.notify());

		// событие клик подстветка выбора карт
		boardModel.decWrapper.addEventListener('click', (event) => this.onAnimCards.notify(event.target));

		// анимация карт в руке при наведении
		boardModel.cardInHand.addEventListener('mouseover', (event) => this.cardInHandChoosen.notify( event.target, 'focus' ))
		boardModel.cardInHand.addEventListener('mouseout', (event) => this.cardInHandChoosen.notify( event.target, 'blur' ))

		// анимация карт при перетаскивании плюс узнаем какую карту перетавскиваем
		boardModel.cardInHand.addEventListener('dragstart', (event) => this.grabCardStart.notify( event.target, 'focus' ))
		boardModel.cardInHand.addEventListener('dragend', (event) => this.grabCardEnd.notify( event.target, 'blur' ))

		// prevent default behavior
		boardModel.cardsPlayField.addEventListener('dragenter', (event) => this.preventDrag.notify(event) )
		boardModel.cardsPlayField.addEventListener('dragover', (event) => this.preventDrag.notify(event) )

		// играем карты
		boardModel.cardsPlayField.addEventListener('drop', () => this.dropEvent.notify() )
		boardModel.cardsPlayField.addEventListener('drop', () => this.doCardAction.notify() )

		boardModel.endTurn.addEventListener('click', () => this.endTurn.notify() )



		// need for start render cards when page is loaded
		this.init = function () {
			this.onLoadCreate.notify();
		};

		this.drawCards = function (card, place) {
			switch (place) {
				case 'board':
					boardModel.decWrapper.appendChild(card);
					break;
				case 'hand':
					boardModel.cardInHand.appendChild(card);
					break;
			}

			boardModel.cardsChooseCounter.textContent = 0;
			boardModel.cardsChooseCounter.style = 'color: white';
		};

		this.extraCardsToRemove = function (cards, place) {

			if (place == 'board' && cards.length > 0) {
				for (let i = 0; i < cards.length; i++) {
					boardModel.decWrapper.removeChild(cards[i]);
				}
			}

			if (place == 'hand' && cards.length > 0) {
				for (let i = 0; i < cards.length; i++) {
					boardModel.cardInHand.removeChild(cards[i]);
				}
			}
		}

		this.deleteActionCard = function(card) {
			boardModel.cardInHand.removeChild(card);
		}

		this.counterUpdate = function (info) {
			boardModel.cardsChooseCounter.textContent = info.number;
			boardModel.cardsChooseCounter.style = `color: ${info.color}`;
		};

		this.selectionEndUpdate = function () {
			boardModel.decWrapper.style.display = 'none';
			boardModel.battleField.classList.remove('hidden');
			boardSelector.querySelector('.card-counter').classList.add('hidden');
			boardSelector.querySelector('.card-counter').style.display = 'none';
		}

		this.playerChooseInfoUpdate = function (text) {
			selector.querySelector('.player-name-choosing').textContent = text;
		}

		this.playerNameUpdate = function (name1, name2) {
			selector.querySelector('.player-1__name').textContent = name1;
			selector.querySelector('.player-2__name').textContent = name2;
		}

		this.playerModelsUpdate = function (modelPlayer1, modelPlayer2) {
			const player1Model = selector.querySelector('.player-1__model');
			const player2Model = selector.querySelector('.player-2__model');

			player1Model.type = 'image/svg+xml'
			player2Model.type = 'image/svg+xml'

			switch (modelPlayer1) {
				case 'warrior':
					player1Model.data = 'css/images/models/viking.svg';
					break;
				case 'rogue':
					player1Model.data = 'css/images/models/rogue.svg';
					break;
				case 'mage':
					player1Model.data = 'css/images/models/mage.svg';
					break;
				default:
					console.log('models not found');
			}

			switch (modelPlayer2) {
				case 'warrior':
					player2Model.data = 'css/images/models/viking.svg';
					break;
				case 'rogue':
					player2Model.data = 'css/images/models/rogue.svg';
					break;
				case 'mage':
					player2Model.data = 'css/images/models/mage.svg';
					break;
				default:
					console.log('models not found');
			}
		}



	}
}