
let score = 0;
let time = 30;
let playing = false;
let timer;

const water = document.getElementById("water");
const dirty = document.getElementById("dirty");
const gameArea = document.getElementById("gameArea");
const message = document.getElementById("message");

// Update the score and progress bar
function updateScore() {
  document.getElementById("score").textContent = score;
  document.getElementById("progressBar").style.width =
    Math.min(score, 100) + "%";
}

// Move the water drops to random places
function moveDrops() {
  let width = gameArea.clientWidth;
  let height = gameArea.clientHeight;

  let waterX = Math.random() * (width - 70);
  let waterY = Math.random() * (height - 70);

  let dirtyX = Math.random() * (width - 70);
  let dirtyY = Math.random() * (height - 70);

  water.style.left = waterX + "px";
  water.style.top = waterY + "px";

  dirty.style.left = dirtyX + "px";
  dirty.style.top = dirtyY + "px";
}

// Start the game
function startGame() {
  clearInterval(timer);

  score = 0;
  time = 30;
  playing = true;

  updateScore();

  document.getElementById("time").textContent = time;
  message.textContent = "Collect the clean water!";

  water.style.display = "block";
  dirty.style.display = "block";

  document.getElementById("start").disabled = true;

  moveDrops();

  timer = setInterval(function() {
    time--;

    document.getElementById("time").textContent = time;

    if (time <= 0) {
      endGame(false);
    }
  }, 1000);
}

// Click clean water to earn points
water.addEventListener("click", function() {
  if (playing === true) {
    score = score + 10;

    updateScore();

    message.textContent = "+10 Clean Water!";

    if (score >= 100) {
      endGame(true);
    } else {
      moveDrops();
    }
  }
});

// Click dirty water to lose points
dirty.addEventListener("click", function() {
  if (playing === true) {
    score = score - 10;

    if (score < 0) {
      score = 0;
    }

    updateScore();

    message.textContent = "-10 Dirty Water!";

    moveDrops();
  }
});

// Stop the game and show the result
function endGame(won) {
  playing = false;

  clearInterval(timer);

  water.style.display = "none";
  dirty.style.display = "none";

  document.getElementById("start").disabled = false;
  document.getElementById("start").textContent = "Play Again";

  if (won === true) {
    message.textContent =
      "🎉 YOU WIN! 🎉 You collected 100 points of clean water! 💧🏆";
    gameArea.style.backgroundColor = "#fff1a8";
  } else {
    message.textContent =
      "Time is up! You got " + score + " points. Try again!";
  }
}

// Reset everything
function resetGame() {
  clearInterval(timer);

  playing = false;
  score = 0;
  time = 30;

  updateScore();

  document.getElementById("time").textContent = time;

  water.style.display = "none";
  dirty.style.display = "none";

  gameArea.style.backgroundColor = "#d9f3ff";

  message.textContent = "Press Start to play!";

  document.getElementById("start").disabled = false;
  document.getElementById("start").textContent = "Start Game";
}

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("reset").addEventListener("click", resetGame);
