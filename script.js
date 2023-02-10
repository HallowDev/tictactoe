let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let xWins = 0;
let oWins = 0;
let playerNumber = 1;
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
    if (turn == "X") {
        playerNumber = 1;
    } else {
        playerNumber = 2;
    }
    console.log(turn,playerNumber)
    if (checkWin(board, turn)) {
    document.getElementById("message").textContent = "Player "+playerNumber+" wins!";
    if (turn === "X") {
        xWins++;
        document.getElementById("x-wins").textContent = xWins;
    } else {
        oWins++;
        document.getElementById("o-wins").textContent = oWins;
    }
    } else if (checkDraw(board)) {
    document.getElementById("message").textContent = "Draw!";
    } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById("message").textContent = "Player "+playerNumber+"'s turn";
    }
} else {
    document.getElementById("message").textContent = "Spot already occupied. Player"+playerNumber+"'s turn";
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
    console.log(playerNumber);
    playerNumber = playerNumber == 1 ? 2 : 1;
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
          document.getElementById("message").textContent = "Player "+playerNumber+"'s turn";
          document.getElementById("countdown").textContent = "Game playing";
        }
      } else {
        document.getElementById("countdown").textContent = "Game restarts in "+counter;
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
document.getElementById("message").textContent = "Player "+playerNumber+"'s turn";

const restartBtn = document.querySelector('#restartBtn');

restartBtn.addEventListener('click', restartGame);