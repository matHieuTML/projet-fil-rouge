import env from 'dotenv';
import filmModel from '../models/film.model.js';
env.config();


export const getFilms = async (req, res) => {
    try {
        const films = await filmModel.find();
        res.status(200).json(films);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const get45Films = async (req, res) => {
    try {
        const films = await filmModel.find().limit(45);
        res.status(200).json(films);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFilmById = async (req, res) => {
    try {
        const film = await filmModel.findById(req.params.id);
        res.status(200).json(film);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const searchFilm = async (req, res) => {
    try {
        const films = await filmModel.find({ titre: { $regex: req.params.titre, $options: "i" } });
        res.status(200).json(films);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}