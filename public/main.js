function SceneMain() {
  // Variabler som bara används i SceneMain
  let prevLevels = new Array(60);
  let buttonRec;

  this.setup = function () {
    // Skapar reverbfunktion
    reverb = new p5.Reverb();

    // Kopplar bort ljudfilerna från den torra signalen
    voiceFiles[0].disconnect();
    voiceFiles[1].disconnect();

    // Processar ljudfilerna med reverb och skickar tillbaka som våt signal
    reverb.process(voiceFiles[0], 3, 2);
    reverb.process(voiceFiles[1], 3, 2);
    reverb.drywet();

    background(0);
    noStroke();

    rectMode(CENTER);
    colorMode(HSB);

    // Skapar amplitude som analyserar ljudnivåer
    amplitude = new p5.Amplitude();
    amplitude.setInput(mic);
    amplitude.smooth(0.6);

    // Skapar knapp för inspelning
    buttonRec = new Clickable();
    buttonRec.locate(textX - 50, textY + 50);
    buttonRec.text = "REC";
    buttonRec.color = "#b55959";
    buttonRec.onPress = function () {
      this.color = "#ff2b2b";
      recorder(); // Startar inspelningfunktionen på knapptryck
    };
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

    //Hämtar ljudnivå på mic och stoppar in i variabel
    level = amplitude.getLevel() / 5;

    // Variabler för ljudvisualiseringen
    let spacing = 10;
    let w = width / (prevLevels.length * spacing);
    let minHeight = 2;
    let roundness = 20;

    // Lägg till ny ljudstyrka i slutet av arrayen
    prevLevels.push(level);

    // Tar bort värden ur arrayen
    prevLevels.splice(0, 1);

    // Loopa igenom alla föregående ljudnivåer
    for (let i = 0; i < prevLevels.length; i++) {
      let x = map(i, prevLevels.length, 0, width / 2, width);
      let h = map(prevLevels[i], 0, 0.5, minHeight, height);

      // Tilldela ett alphavärde till de uppritade rektanglarna för att ge dem "fade"
      let alphaValue = logMap(i, 0, prevLevels.length, 1, 250);

      // Använd map för att dynamiskt ändra färgvärdet på visualiseringen
      let hueValue = map(h, minHeight, height, 200, 255);

      // Fyll med de skapade färgerna
      fill(hueValue, 255, 255, alphaValue);

      // Rita upp rektanglar och skicka dem åt två olika håll
      rect(x, height - 100, w, h);
      rect(width - x, height - 100, w, h);
    }

    // Text som ställer en fråga som användaren bes svara på
    // Tanken här är att det ska finnas flera scener med olika frågor och att användaren
    // ska höra svaren från andra personer när de sitter och tänker
    push();
    textSize(48);
    textFont(font);
    text("När pratade du senast med din granne?", textX, textY);
    pop();
  };

  // Spela den ena ljudfilen på musklick
  this.mousePressed = function () {
    voiceFiles[0].pan(1); // Panorera ljudet till höger
    voiceFiles[0].play(); // Spelar ljudfil med reverb pålagt
  };

  // Spelar ljudfil 2 på tangentbord "space" eller "enter"
  this.keyPressed = function () {
    if (keyCode === 32 || keyCode === ENTER) {
      voiceFiles[1].pan(-1); // Panorerar tilll vänster
      voiceFiles[1].play(); // Spelar upp ljudfil (med reverb)
    }
  };
}
