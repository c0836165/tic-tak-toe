/* we will start with the declaring some variable */
const statusDisplay = document.querySelector('.status');
const crosswin = document.querySelector('.Xwon');
const zerowin = document.querySelector('.zerowon');



/* we will declare the variable to keep track of 
the game status throught the game
also, we will use this element to pause the game in situation any of the player win or game will be draw  */
let gameActive = true;
let count = 0;
let c = 0;

let currentPlayer = "X";

/* initial and after reset gmaestate will be */

let gameState = ["", "", "", "", "", "", "", "", ""];

/* now we will declare some function */
const winningMessage = () => `PLAYER ${currentPlayer} HAS WON THE GAME .`;
const draw = () => `GAME HAS ENDED DRAW .`;
const currentPlayerTurn = () => `NOW , IT'S ${currentPlayer}'S TURN .`;
const countWin = () => ` X won ${count} times`;
const zeroWin = () => ` O won ${c} times`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/* we  have set the function in H2 header */
statusDisplay.innerHTML = currentPlayerTurn();

/* now we will ad our event listner for all the attributes in the game  */

function handleCellPlayed(clickedCell, clickedCellIndex) {

    /* in this function we will reflate the  updated gamestate and player turn */

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        if (currentPlayer == "X") {
            count = count + 1;
            console.log(' X  won  the number of match . ' + count);
            crosswin.innerHTML = countWin();
        } else {
            c = c + 1;
            console.log(' 0  won  the number of match . ' + c);
            zerowin.innerHTML = zeroWin();

        }

        gameActive = false;
        return;
    }
    /* 
    We will check weather there are any values in our game state array 
    that are still not populated with a player sign
    */
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    /*
    If we get to here we know that the no one won the game yet, 
    and that there are still moves to be played, so we continue by changing the current player.
    */
    handlePlayerChange();

}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleCellClicked(clickedCellEvent) {


    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}

function handleResetGame() {
    alert(' game is done');
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");

}

function handleNewGame() {
    alert(' REALLY !! DO YOU WANT TO START NEW GAME ?');
    gameActive = true;
    count = 0;
    c = 0;
    zerowin.innerHTML = zeroWin();
    crosswin.innerHTML = countWin();
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");

}

document.querySelector('.restart').addEventListener('click', handleResetGame);
document.querySelector('.reagain').addEventListener('click', handleNewGame);
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClicked));