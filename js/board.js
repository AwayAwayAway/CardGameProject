{
	function Board(model) {

		// let boardView = null;
		const gameModel = model;

		this.decWrapper = document.querySelector('.cards-choose-field');        // field for cards at the start when players are choosing
		this.btnAccept = document.querySelector('.accept');               // player accept cards he chose
		this.cardsChooseCounter = document.querySelector('.count');             // counter for amount of cards have been chosen(needs for alert)
		this.cardInHand = document.querySelector('.card-in-hand');              // field for cards in hand each player
		this.battleField = document.querySelector('.battle-field');            // play field
		this.endTurn = document.querySelector('.end-of-turn-btn');             // end turn button
		this.cardsPlayField = document.querySelector('.play-field');           // area for cards to drop and play their actions

		// создаем событие на создание карт
		this.onCreateCards = new Events();
		this.onCounterChange = new Events();
		this.removeCards = new Events();
		this.removeActionCard = new Events();

		// создаем деку в начале игры для игрока согласно классу
		this.createCardsForChoose = function (playerClassInfo) {
			this.removeExtraCards('board')

			if (gameModel.playerOneTurn) {
				for (let i = 0; i < skillCollection[playerClassInfo.playerOneClass].length; i++) {
					this.createDeck(skillCollection[playerClassInfo.playerOneClass][i]);
				}
			} else {
				for (let i = 0; i < skillCollection[playerClassInfo.playerTwoClass].length; i++) {
					this.createDeck(skillCollection[playerClassInfo.playerTwoClass][i]);
				}
			}
		};

		//создает карты доска выбора
		this.createDeck = function (card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.onCreateCards.notify(elDiv, 'board');
		};

		//создает карты в руке
		this.createCardsInHand = function (card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards-to-play');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.setAttribute('draggable', 'true');
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.onCreateCards.notify(elDiv, 'hand');
		};

		// кидаем карты в руку
		this.pullRandomCardsInHand = function () {

			this.removeExtraCards('hand');

			let tempIndex = [];

			//делаем проверку чтобы карты в руке не повторялись
			for (let i = 0; i < 4; i++) {                  // количество карт в руку
				let n = Math.floor(Math.random() * 8);   // количество набранных карт
				if (tempIndex.indexOf(n) == -1) {
					tempIndex.push(n);
				} else {
					i--;
				}
			}

			// создаем карты в руке согласно игрока чей ход
			if (gameModel.playerOneTurn) {
				for (let i = 0; i < tempIndex.length; i++) {
					this.createCardsInHand(gameModel.playerOnePullOfCards[tempIndex[i]]);
				}
			} else {
				for (let i = 0; i < tempIndex.length; i++) {
					this.createCardsInHand(gameModel.playerTwoPullOfCards[tempIndex[i]]);
				}
			}
		}

		// убираем лишние карты с доски или из руки
		this.removeExtraCards = function (place) {
			let orderToRemove = [];

			switch (place) {
				case 'board':
					orderToRemove = [...this.decWrapper.children];
					break;
				case 'hand':
					orderToRemove = [...this.cardInHand.children];
			}

			this.removeCards.notify(orderToRemove, place);
		}

		//удаляем сыгранные карты из руки с проверкой
		this.deletePlayedCard = function() {
			if(gameModel.tempCard.cost > gameModel.activePlayer.staminaPoints) {
				return
			} else {
				this.removeActionCard.notify(gameModel.dragCard)
			}
		}

		// подсветка выбранных карт
		this.cardChooseAnim = function (eventTarget) {
			let target = eventTarget;

			if (target !== this.decWrapper) {
				target.classList.toggle('card-border');
			}

			let counter = document.getElementsByClassName('card-border').length;

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

			this.onCounterChange.notify(counterInfo);
		};

		//анимация выбора только одной карты для игры в руке
		this.cardChooseAnimInHandAdd = function(eventTarget) {
			let target = eventTarget;

			if (target !== this.cardInHand) {
				target.classList.add('card-to-action');
			}
		}

		//анимация выбора только одной карты для игры в руке
		this.cardChooseAnimInHandRemove = function(eventTarget) {
			let target = eventTarget;

			if (target !== this.cardInHand) {
				target.classList.remove('card-to-action');
			}
		}

		//добавляем стили для перетаскивания
		this.dragCardStart = function(eventTarget) {
			let target = eventTarget;

			if (target !== this.cardInHand) {
				setTimeout(() => target.classList.add('invinsible'), 0);

			}
		}

		//убираем стили для перетаскивания
		this.dragCardEnd = function(eventTarget) {
			let target = eventTarget;

			if (target !== this.cardInHand) {
				target.classList.remove('invinsible');
			}
		}

		this.dragPreventAction = function (event) {
			console.log('dragEnter');
			event.preventDefault();
		}


	}
}

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

