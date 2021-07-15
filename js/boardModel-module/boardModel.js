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