let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let width, height, ratio;
let timeout = 10; //milliseconds


video.onloadedmetadata = function() {
  //Calculate the ratio
  ratio = video.width / video.height;
  width = video.width;
  height = video.height;
  // Set the canvas width and height
  canvas.width = width;
  canvas.height = height;
}


function snap() {
  // Define the size of the rectangle that will be filled (basically the entire element)
  context.fillRect(0, 0, width, height);
  // Grab the image from the video
  context.drawImage(video, 0, 0, width, height);
  // Call the function again
  setTimeout(function() {
    snap();
  }, timeout);
}
snap();

//based on: https://html5multimedia.com/code/ch9/video-canvas-screenshot.html
