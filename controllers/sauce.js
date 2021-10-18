//import du schema
const Sauce = require('../models/sauce');

//Definition des fonctions CRUD
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: sauceObject.userId,
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        heat: sauceObject.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisLiked: []

    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce créée" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};



exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    Sauce.updateOne({ _id: req.params.id }, {
        userId: sauceObject.userId,
        name: sauceObject.name,
        manufacturer: sauceObject.manufacturer,
        description: sauceObject.description,
        mainPepper: sauceObject.mainPepper,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        heat: sauceObject.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisLiked: []
    })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.postLike = (req, res, next) => {

    Sauce.findOne({ _id: req.params.id })

        .then(sauce => {
            if (req.body.like === 1) {

                console.log(req.body.userId);
                
                if (!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId) ) {
                    sauce.likes++;
                    
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(200).json({ message: 'Sauce Likée' }))
                        .catch(error => res.status(400).json({ error }));
                }
            } else if (req.body.like === -1) {
                if (!sauce.usersLiked.includes(req.body.userId)  && !sauce.usersDisliked.includes(req.body.userId)) {
                    sauce.dislikes++;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(200).json({ message: 'Sauce dislikée' }))
                        .catch(error => res.status(400).json({ error }));
                }
            } else if (req.body.like === 0) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    const userIndex = sauce.usersLiked.indexOf(req.body.userId);
                    sauce.likes--;
                    sauce.usersLiked.splice(userIndex, 1);
                    sauce.save()
                        .then(() => res.status(200).json({ message: 'Sauce unlikée' }))
                        .catch(error => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    const userIndex = sauce.usersDisliked.indexOf(req.body.userId);
                    sauce.disLikes--;
                    sauce.usersDisliked.splice(userIndex, 1);
                    sauce.save()
                        .then(() => res.status(200).json({ message: 'Sauce undislikée' }))
                        .catch(error => res.status(400).json({ error }));
                }
            }
        }
        )
        .catch(error => res.status(404).json({ error }));

};
