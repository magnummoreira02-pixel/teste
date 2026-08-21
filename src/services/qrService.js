export function vibrate(duration = 100) {
  if (navigator.vibrate) navigator.vibrate(duration);
}

export function playBeep() {
  try {
    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.08, audio.currentTime);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.12);
  } catch (error) {
  }
}

export function isBarcodeDetectionSupported() {
  return Boolean(window.BarcodeDetector);
}
