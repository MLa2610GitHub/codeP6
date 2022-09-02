//Importation d'Express
const express = require("express");

//Création d'un routeur express
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

//Création des routes

router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//Exportation du routeur pour qu'il soit disponible dans toute l'application
module.exports = router;