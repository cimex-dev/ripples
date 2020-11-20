// Skapar globala variabler som används igenom programmet
let mic;
let soundRec;
let soundFile;
let voiceFiles = [];
let mgr;
let level;
let voice;
let voiceName;
let randomVoice;
let voiceArray;
let reverb;
let amplitude;
let font;
let textX;
let textY;

p5.disableFriendlyErrors = true;

function preload() {
  // Laddar in en array med namnen på inspelade ljudfiler
  // Callback som startar funktionen onFileLoad() vilken laddar in ljudfilerna
  voiceArray = loadStrings("uploads.txt", onFileLoad);
  font = loadFont("./assets/XanhMono-Regular.ttf"); // Laddar in typsnitt
}

function setup() {
  // Startar olika ljudfunktioner
  mic = new p5.AudioIn();
  mic.start();
  soundRec = new p5.SoundRecorder();
  soundRec.setInput(mic);
  soundFile = new p5.SoundFile();
  getAudioContext().suspend();

  textX = windowWidth / 2;
  textY = windowHeight / 2;

  fill("255");

  // Startar SceneManager och skapar scener
  mgr = new SceneManager();
  mgr.addScene(Intro);
  mgr.addScene(SceneMain);
  mgr.showNextScene(); // Går direkt till den första scenen
}

function onFileLoad() {
  console.log("loaded Voices successfully");

  voiceArray.splice(-1, 1); // Tar bort den sista raden i arrayen eftersom den är tom

  for (i = 0; i < 2; i++) {
    // Loopar igenom arrayen och väljer två värden
    randomVoice = floor(random(voiceArray.length)); // Slumpar ett värde från hela arrayen
    // Laddar två stycken slumpade filer och har en callback som ser till att de
    // skickas till Main
    voiceFiles[i] = loadSound(
      "./uploads/" + voiceArray[randomVoice],
      SceneMain.mousePressed + SceneMain.keyPressed
    );
    voiceFiles[i].setVolume(0.5); //Sänk volymen på uppspelade ljudfiler
  }
  console.log(voiceFiles); // Visar vilka av filerna som har laddats in
}

function draw() {
  mgr.draw(); // Binder draw till scenemanager
}

function keyPressed() {
  mgr.handleEvent("keyPressed"); // Binder keyPressed till scenemanager
}

function mousePressed() {
  mgr.handleEvent("mousePressed"); // Binder mousePressed till scenemanager
  userStartAudio(); // Startar ljud på interaktion
}

function mouseIsPressed() {
  mgr.handleEvent("mouseIsPressed"); // Binder mouseIsPressed till scenemanager
}

function touchStarted() {
  mgr.handleEvent("touchStarted"); // Binder touchStarted till scenemanager
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Funktion för att ändra canvas storlek om användaren byter fönsterstorlek
}

// Funktion för att enkelt visa infotexten
function infoText() {
  push();
  textAlign(LEFT, TOP);
  text(
    "Ripples\nAnojan Santhakumar & Sebastian Åhman\nKreativ Programmering HT20\nSödertörns Högskola\nhttps://github.com/cimnex/ripples",
    10,
    10
  );
  pop();
}
