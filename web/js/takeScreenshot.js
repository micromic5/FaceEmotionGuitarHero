let canvas1 = document.getElementById('snapshot');
let context1 = canvas1.getContext('2d');
let canvas2 = document.getElementById('small_canvas');
let context2 = canvas2.getContext('2d');
let snapStartX;
let snapStartY;
let snapEndX;
let snapEndY;

let width, height, ratio;
let timeout = 1; //milliseconds

let clip;

video.onloadedmetadata = function() {
  //Calculate the ratio
  ratio = video.width / video.height;
  width = video.width;
  height = video.height;

  snapStartX = (width / 2) - 48;
  snapStartY = (height / 2) - 48;
  snapEndX = (width / 2);
  snapEndY = (height / 2);

  // Set the canvas1 width and height
  canvas1.width = width;
  canvas1.height = height;
  canvas1.style.display = "none";
  canvas2.style.display = "none";
  snap();
}


function snap() {
  clip = context1.getImageData(snapStartX, snapStartY, snapEndX, snapEndY);
  context2.putImageData(clip, 0, 0);
  context1.drawImage(video, 0, 0, width, height);
  // Call the function again
  setTimeout(function() {
    snap();
  }, timeout);
}

//based on: https://html5multimedia.com/code/ch9/video-canvas-screenshot.html
