"use strict";

const express = require("express"); // Se till att express laddas in
const app = express(); // Starta express
const multer = require("multer"); // Multer används för att ladda upp blobdata (.wav)
const upload = multer(); // Sätt multer till att vara variabeln "upload"
const fs = require("fs"); // Använd filsystemet för att kunna skriva filer.
const write = require("write"); // En modul som utökar 'fs' funktioner

// Sätt upp servern
// process.env.PORT säger till Heroku att binda node till en port
var server = app.listen(process.env.PORT || 5000, listen);

// Callback som meddelar att servern har startat
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application listening at http://" + host + ":" + port);
}

// Lyssnar efter att funktionen "recorder" ska skicka en förfrågan till "/upload"
app.post("/upload", upload.single("soundBlob"), function (req, res, next) {
  console.log(req.file); // Se vad som laddats upp

  // Enkel variabel som slumpar ett värde mellan 1-10,000 i syfte att ha nog med namn så att de inte skriver över varandra
  // Den här funktionen ville inte automatiskt inkrementera namnet utan skrev över en enda fil om och om igen, varför den istället bara slumpas ett värde som är stort nog för att göra risken att skriva över en existerande fil väldigt liten
  let r = Math.floor(Math.random() * 10000 + 1);
  let uploadLocation = __dirname + "/public/uploads/" + "audio (" + r + ").wav"; // Var filen ska sparas, använder det slumpade värdet i filnamnet

  // Skriver filen till platsen som angetts, använder sparad buffer från webbläsaren som data
  write(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)), (err) => {
    if (err) throw err;

    console.log("Uploaded recording.");
  });

  // Lägger till en rad i "uploads.txt" med namnet på den nyskapade ljudfilen
  fs.appendFile("./public/uploads.txt", "audio (" + r + ").wav\n", (err) => {
    if (err) throw err;

    console.log("Done writing to textfile.");
  });

  res.sendStatus(200); // Skicka ett meddelande om allt gått rätt
});

// Håll mappen "public" öppen utåt.
app.use(express.static("public"));
