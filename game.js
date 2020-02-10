const shapes = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
}
Object.freeze(shapes);

const shapeImages = {
    0: "images/rock.svg",
    1: "images/paper.svg",
    2: "images/scissors.svg"
}

const roundResults = {
    PLAYERWIN: 0,
    COMPUTERWIN: 1,
    DRAW: 2
}
Object.freeze(roundResults);

function playRound(playerChoice, computerChoice) {
    if(playerChoice === computerChoice) {
        return roundResults.DRAW;
    }
    if(checkIfFirstWins(playerChoice, computerChoice)) {
        return roundResults.PLAYERWIN;
    } else {
        return roundResults.COMPUTERWIN;
    }
}

function checkIfFirstWins(first, second) {
    if(first === shapes.ROCK && second === shapes.SCISSORS) {
        return true;
    }
    if(second === shapes.ROCK && first == shapes.SCISSORS) {
        return false;
    }
    return first > second;
}

function computerPlay() {
    return random(3);
}

function random(int) {
    return Math.floor(Math.random() * int);
}

function onPlayerButtonClick(e) {
    if(!e.target.hasAttribute('data-shape')) {
        console.error(e.target, ' has no "data-shape" attribute');
        return;
    }
    let playerChoiceStr = e.target.getAttribute('data-shape')
    if(isNaN(playerChoiceStr) || playerChoiceStr < 0 || playerChoiceStr > 2) {
        console.error(e.target, playerChoiceStr, ' is not a valid "data-shape" value');
        return;
    }

    let playerChoice = +playerChoiceStr;
    let computerChoice = computerPlay();
    let result = playRound(playerChoice, computerChoice);
    animateRound(playerChoice, computerChoice, result);
}

function animateRound(playerChoice, computerChoice, result) {
    setBoxesActive(false);
    
    playerShape.src = shapeImages[playerChoice];
    computerShape.src = shapeImages[computerChoice];

    computerShape.classList.remove('hidden');
    playerShape.classList.remove('hidden');

    switch(result) {
        case roundResults.PLAYERWIN:
            playerShape.classList.add('attacking');
            break;
        case roundResults.COMPUTERWIN:
            computerShape.classList.add('attacking');
            break;
        case roundResults.DRAW:
            setTimeout(resetRound, 1500);
            break;
    }
}

function setBoxesActive(value) {
    buttons.forEach(button => button.disabled = !value);
    if(value) {
        boxes.forEach(box => box.classList.remove('box-up'));
    } else {
        boxes.forEach(box => box.classList.add('box-up'));
    }
}

function onAttackEnd() {
    setTimeout(resetRound, 1000);
}

function resetRound() {
    playerShape.classList.remove('attacking');
    computerShape.classList.remove('attacking');
    playerShape.classList.add('hidden');
    computerShape.classList.add('hidden');
    setBoxesActive(true);
}

function onPlayerAttackEnd(e) {
    computerShape.classList.add('hidden');
    onAttackEnd();
}

function onComputerAttackEnd(e) {
    playerShape.classList.add('hidden');
    onAttackEnd();
}

const buttons = [...document.querySelectorAll('.shape-button[data-shape]')];
buttons.forEach(button => button.addEventListener('click', onPlayerButtonClick));

const playerShape = document.getElementById('player-shape');
const computerShape = document.getElementById('computer-shape');
playerShape.addEventListener('animationend', onPlayerAttackEnd);
computerShape.addEventListener('animationend', onComputerAttackEnd);

const boxes = [...document.querySelectorAll('.choice-box')];