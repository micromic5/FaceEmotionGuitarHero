const overlay = document.getElementById("overlay");
const camOverlay = document.getElementById("camOverlay");

overlay.addEventListener("click", startGame);

activateOverlay();


function activateOverlay() {
  overlay.style.display = "block";
  camOverlay.style.display = "none";
}

function startGame() {
  overlay.style.display = "none";
  camOverlay.style.display = "block";
}
