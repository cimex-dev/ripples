function Intro() {
  let textX;
  let textY;
  let buttonNO;
  let buttonOK;

  this.setup = function () {
    createCanvas(windowWidth, windowHeight);
    textX = windowWidth / 2;
    textY = windowHeight / 2;

    fill(255);
    textAlign(CENTER);

    buttonOK = new Clickable();
    buttonOK.locate(textX - 100, textY + 50);
    buttonOK.text = "OK";

    buttonOK.onOutside = function () {
      buttonOK.color = "white";
    };
    buttonOK.onHover = function () {
      buttonOK.color = "#15f709";
    };
    buttonOK.onRelease = function () {
      mgr.showScene(SceneMain);
    };

    buttonNO = new Clickable();
    buttonNO.locate(textX + 50, textY + 50);
  };

  this.draw = function () {
    background(0);

    buttonOK.draw();
    buttonNO.draw();
    fill(255);

    push();
    textAlign(LEFT, TOP);
    text(
      "Ripples\nAnojan Santhakumar & Sebastian Åhman\nKreativ Programmering HT20\nSödertörns Högskola",
      10,
      10
    );
    pop();
    text(
      "Den här sidan använder sig av röstdata, för att använda den måste du ge ditt samtycke till att ditt inspelade ljud används.\n\n All data raderas efter 24 timmar.",
      textX,
      textY
    );
    //text("Intro", textX, 20);
  };

  this.keyPressed = function () {
    if (keyCode === 32 || keyCode === ENTER) {
      mgr.showScene(SceneMain);
      removeElements();
    }
  };

  this.mousePressed = function () {
    userStartAudio();
    recorder2(); //get the recorded soundFile's blob & store it in a variable
    //record for ten  second(s)
  }; // close mouseClicked handler
}
