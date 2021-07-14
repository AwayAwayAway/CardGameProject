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


		let draggedItem = null;
		let tempCard = null;

		// создаем событие на создание карт
		this.onCreateCards = new Events();
		this.onCounterChange = new Events();
		this.removeCards = new Events();

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
	}



	function BoardView(board, game, selector) {

		let boardModel = board;
		let gameModel = game;
		let boardSelector = selector;

		this.onLoadCreate = new Events;

		// событие для gameModel закинуть в масиив выбранные карты
		this.onDefineCards = new Events;

		// событие на анимацию(подсветку выбора карт)
		this.onAnimCards = new Events;

		// событие на проверку набрали ли игроки карты
		this.submitCardCheckChoose = new Events;

		// подписываемся на событие в модели
		// boardModel создала карты надо их отобразить
		boardModel.onCreateCards.attach((card, place) => this.drawCards(card, place));

		// модель меняет количество набранных карт отображаем
		boardModel.onCounterChange.attach((info) => this.counterUpdate(info));

		// событие gameModel проверяет набранны ли у игроков карты
		gameModel.selectionEnd.attach(() => this.selectionEndUpdate());

		// событие на удаление лишних карт
		boardModel.removeCards.attach((cards, place) => this.extraCardsToRemove(cards, place));


		// событие клик кнопки подтверждения выбора карт разсылаем уведомление что событие сработало
		boardModel.btnAccept.addEventListener('click', () => this.onDefineCards.notify());
		boardModel.btnAccept.addEventListener('click', () => this.submitCardCheckChoose.notify());

		// событие клик подстветка выбора карт
		boardModel.decWrapper.addEventListener('click', (event) => this.onAnimCards.notify(event.target));


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
		};

		this.deleteCards = function(card, place) {

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

	}


	function BoardController(gamemodel, boardmodel, view) {

		let gameModel = gamemodel;
		let boardModel = boardmodel;
		let boardModelView = view;

		if (boardModelView.hasOwnProperty('onLoadCreate')) {
			boardModelView.onLoadCreate.attach((card, place) => this.createCard(card, place));
		}

		if (boardModelView.hasOwnProperty('onAnimCards')) {
			boardModelView.onAnimCards.attach((event) => this.cardAnimation(event));
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

		this.cardAnimation = function (event) {
			boardModel.cardChooseAnim(event);
		};

		this.createCardsInHand = function () {
			boardModel.pullRandomCardsInHand();
		};
	}
}

let boardModel = new Board(gameController1);

let boardView = new BoardView(boardModel, gameController1, document.querySelector('.wrapper-battle'));

let boardController = new BoardController(gameController1, boardModel, boardView);

boardView.init(true);

// this belongs to game.js refactor later
let gameObserver = new GameController(gameController1);

gameObserver.init(boardView);