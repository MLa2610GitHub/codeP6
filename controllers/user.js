
//Importation du package de cryptage bcrypt pour la fonction signUp
const bcrypt = require('bcrypt');

//Importation du package pour les tokens d'authentification
const jwt = require('jsonwebtoken');

//Importation du schéma de données stocké dans le dossier models
const User = require('../models/User');

//Création de nouveaux utilisateurs avec la méthode signUp depuis l'application front-end
//On appelle la fonction de hachage de bcrypt dans le mot de passe
//On lui demande de "saler"le mot de passe 10 fois
exports.signUp = (req, res, next) => {
  console.log("////ENVOI REQ CONTROLLER USER ////////////");
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
     
//Envoi du nouvel utilisateur dans la base de données      
      user.save()
        .then(() => res.status(201).json({ message: 'La requête a réussi et un utilisateur a été créé dans la bdd !' })) 
        //message affiché dans Postman quand un user est créé avec cet outil - et ce user se retrouve dans MongoDB
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


//Connection d'un utilisateur 
//On vérifie si un utilisateur qui essaie de se connecter a bien des identifiants valides
//Si l'e-mail entré par l'utilisateur n'existe pas dans la base de données, une erreur 401 Unauthorized est renvoyée.
//La fonction 'compare' de bcrypt compare le login de l'utilisateur avec le hash enregistré dans la base de données
//S'ils ne correspondent pas, une erreur 401 Unauthorized est renvoyée.

//Utilisation de la fonction sign de jsonwebtoken pour chiffrer un nouveau token.
//Ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token).
//Utilisation d'une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour crypter le token.


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Paire login/mot de passe incorrecte !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h"
              }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    
};

