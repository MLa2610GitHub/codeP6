//Importation d'Express
const express = require("express");

//Création d'un routeur express
const router = express.Router();

//Importation middleware d'authentification 
const auth = require('../middleware/auth')

//Importation du middleware multer pour gérer les images
const multer = require("../middleware/multer-config");

const sauceController = require("../controllers/sauce");

//Création des routes de l'app

//Route POST pour publier une sauce
router.post("/", auth, multer, sauceController.createSauce);


//Route PUT pour modifier une sauce
router.put("/:id", auth, multer, sauceController.modifySauce);

//Route DELETE pour supprimer une sauce
router.delete("/:id", auth, sauceController.deleteSauce);

//Route GET pour afficher toutes les sauces qui se trouvent dans la base de données
router.get("/", auth, sauceController.getAllSauces);

//Route GET pour afficher une seule sauce
router.get("/:id", auth, sauceController.getOneSauce);



//Exportation du routeur pour qu'il soit disponible dans toute l'application
module.exports = router;