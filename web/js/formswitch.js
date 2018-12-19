let mysvg = document.getElementsByTagName("svg");
const mycircle = mysvg[0].cloneNode(true);
const myhexa = mysvg[1].cloneNode(true);
const mytriangle = mysvg[2].cloneNode(true);
const mycube = mysvg[3].cloneNode(true);
const myline = mysvg[4].cloneNode(true);





let previous = document.getElementById("previous");
let current = document.getElementById("current");
let next = document.getElementById("next");
let nextTwo = document.getElementById("nextTwo");

let randomForms = mysvg[Math.floor(Math.random() * mysvg.length)].cloneNode(true);
var currentForm = "nothing";

function getRNDNumberOfSVGArray() {
	var test = Math.floor(Math.random() * 5);
	return test;
}

function cloneRNDNodeOfSVG() {
	return mysvg[getRNDNumberOfSVGArray()].cloneNode(true);
}

function getforms() {
  next.appendChild(cloneRNDNodeOfSVG());
  nextTwo.appendChild(cloneRNDNodeOfSVG());
  currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
  setTimeout(function(){
    if(mostFrequentArrayElement(pastPredictions) == currentForm){
        increaseCounter();
    }
    current.appendChild(next.getElementsByTagName("svg")[1]);
    next.appendChild(nextTwo.getElementsByTagName("svg")[0]);
    nextTwo.appendChild(cloneRNDNodeOfSVG());
    currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
  },4000)
  setTimeout(function(){
    if(mostFrequentArrayElement(pastPredictions) == currentForm){
        increaseCounter();
    }
    previous.appendChild(current.getElementsByTagName("svg")[0]);
    current.appendChild(next.getElementsByTagName("svg")[1]);
    next.appendChild(nextTwo.getElementsByTagName("svg")[0]);
    previous.removeChild(previous.firstChild);
    nextTwo.appendChild(cloneRNDNodeOfSVG());
    currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
    gameLoop();
  },7000)
}

function gameLoop(){
    setInterval(function(){
        if(mostFrequentArrayElement(pastPredictions) == currentForm){
            increaseCounter();
        }
        pastPredictions = [];
        previous.removeChild(previous.firstChild);
        setTimeout(function(){
            previous.appendChild(current.getElementsByTagName("svg")[0]);
            current.appendChild(next.getElementsByTagName("svg")[1]);
            next.appendChild(nextTwo.getElementsByTagName("svg")[0]);
            nextTwo.appendChild(cloneRNDNodeOfSVG());
            currentForm = next.getElementsByTagName("svg")[1].getAttribute("emotion");
        },100);
    },2000);
}

function mostFrequentArrayElement(array){
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}
