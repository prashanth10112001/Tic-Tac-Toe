let start = true;
let player1Mark;
let player2Mark;
let player1 = true;
let filledPositions = [];
let gameOver = false;
let reset = false;

let winPatterns = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

// Initially hide game board
if (start) {
  document.querySelector(".container").style.display = "none";
}

// Mark selection
let mark = document.querySelectorAll(".mark");
mark.forEach((item) => {
  item.addEventListener("click", () => {
    player1Mark = item.getAttribute("id");
    player2Mark = player1Mark === "X" ? "O" : "X";

    start = false;
    document.querySelector(".choose").style.display = "none";
    document.querySelector(".container").style.display = "flex";
    document.body.querySelector(".reset").style.display = "none";
  });
});

// Game board click logic
let boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) return;

    let id = box.getAttribute("id");
    if (filledPositions.includes(id)) {
      alert("This box is already filled!");
      return;
    }

    if (player1) {
      box.innerHTML = player1Mark;
      box.style.color = "red";
    } else {
      box.innerHTML = player2Mark;
      box.style.color = "blue";
    }

    box.classList.add("text");
    filledPositions.push(id);

    checkWin(player1 ? player1Mark : player2Mark);
    player1 = !player1;
  });
});

// Check win logic
const checkWin = (playerMark) => {
  let won = false;

  winPatterns.forEach((pattern) => {
    let [a, b, c] = pattern;
    if (
      document.getElementById(a).innerHTML === playerMark &&
      document.getElementById(b).innerHTML === playerMark &&
      document.getElementById(c).innerHTML === playerMark
    ) {
      won = true;
    }
  });

  if (won) {
    document.querySelector(".message").innerHTML =
      playerMark === player1Mark ? "Player 1 Wins!" : "Player 2 Wins!";
    gameOver = true;
    document.body.querySelector(".reset").style.display = "block";
    document.body.querySelector(".reset").innerHTML = "Play Again!!!";

    return;
  }

  if (filledPositions.length === 9) {
    document.querySelector(".message").innerHTML = "DRAW";
    gameOver = true;
  }
};

// Reset game
let btn = document.body.querySelector(".reset");
btn.addEventListener("click", () => {
  window.location.reload();
});
