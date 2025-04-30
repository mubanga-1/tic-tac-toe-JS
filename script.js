const ticTacToe = (function() {
    const board = [];
    // Populates the board with 9 empty spaces
    for (let i = 0; i < 9; i++) {
        board.push(" ");
    }

    const signatures = ["X", "O"];    
    const turns = 9;

    // Prints a grid like structure on which the each player's move are displayed
    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            console.log("| " + board.slice(i * 3, (i + 1) * 3).join(" | ") + " |");
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
    const makeMove = (player, space) => {
        const position = space - 1;
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

    return {turns, signatures, printBoard, makeMove, winner, availableMoves};
})();


const input = require("prompt-sync")();

// Creates a human player object when called
function humanPlayer(letter) {
    const valid_letters = ["X", "O"];
    if (!valid_letters.includes(letter)) {
        console.log("Invalid letter!");
        return;
    }

    // Allows player to select which move to play
    const getMove = () => {
        console.log("Enter number (1-9)");
        return parseInt(input(`${letter}'s turn: `));
    }

    return {letter, getMove};
}

// Creates a computer player when called
const randomComputerPlayer = function(letter) {
    
    // Genereates a move for computer to make via the length of the list of available moves
    const getMove = () => {
        const move = Math.ceil((Math.random() * ticTacToe.availableMoves().length) + 1); 
        console.log(`${letter} makes move on ${move}`);
        return move;
    }
    return {letter, getMove}
};


// Run through each round of the game until a player wins or a tie is had
function playGame() {
    console.log("Let's play TicTacToe!");

    // Create players
    const human = humanPlayer(input("Pick a letter X or O: ").trim().toUpperCase());
    let computer;
    human.letter == "X" ? computer = randomComputerPlayer("O") : computer = randomComputerPlayer("X");

    // Assign playerOne and playerTwo based on which letter the uses chooses
    let playerOne;
    let playerTwo;

    human.letter == "X" ? playerOne = human : playerOne = computer;
    computer.letter == "O" ? playerTwo = computer : playerTwo = human;

    // Iterates until a player wins or a tie is had
    while (ticTacToe.turns > 0) {
        ticTacToe.printBoard();
        console.log();
    
        // Switch between playerOne and playerTwo
        if (ticTacToe.turns % 2 == 0) {
            if (ticTacToe.makeMove(playerTwo, playerTwo.getMove())) {
                ticTacToe.turns--;
            } else {
                console.log("Invalid move!");
            }
        } else {
            if (ticTacToe.makeMove(playerOne, playerOne.getMove())) {
                ticTacToe.turns--;
            } else {
                console.log("Invalid move");
            }
        }

        // Check if either player has won
        if (ticTacToe.winner()) {
            ticTacToe.printBoard();
            console.log();
            console.log(ticTacToe.winner(), "wins!");
            
            break
        }
    
    }
    
}

playGame()