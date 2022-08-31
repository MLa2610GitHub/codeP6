//Importation du package Mongoose qui facilite les interactions avec notre base de données MongoDB
const mongoose = require("mongoose");

//Création d'un schéma de données pour enregistrer un nouvel utilisateur dans MongoDB
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Exportation du schéma en tant que model Mongoose, ce qui le rend disponible pour l'application Express
module.exports = mongoose.model('User', userSchema);

