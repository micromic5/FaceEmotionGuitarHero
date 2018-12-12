let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let width, height, ratio;


video.onloadedmetadata = function() {
  //Calculate the ratio
  ratio = video.width / video.height;
  width = video.width;
  height = video.height;
  // Set the canvas width and height to the values just calculated
  canvas.width = width;
  canvas.height = height;
}

// Takes a snapshot of the video
function snap() {
  // Define the size of the rectangle that will be filled (basically the entire element)
  context.fillRect(0, 0, width, height);
  // Grab the image from the video
  context.drawImage(video, 0, 0, width, height);
}

//based on: https://html5multimedia.com/code/ch9/video-canvas-screenshot.html
