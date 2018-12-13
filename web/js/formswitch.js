var random = Math.floor((Math.random() * 6));

let mysvg = document.getElementsByTagName("svg");
let mycircle = mysvg[0].cloneNode(true);
let myhexa = mysvg[1].cloneNode(true);
let mytriangle = mysvg[2].cloneNode(true);
let mycube = mysvg[3].cloneNode(true);
let myline = mysvg[4].cloneNode(true);

let previous = document.getElementById("previous");
let current = document.getElementById("current");
let next = document.getElementById("next");



function getforms() {
    //let mycircle = document.getElementsByTagName("svg")[0];
    previous.appendChild(mycircle);
    current.appendChild(mytriangle);
    next.appendChild(myhexa);
}
getforms();



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
