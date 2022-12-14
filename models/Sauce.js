//Importation du package Mongoose qui facilite les interactions avec notre base de données MongoDB
const mongoose = require("mongoose");

//Création d'un schéma de données qui contient les champs de chaque sauce
//Utilisation de la méthode Schema
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

//Exportation du schéma 'Sauce' pour qu'il soit disponible dans l'application Express
module.exports = mongoose.model("Sauce", sauceSchema);
