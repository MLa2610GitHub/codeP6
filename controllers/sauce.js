const Sauce = require("../models/sauce");

//Importation du package fs (file system) de Node
const fs = require("fs");

//CREATION D'UNE SAUCE
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
     imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  //Enregistrement de la sauce dans la bdd
  sauce.save()
    .then(() => 
      res.status(201).json({ message: "Sauce enregistrée !" })) 
      console.log("Votre sauce a été enregistrée")
    .catch(error =>  res.status(400).json({ error }));
   
    console.log(res)
  };

//Récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce =>  res.status(200).json(sauce))
    .catch(error => res.status(404).json({error }));
};

//Modifier une sauce
exports.modifySauce = (req, res, next) => {
   const sauceObject = req.file ? {
       ...JSON.parse(req.body.sauce),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body }; //Si pas d'objet transmis, récupérer corps de la requête
   
   delete sauceObject._userId; //Mesure de sécurité

   Sauce.findOne({_id: req.params.id}) //Récupération objet dans DB
       .then((sauce) => {
           if (sauce.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           } else { //Si c'est le bon utilisateur
               Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
               .catch(error => res.status(401).json({ error }));
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
};

 //Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) //On vérifie que l'utilisateur a les droits nécessaires
       .then(sauce => {
           if (sauce.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else { //Récupération du nom de fichier
               const filename = thing.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => { //Supression de la DB
                   Sauce.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};

//Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error });
    });
};
