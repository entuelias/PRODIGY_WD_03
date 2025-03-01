// Game state variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
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
    let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    
    if (emptyCells.length === 0 || !gameActive) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    if (checkWinner()) return;

    currentPlayer = "X";
    statusDisplay.textContent = "Player X's turn";
}

// Check for a winner
function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusDisplay.textContent = `${board[a]} wins!`;
            return true;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
        return true;
    }

    return false;
}

// Reset game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "Player X's turn";

    cells.forEach(cell => cell.textContent = "");
}


// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);





// const cells = document.querySelectorAll(".cell");

// cells.forEach(cell => {
//     cell.addEventListener("click", () => {
//         console.log("A cell was clicked!;" ,cell.dataset.index);  // But WHICH one??
//     });
// });