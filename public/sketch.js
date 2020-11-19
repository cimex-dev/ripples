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

function preLoad() {
  url = "/uploads.txt";
}

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  soundRec = new p5.SoundRecorder();
  soundRec.setInput(mic);
  soundFile = new p5.SoundFile();
  getAudioContext().suspend();


  voiceFiles = loadJSON("/uploads.json", onFileLoad);



  level = floor(mic.getLevel() * 1000);

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
//  randomVoice = random(result);
  voiceName = randomVoice;
  voice = createAudio("./uploads/" + voiceFiles[0]["name"], SceneMain.mousePressed);
  console.log(voice);
}

function draw() {
  mgr.draw();
}

function keyPressed() {
  mgr.handleEvent("keyPressed");
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
  console.log(randomVoice);
}
function touchStarted() {
  mgr.handleEvent("touchStarted");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
