const boardContainer = document.querySelector(".board");

const ticTacToe = (function() {
    const board = [];

    // Populates the board with 9 empty spaces
    for (let i = 0; i < 9; i++) {
        board.push(" ");
    }

    const signatures = ["X", "O"];    
    let turns = 9;

    // Generates board on screen
    const generateBoard = () => {
        for (let i = 0; i < 9; i++) {
            const space = document.createElement("div");
            space.className = "box";
            space.id = i;
            boardContainer.appendChild(space);
        }
    }

    // Returns an array of available moves
    const availableMoves = () => {
        const moves = [];
        let counter = 0;

        for (space of board) {
            if (!signatures.includes(space)) {
                moves.push(counter);
            }
            counter++;
        }

        return moves;
    }
    
    // Acts as a mechanism via which players make different moves
    const makeMove = (player, position) => {
        if (availableMoves().includes(position)) {
            board[position] = player.letter;
            return true;
        }
        return false;
    }

    // Checks if there is a winner by relying on the current state of the board
    const winner = () => {
        const [x, o] = signatures;

        // Checking rows
        rows = [];

        // Populates rows array by splitting the board into it's rows as arrays
        for (let i = 0; i < 3; i++) {
            rows.push(board.slice(i * 3, (i + 1) * 3));
        }

        // Checks if a player has won off of the state of each row
        for (row of rows) {
            if (row.every(item => item == x)) {
                return x; 
            } else if (row.every(item => item == o)) {
                return o;
            }
        }

        // Checks if a player has won by using the current state of each column
        for (let i = 0; i < 3; i++) {
            if (board[i] == x && board[i+3] == x && board[i+6] == x) {
                return x;
            } else if (board[i] == o && board[i+3] == o && board[i+6] == o) {
                return o;
            } 
        }

        // Checking diagonals
        firstDiagonalIndices = [0, 4, 8];
        firstDiagonal = [];
        for (index of firstDiagonalIndices) {
            firstDiagonal.push(board[index])
        }
        
        // Checks if the a player has won via the left to right diagonal i.e. positions [0, 4, 8]
        if (firstDiagonal.every(item => item == x)) {
            return x;
        } else if (firstDiagonal.every(item => item == o)) {
            return o;
        }

        secondDiagonalIndices = [2, 4, 6];
        secondDiagonal = [];
        for (index of secondDiagonalIndices) {
            secondDiagonal.push(board[index])
            
        }

        // Checks if the a player has won via the right to left diagonal i.e. positions [2, 4, 6]
        if (secondDiagonal.every(item => item == x)) {
            return x;
        } else if (secondDiagonal.every(item => item == o)) {
            return o;
        }

        return "";
    }

    // Resets to the board to it's default state with 9 empty spaces
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = " ";
        }
    }

    return {turns, signatures, generateBoard, makeMove, winner, availableMoves, resetBoard};
})();


// const input = require("prompt-sync")();

// Creates a human player object when called
function humanPlayer(letter) {
    const valid_letters = ["X", "O"];
    if (!valid_letters.includes(letter)) {
        console.log("Invalid letter!");
        return;
    }

    // Allows player to select which move to play
    const getMove = (position) => {
        return parseInt(position.id);
    }


    return {letter, getMove};
}


// setting buttons
const twoPlayerBtn = document.querySelector("#two-player");
const onePlayerBtn = document.querySelector("#one-player");
const clearBtn = document.querySelector("#clear-btn");
const winner = document.querySelector(".winner");

// Player markers
const playerOneMarker = document.querySelector(".turns #player-x");
const playerTwoMarker = document.querySelector(".turns #player-o");

// Switches between player markers to visually indicate which player's turn it is
function switchPlayerMarker(markerOne, markerTwo) {
    const secondStyling = markerTwo.style.borderBottom;
    markerTwo.style.borderBottom = markerOne.style.borderBottom;
    markerOne.style.borderBottom = secondStyling;
}


// // Creates a computer player when called
// const randomComputerPlayer = function(letter) {
    
//     // Genereates a move for computer to make via the length of the list of available moves
//     const getMove = () => {
//         const move = Math.ceil((Math.random() * ticTacToe.availableMoves().length) + 1); 
//         console.log(`${letter} makes move on ${move}`);
//         return move;
//     }
//     return {letter, getMove}
// };

ticTacToe.generateBoard();

// Changes the a button when give "h" as a flag and resets the color properties when give "r"
function modifyColor(button, flag) {
    if (flag == "h") {
        button.style.backgroundColor = "black";
        button.style.color = "white";              
    } 

    if (flag == "r") {
        button.style.backgroundColor = "";
        button.style.color = "";              
    }
}

// Is called when the user wishes to player against another human
function playHuman(event) {
    const playerOne = humanPlayer("X");
    const playerTwo = humanPlayer("O");

    const target = event.target;

    // Switch between playerOne and playerTwo
    if (ticTacToe.turns % 2 == 0) {    
        switchPlayerMarker(playerOneMarker, playerTwoMarker);

        if (ticTacToe.makeMove(playerTwo, playerTwo.getMove(target))) {
            target.innerText = playerTwo.letter;
            ticTacToe.turns--;
        } 

    } else {        
        switchPlayerMarker(playerOneMarker, playerTwoMarker);

        if (ticTacToe.makeMove(playerOne, playerOne.getMove(target))) {
            target.innerText = playerOne.letter;
            ticTacToe.turns--;
        }
    } 

    // Displays winner if there is one
    let isWinner = ticTacToe.winner();
    if (isWinner) {
        winner.innerText = `${isWinner}'s wins!`;   
        modifyColor(twoPlayerBtn, "r");
    } 

    // Informations the players that it's a tie if there is no winner
    if (ticTacToe.turns == 0) {
        winner.innerText = "It's a tie!"         
        modifyColor(twoPlayerBtn, "r");
    } 
} 

// Adds the functionality of completely resetting the game if the user clicks the clear board function
clearBtn.addEventListener("click", () => {
    const spaces = document.querySelectorAll(".box");
    spaces.forEach((space) => {
        space.innerText = "";
    });

    ticTacToe.turns = 9;
    ticTacToe.resetBoard();
    winner.innerText = "";

    playerOneMarker.style.borderBottom = ".25rem solid transparent";
    playerTwoMarker.style.borderBottom = ".25rem solid transparent";


    boardContainer.removeEventListener("click", playHuman);  
});


// Sets up the game for two human players when the twoPlayerBtn button is clicked 
twoPlayerBtn.addEventListener("click", () => {
    modifyColor(twoPlayerBtn, "h");
    playerOneMarker.style.borderBottom = ".25rem solid green";
    boardContainer.addEventListener("click", playHuman);
});

