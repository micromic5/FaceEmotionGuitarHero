let scoreNumber = document.getElementById("scoreNumber");
let counter = 0;


function MyScore(counter) {
  scoreNumber.innerHTML = counter;
};

function increaseCounter() {
  MyScore(counter += 1);
}