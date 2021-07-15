{
	function Game() {
		this.activePlayer = null;               //активный игрок на данный момент кто будет наносить урон
		this.passivePlayer = null;               //пассивный игрок на данный момент кто будет получать урон

		this.playerOneTurn = true;
		this.playerTwoTurn = false;

		this.playerOneClass = null;    // сохраняет класс игрока будем реализовывать выбор скилов под класс
		this.playerTwoClass = null;

		this.playerOnePullOfCards = [];
		this.playerTwoPullOfCards = [];

		this.playersInfo = {};  //info from local storage about choose menu

		this.tempCard = null; // карта которая играется

		// событие выбор карт завершен
		this.selectionEnd = new Events();

		// событие выбор карт продолжается
		this.selectionContinue = new Events();

		// событие изменить кто выбирает карты
		this.choosePlayerInfo = new Events();

		// событие установить никнеймы игрокам
		this.updatePlayersNames = new Events();

		// событие установить модельки персонажей игрокам
		this.updatePlayersModels = new Events();

		this.start = function () {
			this.init();
		}

		this.init = function () {
			this.setPlayersChoiceInfo('playersInfo');
			this.setPlayersClasses();
			this.setPlayersNames();
			this.setPlayersModels();
			this.setTextChooseInfo();
		}

		// забираем инфу о выборе игроками персонажей и их никнеймов и парсим json
		this.setPlayersChoiceInfo = function (object) {
			let temp = localStorage.getItem(object);
			let info = JSON.parse(temp);

			this.playersInfo = info;
		}

		// устанавливаем класы игроками из объекта
		this.setPlayersClasses = function () {
			this.playerOneClass = this.playersInfo.playerOneClass;
			this.playerTwoClass = this.playersInfo.playerTwoClass;
		}

		// устанавливаем никнеймы игрокам из объекта
		this.setPlayersNames = function () {
			this.updatePlayersNames.notify(this.playersInfo.playerOneName, this.playersInfo.playerTwoName);
		}

		// устанавливаем модельки игроков согласно выбору
		this.setPlayersModels = function () {
			this.updatePlayersModels.notify(this.playersInfo.playerOneClass, this.playersInfo.playerTwoClass);
		}

		// показываем какой игрок выбирает карты
		this.setTextChooseInfo = function () {
			if (this.playerOneTurn) {
				this.choosePlayerInfo.notify(`${this.playersInfo.playerOneName} is choosing`);
			} else {
				this.choosePlayerInfo.notify(`${this.playersInfo.playerTwoName} is choosing`);
			}
		}

		// линкуем player1 & player2 в gamemodel (ЗАПУСКАЕТСЯ В PLAYERS MODEL INIT !!!!)
		this.setActivePassivePlayer = function () {
			this.activePlayer = player1;
			this.passivePlayer = player2;
		}

		// устанавливаем приоритет хода игрока
		this.setTurnPriority = function () {
			if (this.playerOneTurn) {
				this.playerOneTurn = false;
				this.playerTwoTurn = true;
			} else {
				this.playerOneTurn = true;
				this.playerTwoTurn = false;
			}
		}

		// пулим карты выбранные ироком на старте игры в gameControl, этими картами игроки будут играть дальше
		this.definePlayersCardSet = function () {
			let cards = document.querySelectorAll('.cards');

			//счетчик выбранных карт
			let counter = document.getElementsByClassName('card-border').length;

			// если выбрано больше или недобор указанных карт запрещает пулить в переменную
			if (counter < 8 || counter >= 9) {
				return;
			}

			let tempCardChoosePlayer = [];

			//пушим карты 1го игрока в массив
			if (this.playerOneTurn) {
				for (let i = 0; i < cards.length; i++) {
					if (cards[i].classList.contains('card-border')) {
						tempCardChoosePlayer.push(cards[i].dataset.info);
					}
				}

				this.playerOnePullOfCards = this.checkOnSelectedCards(tempCardChoosePlayer, this.playerOneClass);
			}

			//пушим карты 2го игрока в массив
			if (this.playerTwoTurn) {
				for (let i = 0; i < cards.length; i++) {
					if (cards[i].classList.contains('card-border')) {
						tempCardChoosePlayer.push(cards[i].dataset.info);
					}
				}
				this.playerTwoPullOfCards = this.checkOnSelectedCards(tempCardChoosePlayer, this.playerTwoClass);
			}

			//меняем очередность выбора для игроков
			this.setTurnPriority();

			this.checkCardsSelectionEnd();

		}

		// передаем массив из выбранных согласно ID карты и класс выбранного персонажа для поиска в SkillCollection его типа карт
		this.checkOnSelectedCards = function (datainfo, search) {
			let temp = [];
			for (let i = 0; i < skillCollection[search].length; i++) {
				for (let j = 0; j < datainfo.length; j++) {
					if (skillCollection[search][i]['id'] == datainfo[j]) {
						temp.push(skillCollection[search][i]);
					}
				}
			}
			return temp;
		}

		//проверяем игроки набрали карты скрываем меню выбора карт, открываем игровое поле
		this.checkCardsSelectionEnd = function () {
			let counter = document.getElementsByClassName('card-border').length;

			// если выбрано больше или недобор указанных карт запрещает пулить в переменную
			if (counter < 8 || counter >= 9) {
				return;
			}

			if (this.playerOnePullOfCards.length > 1 && this.playerTwoPullOfCards.length > 1) {
				this.selectionEnd.notify();

			} else {
				this.selectionContinue.notify();

				this.setTextChooseInfo();
			}
		}

		//узнаем какая карта была взята для игры и сыграна
		this.initActionCard = function(eventTarget) {
			let draggedItem = eventTarget;

			if(this.playerOneTurn) {
				for(let i = 0; i < this.playerOnePullOfCards.length; i++) {
					if(this.playerOnePullOfCards[i].id == draggedItem.dataset.info) {
						this.tempCard = this.playerOnePullOfCards[i];
					}
				}
			} else {
				for(let i = 0; i < this.playerTwoPullOfCards.length; i++) {
					if(this.playerTwoPullOfCards[i].id == draggedItem.dataset.info) {
						this.tempCard = this.playerTwoPullOfCards[i];
					}
				}
			}
		}

		//конец хода меняет инфо о активном игроке и обновляет выносливость
		this.turnEndsNextPlayerTurn = function () {
			if (this.playerOneTurn) {
				this.activePlayer.staminaPoints = 4;
				this.playerOneTurn = false;
				this.playerTwoTurn = true;
				this.activePlayer = player2;
				this.passivePlayer = player1;
			} else {
				this.activePlayer.staminaPoints = 4;
				this.playerOneTurn = true;
				this.playerTwoTurn = false;
				this.activePlayer = player1;
				this.passivePlayer = player2;
			}
		};
	}

	function GameController(model) {
		this.gameModel = model;

		this.init = function (view) {
			this.boardView = view;
		};

		if (boardView.hasOwnProperty('onDefineCards')) {
			boardView.onDefineCards.attach(() => this.defineCards());
		}

		if (boardView.hasOwnProperty('submitCardCheckChoose')) {
			boardView.submitCardCheckChoose.attach(() => this.doCardCheckChoose());
		}

		if (boardView.hasOwnProperty('grabCardStart')) {
			boardView.grabCardStart.attach((eventTarget) => this.actionCard(eventTarget));
		}

		// событие на кнопку подтверждения выбора карт, запоминаем что выбрал в масси
		this.defineCards = function () {
			this.gameModel.definePlayersCardSet();
		}

		// событие на кнопку подтверждения выбора карт, проверяем оба игрока сделали выбор
		this.doCardCheckChoose = function () {
			this.gameModel.checkCardsSelectionEnd();
		}

		this.actionCard = function (eventTarget) {
			this.gameModel.initActionCard(eventTarget)
		}
	}





}

