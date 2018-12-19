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
  },5000)
  setTimeout(function(){
    previous.appendChild(current.getElementsByTagName("svg")[0]);
    current.appendChild(next.getElementsByTagName("svg")[0]);
    next.appendChild(cloneRNDNodeOfSVG());
    previous.removeChild(previous.firstChild);
    gameLoop();
  },9000)
}

function gameLoop(){
    setInterval(function(){
        previous.removeChild(previous.firstChild);
        setTimeout(function(){
            previous.appendChild(current.getElementsByTagName("svg")[0]);
            current.appendChild(next.getElementsByTagName("svg")[0]);
            next.appendChild(cloneRNDNodeOfSVG());
        },100);
    },2000);
}

getforms();
/*

let previousStyle = previous.children[0].style;
let currentStyle = current.children[0].style;
let nextStyle = next.children[0].style;


function styles() {
  previousStyle.transform = "scale(3,3)";
  currentStyle.transform = "scale(5,5)";
  nextStyle.transform = "scale(3,3)";

  previousStyle.opacity = "0.2";
  nextStyle.opacity = "0.5";
}

styles();

*/
/*Switch function*/
/*switch(new random) {
    case 0:
        mycircle;
        break;
    case 1:
        myhexa;
        break;
    case 2:
        mytriangle;
        break;
    case 3:
        mycube;
        break;
    case 4:
        myline;
        break;
}*/
