//Importation du package Mongoose qui facilite les interactions avec notre base de données MongoDB
const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');

//Création d'un schéma de données pour enregistrer un nouvel utilisateur dans MongoDB
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

/*La valeur 'unique' du schéma de données + le package 'mongoose-unique-validator' passé comme plug-in empêchera deux utilisateurs de partager la même adresse mail */
userSchema.plugin(uniqueValidator);

//Exportation du schéma en tant que model Mongoose, ce qui le rend disponible pour l'application Express
module.exports = mongoose.model('User', userSchema);

