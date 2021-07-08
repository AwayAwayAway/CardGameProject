//
// const tempInfo = localStorage.getItem('playersInfo');
// const playersInfo = JSON.parse(tempInfo)                                    // get info about players nicknames and which character they chose

const btnAccept = document.querySelector('.accept');               // player accept cards he chose
const decWrapper = document.querySelector('.cards-choose-field');      // field for cards at the start when players are choosing
const cardsChooseCounter = document.querySelector('.count');      // counter for amount of cards have been chosen(needs for alert)
const cardInHand = document.querySelector('.card-in-hand');      // field for cards in hand each player
const battleField = document.querySelector('.battle-field');     // play field
const endTurn = document.querySelector('.end-of-turn-btn');     // end turn button
const cardsPlayField = document.querySelector('.play-field');    // area for cards to drop and play their actions
const turnInfo = document.querySelector('.players-action'); // info which turn is now

// const healthBarPlayer1 = document.querySelector('.hp-pl1-bar-inner');  //red line HP player 1
// const healthValuePlayer1 = document.querySelector('.hp-pl1-value');    // value(number) HP player 1
// const defenceValuePlayer1 = document.querySelector('.defence-pl1-value');  // defend(number) value player 1
// const staminaValuePlayer1 = document.querySelector('.stamina-pl1-value');  // stamina(number) value player 1
//
// const healthBarPlayer2 = document.querySelector('.hp-pl2-bar-inner'); //red line HP player 2
// const healthValuePlayer2 = document.querySelector('.hp-pl2-value');  // value(number) HP player 2
// const defenceValuePlayer2 = document.querySelector('.defence-pl2-value');  // defend(number) value player 2
// const staminaValuePlayer2 = document.querySelector('.stamina-pl2-value') ; // stamina(number) value player 2
let playerUI = {
	player1HP: document.querySelector('.player-1__hp-bar-inner'),        // red line HP player 1
	player1HPValue: document.querySelector('.player-1__hp-value'),          // value(number) HP player 1
	player1DefenceValue: document.querySelector('.player-1__defence-value'),    // defend(number) value player 1
	player1StaminaValue: document.querySelector('.player-1__stamina-value'),    // stamina(number) value player 1

	player2HP: document.querySelector('.player-2__hp-bar-inner'),        // red line HP player 2
	player2HPValue: document.querySelector('.player-2__hp-value'),          // value(number) HP player 2
	player2DefenceValue: document.querySelector('.player-2__defence-value'),    // defend(number) value player 2
	player2StaminaValue: document.querySelector('.player-2__stamina-value'),    // stamina(number) value player 2

	// устанавливаем первые параметры здоровье, защита, стамина по умолчанию
	setPlayercharacteristic() {
		this.player1HPValue.textContent = player1.healthPoints;
		this.player1DefenceValue.textContent = player1.defendPoints;
		this.player1StaminaValue.textContent = player1.staminaPoints;
		// this.player1StaminaValue.classList.add('activ');
		// this.player1DefenceValue.classList.add('activDefend');
		// this.player1HP.classList.add('activHPbar');
		// this.player1HPValue.classList.add('activHPvalue');
		//
		this.player2HPValue.textContent = player2.healthPoints;
		this.player2DefenceValue.textContent = player2.defendPoints;
		this.player2StaminaValue.textContent = player2.staminaPoints;
		// this.player2HP.classList.add('passive-HPbar');
		// this.player2HPValue.classList.add('passive-HPval');
		// this.player2DefenceValue.classList.add('passive-Def');
		// gameUI.setActivePassiveClasses()
	},


	//устанавливает классы активного и пассивного игрока, чтобы игра понимала куда наносить урон или добавлять защиту
	setActivePassiveClasses: function() {
		if(gameController.playerTwoTurn) {
			this.player1StaminaValue.textContent = player1.staminaPoints;
			// turnInfo.textContent = `${playersInfo.playerTwoName}'s turn`;

			this.player1StaminaValue.classList.remove('activ');
			this.player1DefenceValue.classList.remove('activDefend');
			this.player1HP.classList.remove('activHPbar');
			this.player1HPValue.classList.remove('activHPvalue');

			this.player2StaminaValue.classList.add('activ');
			this.player2DefenceValue.classList.add('activDefend');
			this.player2HP.classList.add('activHPbar');
			this.player2HPValue.classList.add('activHPvalue');

			this.player1HP.classList.add('passive-HPbar');
			this.player1HPValue.classList.add('passive-HPval');
			this.player1DefenceValue.classList.add('passive-Def');

			this.player2HP.classList.remove('passive-HPbar');
			this.player2HPValue.classList.remove('passive-HPval');
			this.player2DefenceValue.classList.remove('passive-Def');
		} else {
			this.player2StaminaValue.textContent = player2.staminaPoints;
			// turnInfo.textContent = `${playersInfo.playerOneName}'s turn`;

			this.player2StaminaValue.classList.remove('activ');
			this.player2DefenceValue.classList.remove('activDefend');
			this.player2HP.classList.remove('activHPbar');
			this.player2HPValue.classList.remove('activHPvalue');

			this.player1StaminaValue.classList.add('activ');
			this.player1DefenceValue.classList.add('activDefend');
			this.player1HP.classList.add('activHPbar');
			this.player1HPValue.classList.add('activHPvalue');

			this.player2HP.classList.add('passive-HPbar');
			this.player2HPValue.classList.add('passive-HPval');
			this.player2DefenceValue.classList.add('passive-Def');

			this.player1HP.classList.remove('passive-HPbar');
			this.player1HPValue.classList.remove('passive-HPval');
			this.player1DefenceValue.classList.remove('passive-Def');
		}
	}
}

