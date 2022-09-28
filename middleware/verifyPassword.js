//Importation du schéma de données stocké dans le dossier models
const passwordSchema = require("../models/Password");

//On vérifie que le mot de passe correspond bien au schéma mis en place pour construire un password solide

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {  
    next();
 } else {
    return res.status(400).json({ error: "Votre mot de passe doit faire 8 caractères minimum et contenir au moins une minuscule, une majuscule et deux chiffres " + passwordSchema.validate('req.body.password', { list: true}) });
 
    }
};
