console.log('write tf/model in console');
let model;
const MODEL_PATH = 'http://localhost:8080/web/models/TF.js/faceEmotionWeights/model.json';
let IMAGE_SIZE = 48;

let statusElement = document.getElementById("status");
const status = msg => (statusElement.innerText = msg);

const MODEL_PROMISE = async () => {
  status("Loading model...");
  model = await tf.loadModel(MODEL_PATH);
  status("Model loaded");
};

MODEL_PROMISE();
