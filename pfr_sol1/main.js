
const dotenv = require('dotenv');
dotenv.config('./.env');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const XLSX = require('xlsx');
const Film = require('./Models/filmModel'); 


const app = express();
const port = 3000;

// Configuration de la base de données avec mongoose et dotenv
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`, {
  dbName: process.env.MONGO_DB,

});




const processFilmsMiddleware = async (req, res) => {
    try {

      await Film.deleteMany({}); // Supprimer tous les films existants


      // Charger le fichier XLSX
      const workbook = XLSX.readFile('film.xlsx');
      const sheet_name_list = workbook.SheetNames;
      let filmsData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  
      // Traitement des doublons
      const uniqueTitles = Array.from(new Set(filmsData.map(film => film.Titre)));
      await Promise.all(uniqueTitles.map(async title => {
        const filmsWithSameTitle = filmsData.filter(film => film.Titre === title);
        const maxIdFilm = filmsWithSameTitle.reduce((maxFilm, currentFilm) => (currentFilm.Id > maxFilm.Id) ? currentFilm : maxFilm);
        const otherFilms = filmsWithSameTitle.filter(film => film.Id !== maxIdFilm.Id);
  
        // Ajouter les noms des réalisateurs dans le film avec l'Id le plus élevé
        otherFilms.forEach(otherFilm => {
          maxIdFilm['Réalisateurs'] += `, ${otherFilm['Réalisateurs']}`;
        });
  
        // Filtrer les autres films
        filmsData = filmsData.filter(film => !otherFilms.includes(film));
      }));
  
      // Nettoyer les synopsis
      filmsData.forEach(film => {
        if (film.Synopsis && (film.Synopsis.includes('<') || film.Synopsis.includes('>'))) {
          film.Synopsis = film.Synopsis.replace(/<[^>]+>/g, '');
        }
      });
      await Promise.all(filmsData.map(async film => {
        const newFilm = new Film({
          Id: film.Id,
          titre: film.Titre,
          titre_original: film['Titre original'] || '', // ajustez si nécessaire
          realisateur: film['Réalisateurs'],
          annee_production: film['Année de production'] || 0, // ajustez si nécessaire
          nationnalite: film['Nationalité'] || '',
          duree: film['Durée'] || '',
          genre: film.Genre,
          synopsis: film.Synopsis,
        });

        
  
        await newFilm.save();

      }));
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors du traitement des films');
    }
    console.log('Les films ont été ajoutés à la base de données');
  };
  
  


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




//use fs to watch file and reload data on every changes

fs.watchFile('film.xlsx', async (event, filename) => {
    try {
        console.log('Le fichier film.xlsx a été modifié');
        await processFilmsMiddleware();

    } catch (error) {
        console.error(error);
    }
});

//une route qui supprime tous les films de la base de données ce qui permet de les recharger pour tester le middleware

app.get('/deleteAll', async (req, res) => {
    try {
        await Film.deleteMany({});
        res.send('Tous les films ont été supprimés');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la suppression des films');
    }
});

