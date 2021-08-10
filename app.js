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
    let plays = board.reduce((a, e, i) => {

        (e === player) ? a.concat(i) : a

 }, [])

 let gameVictory = null;

for( let [index, win] of winCombinations.entries() ){
    
}


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








