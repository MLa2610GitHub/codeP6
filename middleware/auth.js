const jsonwebtoken = require("jsonwebtoken");

// Comme de nombreux problèmes peuvent se produire,tout est inséré dans un bloc try...catch
// On extraie le token du header Authorization de la requête entrante
// Utilisation de la fonction verify pour décoder le token
// L'ID utilisateur est extrait du token et rajouté à l’objet Request pour que toutes les routes puissent l’utiliser

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonwebtoken.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
