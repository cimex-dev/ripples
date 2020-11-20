function SceneMain() {
  let textX = windowWidth / 2;
  let textY = windowHeight / 2;

  this.setup = function () {
    reverb = new p5.Reverb();

    voiceFiles[0].disconnect();
    voiceFiles[1].disconnect();
    reverb.process(voiceFiles[0], 3, 2);
    reverb.process(voiceFiles[1], 3, 2);
    reverb.drywet();

    pixelDensity(1);
    cols = width;
    rows = height;
    // The following line initializes a 2D cols-by-rows array with zeroes
    // in every array cell, and is equivalent to this Processing line:
    // current = new float[cols][rows];
    current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
    previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
  };

  this.draw = function () {
    background(0);

    push();
    textAlign(LEFT, TOP);
    text(
      "Ripples\nAnojan Santhakumar & Sebastian Åhman\nKreativ Programmering HT20\nSödertörns Högskola",
      10,
      10
    );
    pop();
    text("Main", textX, 20);

    loadPixels();
    for (let i = 1; i < cols - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        current[i][j] =
          (previous[i - 1][j] +
            previous[i + 1][j] +
            previous[i][j - 1] +
            previous[i][j + 1]) /
            2 -
          current[i][j];
        current[i][j] = current[i][j] * dampening;
        // Unlike in Processing, the pixels array in p5.js has 4 entries
        // for each pixel, so we have to multiply the index by 4 and then
        // set the entries for each color component separately.
        let index = (i + j * cols) * 4;
        pixels[index + 0] = current[i][j];
        pixels[index + 1] = current[i][j];
        pixels[index + 2] = current[i][j];
      }
    }
    updatePixels();

    let temp = previous;
    previous = current;
    current = temp;

    console.log(level);
  };

  this.voiceActivate = function () {};

  this.mousePressed = function () {
    userStartAudio();
    voiceFiles[0].pan(1);
    //recorder();
    voiceFiles[0].play(level);
    level = floor(voiceFiles[0].getLevel() * 100);
    let levelWidth = map(level, 0, width, 0, width);
    let levelHeight = map(level, 0, height, 0, height);
    previous[100][100] = 1500;
  };

  this.keyPressed = function () {
    if (keyCode === 32 || keyCode === ENTER) {
      voiceFiles[1].pan(-1);
      voiceFiles[1].play();
    }
  };
}
