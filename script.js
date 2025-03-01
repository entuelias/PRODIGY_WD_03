// Game State Variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");

// wining Combinitions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Handle user click
function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) return;

  currentPlayer = "O";
  statusDisplay.textContent = "AI's turn";

  setTimeout(aiMove, 500); // AI move after 0.5s
}

// AI makes a move (random empty cell)
function aiMove() {
  let emptyCells = board
    .map((val, index) => (val === "" ? index : null))
    .filter((val) => val !== null);

  if (emptyCells.length === 0 || !gameActive) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (checkWinner()) return;

  currentPlayer = "X";
  statusDisplay.textContent = "Player X's turn";
}
// check for winner
function checkWinner() {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightWinnerCells([a, b, c]);
      statusDisplay.textContent = `${board[a]} wins!`;
      showCongratulations(board[a]);
      startConfetti();
      return true;
    }
  }
  if (!board.includes("")) {
    gameActive = false;
    statusDisplay.textContent = "It's Draw!";
    return true;
  }
  return false;
}

// Function to highlight the winning cells and add a visual line
function highlightWinnerCells(cellsIndexes) {
    cellsIndexes.forEach(index => {
        const cell = document.querySelectorAll(".cell")[index];
        cell.style.backgroundColor = "#ADD8E6"; 
    });

    // Add a visual line (e.g., border) to the winning combination
    const [a, b, c] = cellsIndexes;
    document.querySelectorAll(".cell")[a].style.border = "3px solid red";
    document.querySelectorAll(".cell")[b].style.border = "3px solid red";
    document.querySelectorAll(".cell")[c].style.border = "3px solid red";
}

// Function to show a "Congratulations" message
function showCongratulations(winner) {
    const message = document.createElement("div");
    message.innerHTML = `<h2>🎉 Congratulations! ${winner} Wins! 🎉</h2>`;
    message.style.position = "fixed";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.background = "white";
    message.style.padding = "20px";
    message.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
    message.style.borderRadius = "10px";
    message.style.fontSize = "20px";
    message.style.color = "black";
    message.style.zIndex = "1000";
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove(); // Remove after 3 seconds
    }, 3000);
}

// Function for confetti effect
function startConfetti() {
    for (let i = 0; i < 50; i++) { // Create 50 confetti pieces
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Random position, size, and color
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.width = Math.random() * 8 + 5 + "px";
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration = (Math.random() * 2 + 2) + "s"; // 2-4s duration

        document.body.appendChild(confetti);

        // Remove after animation ends
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Function to generate random colors for confetti
function randomColor() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00", "#00ffff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Reset game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = ""; // Reset background color
        cell.style.border = ""; // Reset border
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);