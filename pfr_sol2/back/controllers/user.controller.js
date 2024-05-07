import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import validator from 'validator';
import escapeHtml from 'escape-html';
env.config();


export const signup = async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;

        // Validation des entrées
        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: "Email invalide." });
        }

        if (!validator.isAlphanumeric(username, 'en-US', { ignore: ' _-' })) {
            return res.status(400).json({ msg: "Le nom d'utilisateur contient des caractères non autorisés." });
        }

        // Crypter le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            username,
            email,
            password: hashedPassword,
            avatar,  // Assurez-vous que 'avatar' est correctement validé ou traité pour éviter des failles
        });

        await user.save();

        // Utilisation de `escapeHtml` pour éviter les attaques XSS lors de l'affichage
        const safeUsername = escapeHtml(username);
        res.json(`Votre compte (${safeUsername}) a été créé avec succès! Connectez-vous pour accéder à votre compte.`);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}


export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const userInfo = async (req, res) => {
    try {
        //find by email 
        console.log(req)
        const user = await userModel.findOne({ email: req.body.email });
        //retirer le mot de passe
        user.password = undefined;
        res.json(user);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }

}

export const sign = async (req, res,next) => {
    try{
      // Recherche l'utilisateur dans 
          // la base de données par son email
    console.log(req.body)
      const user = await userModel.findOne({ email: req.body.email })

      // si l'utilisateur n'est pas trouvé, 
          // renvoie une erreur 404.
      if(!user) return res.status(404).json("Compte introuvable");
  
      // Compare le mot de passe fourni dans la requête 
          // avec le mot de passe de l'utilisateur (qui est dans la bdd)
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
  
          // Si le mot de passe est incorrect, 
          // renvoie une erreur 400.
      if(!comparePassword) return res.status(400).json("Mauvais mot de passe mon gars") 
  
      // Crée un jeton JWT pour l'utilisateur avec son ID, 
          // expire après 24 heures
      const token = jwt.sign(
          // Le premier argument est la charge utile du token. 
          // Ici, nous incluons l'ID de l'utilisateur
          { id: user._id}, 
          // Le deuxième argument est la clé secrète, 
          // qui est utilisée pour signer le token. 
        // Nous la récupérons à partir 
          // des variables d'environnement
          process.env.TOKEN, 
        // Le troisième argument est un objet 
          // contenant les options du token. 
        // Ici, nous définissons une durée 
          // d'expiration de 24 heures pour le token
          { expiresIn: "24h"})
      
      // Supprime le mot de passe de l'utilisateur 
          // pour des raisons de sécurité.
          // Ce code utilise la destructuration pour extraire 
          // la propriété password de user._doc. 
          // Toutes les autres propriétés sont regroupées 
          // dans un nouvel objet appelé others. 
          // C’est une pratique courante lorsque 
          // vous voulez exclure certaines propriétés d’un objet. 
      const { password, ...others } = user._doc
      
      // Envoie le jeton (token) JWT sous forme de cookie HTTPOnly
      res.cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(others) // .json(others) Renvoie les données d'utilisateur 
                                      // en réponse (à l'exeption du mot de passe)
    }catch(error){
      next(error)
    }
}
/*
export const manageList = async (req, res) => {
    try {
        const { _id, type, movieId } = req.body;
        const user = await userModel.findById(_id);
        if (type === "like") {
            
            //verifier si le film est déjà dans la liste
            
            if (user.like.includes(movieId)) {

                await userModel.findByIdAndUpdate
                    (_id, { $pull: { like: movieId } });
            }
            else {
                await userModel.findByIdAndUpdate
                    (_id, { $push: { like: movieId } });
                 

        }
        if (type === "watched") {
            
            //verifier si le film est déjà dans la liste
            
            if (user.watched.includes(movieId)) {
                await userModel.findByIdAndUpdate
                    (_id, { $pull: { watched: movieId } });
            }
            else {
                await userModel.findByIdAndUpdate
                    (_id, { $push: { watched: movieId } });
            }

        }
        if (type === "watchlist") {
                
                //verifier si le film est déjà dans la liste
                
                if (user.watchlist.includes(movieId)) {
                    await userModel.findByIdAndUpdate
                        (_id, { $pull: { watchlist: movieId } });
                }
                else {
                    await userModel.findByIdAndUpdate
                        (_id, { $push: { watchlist: movieId } });
                }   

        }
        res.json("Updated successfully");
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

*/

export const manageList = async (req, res) => {
    try {
        const { _id, type, movieId } = req.body;
        const validTypes = ["like", "watched", "watchlist"];
        
        // Vérifier si le type fourni est valide
        if (!validTypes.includes(type)) {
            return res.status(400).json({ msg: "Invalid type provided" });
        }

        const user = await userModel.findById(_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Vérifie si le film est déjà dans la liste spécifique
        const list = user[type];
        const operation = list.includes(movieId) ? '$pull' : '$push';

        // Mise à jour du document utilisateur en fonction de l'opération nécessaire
        await userModel.findByIdAndUpdate(_id, { [operation]: { [type]: movieId } });
        
        // res.json("Updated successfully");

        if (operation == '$pull') {
            res.json("Suppression Réussie");
        } else {
            res.json("Ajout Réussie");
            
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
