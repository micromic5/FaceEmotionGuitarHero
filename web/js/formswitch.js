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
    myhexa.style.backgroundColor="red";
}

/*function classes() {
    previous.classList.add("small-op");
    current.classList.add("big");
    next.classList.add("small");
}*/


getforms();


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
