import express from "express";
import { getFilms, get45Films, getFilmById, searchFilm} from "../controllers/film.controller.js";

const router = express.Router();

router.get("/getFilms", getFilms);
router.get("/get45Films", get45Films);
router.get("/getFilmById/:id", getFilmById);
router.get("/search/:titre", searchFilm);



export default router;