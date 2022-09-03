//Importation de multer qui est un package de gestion de fichiers
const multer = require('multer');

//Création de la constante dictionnaire de type MIME pour gérer l'extension de fichier appropriée

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//Création d'une constante storage à passer à multer pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//Exportation de multer en indiquant qu'il gére uniquement les téléchargements de fichiers image
module.exports = multer({ storage: storage }).single("image");