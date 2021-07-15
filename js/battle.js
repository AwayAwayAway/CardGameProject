const gameObserver = new Game();

const player1 = new Players(gameObserver);
const player2 = new Players(gameObserver);
const playersView = new PlayersView(player1, player2, document.querySelector('.wrapper-battle'));

const boardModel = new Board(gameObserver);
const boardView = new BoardView(boardModel, gameObserver, document.querySelector('.wrapper-battle'));
const boardController = new BoardController(gameObserver, boardModel, boardView);

const gameController = new GameController(gameObserver, boardView);
const playerController = new PlayersController(player1, boardView);

gameObserver.init(boardView);

player1.init();
player2.init();

gameObserver.start();
boardView.init();
