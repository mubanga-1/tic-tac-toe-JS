const ticTacToe = (function() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(" ");
    }
    
    const signatures = ["X", "O"];
    const turns = 9;

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            console.log("| " + board.slice(i * 3, (i + 1) * 3).join(" | ") + " |");
        }
    }

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
    
    const makeMove = (player, space) => {
        const position = space - 1;
        if (availableMoves().includes(position)) {
            board[position] = player.letter;
            return true;
        }
        return false;
    }

    const winner = () => {
        const {x, o} = signatures;
        // Check rows
        rows = [];
        for (let i = 0; i < 3; i++) {
            rows.push(board.slice(i * 3, (i + 1) * 3));
        }

        for (row of rows) {
            if (row.every(item => item == x)) {
                return x; 
            } else if (row.every(item => item == o)) {
                return o;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] == x && board[i+3] == x && board[i+6] == x) {
                return x;
            } else if (board[i] == o && board[i+3] == o && board[i+6] == o) {
                return o;
            } 
        }

        // Check diagonals
        firstDiagonalIndices = [0, 4, 8];
        firstDiagonal = [];
        for (index of firstDiagonalIndices) {
            firstDiagonal.push(board[index])
        }
        
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

        if (secondDiagonal.every(item => item == x)) {
            return x;
        } else if (secondDiagonal.every(item => item == o)) {
            return o;
        }

        return "";
    }

    return {turns, printBoard, makeMove, winner, availableMoves};
})();


function createPlayer(letter) {
    const valid_letters = ["X", "O"];
    if (!valid_letters.includes(letter)) {
        console.log("Invalid letter!");
        return;
    }

    return {letter};
}


console.log("Let's play TicTacToe!");
const player1 = createPlayer("X");
const player2 = createPlayer("O"); 
const input = require("prompt-sync")();


while (ticTacToe.turns > 0) {
    ticTacToe.printBoard();
    console.log();

    console.log(ticTacToe.availableMoves());
    

    if (ticTacToe.turns % 2 == 0) {
        if (ticTacToe.makeMove(player2, parseInt(input("O's turn: ")))) {
            ticTacToe.turns--;
        } else {
            console.log("Invalid move!");
        }
    } else {
        if (ticTacToe.makeMove(player1, parseInt(input("X's turn: ")))) {
            ticTacToe.turns--;
        } else {
            console.log("Invalid move");
        }
    }

    if (ticTacToe.winner()) {
        ticTacToe.printBoard();
        console.log();
        console.log(ticTacToe.winner(), "wins!");
        
        break
    }

}
    
// const randomComputerPlayer = (function() {
//     const {letter} = createPlayer()
// })();
