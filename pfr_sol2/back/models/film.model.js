import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

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
  }, {timestamps: 
{createdAt: true}});


filmSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Film', filmSchema);
