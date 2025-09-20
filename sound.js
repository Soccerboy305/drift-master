// sound.js — handles game sound effects

const sounds = {
  engine: new Audio('assets/sounds/engine.mp3'),
  drift: new Audio('assets/sounds/drift.mp3'),
  crash: new Audio('assets/sounds/crash.mp3'),
  lap: new Audio('assets/sounds/lap.mp3')
};

// Set volume levels
sounds.engine.volume = 0.4;
sounds.drift.volume = 0.6;
sounds.crash.volume = 0.7;
sounds.lap.volume = 0.8;

// Loop engine sound
sounds.engine.loop = true;

// Play engine when game starts
function startEngine() {
  sounds.engine.play();
}

// Stop engine
function stopEngine() {
  sounds.engine.pause();
  sounds.engine.currentTime = 0;
}

// Trigger drift sound
function playDrift() {
  sounds.drift.currentTime = 0;
  sounds.drift.play();
}

// Trigger crash sound
function playCrash() {
  sounds.crash.currentTime = 0;
  sounds.crash.play();
}

// Trigger lap sound
function playLap() {
  sounds.lap.currentTime = 0;
  sounds.lap.play();
}
