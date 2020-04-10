const express = require("express");
const path = require("path");
const fs = require("fs");
//const db = require('./db/db.json')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


testArray = []



//*****BACK*****

// get data the db.json file
app.get('/api/notes', function (req, res) {
 // res.sendFile((path.join(__dirname, "db/db.json")));
  fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', function (err, file) {
    let currentData = JSON.parse(file);
    console.log(currentData)
    currentData.forEach((element, i) => {
      element.id = i

    });
    res.json(currentData)

  });
});

// receive new note and write it at the DB
app.post('/api/notes', function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', function (err, file) {
    if (err) {
      console.log(err)
    } else {
      // console.log(file)
      const newArray = JSON.parse(file)
      newArray.push(req.body)

      //console.log(newArray)

      // add it to db.json
      fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newArray), function (err) {
        if (err) {
          console.log(err);
        }
        res.json(req.body)
      })
    }
  })
});



app.delete('/api/notes/:id', function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', function (err, file) {
    if (err) {
      console.log(err)
    } else {

      let key = req.params.id;
      console.log(key)
      //console.log(key);
      let CurrentData = JSON.parse(file)
      CurrentData.splice(key, 1)
      console.log(CurrentData)
      fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(CurrentData), function (err) {
        if(err){
          console.log(err);
          
        } else {
          
          res.status(200).send("test");
        }
      

      })
    }
  });
});


/*
app.delete("api/notes/:id", function(req, res) {
  //get the data
  let data = fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', function (err, file) {
    console.log(req.params.id)
    console.log(file)
    file.splice()
  })
 // res.json(res)
})
*/



//*****FRONT*****

// get the note html file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});


// get the index.html file
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});




app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
