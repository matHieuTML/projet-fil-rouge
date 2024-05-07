const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  Id: Number,
  titre: String,
  titre_original: String,
  realisateur: String,
  annee_production: Number,
  nationnalite: String,
  duree: String,
  genre: String,
  synopsis: String,
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
