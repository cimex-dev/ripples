function recorder() {
  userStartAudio();

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