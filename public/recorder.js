function recorder() {
  console.log("recording....");
  soundRec.record(soundFile); // Sätt upp ljudfilen och börja spela in

  let recordingTimer = setTimeout(() => {
    // Timeout som efter 6 sekunder utför alla funktioner innanför {}

    soundRec.stop(); // Stoppa inspelning
    let soundBlob = soundFile.getBlob(); // Tar bloben för den inspelade ljudfilen och sätter in i variabel

    let formdata = new FormData(); // Skapar formulärdata som kan skickas upp mot servern
    formdata.append("soundBlob", soundBlob, "audio.wav"); // Hämta in ljudfilen och sätt in den som formulärdata

    let serverUrl = "/upload"; // Skickar förfrågan till "/upload" i serverskriptet
    // Bygg en förfrågan till HTTP POST
    let httpRequestOptions = {
      method: "POST",
      body: formdata, // Skickar formdatan som hämtats ovan
      headers: new Headers({
        enctype: "multipart/form-data", // Berättar för servern vad för data som skickas
      }),
    };
    // p5-funktion som skickar POST-förfrågan till vår angivna URL med inställningarna ovan
    httpDo(
      serverUrl,
      httpRequestOptions,
      (successStatusCode) => {
        // Skriv ut meddelande om uppladdningen lyckades
        console.log("uploaded recording successfully: " + successStatusCode);
      },
      (error) => {
        // Annars skriv ut felmeddelande
        console.error(error);
      }
    );
    console.log("recording stopped");
  }, 6000); // Spela in i 6 sekunder
}
