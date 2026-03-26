import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model = null;
let isLoading = false;

export const loadModel = async (onProgress) => {
  if (model) return model;
  if (isLoading) {
    // Wait for existing load
    while (isLoading) {
      await new Promise(r => setTimeout(r, 200));
    }
    return model;
  }
  
  isLoading = true;
  try {
    if (onProgress) onProgress('Loading AI model...');
    model = await mobilenet.load({ version: 2, alpha: 0.5 }); // Smaller, faster model
    if (onProgress) onProgress('Model ready!');
    return model;
  } catch (err) {
    console.error('Failed to load MobileNet:', err);
    throw err;
  } finally {
    isLoading = false;
  }
};

export const classifyImage = async (videoElement) => {
  if (!model) {
    model = await loadModel();
  }
  
  // Run classification on the video frame
  const predictions = await model.classify(videoElement, 5);
  
  return predictions.map(p => ({
    label: p.className,
    confidence: Math.round(p.probability * 100)
  }));
};
