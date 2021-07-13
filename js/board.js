{
	function Board(model) {

		// let boardView = null;
		const gameModel = model;

		this.decWrapper = document.querySelector('.cards-choose-field');        // field for cards at the start when players are choosing
		this.cardsChooseCounter = document.querySelector('.count');             // counter for amount of cards have been chosen(needs for alert)
		this.cardInHand = document.querySelector('.card-in-hand');              // field for cards in hand each player
		this.battleField = document.querySelector('.battle-field');            // play field
		this.endTurn = document.querySelector('.end-of-turn-btn');             // end turn button
		this.cardsPlayField = document.querySelector('.play-field');           // area for cards to drop and play their actions
		this.counter = document.getElementsByClassName('card-border');

		let draggedItem = null;
		let tempCard = null;

		this.onCreateCards = new Events();

		// создаем деку в начале игры для игрока согласно классу
		this.createCardsForChoose = function(playerClassInfo) {
			if(gameModel.playerOneTurn) {
				switch (gameModel.playersInfo.playerOneClass) {
					case 'warrior':
						for(let i = 0; i < skillCollection.warrior.length; i++) {
							this.createDeck( skillCollection.warrior[i] );
						}
						break;
					case 'rogue':
						for(let i = 0; i < skillCollection.rogue.length; i++) {
							this.createDeck( skillCollection.rogue[i] );
						}
						break;
					case 'mage':
						for(let i = 0; i < skillCollection.mage.length; i++) {
							this.createDeck( skillCollection.mage[i] );
						}
						break;
				}
			} else {
				switch (gameModel.playerClassInfo.playerTwoClass) {
					case 'warrior':
						for(let i = 0; i < skillCollection.warrior.length; i++) {
							this.createDeck( skillCollection.warrior[i] );
						}
						break;
					case 'rogue':
						for(let i = 0; i < skillCollection.rogue.length; i++) {
							this.createDeck( skillCollection.rogue[i] );
						}
						break;
					case 'mage':
						for(let i = 0; i < skillCollection.mage.length; i++) {
							this.createDeck( skillCollection.mage[i] );
						}
						break;
				}
			}
		}

		//создает карты доска выбора
		this.createDeck = function(card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.onCreateCards.notify(elDiv)
		}

		//создает карты в руке
		this.createCardsInHand = function(card) {
			let elDiv = document.createElement('div');

			elDiv.setAttribute('class', 'cards-to-play');
			elDiv.setAttribute('data-info', `${card.id}`);
			elDiv.setAttribute('draggable', 'true');
			elDiv.style.backgroundImage = `url(${card.icon})`;

			this.decWrapper.appendChild(elDiv);
		}

		this.pullRandomCardsInHand = function() {
			let tempIndex = [];

			//убираем лишние карты из руки
			for(let i = 0; i < this.cardInHand.children.length; i++) {
				if(this.cardInHand.children[i].classList.contains('cards-to-play')) {
					this.cardInHand.removeChild(cardInHand.children[i]);
					i--;
				}
			}

			//делаем проверку чтобы карты в руке не повторялись
			for(let i = 0; i < 4; i++) {                  // количество карт в руку
				let n = Math.floor(Math.random() * 8);   // количество набранных карт
				if(tempIndex.indexOf(n) == -1) {
					tempIndex.push(n)
				} else {
					i--;
				}
			}

			// создаем карты в руке согласно игрока чей ход
			if(gameModel.playerOneTurn) {
				for(let i = 0; i < tempIndex.length; i++) {
					this.createCardsInHand( this.playerOnePullOfCards[tempIndex[i]] );
				}
			} else {
				for(let i = 0; i < tempIndex.length; i++) {
					this.createCardsInHand( this.playerTwoPullOfCards[tempIndex[i]] );
				}
			}
		}

		this.cardChooseAnim = function(event) {
			let target = event.target;

			if (target !== this.decWrapper) {
				target.classList.toggle('card-border');
			}

			this.cardsChooseCounter.textContent = this.counter.length;

			if (this.counter.length > 8) {
				this.cardsChooseCounter.style = 'color: red';
			} else if (this.counter.length == 8) {
				this.cardsChooseCounter.style = 'color: green';
			} else if (this.counter.length > 0 && this.counter.length < 8){
				this.cardsChooseCounter.style = 'color: cyan';
			} else {
				this.cardsChooseCounter.style = 'color: white';
			}

		}

//анимация выбора только одной карты для игры в руке
		this.cardChooseAnimInHandAdd = function(event) {
			let target = event.target;

			if (target !== this.cardInHand) {
				target.classList.add('card-to-action');
			}
		}

//анимация выбора только одной карты для игры в руке
		this.cardChooseAnimInHandRemove = function(event) {
			let target = event.target;

			if (target !== this.cardInHand) {
				target.classList.remove('card-to-action');
			}
		}
	}


	function BoardView(model, selector) {

		let boardModel = model;
		let boardSelector = selector;

		this.onLoadCreate = new Events;

		this.init = function() {
			this.onLoadCreate.notify();
		}

		boardModel.onCreateCards.attach((card) => this.createCards(card))

		this.createCards = function(card) {
			model.decWrapper.appendChild(card);
		}
	}



	function BoardController(gamemodel, boardmodel, view) {

		let gameModel = gamemodel;
		let boardModel = boardmodel;
		let boardModelView = view;

		if(boardModelView.hasOwnProperty('onLoadCreate')) {
			boardModelView.onLoadCreate.attach(() => this.createCard())
		}

		this.createCard = function () {
			boardModel.createCardsForChoose(gameModel.playersInfo)
		}

	}

}

let boardModel = new Board(gameController);

let boardView = new BoardView(boardModel, document.querySelector('.wrapper-battle'));

let boardController = new BoardController(gameController, boardModel, boardView);

boardView.init();