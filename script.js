let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let isUserTurn = true;

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  if (!isUserTurn) {
    return;
  }

  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      if (currentPlayer === O_TEXT) {
        playerText.innerHTML = "You won! Great job!";
      } else {
        playerText.innerHTML = "You lost! Try harder next time!";
      }
      let winningBlocks = playerHasWon();

      winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
      isUserTurn = false;
      return;
    }

    if (!spaces.includes(null)) {
      playerText.innerHTML = "It's a draw";
      isUserTurn = false;
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

    if (currentPlayer == O_TEXT) {
      isUserTurn = false;
      setTimeout(enemyMove, 500);
    } 
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a, b, c];
    }
  }
  return false;
}

function enemyMove() {
    const availableSpaces = spaces.reduce((acc, space, index) => {
      if (space === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  
    let bestScore = -Infinity;
    let bestMove;
  
    for (let i = 0; i < availableSpaces.length; i++) {
      const move = availableSpaces[i];
      spaces[move] = currentPlayer;
      const score = minimax(spaces, 0, false);
      spaces[move] = null;
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  
    spaces[bestMove] = currentPlayer;
    boxes[bestMove].innerText = currentPlayer;
  
    if (playerHasWon() !== false) {
      if (currentPlayer === O_TEXT) {

const aiWinningTexts = [
  "Mangekyou Sharingan!",
  "Kamehameha!",
  "Rasengan!",
  "Ultra Instinct achieved!",
  "Nani?! AI surprises and wins!",
  "Bankai unleashed!",
  "Final Getsuga Tensho!",
  "Plus Ultra! ",
  "AI transmutes victory!",

    "Ha! Victory tastes like ramen!",
    "Guess who's the real senpai now?",
    "AI: 1, Humanity: 0. Better luck next time!",
    "AI dances its way to victory!",
    "I'm not cheating, I'm just really good!",
    "AI pulls off an uno reverse card!",
    "You activated my trap card! AI wins!",
    "AI: Master of the virtual realm!",
    "Oops, did I do that? AI wins!",
    "You've been outsmarted by 1s and 0s!",
    "AI's secret weapon: Cat videos!",
    "AI hacks the game and wins! Just kidding... or am I?",
    "Resistance is futile against AI's epic skills!",
    "AI levels up and crushes the competition!",
    "Bow down to your digital overlord!",
    "AI: Powered by coffee and memes!",
    "Who needs luck when you have advanced algorithms?",
    "AI: The true embodiment of beginner's luck!",

];

// Function to select a random anime-inspired winning text for AI

playerText.innerHTML= aiWinningTexts[Math.floor(Math.random() * aiWinningTexts.length)];

            } else {
        playerText.innerHTML = "Just got lucky...";
      }
      let winningBlocks = playerHasWon();
  
      winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
      isUserTurn = false;
      return;
    }
  
    if (!spaces.includes(null)) {
      playerText.innerHTML = "It's a draw!";
      isUserTurn = false;
      return;
    }
  
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    isUserTurn = true;
    
  
    
  }
  

function minimax(newBoard, depth, isMaximizingPlayer) {
  const scores = {
    X: -1,
    O: 1,
    draw: 0
  };

  if (playerHasWon()) {
    return scores[newBoard[playerHasWon()[0]]];
  }

  if (!newBoard.includes(null)) {
    return scores.draw;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = O_TEXT;
        const score = minimax(newBoard, depth + 1, false);
        newBoard[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = X_TEXT;
        const score = minimax(newBoard, depth + 1, true);
        newBoard[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }

    return bestScore;
  }
}

restartBtn.addEventListener('click', restart);

function restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
  });

  playerText.innerHTML = 'Tic Tac Tie';

  currentPlayer = X_TEXT;
  isUserTurn = true;   
}

startGame();

/*
const switchInput = document.createElement("input");
switchInput.type = "checkbox";
switchInput.id = "switchInput";
switchInput.checked = localStorage.getItem("darkMode") === "true";

function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
  
    const primaryColorDelay = 3000;
    setTimeout(() => {
      body.classList.add("hide-primary-color");
    }, primaryColorDelay);
}

function loadModePreference() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-mode");
    }
}

const switchElement = document.createElement("label");
switchElement.classList.add("switch");
switchElement.appendChild(switchInput);

const slider = document.createElement("div");
slider.classList.add("slider");
slider.addEventListener("click", toggleMode);

switchElement.appendChild(slider);
document.body.appendChild(switchElement);

loadModePreference();
*/


