const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const arr = input.split('\n')
const callingNumbers = [50, 68, 2, 1, 69, 32, 87, 10, 31, 21, 78, 23, 62, 98, 16, 99, 65, 35, 27, 96, 66, 26, 74, 72, 45, 52, 81, 60, 38, 57, 54, 19, 18, 77, 71, 29, 51, 41, 22, 6, 58, 5, 42, 92, 85, 64, 94, 12, 83, 11, 17, 14, 37, 36, 59, 33, 0, 93, 34, 70, 97, 7, 76, 20, 3, 88, 43, 47, 8, 79, 80, 63, 9, 25, 56, 75, 15, 4, 82, 67, 39, 30, 89, 86, 46, 90, 48, 73, 91, 55, 95, 28, 49, 61, 44, 84, 40, 53, 13, 24].map(i => i + '');

const transposeBoard = (board) => board[0].map((_, colIndex) => board.map(row => row[colIndex]));

const isBoardWinner = ({ board, numbers }) => {
    const transposedBoard = transposeBoard(board);
    let rowWinner = false;
    let colWinner = false;
    for (let i = 0; i < board.length; i++) {
        rowWinner = rowWinner | board[i].every(ele => numbers.includes(ele));
    }

    for (let i = 0; i < transposedBoard.length; i++) {
        colWinner = colWinner | transposedBoard[i].every(ele => numbers.includes(ele));
    }

    return rowWinner | colWinner;
};

const makeBoards = () => {
    const boards = [];
    let board = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            boards.push(board);
            board = [];
        }
        if (arr[i].length) {
            board.push(arr[i].split(' ').filter(e => e));
        }
    }
    boards.push(board);
    return boards;
}

const boards = makeBoards();
let winningBoard = null;
let lastNumber = null;
let lastIndex = null;
const remainingBoards = boards;

for (let n = 4; n < callingNumbers.length; n++) {
    for (let b = 0; b < remainingBoards.length; b++) {
        if (isBoardWinner({ board: remainingBoards[b], numbers: callingNumbers.slice(0, n) })) {
            console.log({ boardToDelete: remainingBoards[b], boardsLeft: remainingBoards.length })
            if (remainingBoards.length === 1) {
                winningBoard = remainingBoards[b];
                lastNumber = parseInt(callingNumbers[n - 1])
                lastIndex = n;
            }
            remainingBoards.splice(b, 1);
            // if (remainingBoards.length === 1) {
            //     winningBoard = remainingBoards[b];
            //     lastNumber = parseInt(callingNumbers[n - 1])
            //     lastIndex = n;
            //     console.log({ b })
            // } else {
            //     console.log(b);
            //     remainingBoards.splice(b, 1);
            //     break;
            // }
        }
    }
}

console.log({ winningBoard, lastNumber, lastIndex })

console.log(winningBoard.flat().filter(e => !callingNumbers.slice(0, lastIndex).includes(e)).reduce((sum, e) => sum + parseInt(e), 0) * lastNumber);
