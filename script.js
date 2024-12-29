// Get references to DOM elements
const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const gameResultElem = document.getElementById('game-result');
const playerWinsElem = document.getElementById('player-wins');
const computerWinsElem = document.getElementById('computer-wins');
const tiesElem = document.getElementById('ties');

const stoneBtn = document.getElementById('stone');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

// Initialize win counters
let playerWins = 0;
let computerWins = 0;
let ties = 0;

// Countdown timer variables
let countdownInterval;
let countdownValue = 3; // Start countdown from 3

// Disable buttons initially
stoneBtn.disabled = true;
paperBtn.disabled = true;
scissorsBtn.disabled = true;

// Array of choices
const choices = ["Stone", "Paper", "Scissors"];

// Function to start the countdown
function startCountdown() {
    // Initially clear "Get ready" message
    gameResultElem.textContent = "";

    countdownInterval = setInterval(() => {
        // Update the countdown text
        gameResultElem.textContent = `Starting in ${countdownValue}...`;
        gameResultElem.classList.add('countdown'); // Add animation to countdown

        countdownValue--; // Decrease the countdown value

        // When countdown finishes, enable the choices and stop the countdown
        if (countdownValue < 0) {
            clearInterval(countdownInterval); // Clear the interval
            gameResultElem.textContent = "Choose your option!"; // Reset message
            gameResultElem.classList.remove('countdown'); // Remove animation
            stoneBtn.disabled = false;
            paperBtn.disabled = false;
            scissorsBtn.disabled = false;
        }
    }, 1000); // Update every second
}

// Function to get a random choice for the computer
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }

    if (
        (playerChoice === "Stone" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Stone")
    ) {
        return "You win!";
    }

    return "Computer wins!";
}

// Function to update the score
function updateScore(result) {
    if (result === "You win!") {
        playerWins++;
        playerWinsElem.textContent = playerWins;
    } else if (result === "Computer wins!") {
        computerWins++;
        computerWinsElem.textContent = computerWins;
    } else {
        ties++;
        tiesElem.textContent = ties;
    }
}

// Function to handle player's choice
function handlePlayerChoice(playerChoice) {
    // Display player's choice
    playerChoiceElem.textContent = `Your choice: ${playerChoice}`;

    // Get computer's choice
    const computerChoice = getComputerChoice();
    computerChoiceElem.textContent = `Computer's choice: ${computerChoice}`;

    // Determine the winner
    const result = determineWinner(playerChoice, computerChoice);
    gameResultElem.textContent = result;

    // Update the score
    updateScore(result);
}

// Event listeners for buttons
stoneBtn.addEventListener('click', () => handlePlayerChoice("Stone"));
paperBtn.addEventListener('click', () => handlePlayerChoice("Paper"));
scissorsBtn.addEventListener('click', () => handlePlayerChoice("Scissors"));

// Reset button functionality
resetBtn.addEventListener('click', () => {
    // Reset win counters to 0
    playerWins = 0;
    computerWins = 0;
    ties = 0;
    playerWinsElem.textContent = playerWins;
    computerWinsElem.textContent = computerWins;
    tiesElem.textContent = ties;

    // Reset choices and game result display
    playerChoiceElem.textContent = "Your choice: ";
    computerChoiceElem.textContent = "Computer's choice: ";
    gameResultElem.textContent = "Get ready... Game starts soon!"; // Set reset text

    // Disable buttons and start the countdown
    stoneBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
    countdownValue = 3;
    startCountdown(); // Start countdown immediately after reset
});

// Start the countdown immediately after page load or after reset
startCountdown();
