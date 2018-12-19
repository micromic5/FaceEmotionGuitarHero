let scoreNumber = document.getElementById("scoreNumber");
let counter = 0;
let vignette = document.getElementById("vignette");
let scoreZoomAndBlink = document.getElementById("scoreNumber");

function MyScore(counter) {
  scoreNumber.innerHTML = counter;
};

function increaseCounter() {
  MyScore(counter += 1);
  makeAnimations();
}

function makeAnimations() {
  //Vignette

  vignette.className += "vignette";
  setTimeout(function() {
    vignette.classList.remove("vignette");
  }, 1000);
  //scoreZoomAndBlink

  scoreZoomAndBlink.className += "scoreZoomAndBlink";
  setTimeout(function() {
    scoreZoomAndBlink.classList.remove("scoreZoomAndBlink");
  }, 700);
}
