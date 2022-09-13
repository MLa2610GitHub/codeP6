const dotenv = require('dotenv').config('./.env');
console.log(dotenv);

//Importation d'Express
const express = require('express'); 

//Importation de mongoose
const mongoose = require('mongoose'); 

//Importation de Morgan (pour logger les requêtes HTTP)
const morgan = require("morgan");

//Création d'une application Express
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


//Importation des routes
const userRoutes = require('./routes/user'); 
const sauceRoutes = require('./routes/sauce'); 

//Routes
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

//pour accéder au path du serveur 
const path = require("path");

//Logger les requêtes et les réponses
app.use(morgan("morgan")); 


//Gestion des images
app.use("/images", express.static(path.join(__dirname, "images")));

//Connection à la base de données MongoDB
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7xqimu5.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  const User = require('./models/User');


app.use((req, res, next) => {
  console.log("//// LE TEXTE COMMENCE ICI")
  console.log("///////////////////////////");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});


module.exports = app;
