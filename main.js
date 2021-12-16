const gameBoard = document.querySelector(".game_board");
const square = document.querySelectorAll("[data-cell]");
const restartBtn = document.querySelector(".restart_btn");
const resultText = document.querySelector(".result");
const matchRestartPage = document.querySelector(".match_over");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circle = true;
gameBoard.classList.add(circle ? "circle" : "x");

square.forEach((cell) => {
  cell.addEventListener("click", () => {
    const className = circle ? "circle" : "x";
    if (!cell.classList.contains("circle") && !cell.classList.contains("x")) {
      cell.classList.add(className);
      circle = !circle;
    }
    
    if(winningCheck(className)){
        win(className)
    }else if(drawCheck(className)){
        draw()
    }

    if (circle) {
      gameBoard.classList.remove("x");
      gameBoard.classList.add("circle");
    } else {
      gameBoard.classList.remove("circle");
      gameBoard.classList.add("x");
    }
  });
});

function winningCheck(currentClass) {
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return square[index].classList.contains(currentClass);
    });
  });
}

function drawCheck(currentClass) {
  return [...square].every(cell => {
    return cell.classList.contains('circle') || cell.classList.contains('x');
  });
}

function win(currentClass) {
  matchRestartPage.style.visibility = "visible";
  if (currentClass == "circle") {
    resultText.innerHTML = "Circle Wins!";
  } else {
    resultText.innerHTML = "X wins!";
  }
}

function draw() {
  matchRestartPage.style.visibility = "visible";
  resultText.innerHTML = "Draw";
}

restartBtn.addEventListener("click", () => {
  matchRestartPage.style.visibility = "hidden";
  square.forEach((cell) => {
    cell.classList.remove("circle");
    cell.classList.remove("x");
  });
});
