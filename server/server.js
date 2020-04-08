var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../public'))


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get('/api/notes', function(req, res) {
  res.sendFile((path.join(__dirname, "../db/db.json")));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post('/api/notes', function(req, res)  {
  fs.readFile(path.join(__dirname, "../db/db.json"), function(err, file){
    if(err){
      console.log(err)
    } else {
      const newFile = JSON.parse(file)
      newFile.push(req.body)
    }
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(f),  function(err){
        if(err){
            console.log(err);
      }
    }) 
  })  
});

app.delete('/api/notes/:id', function(req, res)  {
 res.hhfg()
})

 







app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
