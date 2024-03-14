// creare la griglia nell'html al click su gioca
    // recuperare il bottone gioca e aggiungere un event listener

const playButtonDOMElement = document.getElementById('play__button')
// console.log(playButtonDOMElement);

playButtonDOMElement.addEventListener('click', function() {
    // recuperare il container 
    const gridContainerDOMElement = document.querySelector('.grid__container')
    // console.log(gridContainerDOMElement);

    // RIMUOVERE EVENTUALI GRIGLIE PRECEDENTI PER EVITARE DI GENERARE DUE GRIGLIE UNA SOTTO L'ALTRA
    gridContainerDOMElement.innerHTML = ''
    playButtonDOMElement.innerHTML = 'Restart'

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

    const numberOfCells = size ** 2;

    // generare le celle 
    for (let i = 0; i < numberOfCells; i++) {
        // segnare il numero delle celle
        const cellNumber = i + 1 
        const cellsDOMELement = document.createElement('div')
        // aggiungere alle celle create la classe cell e il numero della cella 
        cellsDOMELement.className = 'cell'
        cellsDOMELement.innerHTML = cellNumber

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

        // aggiungere le celle all'html
        gridContainerDOMElement.append(cellsDOMELement)
        // console.log(cellsDOMELement);

        // aggiungere/rimuovere la classe bg__blue al click sulla cella 
        cellsDOMELement.addEventListener('click', function(){
            this.classList.toggle('bg__blue')
            console.log(cellNumber);
        })
    }
})

