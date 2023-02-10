let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let xWins = 0;
let oWins = 0
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const updateBoard = (index) => {
  if (board[index] === "") {
    board[index] = turn;
    document.getElementById(index).textContent = turn;
    if (checkWin(board, turn)) {
      document.getElementById("message").textContent = `Player ${turn} wins!`;
      if (turn === "X") {
        xWins++;
        document.getElementById("x-wins").textContent = xWins;
      } else {
        oWins++;
        document.getElementById("o-wins").textContent = oWins;
      }
      restartGame();
    } else if (checkDraw(board)) {
      document.getElementById("message").textContent = "Draw!";
      restartGame();
    } else {
      turn = turn === "X" ? "O" : "X";
      document.getElementById("message").textContent = `Player ${turn}'s turn`;
    }
  } else {
    document.getElementById("message").textContent = `Spot already occupied. Player ${turn}'s turn`;
  }
};
const checkWin = (board, player) => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}
const checkDraw = (board) => {
for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
        return false;
    }
}
return true;
}
const restartGame = () => {
    turn = turn === "X" ? "O" : "X";
    board = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
      document.getElementById(i).textContent = "";
      document.getElementById(i).style.pointerEvents = "none";
    }
    let counter = 5;
    const countDown = () => {
      if (counter === 0) {
        clearInterval(intervalId);
        for (let i = 0; i < 9; i++) {
          document.getElementById(i).style.pointerEvents = "auto";
          document.getElementById("message").textContent = `Player ${turn}'s turn`;
          document.getElementById("countdown").textContent = 'Game playing';
        }
      } else {
        document.getElementById("countdown").textContent = counter;
        counter--;
      }
    };
    const intervalId = setInterval(countDown, 1000);
  };
  
const spots = document.querySelectorAll(".spot");
    spots.forEach(spot => {
    spot.addEventListener("click", () => {
        updateBoard(Number(spot.id));
    });
})
document.getElementById("message").textContent = `Player ${turn}'s turn`;