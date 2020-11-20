function Intro() {
  // Deklarerar variabler som bara används i Intro
  let buttonOK;

  this.setup = function () {
    createCanvas(windowWidth, windowHeight);

    fill(255);
    textAlign(CENTER);

    // Skapar ny knapp, ger den position samt text
    buttonOK = new Clickable();
    buttonOK.locate(textX - 50, textY + 50);
    buttonOK.text = "OK";

    //Knappens färg när muspekaren inte är över den
    buttonOK.onOutside = function () {
      buttonOK.color = "white";
    };
    //Knappens färg när muspekaren är över den
    buttonOK.onHover = function () {
      buttonOK.color = "#15f709";
    };
    // Om användaren klickat och släppt musknapp, kör recorder() en gång för att initialisera den
    // Gå sedan till nästa scen
    buttonOK.onRelease = function () {
      recorder();
      mgr.showScene(SceneMain);
    };
  };

  this.draw = function () {
    background(0);

    buttonOK.draw(); // Rita upp knappen
    fill(255);

    // Information om sidan
    infoText();

    // Text som ber om användarens medgivande för att använda deras data
    push();
    textFont(font);
    textSize(18);
    text(
      "Den här sidan använder sig av din röstdata, för att använda den måste du ge ditt samtycke till att ditt inspelade ljud används.\n\n All data raderas efter 24 timmar.",
      textX,
      textY
    );
    pop();
  };

  // Tillåter "space" och "enter" för att visa nästa scen
  this.keyPressed = function () {
    if (keyCode === 32 || keyCode === ENTER) {
      mgr.showScene(SceneMain);
    }
  };
}
