const Sauce = require("../models/sauce");

//Importation du package fs (file system) de Node
const fs = require("fs");

//CREER UNE SAUCE
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
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
      {res.status(201).json({ message: "Sauce enregistrée !" })}) 
       .catch(error => { res.status(400).json({ error })});
   
   
  };

//RECUPERER UNE SEULE SAUCE 
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce =>  res.status(200).json(sauce))
    .catch(error => res.status(404).json({error }));
};

//MODIFIER UNE SAUCE 
exports.modifySauce = (req, res, next) => {
   const sauceObject = req.file ? {
       ...JSON.parse(req.body.sauce),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body }; //Si pas d'objet transmis, récupérer corps de la requête
   
   delete sauceObject._userId; //Suppression champ envoyé par client par mesure de sécurité

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

 //SUPPRIMER UNE SAUCE 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) //On vérifie que l'utilisateur a les droits nécessaires
       .then(sauce => {
           if (sauce.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else { //Récupération du nom de fichier
               const filename = sauce.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => { //Supression du fichier de la bdd
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

//RECUPERER TOUTES LES SAUCES 
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

  
//LIKER OU DISLIKER UNE SAUCE
 exports.likeSauce = (req, res, next) => {

  //Si l'utilisateur like la sauce
  switch (req.body.like) {
    case 1:
 Sauce.updateOne(
   { _id: req.params.id },
   { $inc: { likes: +1 }, 
     $push: { usersLiked: req.body.userId }, 
    })
   .then(() => res.status(201).json({ message: "Like enregistré" }))
   .catch((error) => res.status(400).json({ error }));
  break;

 //Si l'utilisateur annule un like ou un dislike
//Annulation d'un like
    case 0:
 Sauce.findOne({_id: req.params.id})
 .then((sauce) =>{
   if (sauce.usersLiked.includes(req.body.userId)) {
     Sauce.updateOne(
       { _id: req.params.id },
       { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
     )
       .then(() => res.status(201).json({ message: "Like annulé" }))
       .catch((error) => res.status(400).json({ error }));
   }

   //Annulation d'un dislike
   if (sauce.usersDisliked.includes(req.body.userId)) {
     Sauce.updateOne(
       { _id: req.params.id },
       { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
     )
       .then(() => res.status(201).json({ message: "Dislike annulé" }))
       .catch((error) => res.status(400).json({ error }));
   }
 })

 .catch(error => res.status(404).json({error}));
  break;

 //Si l'utilisateur dislike la sauce
  
    case -1:
 Sauce.updateOne(
  {_id: req.params.id},
  {$inc:{dislikes:+1}, 
  $push: {usersDisliked: req.body.userId},
})
    .then(() => res.status(201).json({message: "Dislike enregistré"}))
    .catch(error => res.status(400).json({error}));

 break;
 default: console.log(err);

}
 }


 