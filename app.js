const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect(
    "mongodb+srv://xxxx.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  const User = require('./models/User');


app.use((req, res, next) => {
  console.log("message envoye");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
    res.json({messsage: 'Votre message est arrive'});

});

app.use((req, res, next) => {
  console.log('reponse ok');
 
});

module.exports = app;
