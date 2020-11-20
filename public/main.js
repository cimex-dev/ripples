function SceneMain() {
  let textX = windowWidth / 2;
  let textY = windowHeight / 2;
  var prevLevels = new Array(60);
  let recorderStarted = false;
  let buttonRec;

  this.setup = function () {
    reverb = new p5.Reverb();

    voiceFiles[0].disconnect();
    voiceFiles[1].disconnect();
    reverb.process(voiceFiles[0], 3, 2);
    reverb.process(voiceFiles[1], 3, 2);
    reverb.drywet();

    background(0);
    noStroke();

    rectMode(CENTER);
    colorMode(HSB);

    amplitude = new p5.Amplitude();
    amplitude.setInput(mic);
    amplitude.smooth(0.6);

    buttonRec = new Clickable();
    buttonRec.locate(textX - 50, textY + 50);
    buttonRec.text = "Record";
    buttonRec.color = "#b55959";
    buttonRec.onPress = function () {
      this.color = "#ff2b2b";
      recorder();
    };

    let buttonTimer = setTimeout(() => {
      buttonRec.onOutside = function () {
        this.color = "#white";
      };
    }, 6000);
  };

  this.draw = function () {
    background(0);
    fill(255, 10);

    push();
    rectMode(CORNER);
    buttonRec.draw();
    pop();

    push();
    textAlign(LEFT, TOP);
    text(
      "Ripples\nAnojan Santhakumar & Sebastian Åhman\nKreativ Programmering HT20\nSödertörns Högskola",
      10,
      10
    );
    pop();
    //  text("Main", textX, 20);

    var level = amplitude.getLevel() / 10;

    // rectangle variables
    var spacing = 10;
    var w = width / (prevLevels.length * spacing);

    var minHeight = 2;
    var roundness = 20;

    // add new level to end of array
    prevLevels.push(level);

    // remove first item in array
    prevLevels.splice(0, 1);

    // loop through all the previous levels
    for (var i = 0; i < prevLevels.length; i++) {
      var x = map(i, prevLevels.length, 0, width / 2, width);
      var h = map(prevLevels[i], 0, 0.5, minHeight, height);

      var alphaValue = logMap(i, 0, prevLevels.length, 1, 250);

      var hueValue = map(h, minHeight, height, 200, 255);

      fill(hueValue, 255, 255, alphaValue);

      rect(x, height - 40, w, h);
      rect(width - x, height - 40, w, h);
    }

    text("När pratade du senaste med din granne?", textX, textY);
  };

  this.voiceActivate = function () {};

  this.mousePressed = function () {
    userStartAudio();
    voiceFiles[0].pan(1);
    //recorder();
    voiceFiles[0].play(level);
  };

  this.keyPressed = function () {
    if (keyCode === 32 || keyCode === ENTER) {
      voiceFiles[1].pan(-1);
      voiceFiles[1].play();
    }
  };
}
