const cells = document.querySelectorAll('.grid-elem');
const player1 = 'x'
const computer = 'o'
let turn = false
const winCombinations = [
    //Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Crossed
    [0, 4, 8],
    [2, 4, 6],

]
let moveCounter = 0;






//Handlers

const clickHandler = (e) => {
    const currentCell = e.target
    const currentPlayer = turn ? computer : player1

    if (currentPlayer === computer) console.log('it is computer turn')



    //This is fot the human
    //place mark
    placeMark(currentCell, currentPlayer)

    //check win
    if (checkWin(currentPlayer)) {
        if (currentPlayer === 'x') {
            setTimeout(() => alert('player 1 won'), 300)
        } else {
            setTimeout(() => alert('computer won'), 300)
        }
        setTimeout(cleanBoard, 400)

    }
    //check draw
    else if (moveCounter === 8) {
        setTimeout(() => alert(`It's a draw`), 300)
        moveCounter = 0;
        setTimeout(cleanBoard, 400)
    } else {
        //switch turns
        finishTurn()
    }
    moveCounter++
    console.log(moveCounter)
}



const placeMark = (currentCell, currentPlayer) => {
    currentCell.innerText = currentPlayer
}
const finishTurn = () => {
    turn = !turn
}
const checkWin = (currentPlayer) => {
    return winCombinations.some(combination => {
        return combination.every(combinationValue => {
            return cells[combinationValue].innerText === currentPlayer
        })
    })
}
const cleanBoard = () => cells.forEach(cell => cell.innerText = '')


//Event listener for cells

cells.forEach((cell) => {
    cell.addEventListener('click', clickHandler, { once: true })
})