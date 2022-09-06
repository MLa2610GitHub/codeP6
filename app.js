const dotenv = require('dotenv').config('./.env');
console.log(dotenv);

//Importation d'Express
const express = require('express'); 

//Importation de mongoose
const mongoose = require('mongoose'); 

//Importation de Morgan (pour logger les requêtes HTTP)
const morgan = require("morgan");


//Importation des routes
const userRoutes = require('./routes/user'); 
const sauceRoutes = require('./routes/sauce'); 

//pour accéder au path du serveur 
const path = require("path");

//Création d'une application Express
const app = express();

//Logger les requêtes et les réponses
app.use(morgan("morgan")); 

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

//Gestion des images
app.use("/images", express.static(path.join(__dirname, "images")));

//Routes
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);


//Connection à la base de données MongoDB
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7xqimu5.mongodb.net/?retryWrites=true&w=majority`,
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
