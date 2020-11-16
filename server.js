"use strict";

const express = require("express"); //make express available
// Create the app
const app = express(); //invoke express

const multer = require("multer"); //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable (just like express, see above ( include it, then use it/set it up))
const fs = require("fs"); //use the file system so we can save files
const write = require("write");

// Set up the server
// process.env.PORT is related to deploying on heroku

var server = app.listen(process.env.PORT || 5000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application listening at http://" + host + ":" + port);
}

app.post("/upload", upload.single("soundBlob"), function (req, res, next) {
  // console.log(req.file); // see what got uploaded
  //let num = 0;
  let r = Math.floor(Math.random() * 10000 + 1);
  let uploadLocation = __dirname + "/public/uploads/" + "audio (" + r + ").wav"; // where to save the file to. make sure the incoming name has a .wav extension
  //  increment.file(uploadLocation, { fs: true });
  write.sync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)), {
    flag: "a+",
  });

  /*fs.writeFileSync(
    uploadLocation,
    Buffer.from(new Uint8Array(req.file.buffer))
  );*/
  // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok
});

//serve out any static files in our public HTML folder
app.use(express.static("public"));

//makes the app listen for requests on port 3000
/*app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
*/
