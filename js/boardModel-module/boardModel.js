{
	function Board(model) {
		const gameModel = model;

		this.decWrapper = document.querySelector('.cards-choose-field');        // field for cards at the start when players are choosing
		this.btnAccept = document.querySelector('.accept');               // player accept cards he chose
		this.cardsChooseCounter = document.querySelector('.count');             // counter for amount of cards have been chosen(needs for alert)
		this.cardInHand = document.querySelector('.card-in-hand-field');              // field for cards in hand each player
		this.battleField = document.querySelector('.battle-field');            // play field
		this.endTurn = document.querySelector('.end-of-turn-btn');             // end turn button
		this.cardsPlayField = document.querySelector('.play-field');           // area for cards to drop and play their actions

		this.playersOverlay = document.querySelector('.players-overlay');
		this.playersDeck = document.querySelector('.players-overlay__cards');
		this.playersDeckClose = document.querySelector('.overlay__close');

		this.showDeckPlayer1 = document.querySelector('.player-1__pile-of-car');           // возможность в игре посмотреть какие карты ты выбрал
		this.showDeckPlayer2 = document.querySelector('.player-2__pile-of-car');           // возможность в игре посмотреть какие карты ты выбрал

		// создаем событие на создание карт
		this.onCreateCards = new Events();
		this.onCounterChange = new Events();
		this.removeCards = new Events();
		this.removeActionCard = new Events();
		this.openCloseOverlay = new Events()

		// создаем деку в начале игры для игрока согласно классу
		this.createCardsForChoose = function (playerClassInfo) {
			this.removeExtraCards('board');

			if (gameModel.playerOneTurn) {
				for (let i = 0; i < skillCollection[playerClassInfo.playerOneClass].length; i++) {
					this.createCards(skillCollection[playerClassInfo.playerOneClass][i]);
				}
			} else {
				for (let i = 0; i < skillCollection[playerClassInfo.playerTwoClass].length; i++) {
					this.createCards(skillCollection[playerClassInfo.playerTwoClass][i]);
				}
			}
		}

		this.showCardsForPlayers = function (eventTarget) {
			this.removeExtraCards('overlay');

			let target = eventTarget;

			if (target.classList.contains('player-1__pile-of-car')) {

				for (let i = 0; i < gameModel.playerOnePullOfCards.length; i++) {
					this.createCardsInOverlay(gameModel.playerOnePullOfCards[i]);
				}
			}

			if (target.classList.contains('player-2__pile-of-car')) {

				for (let i = 0; i < gameModel.playerTwoPullOfCards.length; i++) {
					this.createCardsInOverlay(gameModel.playerTwoPullOfCards[i]);
				}
			}
		}

		this.openCloseOverlay = function (state) {
			switch (state) {
				case 'open':
					this.playersOverlay.classList.remove('hidden');
					break;
				case 'close':
					this.playersOverlay.classList.add('hidden');
					break;
			}
		}

		//создает карты доска выбора
		this.createCards = function (card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.onCreateCards.notify(elDiv, 'board');
		}

		//создает карты в руке
		this.createCardsInHand = function (card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards-to-play');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.setAttribute('draggable', 'true');
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.onCreateCards.notify(elDiv, 'hand');
		}

		this.createCardsInOverlay = function (card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.onCreateCards.notify(elDiv, 'overlay');
		}

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
					break;
				case 'overlay':
					orderToRemove = [...this.playersDeck.children];
					break;
			}

			this.removeCards.notify(orderToRemove, place);
		}

		//удаляем сыгранные карты из руки с проверкой
		this.deletePlayedCard = function(condition, card) {
			if(gameModel.tempCard.cost > gameModel.activePlayer.staminaPoints) { return }

			switch (condition) {
				case 'playedCard':
					this.removeActionCard.notify(gameModel.dragCard);
					break;
				case 'randomCard':
					this.removeActionCard.notify(card);
					break;
			}
		}

		// подсветка выбранных карт
		this.cardChooseAnim = function (eventTarget) {
			let target = eventTarget;

			if (target !== this.decWrapper) {
				target.classList.toggle('card-to-select');
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

			this.onCounterChange.notify(counterInfo);
		}

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
			event.preventDefault();
		}
	}
}