let gameController1 = new Game();

// gameController1.start();


// создаем деку в начале игры для игрока согласно классу
// createCardsForChoose(playerClassInfo) {
// 	if(this.playerOneTurn) {
// 		switch (playerClassInfo.playerOneClass) {
// 			case 'warrior':
// 				for(let i = 0; i < skillCollection.warrior.length; i++) {
// 					this.createDeck( skillCollection.warrior[i] );
// 				}
// 				break;
// 			case 'rogue':
// 				for(let i = 0; i < skillCollection.rogue.length; i++) {
// 					this.createDeck( skillCollection.rogue[i] );
// 				}
// 				break;
// 			case 'mage':
// 				for(let i = 0; i < skillCollection.mage.length; i++) {
// 					this.createDeck( skillCollection.mage[i] );
// 				}
// 				break;
// 		}
// 	} else {
// 		switch (playerClassInfo.playerTwoClass) {
// 			case 'warrior':
// 				for(let i = 0; i < skillCollection.warrior.length; i++) {
// 					this.createDeck( skillCollection.warrior[i] );
// 				}
// 				break;
// 			case 'rogue':
// 				for(let i = 0; i < skillCollection.rogue.length; i++) {
// 					this.createDeck( skillCollection.rogue[i] );
// 				}
// 				break;
// 			case 'mage':
// 				for(let i = 0; i < skillCollection.mage.length; i++) {
// 					this.createDeck( skillCollection.mage[i] );
// 				}
// 				break;
// 		}
// 	}
//
// },

//создает карты доска выбора
// this.createDeck = function(card) {
// 	let elDiv = document.createElement('div');
//
// 	elDiv.setAttribute('class', 'cards');
// 	elDiv.setAttribute('data-info', `${card.id}`);
// 	elDiv.style.backgroundImage = `url(${card.icon})`;
//
// 	decWrapper.appendChild(elDiv);
// }

//создает карты в руке
// this.createCardsInHand = function(card) {
// 	let elDiv = document.createElement('div');
//
// 	elDiv.setAttribute('class', 'cards-to-play');
// 	elDiv.setAttribute('data-info', `${card.id}`);
// 	elDiv.setAttribute('draggable', 'true');
// 	elDiv.style.backgroundImage = `url(${card.icon})`;
//
// 	cardInHand.appendChild(elDiv);
// }

// this.pullRandomCardsInHand = function() {
// 	let tempIndex = [];
//
// 	//убираем лишние карты из руки
// 	for(let i = 0; i < cardInHand.children.length; i++) {
// 		if(cardInHand.children[i].classList.contains('cards-to-play')) {
// 			cardInHand.removeChild(cardInHand.children[i]);
// 			i--;
// 		}
// 	}
//
// 	//делаем проверку чтобы карты в руке не повторялись
// 	for(let i = 0; i < 4; i++) {                  // количество карт в руку
// 		let n = Math.floor(Math.random() * 8);   // количество набранных карт
// 		if(tempIndex.indexOf(n) == -1) {
// 			tempIndex.push(n)
// 		} else {
// 			i--;
// 		}
// 	}
//
// 	// создаем карты в руке согласно игрока чей ход
// 	if(this.playerOneTurn) {
// 		for(let i = 0; i < tempIndex.length; i++) {
// 			this.createCardsInHand( this.playerOnePullOfCards[tempIndex[i]] );
// 		}
// 	} else {
// 		for(let i = 0; i < tempIndex.length; i++) {
// 			this.createCardsInHand( this.playerTwoPullOfCards[tempIndex[i]] );
// 		}
// 	}
// }