{
	function BoardController(gamemodel, boardmodel, view) {

		const gameModel = gamemodel;
		const boardModel = boardmodel;
		const boardView = view;

		if (boardView.hasOwnProperty('onLoadCreate')) {
			boardView.onLoadCreate.attach((card, place) => this.createCard(card, place));
		}

		if (boardView.hasOwnProperty('onAnimCards')) {
			boardView.onAnimCards.attach((event) => this.cardAnimBoard(event));
		}

		if (boardView.hasOwnProperty('cardInHandChoosen')) {
			boardView.cardInHandChoosen.attach((event, state) => this.cardAnimHand(event, state));
		}

		if (boardView.hasOwnProperty('grabCardStart')) {
			boardView.grabCardStart.attach((event, state) => this.grabbedCardAnim(event, state));
		}

		if (boardView.hasOwnProperty('grabCardEnd')) {
			boardView.grabCardEnd.attach((event, state) => this.grabbedCardAnim(event, state));
		}

		if (boardView.hasOwnProperty('preventDrag')) {
			boardView.preventDrag.attach((event) => this.preventDrag(event))
		}

		if (boardView.hasOwnProperty('dropEvent')) {
			boardView.dropEvent.attach(() => this.deleteActionCard());
		}

		if (boardView.hasOwnProperty('endTurn')) {
			boardView.endTurn.attach(() => this.createCardsInHand());
		}

		if (gameModel.hasOwnProperty('selectionContinue')) {
			gameModel.selectionContinue.attach( () => this.createCard())
		}

		if (gameModel.hasOwnProperty('selectionEnd')) {
			gameModel.selectionEnd.attach( () => this.createCardsInHand())
		}



		this.createCard = function () {
			boardModel.createCardsForChoose(gameModel);
		};

		this.cardAnimBoard = function (event) {
			boardModel.cardChooseAnim(event);
		};

		this.cardAnimHand = function (event, state) {
			switch (state) {
				case 'focus':
					boardModel.cardChooseAnimInHandAdd(event);
					break;
				case 'blur':
					boardModel.cardChooseAnimInHandRemove(event);
					break;
			}
		}

		this.createCardsInHand = function () {
			boardModel.pullRandomCardsInHand();
		};

		this.grabbedCardAnim = function (event, state) {
			switch (state) {
				case 'focus':
					boardModel.dragCardStart(event);
					break;
				case 'blur':
					boardModel.dragCardEnd(event);
					break;
			}
		}

		this.preventDrag = function (event) {
			boardModel.dragPreventAction(event);
		}

		this.deleteActionCard = function () {
			boardModel.deletePlayedCard();
		}
	}
}








let boardModel = new Board(gameController1);

let boardView = new BoardView(boardModel, gameController1, document.querySelector('.wrapper-battle'));

let boardController = new BoardController(gameController1, boardModel, boardView);





// gameController1.start();

// boardView.init(true);

// this belongs to game.js refactor later
let gameObserver = new GameController(gameController1);

gameObserver.init(boardView);

