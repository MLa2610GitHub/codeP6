//Importation de multer, qui permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

//Création de la constante dictionnaire de type MIME pour gérer l'extension de fichier appropriée

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//Création d'une constante storage à passer à multer pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  //la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //la fonction filename dit à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
  //utilisation de la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//Exportation de multer en indiquant qu'il gére uniquement les téléchargements de fichiers images
module.exports = multer({ storage: storage }).single("image");