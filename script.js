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
            playerText.innerHTML = `${currentPlayer} has won!`;
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
        playerText.innerHTML = `${currentPlayer} has won!`;
        let winningBlocks = playerHasWon();

        winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
        isUserTurn = false;
        return;
    }

    if (!spaces.includes(null)) {
        // All spaces are filled, it's a draw
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

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
    isUserTurn = true;
}
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

startGame();
