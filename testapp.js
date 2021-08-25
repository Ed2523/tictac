let boardState;
const human = 'O';
const computer = 'X';
const elements = document.querySelectorAll('.grid-elem');
const winCombos = [
    //Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal
    [0, 4, 8],
    [6, 4, 2]
]

const setBoard = () => {
    elements.forEach(elem => {
        elem.innerText = '';
        elem.style.removeProperty('background-color');
        elem.addEventListener('click', turnClick, false);
    })
}


const startGame = () => {
    boardState = Array.from(Array(9).keys());
    setBoard()
}



const turnClick = (event) => {

    if (typeof boardState[event.target.id] == 'number') {
        turn(event.target.id, human)
        if (!checkWin(boardState, human) && !checkTie()) {
            turn(bestSpot(), computer);
        }
    }
}

const turn = (elementId, player) => {
    boardState[elementId] = player;
    elements[elementId].innerText = player;
    let gameWon = checkWin(boardState, player)
    if (gameWon) gameOver(gameWon)
}

const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

const gameOver = (gameWon) => {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == human ? "blue" : "red";
    }
    for (var i = 0; i < elements.length; i++) {
        elements[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == human ? "You win!" : "You lose.");
}

const declareWinner = (who) => {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

const emptySquares = () => {
    return boardState.filter(s => typeof s == 'number');
}

const bestSpot = () => {
    return minimax(boardState, computer).index;
}

const checkTie = () => {
    if (emptySquares().length == 0) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "green";
            elements[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

const minimax = (newBoard, player) => {
    var availSpots = emptySquares();

    if (checkWin(newBoard, human)) {
        return { score: -10 };
    } else if (checkWin(newBoard, computer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == computer) {
            var result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, computer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === computer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

startGame();