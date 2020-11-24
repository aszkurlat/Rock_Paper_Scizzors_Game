const gameSummary = {
    gameNumbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}
const game = {
    playerHand: '',
    aiHand: ''
}
const gameOptions = [...document.querySelectorAll('i')];
const playBtn = document.querySelector('button');

function showAiChoice() {
    const aiChoiceIndex = Math.floor(Math.random() * gameOptions.length);
    return gameOptions[aiChoiceIndex].dataset.option;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'Draw';
    } else if ((player === "paper" && ai === "rock") || (player === "rock" && ai === "scizzors") || (player === 'scizzors' && ai === 'paper')) {
        return 'win';
    } else {
        return 'loss';
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    gameSummary.gameNumbers++;
    document.querySelector('.numbers span').textContent = gameSummary.gameNumbers;
    if (result === 'win') {
        gameSummary.wins++;
        document.querySelector('.wins span').textContent = gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "You win!";
    } else if (result === 'loss') {
        gameSummary.losses++;
        document.querySelector('.losses span').textContent = gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "You lost :(";
    } else {
        gameSummary.draws++;
        document.querySelector('.draws span').textContent = gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "It's a draw";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).classList.remove('active');
    game.playerHand = '';
}

function startGame() {
    if (game.playerHand == '') {
        return alert('Choose an option to start the game!');
    }
    game.aiHand = showAiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

playBtn.addEventListener('click', startGame);
function chooseOption() {
    game.playerHand = this.dataset.option;
    gameOptions.forEach(option => option.classList.remove('active'));
    this.classList.add('active');
}

gameOptions.forEach(option =>
    option.addEventListener('click', chooseOption)
);