const shapes = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
}
Object.freeze(shapes);

const shapeNames = {
    0: "rock",
    1: "paper",
    2: "scissors",
    "rock": 0,
    "paper": 1,
    "scissors": 2
}
Object.freeze(shapeNames);

function game() {
    for (let i = 0; i < 5; i++) {
        let playerSelection = playerInput();
        alert(playRound(playerSelection, computerPlay()));
    }
}

function playerInput() {
    let playerString;
    let playerSelection;

    while(!playerString || playerSelection === undefined) {
        playerString = prompt('Choose rock, paper or scissors');
        if(playerString) playerSelection = shapeNames[playerString.toLowerCase()];
    }
    return playerSelection;
}

function playRound(playerSelection, computerSelection) {
    if(playerSelection === computerSelection) {
        return `Draw! Both selected ${getNameCapitalized(playerSelection)}.`;
    }
    if(checkIfFirstWins(playerSelection, computerSelection)) {
        return 'You win! ' + beatsMessage(playerSelection, computerSelection);
    } else {
        return 'You lose! ' + beatsMessage(computerSelection, playerSelection);
    }
}

function beatsMessage(first, second) {
    return `${getNameCapitalized(first)} beats ${getNameCapitalized(second)}!`
}

function checkIfFirstWins(first, second) {
    if(first === shapes.ROCK && second === shapes.SCISSORS) {
        return true;
    }
    return first > second;
}

function computerPlay() {
    return random(3);
}

function random(int) {
    return Math.floor(Math.random() * int);
}

function getNameCapitalized(id) {
    let name = shapeNames[id];
    return name[0].toUpperCase() + name.slice(1);
}
game();