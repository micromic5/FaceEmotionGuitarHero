let mysvg = document.getElementsByTagName("svg");
const mycircle = mysvg[0].cloneNode(true);
const myhexa = mysvg[1].cloneNode(true);
const mytriangle = mysvg[2].cloneNode(true);
const mycube = mysvg[3].cloneNode(true);
const myline = mysvg[4].cloneNode(true);

let previous = document.getElementById("previous");
let current = document.getElementById("current");
let next = document.getElementById("next");

let randomForms = mysvg[Math.floor(Math.random() * mysvg.length)].cloneNode(true);
var currentForm = "nothing";

function getRNDNumberOfSVGArray() {
	return Math.floor(Math.random()* mysvg.length);
}

function cloneRNDNodeOfSVG() {
	return mysvg[getRNDNumberOfSVGArray()].cloneNode(true);
}

function getforms() {
  next.appendChild(cloneRNDNodeOfSVG());
  setTimeout(function(){
    current.appendChild(next.getElementsByTagName("svg")[0]);
    next.appendChild(cloneRNDNodeOfSVG());
    currentForm = current.firstElemntChild.id;
  },5000)
  setTimeout(function(){
    console.log(mostFrequentArrayElement(pastPredictions));
    console.log("curren:"+currentForm)
    previous.appendChild(current.getElementsByTagName("svg")[0]);
    current.appendChild(next.getElementsByTagName("svg")[0]);
    next.appendChild(cloneRNDNodeOfSVG());
    previous.removeChild(previous.firstChild);
    currentForm = current.firstElemntChild.id;
    gameLoop();
  },9000)
}

function gameLoop(){
    setInterval(function(){
        console.log(mostFrequentArrayElement(pastPredictions));
        console.log("curren:"+currentForm)
        pastPredictions = [];
        previous.removeChild(previous.firstChild);
        setTimeout(function(){
            previous.appendChild(current.getElementsByTagName("svg")[0]);
            current.appendChild(next.getElementsByTagName("svg")[0]);
            next.appendChild(cloneRNDNodeOfSVG());
            currentForm = current.firstElemntChild.id;
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
getforms();