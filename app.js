//Importation du package dotenv pour gérer les variables d'environnement
const dotenv = require("dotenv").config("./.env");
console.log(dotenv);

//Importation d'Express
const express = require("express");

//Importation de mongoose
const mongoose = require("mongoose");

//Importation du package helmet pour sécuriser les en-têtes HTTP
const helmet = require('helmet');

//pour accéder au path du serveur
const path = require("path");

//Importation des routeurs user et sauce
const userRoutes = require("./routes/user");

const sauceRoutes = require("./routes/sauce");

//Importation de Morgan (pour logger les requêtes HTTP)
const morgan = require("morgan");

//Création d'une application Express
const app = express();

//Implémentation du module helmet.js
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Gestion des CORS
//La fonction app.use est exécutée chaque fois que l’application reçoit une demande
//app.use permet d'envoyer des requêtes avec diverses méthodes HTTP (get, post, put...)
app.use((req, res, next) => {
  // Ajout de headers HTTP à l'objet response pour pouvoir accéder à l'API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Prévention des erreurs de CORS (Cross Origin Resource Sharing)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //Permet d'envoyer des requêtes avec les méthodes POST, PUT, DELETE, PATCH, OPTIONS
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
   next();
});

//Middleware qui donne accès au corps des requêtes
app.use(express.json());

//middleware qui gère les fichiers du dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//middlewares qui transmettent les requêtes aux routes user et sauce

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

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

//Exportation de l'application pour qu'on puisse y accéder depuis les autres fichiers du projet
module.exports = app;
