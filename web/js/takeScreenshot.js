let canvas = document.querySelector('canvas');
let canvas2 = document.getElementById('abc');
let ctx = canvas2.getContext('2d');
let context = canvas.getContext('2d');
let width, height, ratio;
let timeout = 10; //milliseconds

let clip;

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
  clip = context.getImageData(video.width/2-50, video.height/2-50, video.width/2-50, video.height/2);
  // let l = clip.data.length / 4;
  //
  // for (let i = 0; i < l; i++) {
  //   let r = clip.data[i * 4 + 0];
  //   let g = clip.data[i * 4 + 1];
  //   let b = clip.data[i * 4 + 2];
  //   if (g > 100 && r > 100 && b < 43){
  //     clip.data[i * 4 + 3] = 0;
  //   }
  // }
  ctx.putImageData(clip, 0, 0);

  // Define the size of the rectangle that will be filled (basically the entire element)
  // context.fillRect(0, 0, width, height);
  // Grab the image from the video
  context.drawImage(video, 0, 0, width, height);
  // Call the function again
  setTimeout(function() {
    snap();
  }, timeout);
}
snap();

//based on: https://html5multimedia.com/code/ch9/video-canvas-screenshot.html
