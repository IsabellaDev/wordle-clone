const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'
//key values
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<'
]

const guessRows = [
    ['', '', '', '', ''], 
    ['', '', '', '', ''], 
    ['', '', '', '', ''], 
    ['', '', '', '', ''], 
    ['', '', '', '', ''], 
    ['', '', '', '', ''], 
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex)=>{
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex)=>{
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

const handleClick = (key) =>{
    console.log('clicked', key)
    if (key === '<<' && currentTile > 0){
        deleteLetter(key)
        console.log(guessRows)
        return
    }
    else if (key === 'ENTER') {
        console.log("Check row")
        console.log(guessRows)
        checkRow()
    }
    else if (currentRow < 6 && currentTile < 5) {
        addLetter(key)
        console.log(guessRows)
    }
}
// set keys value and add to keyboard
keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', ()=>handleClick(key))
    keyboard.append(buttonElement)
});

const addLetter = (key) =>{
    const tile = document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile);
    tile.textContent = key;
    guessRows[currentRow][currentTile]=key
    tile.setAttribute('data', key)
    currentTile++;   
}

const deleteLetter = () => {
    currentTile--;
    const tile = document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile);
    tile.textContent = ''
    guessRows[currentRow][currentTile]=''
    tile.setAttribute('data', '')

}

const checkRow = () => {
    if (currentTile === 5){
        const guess = guessRows[currentRow].join('')
        flipTile()
        if (wordle === guess) {
            showMessage("Magnificant!")
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = true
                showMessage("Game Over.The correct word is: " + wordle + ". Hope you will win next time!")
                return
            } else {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage=(message)=>{
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(()=>messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (data, color) => {
    const key = document.getElementById(data)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-'+currentRow).childNodes;

    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })
    // replace the matched letter so that same letter would not be checked multiple times
    guess.forEach((guess, index)=>{
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        const data = tile.getAttribute('data')
        setTimeout(() => {
            tile.classList.add('flip')

            tile.classList.add(guess[index].color)
            addColorToKey(data, guess[index].color)
        }, 500 * index)
    })

    // rowTiles.forEach((tile, index)=>{
    //     const data = tile.getAttribute('data')

    //     setTimeout(()=>{
    //         tile.classList.add('flip')
    //         if (data === wordle[index]) {
    //             tile.classList.add('green-overlay')
    //             addColorToKey(data, 'green-overlay')
    //         }else if (wordle.includes(data)){
    //             tile.classList.add('yellow-overlay')
    //             addColorToKey(data, 'yellow-overlay')
    //         } else {
    //             tile.classList.add('grey-overlay')
    //             addColorToKey(data, 'grey-overlay')
    //         }
    //     }, 500 * index)

    // })
} 