const dotenv = require("dotenv").config("./.env");
console.log(dotenv);

//Importation d'Express
const express = require("express");

//Importation de mongoose
const mongoose = require("mongoose");

//pour accéder au path du serveur
const path = require("path");

//Importation des routeurs user et sauce
const userRoutes = require("./routes/user");

const sauceRoutes = require("./routes/sauce");

//Importation de Morgan (pour logger les requêtes HTTP)
const morgan = require("morgan");

//Création d'une application Express
const app = express();

//Middleware qui donne accès au corps des requêtes
app.use(express.json());

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

//middleware qui gère les fichiers du dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//middlewares qui transmettent les requêtes aux routes sauce et user 
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);


//Logger les requêtes et les réponses
app.use(morgan("morgan"));


//Connection à la base de données MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.5xpcrbn.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));


module.exports = app;

