//Importation d'Express
const express = require("express");

//Création d'un routeur express
const router = express.Router();

//Importation middleware d'authentification 
const auth = require('../middleware/auth')

//Importation de multer
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");

//Création des routes

router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//Exportation du routeur pour qu'il soit disponible dans toute l'application
module.exports = router;