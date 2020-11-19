function SceneMain() {
  let textX = windowWidth / 2;
  let textY = windowHeight / 2;

  this.setup = function () {};

  this.draw = function () {
    background("black");
    push();
    textAlign(LEFT, TOP);
    text(
      "Ripples\nAnojan Santhakumar & Sebastian Åhman\nKreativ Programmering HT20\nSödertörns Högskola",
      10,
      10
    );
    pop();
    text("Main", textX, 20);
  };

  this.mousePressed = function () {
    userStartAudio();
    recorder();
  };
}
