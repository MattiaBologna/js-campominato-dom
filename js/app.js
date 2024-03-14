// creare la griglia nell'html al click su gioca
// recuperare il bottone gioca e aggiungere un event listener

const playButtonDOMElement = document.getElementById('play__button')
// console.log(playButtonDOMElement);

                                                            // GAME FUNCTIONING

playButtonDOMElement.addEventListener('click', function() {
    
    // prendere la size FUNCTION
    const size = sizeSelector()

    // generare l'array delle bombe FUNCTION
    const bombsArray = generateBombsArray(size)
    console.log(bombsArray);

    // recuperare il container 
    const gridContainerDOMElement = document.querySelector('.grid__container')
    // console.log(gridContainerDOMElement);
 
    // rimuovere eventuali griglie precedenti
    gridContainerDOMElement.innerHTML = ''
    playButtonDOMElement.innerHTML = 'Restart'
 
    const numberOfCells = size ** 2;
 
    // aggiungere la classe relativa alla difficoltà corrente per scegliere quante colonne avere
    if (size === 10) {
         gridContainerDOMElement.classList.remove('grid__hard', 'grid__normal', 'grid__easy')
         gridContainerDOMElement.classList.add('grid__hard')
    } else if (size === 9) {
         gridContainerDOMElement.classList.remove('grid__hard', 'grid__normal', 'grid__easy')
         gridContainerDOMElement.classList.add('grid__normal')
    } else if (size === 7) {
         gridContainerDOMElement.classList.remove('grid__hard', 'grid__normal', 'grid__easy')
         gridContainerDOMElement.classList.add('grid__easy')
    }
 
    // points counter 
    let points = 0
     
    // generare le celle 
    for (let i = 0; i < numberOfCells; i++) {
        // segnare il numero delle celle
        const cellNumber = i + 1 
        const cellsDOMELement = document.createElement('div')
        // aggiungere alle celle create la classe cell e il numero della cella 
        cellsDOMELement.className = 'cell'
        cellsDOMELement.innerHTML = cellNumber
        
        
        // aggiungere le celle all'html
        gridContainerDOMElement.append(cellsDOMELement)
        // console.log(cellsDOMELement);
        
        // al click sulla cella controllare se è una bomba e colorarla di conseguenza
        cellsDOMELement.addEventListener('click', function() { 
            // check if bomb FUNCTION
            isBomb = checkIfBomb(cellNumber, bombsArray)
        
            if (isBomb) {
                // se la cella è una bomba, colorala di rosso e mostra l'alert con i punti
                this.classList.add('bg__red')
                bombEndGame(points)
                showBombs(cellNumber, bombsArray)
            } else {
                // se la cella non è una bomba (e non è stata già cliccata) colorala di blu e aggiungi un punto 
                if (this.classList.contains('bg__blue')) {
                    points += 0
                } else {
                    this.classList.add('bg__blue')
                    points += 1
                    if (points === (size ** 2) - 16) {
                        alert('Hai vinto');
                    }
                }
            }
            
        })
    }

})


                                                                   // FUNCTIONS

// FUNCTION SIZE SELECTOR

function sizeSelector() {
    let size = 10;

    // prendi il select 
    const changeDifficultyDOMElement = document.getElementById('difficulty__grade')
    // prendi il valore del select 
    const changeDifficultyValue = changeDifficultyDOMElement.value 
    
    // seleziona il numero di celle da generare in base alla difficoltà scelta
    if (changeDifficultyValue === '1') {
        size = 10
    } else if (changeDifficultyValue === '2') {
        size = 9
    } else {
        size = 7
    }
    // console.log(size)
    return size
}


// FUNCTION GENERA ARRAY BOMBE

function generateBombsArray(size) {
    // creare array bombe da returnare
    let bombsArray = [];

    // creare 16 numeri casuali in base alla dimensione della griglia che non si ripetano e pusharli nell'array
    // finchè la length di bombsArray non è 16 devo creare numeri casuali
    // devo pushare nell'array ogni numero casuale che non sia già presente 

    while (bombsArray.length < 16) {
        // genera un numero casuale in base alla size della griglia 
        const randomNumber = Math.floor(Math.random() * (size ** 2) + 1)
        // console.log(randomNumber);

        // pushare il numero nell'array solo se non è già presente 
        let isNumInArray = false
        
        // per ogni elemento di bombsArray 
        for (let i = 0; i < bombsArray.length; i++) {
            // Se randomNumber è uguale ad almeno un elemento di bombsArray set isNumInArray = true
            if (randomNumber === bombsArray[i]) {
                isNumInArray = true
            }
        }
        // console.log(isNumInArray);
        // se non c'è il numero nell'array pushalo in bombsArray
        if (!isNumInArray) {
            bombsArray.push(randomNumber)
        }
    }
    // console.log(bombsArray);
    return bombsArray
}


// In seguito l’utente clicca su una cella:
// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso.
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.

// FUNCTION CHECK IF BOMB

function checkIfBomb(cellNumber, bombsArray) {
    console.log(cellNumber);

    // Restituisci vero se la casella è una bomba 
    let isBomb = false 

    // per ogni elemento di bombsArray 
    for (let i = 0; i < bombsArray.length; i++) {
        if (cellNumber === bombsArray[i]) {
            isBomb = true
        }
    }

    // if (isBomb) {
    //     console.log('è una bomba');
    // } else {
    //     console.log('non è bomba');
    // }
    return isBomb
}


// FUNCTION END GAME 

function bombEndGame(points) {
    alert(`Hai perso! Hai fatto ${points} punti`)
}

// FUNCTION SHOW BOMBS

function showBombs(cellNumber, bombsArray) {

    // for (let i = 0; i < bombsArray.length; i++) {
    //     if (cellNumber === bombsArray[i]) {
    //         cellsDOMELement.classList.add('bg__red')
    //     }
    // }
   
}
