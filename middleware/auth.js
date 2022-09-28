
const jwt = require("jsonwebtoken");

//On vérifie si l'utilisateur est identifié dans la bdd
module.exports = (req, res, next) => {
// Comme des problèmes peuvent se produire,tout est inséré dans un bloc try...catch

  try {

  // On extrait le token du header Authorization de la requête entrante  
    const token = req.headers.authorization.split(" ")[1];

    // Utilisation de la fonction verify pour décoder le token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    // L'ID utilisateur est extrait du token et rajouté à l’objet Request pour que toutes les routes puissent l’utiliser
    req.auth = {
      userId: userId,
    };
    next();
      
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};