let gameController = {
	gameStarted: true,

	activePlayer: player1,               //активный игрок на данный момент кто будет наносить урон
	passivePlayer: player2,               //пассивный игрок на данный момент кто будет получать урон

	playerOneTurn: true,
	playerTwoTurn: false,

	playerOneClass: null,    // сохраняет класс игрока будем реализовывать выбор скилов под класс
	playerTwoClass: null,

	characterModelCollection: ['./images/Warrior.png', './images/Rogue.png', './images/Mage.png'],

	playerOnePullOfCards: [],
	playerTwoPullOfCards: [],

	playersInfo: {},

	start() {
		this.init();

		this.createCardsForChoose(this.playersInfo);
	},

	init() {
		this.setPlayersChoiceInfo('playersInfo');
		this.setPlayersClasses();
		this.setPlayersNames();
		this.setPlayersModels(this.playersInfo.playerOneClass, this.playersInfo.playerTwoClass);

		playerUI.setActivePassiveClasses();
		playerUI.setPlayercharacteristic();
	},

	// забираем инфу о выборе игроками персонажей и их никнеймов и парсим json
	setPlayersChoiceInfo (object) {
		let temp = localStorage.getItem(object);
		let info = JSON.parse(temp);

		this.playersInfo = info;
	},

	// устанавливаем класы игроками из объекта
	setPlayersClasses() {
		this.playerOneClass = this.playersInfo.playerOneClass;
		this.playerTwoClass = this.playersInfo.playerTwoClass;
	},

	// устанавливаем никнеймы игрокам из объекта
	setPlayersNames() {
		document.querySelector('.player-1__name').textContent = this.playersInfo.playerOneName;
		document.querySelector('.player-2__name').textContent = this.playersInfo.playerTwoName;
	},

	// устанавливаем модельки игроков согласно выбору
	setPlayersModels(player1, player2) {
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
	},

	// создаем деку в начале игры для игрока согласно классу
	createCardsForChoose(playerClassInfo) {
		switch (playerClassInfo.playerOneClass) {
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
	},

	//создает карты доска выбора
	createDeck (card) {
		let elDiv = document.createElement('div');

		elDiv.setAttribute('class', 'cards');
		elDiv.setAttribute('data-info', `${card.id}`);
		elDiv.style.backgroundImage = `url(${card.icon})`;

		decWrapper.appendChild(elDiv);
	},

	//создает карты в руке
	pullCardsInHand (card) {
		let elDiv = document.createElement('div');

		elDiv.setAttribute('class', 'cards-to-play');
		elDiv.setAttribute('data-info', `${card.id}`);
		elDiv.setAttribute('draggable', 'true');
		elDiv.style.backgroundImage = `url(${card.icon})`;

		cardInHand.appendChild(elDiv);
	},

	//конец хода меняет инфо о активном игроке и обновляет выносливость
	turnEndsNextPlayerTurn () {
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
};

gameController.start();

decWrapper.addEventListener('click', cardChooseAnim)
cardInHand.addEventListener('mouseover', cardChooseAnimInHandAdd)
cardInHand.addEventListener('mouseout', cardChooseAnimInHandRemove)
btnAccept.addEventListener('click', pullCard);

//анимация подсветки выбранной карты плюс счетчик сколько набранно карт
function cardChooseAnim(e) {
	let targ = e.target;

	if (targ !== decWrapper) {
		targ.classList.toggle('card-border');
	}

	let counter = document.getElementsByClassName('card-border').length;
	let alertCardChoose = document.querySelector('.card-alert');
	cardsChooseCounter.textContent = counter;

	// if (counter > 8) {
	// 	cardsChooseCounter.style = 'color: red';
	// 	alertCardChoose.classList.add('card-alert-visible')
	// } else if (counter == 8) {
	// 	cardsChooseCounter.style = 'color: green';
	// 	alertCardChoose.classList.remove('card-alert-visible')
	// } else if (counter > 0 && counter < 8){
	// 	cardsChooseCounter.style = 'color: cyan';
	// 	alertCardChoose.classList.remove('card-alert-visible')
	// } else {
	// 	cardsChooseCounter.style = 'color: white';
	// 	alertCardChoose.classList.remove('card-alert-visible')
	// }

}

//анимация выбора только одной карты для игры в руке
function cardChooseAnimInHandAdd(e) {
	let targ = e.target;

	if (targ !== cardInHand) {
		targ.classList.add('card-to-action');
	}
}

//анимация выбора только одной карты для игры в руке
function cardChooseAnimInHandRemove(e) {
	let targ = e.target;

	if (targ !== cardInHand) {
		targ.classList.remove('card-to-action');
	}
}


// START DRAG N DROP PLAY CARDS
// сохраняет какая карта перетягивается
let draggedItem;
// карта передается как аргумент в функции для реализации способности карты
let tempCard;

cardInHand.addEventListener('dragstart', dragCardStart)
cardInHand.addEventListener('dragstart', letFindOut)
cardInHand.addEventListener('dragend', dragCardEnd)

cardsPlayField.addEventListener('dragenter', testDragenter)
cardsPlayField.addEventListener('dragover', testDragover)
cardsPlayField.addEventListener('drop', deletePlayedCard) //сначала этот listener, т.к. есть проверка стоимость карты, текущая выносливость игрока
cardsPlayField.addEventListener('drop', doAction) //если поставить этот listener раньше, он убирает выносливость игрока согласно стоимость карты и мы уже не сможем удалить карту из руки, т.к. не пройдет проверку

//добавляем стили для перетаскивания
function dragCardStart(e) {
	let targ = e.target;

	if (targ !== cardInHand) {
		targ.classList.add('hold');  // может стоит удлаить
		setTimeout(() => targ.classList.add('invinsible'), 0);
		draggedItem = targ;
	}
}

//убираем стили для перетаскивания
function dragCardEnd(e) {
	let targ = e.target;

	if (targ !== cardInHand) {
		targ.classList.remove('hold');   // может стоит удлаить
		targ.classList.remove('invinsible');
	}
}

//обязательные функцияя preventDefault() для события drop, чтобы оно прошло
function testDragenter(e) {
	e.preventDefault();
}

//обязательные функцияя preventDefault() для события drop, чтобы оно прошло
function testDragover(e) {
	e.preventDefault();
}

//узнаем какая карта была взята для игры и сыграна
function letFindOut() {
	if(gameController.playerOneTurn) {
		for(let i = 0; i < gameController.playerOnePullOfCards.length; i++) {
			if(gameController.playerOnePullOfCards[i].id == draggedItem.dataset.info) {
				tempCard = gameController.playerOnePullOfCards[i];
			}
		}
	} else {
		for(let i = 0; i < gameController.playerTwoPullOfCards.length; i++) {
			if(gameController.playerTwoPullOfCards[i].id == draggedItem.dataset.info) {
				tempCard = gameController.playerTwoPullOfCards[i];
			}
		}
	}
}
// END DRAG N DROP PLAY CARDS

// играем карту
function doAction() {
	switch(tempCard.type) {
		case 'attack':
			Players.prototype.standartAttack(tempCard);
			break;
		case 'attackDrawDiscard':
			Players.prototype.attackDrawDiscard(tempCard);
			break;
		case 'attackAddEffect':
			Players.prototype.sideEffectAttack(tempCard);
			break;
		case 'defend':
			Players.prototype.standartDefend(tempCard);
			break;
		case 'defendAddEffect':
			Players.prototype.sideEffectDefend(tempCard);
			break;
		case 'defendDrawDiscard':
			Players.prototype.defendDrawDiscard(tempCard);
			break;
		case 'defendAndAttack':
			Players.prototype.defendWithAttack(tempCard);
	}
}

//удаляем сыгранные карты из руки
function deletePlayedCard() {
	if(tempCard.cost > gameController.activePlayer.staminaPoints) {
		return
	} else {
		cardInHand.removeChild(draggedItem)
	}

}

// END DRAG N DROP PLAY CARDS

// пулим карты выбранные ироком на старте игры в gameControl, этими картами игроки будут играть дальше
function pullCard() {
	let cards = document.querySelectorAll('.cards');

	//счетчик выбранных карт
	let counter = document.getElementsByClassName('card-border').length;
	cardsChooseCounter.textContent = '0';
	cardsChooseCounter.textContent = counter;

	let tempCardChoosePlayer = [];

	// если выбрано больше или недобор указанных карт запрещает пулить в переменную
	if (counter < 8 || counter >= 9) { return }

	//пушим карты 1го игрока в массив
	if(gameController.playerOneTurn) {
		for (let i = 0; i < cards.length; i++) {
			if(cards[i].classList.contains('card-border')) {
				tempCardChoosePlayer.push(cards[i].dataset.info);
			}
		}

		gameController.playerOnePullOfCards = checkOnCards(tempCardChoosePlayer, gameController.playerOneClass);
		// btnAccept.textContent = 'Player 2 choose cards';
	}

	//пушим карты 2го игрока в массив
	if(gameController.playerTwoTurn) {
		for (let i = 0; i < cards.length; i++) {
			if(cards[i].classList.contains('card-border')) {
				tempCardChoosePlayer.push(cards[i].dataset.info);
			}
		}
		gameController.playerTwoPullOfCards = checkOnCards(tempCardChoosePlayer, gameController.playerTwoClass);
	}

	//меняем очередность выбора для игроков
	if(gameController.playerOneTurn) {
		gameController.playerOneTurn = false;
		gameController.playerTwoTurn = true;
	} else {
		gameController.playerOneTurn = true;
		gameController.playerTwoTurn = false;
	}

	//скрываем меню выбора карт по завершению выбора игроками открываем игровое поле и кладем карты в руку первого игрока
	if(gameController.playerOnePullOfCards.length > 1 && gameController.playerTwoPullOfCards.length > 1) {
		pullRandomCardsInHand();
		decWrapper.style.display = 'none';
		document.querySelector('.card-counter').classList.add('hidden');
		battleField.classList.remove('hidden');

		// убираем карты первого игрока в меню выбора и создаем карты второго игрока для выбора
	} else {
		for(let i = 0; i < decWrapper.children.length; i++) {
			decWrapper.removeChild(decWrapper.children[i]);
			i--;
		}

		gameController.createCardsForChoose(gameController.playersInfo);
	}
}

// создаем деку в начале игры для первого игрока согласно классу
// function createCardsForPlayer1() {
// 	if(playersInfo.playerOneChoice == 0) {
// 		for(let i = 0; i < skillCollection.warrior.length; i++) {
// 			gameController.createDeck( skillCollection.warrior[i] );
// 		}
// 	} else if(playersInfo.playerOneChoice == 1) {
// 		for(let i = 0; i < skillCollection.rogue.length; i++) {
// 			gameController.createDeck( skillCollection.rogue[i] );
// 		}
// 	} else {
// 		for(let i = 0; i < skillCollection.mage.length; i++) {
// 			gameController.createDeck( skillCollection.mage[i] );
// 		}
// 	}
// }

// создаем деку в начале игры для второго игрока согласно классу
// function createCardsForPlayer2() {
// 	if(playersInfo.playerTwoChoice == 0) {
// 		for(let i = 0; i < skillCollection.warrior.length; i++) {
// 			// skillCollection.warrior[i].createDeck()
// 			gameController.createDeck( skillCollection.warrior[i] );
// 		}
// 	} else if(playersInfo.playerTwoChoice == 1){
// 		for(let i = 0; i < skillCollection.rogue.length; i++) {
// 			// skillCollection.rogue[i].createDeck()
// 			gameController.createDeck( skillCollection.rogue[i] );
// 		}
// 	} else {
// 		for(let i = 0; i < skillCollection.mage.length; i++) {
// 			// skillCollection.rogue[i].createDeck()
// 			gameController.createDeck( skillCollection.mage[i] );
// 		}
// 	}
// }

// function createCardsForChoose(playerClassInfo) {
// 	switch (playerClassInfo.playerOneChoice) {
// 		case '0':
// 			for(let i = 0; i < skillCollection.warrior.length; i++) {
// 				gameController.createDeck( skillCollection.warrior[i] );
// 			}
// 			break;
// 		case '1':
// 			for(let i = 0; i < skillCollection.rogue.length; i++) {
// 				gameController.createDeck( skillCollection.rogue[i] );
// 			}
// 			break;
// 		case '2':
// 			for(let i = 0; i < skillCollection.mage.length; i++) {
// 				gameController.createDeck( skillCollection.mage[i] );
// 			}
// 			break;
// 	}
// }


// сетаем классы игроков для выбора карт в начале для удобства выбора карт
// function setPlayersClasses() {
// 	switch (playersInfo.playerOneChoice) {
// 		case "0":
// 			gameController.playerOneClass = 'warrior';
// 			break;
// 		case "1":
// 			gameController.playerOneClass = 'rogue';
// 			break;
// 		case "2":
// 			gameController.playerOneClass = 'mage';
// 			break;
// 	}
// 	switch (playersInfo.playerTwoChoice) {
// 		case "0":
// 			gameController.playerTwoClass = 'warrior';
// 			break;
// 		case "1":
// 			gameController.playerTwoClass = 'rogue';
// 			break;
// 		case "2":
// 			gameController.playerTwoClass = 'mage';
// 			break;
// 	}
// }

// рефактор для пуша выбранных карт в gamecontrol
// передаем массив из выбранных согласно ID карты и класс выбранного персонажа для поиска в SkillCollection его типа карт
function checkOnCards(datainfo, search) {
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

//первоначальная страница загружаем карты, устанавливаем ники, устанавливаем модельки
if(gameController.gameStarted) {
	// document.addEventListener('DOMContentLoaded', createCardsForPlayer1() );
	// document.addEventListener('DOMContentLoaded', setPlayersClasses() );
	document.addEventListener('DOMContentLoaded', function() {
		document.querySelector('.player1Name').textContent = playersInfo.playerOneName;
		document.querySelector('.player2Name').textContent = playersInfo.playerTwoName;
		turnInfo.textContent = `${playersInfo.playerOneName}'s turn`;
	} );
	document.addEventListener('DOMContentLoaded', function() {
		document.querySelector('.player-1__model').src = gameController.characterModelCollection[playersInfo.playerOneCharacter];
		document.querySelector('.player-2__model').src = gameController.characterModelCollection[playersInfo.playerTwoCharacter];
	} );
	document.addEventListener('DOMContentLoaded', function() {
		playerUI.player1HPValue.textContent = player1.healthPoints;
		playerUI.player1DefenceValue.textContent = player1.defendPoints;
		playerUI.player1StaminaValue.textContent = player1.staminaPoints;
		playerUI.player1StaminaValue.classList.add('activ');
		playerUI.player1DefenceValue.classList.add('activDefend');
		playerUI.player1HP.classList.add('activHPbar');
		playerUI.player1HPValue.classList.add('activHPvalue');
		//
		playerUI.player2HPValue.textContent = player2.healthPoints;
		playerUI.player2DefenceValue.textContent = player2.defendPoints;
		playerUI.player2StaminaValue.textContent = player2.staminaPoints;
		playerUI.player2HP.classList.add('passive-HPbar');
		playerUI.player2HPValue.classList.add('passive-HPval');
		playerUI.player2DefenceValue.classList.add('passive-Def');
		// gameUI.setActivePassiveClasses()
	} );
}

endTurn.addEventListener('click', EndTurn)
endTurn.addEventListener('click', pullRandomCardsInHand)

//обновляет стамину и меняет кнопку действия игрока
function EndTurn() {
	gameController.turnEndsNextPlayerTurn();
	playerUI.setActivePassiveClasses();
}

//кладем случайные карты в руку после каждого завершения кода
function pullRandomCardsInHand() {
	let tempIndex = [];

	//убираем лишние карты из руки
	for(let i = 0; i < cardInHand.children.length; i++) {
		if(cardInHand.children[i].classList.contains('cards-to-play')) {
			cardInHand.removeChild(cardInHand.children[i]);
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
	if(gameController.playerOneTurn) {
		for(let i = 0; i < tempIndex.length; i++) {
			gameController.pullCardsInHand( gameController.playerOnePullOfCards[tempIndex[i]] );
		}
	} else {
		for(let i = 0; i < tempIndex.length; i++) {
			gameController.pullCardsInHand( gameController.playerTwoPullOfCards[tempIndex[i]] );
		}
	}

}


//observer//  START Наблюдает за изменениями игрока и показывает кто выйграет
const player1HPstatus = document.querySelector('.player-1__hp')
const player2HPstatus = document.querySelector('.player-2__hp')
const observer = new MutationObserver(endGame);

function endGame(mutations) {
	if(mutations[0]['target'].classList.contains('hp-pl1-value') && mutations[0].target.childNodes[0].data <= 0) {
		document.querySelector('.player-2__name').textContent = 'Chicken';
		cardInHand.classList.add('hidden')
	}
	if (mutations[0]['target'].classList.contains('hp-pl2-value') && mutations[0].target.childNodes[0].data <= 0) {
		document.querySelector('.player-1__name').textContent = 'Chicken';
		cardInHand.classList.add('hidden')
	}
}

observer.observe(player1HPstatus, {
	childList: true,
	subtree: true,
	characterData: true
})
observer.observe(player2HPstatus, {
	childList: true,
	subtree: true,
	characterData: true
})
//observer//  END Наблюдает за изменениями игрока и показывает кто выйграет



















