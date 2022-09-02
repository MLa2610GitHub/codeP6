//Importation d'Express
const express = require('express');

//Création d'un routeur express
const router = express.Router();

//Importation du middleware d'authentification
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

//Création des routes

router.post('/signup, userCtrl.signup');
router.post('/login, userCtrl.login');

//Exportation du routeur pour qu'il soit disponible dans toute l'application
module.exports = router;