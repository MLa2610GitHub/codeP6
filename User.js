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
//Le model sert à créer des documents se basant sur le schema
/*L'objet 'User' retourné par mongoose.model est une fonction qui est utilisée ici en tant que classe JavaScript. D'où le nom de variable commençant par une majuscule 
*/

//Exportation du schéma 'User' pour qu'il soit disponible dans l'application Express
const User = mongoose.model('User', userSchema);

module.exports = User;

