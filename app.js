const winCombinations = [
    //Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Verical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal
    [0, 4, 8],
    [2, 4, 6]
]
const computer = 'O';
const human = 'X';
let gameIsOn = false;
let boardState = [];
const elements = document.querySelectorAll('.grid-elem')


//Functions
const start = () => {
    boardState = Array.from(Array(9).keys())
    setBoardEmpty()
}
const setBoardEmpty = () => {
    elements.forEach(elem => {
        elem.innerText = '';
    })
}
const turn = (elementId, player) => {
    boardState[elementId] = player;
    elements[elementId].innerText = player;
    let gameVictory = checkVictory(boardState, player)
    if (gameVictory) { gameOver(gameVictory) }
    // console.log(boardState);
}

const checkVictory = (board, player) => {
    /* Plays saves all the places on the board that have been played by the player on turn*/
    //Returns an array of the places the have been played by current player
    let plays = board.reduce((a, e, i) => {
        return (e === player) ? a.concat(i) : a
    }, [])
    let gameVictory = null;
    //with this below we are getting the index and win combo of our wincombination array
    //the is to go through all the elem in wincombination array
    for (let [i, winCombo] of winCombinations.entries()) {

        /* With this below we are cheking if the player has play
         in all the necessary places to claim a winCombo(winning combination)*/
        if (winCombo.every(elem => (
            plays.indexOf(elem > -1)
        ))) {
            //Now we get the index of the wincombo and the player that won
            gameVictory = { index: i, player: player }
            break
        }
    }
    return gameVictory;
}

const gameOver = (gameVictory) => {
 for (let index of winCombinations[gameWon.index]){
     elements[index].style.color = 
     gameVictory.player === human ? 'green' : 'red'

 }
 for (var i = 0; i < elements.length; i++) {
    elements[i].removeEventListener('click', turnClick, false);
}
declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}





elements.forEach(elem => {
    elem.addEventListener('click', (e) => {

        if (gameIsOn === false) {
            start()
            gameIsOn = true;
        }

        let elementId = e.target.id
        turn(elementId, human)






    })
})








