console.log('write tf, model in console');
let model;
const modelPromise = tf.loadModel('http://localhost:8080/web/models/TF.js/faceEmotionWeights/model.json');


modelPromise.then(function(value) {
  console.log(value); // Success!
  model = value;
});
