const overlay = document.getElementById("overlay");
const camOverlay = document.getElementById("camOverlay");
let text = document.getElementById("ready").getElementsByTagName("h1")[0];
overlay.addEventListener("click", startGame);

activateOverlay();

function activateOverlay() {
  overlay.style.display = "block";
}

function startGame() {
  //Prevent multiclicks
  overlay.removeEventListener("click", startGame);
  //count 3-2-1
  for (let i = 0; i < 3; i++) {
    setTimeout(function() {
      text.innerHTML = 3 - i;
    }, i * 1000);
  }
  //write go
  setTimeout(function() {
    text.innerHTML = "go";
  }, 3000);
  //start game
  setTimeout(function() {
    overlay.style.display = "none";
    getforms();
  }, 4000);
}
