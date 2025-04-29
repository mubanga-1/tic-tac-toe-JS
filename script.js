const ticTacToe = (function() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(`${i}`);
    }
    const turns = 9;

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            console.log(board.slice(i * 3, (i + 1) * 3).join(" | "))
        }
    }

    const makeMove = (player, position) => {
        board[position - 1] = player.letter;
    }

    return {turns, printBoard, makeMove};
})();


function createPlayer(letter) {
    const valid_letters = ["X", "O"];
    if (!valid_letters.includes(letter)) {
        console.log("Invalid letter!");
        return;
    }

    return {letter};
}