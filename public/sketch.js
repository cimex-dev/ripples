let button;
let mic;
let soundRec;
let soundFile;
let audioFiles;
let mgr;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  soundRec = new p5.SoundRecorder();
  soundRec.setInput(mic);
  soundFile = new p5.SoundFile();
  getAudioContext().suspend();
  let url = "/uploads.json";
  audioFiles = loadJSON(url);

  createCanvas(windowWidth, windowHeight);

  mgr = new SceneManager();
  mgr.addScene(Intro);
  mgr.addScene(SceneMain);

  mgr.showNextScene();
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

function canvasResized() {
  mgr.handleEvent("resizeCanvas");
  resizeCanvas(windowWidth, windowHeight, [noRedraw]);
}

//  cnv.mouseClicked((mouseEvent) => {
//
//

// =============================================================
// =                         BEGIN SCENES                      =
// =============================================================

function Intro() {
  let textX;
  let textY;
  let buttonOK;

  this.setup = function () {
    textX = width / 2;
    textY = width / 2;

    background("black");
    textAlign(CENTER);

    fill("white");
    text(
      "Den här sidan använder sig av röstdata, för att använda den måste du ge ditt samtycke till att ditt inspelade ljud används.\n\n All data raderas efter 24 timmar.",
      width / 2,
      height / 2
    );

    buttonOK = createButton("OK");
    buttonOK.position(width / 2, height / 2 + 80);
    buttonOK.mousePressed(this.nextScene);
    buttonOK.style("background-color", "green");
    buttonOK.style("width", "150px");
    //buttonOK.style("position", "relative");
    buttonOK.style("overflow", "hidden");
    buttonOK.style("cursor", "pointer");
    buttonOK.style("width", "150px");
    buttonOK.style("width", "150px");
    buttonOK.style("width", "150px");
    buttonOK.style("width", "150px");
    buttonOK.style("width", "150px");
    buttonCircle = createDiv("circle");
    buttonCircle.position(width / 2, height / 2 + 80);
    //buttonOK.style("align-items", "center");

    /*#button-3 {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

#button-3 a {
  position: relative;
  transition: all .45s ease-Out;
}

#circle {
  width: 0%;
  height: 0%;
  opacity: 0;
  line-height: 40px;
  border-radius: 50%;
  background: #BFC0C0;
  position: absolute;
  transition: all .5s ease-Out;
  top: 20px;
  left: 70px;
}

#button-3:hover #circle {
  width: 200%;
  height: 500%;
  opacity: 1;
  top: -70px;
  left: -70px;
}

#button-3:hover a {
  color: #2D3142;
}
*/
  };

  this.draw = function () {};

  this.nextScene = function () {
    this.sceneManager.showNextScene();
  };

  this.keyPressed = function () {
    if (keyCode === 32 || keyCode === ENTER) {
      this.sceneManager.showNextScene();
      removeElements();
    }
  };
}

function SceneMain() {
  this.draw = function () {
    background("gray");
  };
}

function canvasPressed() {
  //userStartAudio();

  console.log("recording....");
  soundRec.record(soundFile); // set up the soundfile to record and start recording

  let recordingTimer = setTimeout(() => {
    // setup a timeout for the recording, after the time below expires, do the tings inside the {}

    soundRec.stop(); // stop recording
    let soundBlob = soundFile.getBlob(); //get the recorded soundFile's blob & store it in a variable

    let formdata = new FormData(); //create a from to of data to upload to the server
    formdata.append("soundBlob", soundBlob, "audio.wav"); // append the sound blob and the name of the file. third argument will show up on the server as req.file.originalname

    // Now we can send the blob to a server...
    var serverUrl = "/upload"; //we've made a POST endpoint on the server at /upload
    //build a HTTP POST request
    var httpRequestOptions = {
      method: "POST",
      body: formdata, // with our form data packaged above
      headers: new Headers({
        enctype: "multipart/form-data", // the enctype is important to work with multer on the server
      }),
    };
    // console.log(httpRequestOptions);
    // use p5 to make the POST request at our URL and with our options
    httpDo(
      serverUrl,
      httpRequestOptions,
      (successStatusCode) => {
        //if we were successful...
        console.log("uploaded recording successfully: " + successStatusCode);
      },
      (error) => {
        console.error(error);
      }
    );
    console.log("recording stopped");
  }, 6000); //record for ten  second(s)
} // close mouseClicked handler
//close setup()
