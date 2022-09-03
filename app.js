const express = require('express'); 
//Importation d'Express
const mongoose = require('mongoose'); 
//Importation de mongoose
const userRoutes = require('./routes/user'); 
//Importation des routes
const sauceRoutes = require('./routes/sauce'); 
//Importation des routes

const path = require("path");
//pour accéder au path de notre serveur 

const app = express();

// Prévention des erreurs de CORS (Cross Origin Resource Sharing)
// Ajout de headers HTTP à l'objet response pour pouvoir accéder à l'API depuis n'importe quelle origine 
// Cela permet aussi d'envoyer des requêtes avec les méthodes POST, PUT, DELETE, PATCH, OPTIONS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

mongoose.connect(
    "mongodb+srv:XXXX",
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
