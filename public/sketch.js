let mic;
let soundRec;
let soundFile;
let voiceFiles = [];
let mgr;
let colsBG;
let rowsBG;
let level;
let url;
let voice;
let voiceName;
let randomVoice;
let voiceObject;
let voiceArray;
let reverb;
let amplitude;
let bgNoise;
let font;

p5.disableFriendlyErrors = true;

function preload() {
  //url = "/uploads.txt";
  voiceArray = loadStrings("uploads.txt", onFileLoad);
  bgNoise = loadSound("./assets/space bass-002.mp3");
  font = loadFont("./assets/XanhMono-Regular.ttf");
}

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  soundRec = new p5.SoundRecorder();
  soundRec.setInput(mic);
  soundFile = new p5.SoundFile();
  getAudioContext().suspend();

  //bgNoise.loop();
  fill("255");

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
  console.log("loaded Voices successfully");
  voiceArray.splice(-1, 1);

  for (i = 0; i < 2; i++) {
    randomVoice = floor(random(voiceArray.length));
    voiceFiles[i] = loadSound(
      "./uploads/" + voiceArray[randomVoice],
      SceneMain.mousePressed
    );
  }
  console.log(voiceFiles);
}

function draw() {
  mgr.draw();
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
  userStartAudio();
}

function mouseIsPressed() {
  mgr.handleEvent("mouseIsPressed");
}

function touchStarted() {
  mgr.handleEvent("touchStarted");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
