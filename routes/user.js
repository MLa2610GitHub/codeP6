//Importation d'Express
const express = require("express");

//Création d'un routeur express
const router = express.Router();

//Importation du middleware d'authentification
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

//Création des routes user et de leurs middlewares respectifs

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);


//Exportation du routeur pour qu'il soit disponible dans toute l'application
module.exports = router;

