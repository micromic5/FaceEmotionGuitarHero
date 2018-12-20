const url = window.location.href; // Returns full URL (https://example.com/path/example.html)
let model;
const MODEL_PATH = url + 'models/TF.js/faceEmotionWeights/model.json';
let IMAGE_SIZE = 48;
let predictionsElement = document.getElementById("predictions");
let pastPredictions = [];
const MODEL_PROMISE = async () => {
  model = await tf.loadModel(MODEL_PATH);
};

predictSnapshot();
MODEL_PROMISE();


async function predict(imgElement) {
  if (model != null) {
    const startTime = performance.now();
    const logits = tf.tidy(() => {
      // tf.fromPixels() returns a Tensor from an image element.
      const img = tf.fromPixels(imgElement).toFloat();
      let gray_img = img.mean(2);
      let final_img = gray_img.expandDims(2);
      // Reshape to a single-element batch so we can pass it to predict.
      const batched = final_img.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 1]);
      // Make a prediction through mobilenet.
      return model.predict(batched);
    });
    showResults(imgElement, logits);
  }
}

function showResults(imgElement, logits) {
  const predictionContainer = document.createElement("div");
  predictionContainer.className = "pred-container";
  //
  const probsContainer = document.createElement("div");
  let currentPrediction = replaceClassWithEmotion(logits);
  probsContainer.innerText = currentPrediction;
  pastPredictions.push(currentPrediction)
  predictionContainer.appendChild(probsContainer);
  //
  const imgContainer = document.createElement("div");
  //Rotate Cam
  imgElement.style.transform = "rotateY(180deg)";
  imgElement.style.webkitTransform = "rotateY(180deg)";
  imgElement.style.mozTransform = "rotateY(180deg)";

  imgContainer.appendChild(imgElement);
  predictionContainer.appendChild(imgContainer);
  //
  predictionsElement.insertBefore(
    predictionContainer,
    predictionsElement.firstChild
  );
  if (predictionsElement.children[1] != null) {
    predictionsElement.removeChild(predictionsElement.children[1]);
  }
}

function replaceClassWithEmotion(logits) {
  switch (logits.as1D().argMax().dataSync()[0]) {
    case 0:
      return "Angry";
      break;
    case 1:
      return "Neutral";//disgust
      break;
    case 2:
      return "Fear";
      break;
    case 3:
      return "Happy";
      break;
    case 4:
      return "Sad";
      break;
    case 5:
      return "Fear";//suprise
      break;
    case 6:
      return "Neutral";
      break;
    default:
      return "Neutral";
  }
}


function predictSnapshot() {
  let snapshot = new Image();
  snapshot.src = document.getElementById('small_canvas').toDataURL();
  snapshot.width = IMAGE_SIZE;
  snapshot.height = IMAGE_SIZE;
  snapshot.onload = () => predict(snapshot);
  setTimeout(function() {
    predictSnapshot();
  }, 1);
}
