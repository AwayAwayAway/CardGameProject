import Game from './modules/gameModel';
import Board from './modules/boardModel';
import BoardView from './modules/boardView';
import GameController from './modules/gameController';
import Players from './modules/playerModel';
import PlayersView from './modules/playerView';
import PlayersController from './modules/playerController';
import BoardController from './modules/boardController';
import {allowSaveConcede, endGame} from './modules/observerModel';

const gameObserver = new Game();

const boardModel = new Board(gameObserver);

const boardView = new BoardView(boardModel, gameObserver, document.querySelector('.wrapper-battle'));

const gameController = new GameController(gameObserver, boardView);

const player1 = new Players(gameObserver, boardModel);

const player2 = new Players(gameObserver, boardModel);

const playersView = new PlayersView(player1, player2, gameObserver, document.querySelector('.wrapper-battle'));

const playersController = new PlayersController(player1, player2, boardView, playersView);

const boardController = new BoardController(gameObserver, boardModel, player1, player2, boardView);

const winConditionObserver = new MutationObserver(endGame);

const saveConcedeConditionObserver = new MutationObserver(allowSaveConcede);

gameObserver.start();

winConditionObserver.observe(playersView.playerOneHPValue, {
	childList: true,
	subtree: true,
	characterData: true
});

winConditionObserver.observe(playersView.playerTwoHPValue, {
	childList: true,
	subtree: true,
	characterData: true
});

saveConcedeConditionObserver.observe(boardView.battleField, {
	attributes: true
});

export {gameObserver, boardModel, boardView, player1, player2};
