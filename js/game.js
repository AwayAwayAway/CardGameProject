import Game from './modules/gameModel';
import Board from './modules/boardModel';
import BoardView from './modules/boardView';
import GameController from './modules/gameController';
import Players from './modules/playerModel';
import PlayersView from './modules/playerView';
import PlayersController from './modules/playerController';
import BoardController from './modules/boardController';


// #TODO: babel webpack
export const gameObserver = new Game();

export const boardModel = new Board(gameObserver);
const boardView = new BoardView(boardModel, gameObserver, document.querySelector('.wrapper-battle'));
const gameController = new GameController(gameObserver, boardView);

export const player1 = new Players(gameObserver, boardModel);
export const player2 = new Players(gameObserver, boardModel);
const playersView = new PlayersView(player1, player2, document.querySelector('.wrapper-battle'));
const playerController = new PlayersController(player1, boardView);

const boardController = new BoardController(gameObserver, boardModel, player1, player2, boardView);

// gameObserver.init(boardView);

player1.init();
player2.init();

gameObserver.start();
boardView.init();
