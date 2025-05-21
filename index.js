// DOM Elements
const gameRulesBtn = document.querySelectorAll(".rules-btn");
const dismissModalBtn = document.getElementById("close");
const instructionsModal = document.getElementById("rules-modal");
const gameArena = document.getElementById("play-board");
const outcomeDisplay = document.getElementById("result-board");
const victoryScreen = document.querySelector(".won-game");

// Game Buttons
const proceedBtn = document.getElementById("next-btn");
const tryAgainBtn = document.querySelector("#play-again");
const restartBtn = document.querySelector("#replay");

// Game Display Elements
const playerOutcome = document.querySelector(".user-result");
const computerOutcome = document.querySelector(".pc-result");
const outcomeMessage = document.getElementById("result-text-1");
const outcomeSubtext = document.getElementById("result-text-2");
const selectionIndicator = document.querySelectorAll(".picked");
const computerPoints = document.getElementById("computer-score");
const userPoints = document.getElementById("user-score");

// Game State
const gameOutcome = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIEUP: "TIE UP",
};

let gameScore = {
  user: 0,
  computer: 0,
};

// Load saved scores
if (localStorage.getItem("score")) {
  gameScore = JSON.parse(localStorage.getItem("score"));
  userPoints.innerHTML = gameScore.user;
  computerPoints.innerHTML = gameScore.computer;
} else {
  userPoints.innerHTML = 0;
  computerPoints.innerHTML = 0;
}

// Winner Highlight Elements
const playerHighlight1 = document.querySelector(".user-box-1");
const playerHighlight2 = document.querySelector(".user-box-2");
const playerHighlight3 = document.querySelector(".user-box-3");
const computerHighlight1 = document.querySelector(".pc-box-1");
const computerHighlight2 = document.querySelector(".pc-box-2");
const computerHighlight3 = document.querySelector(".pc-box-3");

// Game options
const computerChoices = ["rock", "paper", "scissor"];

// Event Listeners
gameRulesBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    instructionsModal.style.display = "block";
  });
});

dismissModalBtn.addEventListener("click", () => {
  instructionsModal.style.display = "none";
});

proceedBtn.addEventListener("click", () => {
  gameArena.style.display = "none";
  outcomeDisplay.style.display = "none";
  victoryScreen.style.display = "flex";
});

tryAgainBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);

// Game Functions
function getComputerChoice() {
  return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

function createElementImage(selection) {
  return `<img src="./assests/images/${selection}.png" alt=${selection} width="60px"/>`;
}

function resetGame() {
  gameArena.style.display = "grid";
  outcomeDisplay.style.display = "none";
  victoryScreen.style.display = "none";
  proceedBtn.style.display = "none";
}

function highlightPlayerWin() {
  // Remove computer highlights
  computerHighlight1.classList.remove("winner-box-1");
  computerHighlight2.classList.remove("winner-box-2");
  computerHighlight3.classList.remove("winner-box-3");

  // Add player highlights
  playerHighlight1.classList.add("winner-box-1");
  playerHighlight2.classList.add("winner-box-2");
  playerHighlight3.classList.add("winner-box-3");
}

function highlightComputerWin() {
  // Remove player highlights
  playerHighlight1.classList.remove("winner-box-1");
  playerHighlight2.classList.remove("winner-box-2");
  playerHighlight3.classList.remove("winner-box-3");

  // Add computer highlights
  computerHighlight1.classList.add("winner-box-1");
  computerHighlight2.classList.add("winner-box-2");
  computerHighlight3.classList.add("winner-box-3");
}

function clearHighlights() {
  // Remove all highlights
  playerHighlight1.classList.remove("winner-box-1");
  playerHighlight2.classList.remove("winner-box-2");
  playerHighlight3.classList.remove("winner-box-3");
  computerHighlight1.classList.remove("winner-box-1");
  computerHighlight2.classList.remove("winner-box-2");
  computerHighlight3.classList.remove("winner-box-3");
}

// Add these variables at the top with your other DOM elements
const winAnimation = document.getElementById("win-animation");
const loseAnimation = document.getElementById("lose-animation");

// Update your resetDisplayStyles function
function resetDisplayStyles() {
  outcomeDisplay.style.marginTop = "3rem";

  selectionIndicator.forEach((element) => {
    element.style.top = "300px";
  });

  // Reset all classes and display settings
  playerOutcome.classList.remove("rock-div", "paper-div", "scissor-div");
  computerOutcome.classList.remove("rock-div", "paper-div", "scissor-div");

  tryAgainBtn.style.display = "block";
  outcomeSubtext.style.display = "block";
  restartBtn.style.display = "none";
  proceedBtn.style.display = "none";
  
  // Hide animations
  if (winAnimation) winAnimation.style.display = "none";
  if (loseAnimation) loseAnimation.style.display = "none";
}

// Update the initiateGame function to show animations
const initiateGame = (playerSelection) => {
  const computerChoice = getComputerChoice();
  resetDisplayStyles();
  let outcome;

  // Determine game outcome
  if (playerSelection === computerChoice) {
    // Handling tie
    outcome = gameOutcome.TIEUP;
    clearHighlights();

    tryAgainBtn.style.display = "none";
    restartBtn.style.display = "block";
    outcomeSubtext.style.display = "none";

    selectionIndicator.forEach(element => {
      element.style.top = "256px";
    });

    outcomeDisplay.style.marginTop = "6rem";
  }
  else if (
    (playerSelection === "rock" && computerChoice === "scissor") ||
    (playerSelection === "paper" && computerChoice === "rock") ||
    (playerSelection === "scissor" && computerChoice === "paper")
  ) {
    // Handle player win
    outcome = gameOutcome.WIN;
    proceedBtn.style.display = "block";
    highlightPlayerWin();
    gameScore.user++;
    
    // Show win animation
    if (winAnimation) {
      winAnimation.style.display = "block";
      if (loseAnimation) loseAnimation.style.display = "none";
    }
  }
  else {
    // Handle computer win
    outcome = gameOutcome.LOST;
    highlightComputerWin();
    gameScore.computer++;
    
    // Show lose animation
    if (loseAnimation) {
      loseAnimation.style.display = "block";
      if (winAnimation) winAnimation.style.display = "none";
    }
  }

  // Update display
  gameArena.style.display = "none";
  outcomeDisplay.style.display = "flex";

  playerOutcome.classList.add(`${playerSelection}-div`);
  computerOutcome.classList.add(`${computerChoice}-div`);
  playerOutcome.innerHTML = createElementImage(playerSelection);
  computerOutcome.innerHTML = createElementImage(computerChoice);
  outcomeMessage.innerHTML = outcome;

  // Update score display
  userPoints.innerHTML = gameScore.user;
  computerPoints.innerHTML = gameScore.computer;

  // Save to local storage
  localStorage.setItem("score", JSON.stringify(gameScore));
};