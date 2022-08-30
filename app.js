const express = require('express');

const app = express();

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
