const express = require("express")
const mysql = require("mysql")
const app = express()
const parkings = require('./parkings.json')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});


db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
   db.query("CREATE DATABASE mabdd", function (err, result) {
        if (err) throw err;
        console.log("Base de données créée !");
      });
  });
app.listen(8080, () => {
    console.log("Serveur à l'écoute")
});

app.use(express.json())

app.get("/parkings", (req, res)=>{
    res.status(200).json(parkings)
});

app.post("/parkings", (req,res)=>{
    parkings.push(req.body)
    res.status(200).json(parkings);
})

app.get("/parkings/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const parking = parkings.find(parking => parking.id === id);
    res.status(200).json(parking)
})



