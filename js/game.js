import Game from './modules/gameModel';
import Board from './modules/boardModel';
import BoardView from './modules/boardView';
import GameController from './modules/gameController';
import Players from './modules/playerModel';
import PlayersView from './modules/playerView';
import PlayersController from './modules/playerController';
import BoardController from './modules/boardController';
import {allowSaveConcede, battleground, endGame, player1HPstatus, player2HPstatus} from './modules/observerModel';

export const gameObserver = new Game();

export const boardModel = new Board(gameObserver);

export const boardView = new BoardView(boardModel, gameObserver, document.querySelector('.wrapper-battle'));

const gameController = new GameController(gameObserver, boardView);

export const player1 = new Players(gameObserver, boardModel);

export const player2 = new Players(gameObserver, boardModel);

const playersView = new PlayersView(player1, player2, gameObserver, document.querySelector('.wrapper-battle'));

const playersController = new PlayersController(player1, player2, boardView, playersView);

const boardController = new BoardController(gameObserver, boardModel, player1, player2, boardView);

const winConditionObserver = new MutationObserver(endGame);

const saveConcedeConditionObserver = new MutationObserver(allowSaveConcede);

gameObserver.start();

boardView.init();

winConditionObserver.observe(player1HPstatus, {
	childList: true,
	subtree: true,
	characterData: true
});

winConditionObserver.observe(player2HPstatus, {
	childList: true,
	subtree: true,
	characterData: true
});

saveConcedeConditionObserver.observe(battleground, {
	attributes: true
});
