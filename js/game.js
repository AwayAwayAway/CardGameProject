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

	this.start = function() {
		this.init();

		this.setTextChooseInfo();
		// this.createCardsForChoose(this.playersInfo);
	}

	this.init = function() {
		this.setPlayersChoiceInfo('playersInfo');
		this.setPlayersClasses();
		this.setPlayersNames();
		this.setPlayersModels(this.playersInfo.playerOneClass, this.playersInfo.playerTwoClass);

		// playerUI.setActivePassiveClasses();
		// playerUI.setPlayercharacteristic();
	}

	this.setActivePassivePlayer = function() {
		this.activePlayer = player1;
		this.passivePlayer = player2;
	}

	// устанавливаем приоритет хода игрока
	this.setTurnPriority = function() {
		if(this.playerOneTurn) {
			this.playerOneTurn = false;
			this.playerTwoTurn = true;
		} else {
			this.playerOneTurn = true;
			this.playerTwoTurn = false;
		}
	}

	// забираем инфу о выборе игроками персонажей и их никнеймов и парсим json
	this.setPlayersChoiceInfo = function(object) {
		let temp = localStorage.getItem(object);
		let info = JSON.parse(temp);

		this.playersInfo = info;
	}

	// устанавливаем класы игроками из объекта
	this.setPlayersClasses = function() {
		this.playerOneClass = this.playersInfo.playerOneClass;
		this.playerTwoClass = this.playersInfo.playerTwoClass;
	}

	// устанавливаем никнеймы игрокам из объекта
	this.setPlayersNames = function() {
		document.querySelector('.player-1__name').textContent = this.playersInfo.playerOneName;
		document.querySelector('.player-2__name').textContent = this.playersInfo.playerTwoName;
	}

	// устанавливаем модельки игроков согласно выбору
	this.setPlayersModels = function(player1, player2) {
		const player1Model = document.querySelector('.player-1__model');
		const player2Model = document.querySelector('.player-2__model');

		player1Model.type = 'image/svg+xml'
		player2Model.type = 'image/svg+xml'

		switch (player1) {
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

		switch (player2) {
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

	// показываем какой игрок выбирает карты
	this.setTextChooseInfo = function() {
		if(this.playerOneTurn) {
			document.querySelector('.player-name-choosing').textContent = `${this.playersInfo.playerOneName} is choosing`
		} else {
			document.querySelector('.player-name-choosing').textContent = `${this.playersInfo.playerTwoName} is choosing`
		}
	}

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

	// пулим карты выбранные ироком на старте игры в gameControl, этими картами игроки будут играть дальше
	this.definePlayersCardSet = function() {
		let cards = document.querySelectorAll('.cards');

		//счетчик выбранных карт
		let counter = document.getElementsByClassName('card-border').length;
		cardsChooseCounter.textContent = counter;

		let tempCardChoosePlayer = [];

		// если выбрано больше или недобор указанных карт запрещает пулить в переменную
		if (counter < 8 || counter >= 9) { return }

		//пушим карты 1го игрока в массив
		if(this.playerOneTurn) {
			for (let i = 0; i < cards.length; i++) {
				if(cards[i].classList.contains('card-border')) {
					tempCardChoosePlayer.push(cards[i].dataset.info);
				}
			}

			this.playerOnePullOfCards = this.checkOnCards(tempCardChoosePlayer, this.playerOneClass);
		}

		//пушим карты 2го игрока в массив
		if(this.playerTwoTurn) {
			for (let i = 0; i < cards.length; i++) {
				if(cards[i].classList.contains('card-border')) {
					tempCardChoosePlayer.push(cards[i].dataset.info);
				}
			}
			this.playerTwoPullOfCards = this.checkOnCards(tempCardChoosePlayer, this.playerTwoClass);
		}

		//меняем очередность выбора для игроков
		this.setTurnPriority();

		this.checkCardsSelectionEnd();

		cardsChooseCounter.textContent = 0;
	}

	// передаем массив из выбранных согласно ID карты и класс выбранного персонажа для поиска в SkillCollection его типа карт
	this.checkOnCards = function(datainfo, search) {
		let temp = [];
		for(let i = 0; i < skillCollection[search].length; i++) {
			for(let j = 0; j < datainfo.length; j++) {
				if(skillCollection[search][i]['id'] == datainfo[j]) {
					temp.push(skillCollection[search][i]);
				}
			}
		}
		return temp
	}

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

	//проверяем игроки набрали карты скрываем меню выбора карт, открываем игровое поле
	this.checkCardsSelectionEnd = function() {
		if(this.playerOnePullOfCards.length > 1 && this.playerTwoPullOfCards.length > 1) {
			this.pullRandomCardsInHand();
			this.setTurnPriority();
			decWrapper.style.display = 'none';
			document.querySelector('.card-counter').classList.add('hidden');
			battleField.classList.remove('hidden');


			// убираем карты первого игрока в меню выбора и создаем карты второго игрока для выбора
		} else {
			for(let i = 0; i < decWrapper.children.length; i++) {
				decWrapper.removeChild(decWrapper.children[i]);
				i--;
			}

			this.createCardsForChoose(this.playersInfo);
			this.setTextChooseInfo();
		}
	}

	//конец хода меняет инфо о активном игроке и обновляет выносливость
	this.turnEndsNextPlayerTurn = function() {
		if(this.playerOneTurn) {
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
	}
}

function GameController(model, view) {
	this.gameModel = model;
	this.boardView = view;
}