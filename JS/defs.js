//variable for player1 and player2
const player1 = 'O';
const player2 = 'X';

//variable for player and computer
var player;
var computer;

//all classes
let twoPlayerController;

//gameMode
let twoPlayerMode = false;
let singlePlayerMode = false;

//initial State 
let ticTacToeState = ['', '', '',
                      '', '', '',
                      '', '', '',];

//game state
let gameOver = false;
let gameStatus;