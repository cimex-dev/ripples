let mic;
let soundRec;
let soundFile;
let voiceFiles;
let mgr;
let cols;
let colsBG;
let rows;
let rowsBG;
let current;
let previous;
let level;
let url;

let dampening = 0.99;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  soundRec = new p5.SoundRecorder();
  soundRec.setInput(mic);
  soundFile = new p5.SoundFile();
  getAudioContext().suspend();
  url = "/uploads.json";
  voiceFiles = loadJSON(url, onFileLoad);
  console.log(url);
  level = floor(mic.getLevel() * 1000);

  fill("255");
  //  rectMode(CENTER);

  pixelDensity(1);

  cols = width;
  rows = height;
  colsBG = windowWidth;
  rowsBG = windowHeight;

  current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));

  mgr = new SceneManager();
  mgr.addScene(Intro);
  mgr.addScene(SceneMain);
  mgr.showNextScene();
}

function onFileLoad() {
  console.log("loaded successfully");
}

function draw() {
  mgr.draw();
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}
function touchStarted() {
  mgr.handleEvent("touchStarted");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
