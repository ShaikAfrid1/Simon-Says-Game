let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
// let highScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let highScore = localStorage.getItem("highScore") || 0;
h3.innerHTML = `Highscore: ${highScore}`;

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function startGame() {
  if (started === false) {
    started = true;
    h2.innerText = `Level ${level}`;
    levelUp();
  }
}

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame); // 👈 for mobile tap

function gameFlash(btn) {
  playSound(btn.id);
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 400);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);
  console.log(gameSeq);

  gameFlash(randomBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> press any button to start again.`;
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 300);
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      console.log(highScore);
      h3.innerHTML = `Highscore: ${highScore}`;
    }
    reset();
  }
}

function btnpress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  playSound(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

let toggle = document.getElementById("modeToggle");

toggle.addEventListener("change", function () {
  document.body.classList.toggle("light-mode");
});
