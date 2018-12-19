const overlay = document.getElementById("overlay");
const camOverlay = document.getElementById("camOverlay");
let text = document.getElementById("ready").getElementsByTagName("h1")[0];


overlay.addEventListener("click", startGame);

activateOverlay();


function activateOverlay() {
  overlay.style.display = "block";
  camOverlay.style.display = "none";
}

function startGame() {
  //Prevent multiclicks
  overlay.removeEventListener("click", startGame);
  for (let i = 0; i < 3; i++) {
    setTimeout(function() {
      text.innerHTML = 3 - i;
    }, i * 1000);
  }
  setTimeout(function() {
    text.innerHTML = "go";
  }, 3000);
  setTimeout(function() {
    overlay.style.display = "none";
    camOverlay.style.display = "block";
    //starts the game
    getforms();
  }, 4000);

}
