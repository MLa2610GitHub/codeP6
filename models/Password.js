//Importation du package 'password-validator'
//On s'assure que l'utilisateur entre un mot de passe qu'on ne peut pas pirater facilement
const passwordValidator = require("password-validator");

//Création d'un schéma pour construire un modèle de password fort

const passwordSchema = new passwordValidator();

//Propriétés requises par le mot de passe

passwordSchema
  .is().min(8) //8 caractères au minimum
  .is().max(100) //100 caractères au maximum
  .has().uppercase() //le mot de passe doit comporter au moins une majuscule
  .has().lowercase() //le mot de passe doit comporter au moins une minuscule
  .has().digits(2) //le mot de passe doit comporter au moins deux chiffres
  .is().not().oneOf(["Passw0rd", "Password123"]); //mots de passe interdits
 

//Exportation du 'passwordSchema' pour qu'il soit disponible dans l'application Express

module.exports = passwordSchema;
