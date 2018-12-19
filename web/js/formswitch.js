let previous = document.getElementById("previous");
let current = document.getElementById("current");
let next = document.getElementById("next");
let nextTwo = document.getElementById("nextTwo");
let currentForm = "nothing";
//used for random number
let previousNumber;
let randomNumber = -1;
let mysvg = document.getElementsByTagName("svg");
const mySVGLength = mysvg.length;

function getRNDNumberOfSVGArray() {
  do {
    previousNumber = randomNumber;
    randomNumber = Math.floor(Math.random() * mySVGLength);
  }
  while (previousNumber == randomNumber);
  return randomNumber;
}

function cloneRNDNodeOfSVG() {
  return mysvg[getRNDNumberOfSVGArray()].cloneNode(true);
}

function getforms() {
  next.appendChild(cloneRNDNodeOfSVG());
  nextTwo.appendChild(cloneRNDNodeOfSVG());
  currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
  setTimeout(function() {
    if (mostFrequentArrayElement(pastPredictions) == currentForm) {
      increaseCounter();
    }
    current.appendChild(next.getElementsByTagName("svg")[1]);
    next.appendChild(nextTwo.getElementsByTagName("svg")[0]);
    nextTwo.appendChild(cloneRNDNodeOfSVG());
    currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
  }, 4000)
  setTimeout(function() {
    if (mostFrequentArrayElement(pastPredictions) == currentForm) {
      increaseCounter();
    }
    previous.appendChild(current.getElementsByTagName("svg")[0]);
    current.appendChild(next.getElementsByTagName("svg")[1]);
    next.appendChild(nextTwo.getElementsByTagName("svg")[0]);
    previous.removeChild(previous.firstChild);
    nextTwo.appendChild(cloneRNDNodeOfSVG());
    currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
    gameLoop();
  }, 7000)
}

function gameLoop() {
  setInterval(function() {
    if (mostFrequentArrayElement(pastPredictions) == currentForm) {
      increaseCounter();
    }
    pastPredictions = [];
    previous.removeChild(previous.firstChild);
    setTimeout(function() {
      previous.appendChild(current.getElementsByTagName("svg")[0]);
      current.appendChild(next.getElementsByTagName("svg")[1]);
      next.appendChild(nextTwo.getElementsByTagName("svg")[0]);
      nextTwo.appendChild(cloneRNDNodeOfSVG());
      currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
    }, 100);
  }, 2000);
}

function mostFrequentArrayElement(array) {
  if (array.length == 0)
    return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
