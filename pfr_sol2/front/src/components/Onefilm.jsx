
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import filmUnkown from '../assets/film-unkown.webp'
import Header from './Header';
import Footer from './Footer'
//import fontawesome

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck, faBookmark } from '@fortawesome/free-solid-svg-icons'



const Onefilm = () => {
    const { _id } = useParams()
    const filmList = JSON.parse(localStorage.getItem('filmlist'));
    const film = filmList.find((item) => item._id === _id);
    const apiKey = '5014d7508e6c5cd445ca85393bcefb5b';
    const apiUrl = 'https://api.themoviedb.org/3';
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [isLike, setIsLike] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [isWatchlist, setIsWatchlist] = useState(false);
    const [infoFilm, setInfoFilm] = useState(null);

    const noteColor = (note) => {
        if (infoFilm && infoFilm.vote_average) {
            if (note >= 7) {
                return "bg-green-500"
            } else if (note >= 5) {
                return "bg-yellow-500"
            } else {
                return "bg-red-500"
            }

        }
    }

    const getExternalInfo = () => {

        const formatedTitle = film.titre.replace(/ /g, '+');
        axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${formatedTitle}`)
            .then((response) => {
                setInfoFilm(response.data.results[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const listManage = ( type ) => {

        const data = {
            _id: user._id,
            type: type,
            movieId: film._id
        };
        axios.post('http://localhost:1312/api/users/manageList', data)
            .then((response) => {
                //add in the user local storage to 
                user[type].includes(film._id) ? user[type].splice(user[type].indexOf(film._id), 1) : user[type].push(film._id);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                console.log(response.data);
                checkList();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const checkList = () => {
        setIsLike(user.like.includes(film._id));
        setIsWatched(user.watched.includes(film._id));
        setIsWatchlist(user.watchlist.includes(film._id));
    }

    const imageManage = (infoFilm && infoFilm.poster_path) ? `https://image.tmdb.org/t/p/w500${infoFilm.poster_path}` : filmUnkown;

    
    //Films similaires
    const filmsSimilaire = filmList.filter((item) => item.genre === film.genre && item._id !== film._id).slice(0, 5);


    useEffect(() => {
        getExternalInfo();
        checkList();
    } , [film]);

    return (
        <main className=" min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center">
                        <img src={imageManage} alt={film.titre} className="w-full max-w-sm" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{film.titre}</h1>
                        <p className="text-gray-400 mb-4"><span className="font-semibold">Année de production:</span> {film.annee_production}</p>
                        <p className="text-gray-400 mb-4"><span className="font-semibold">Synopsis:</span> {film.synopsis}</p>
                        <p className="text-gray-400 mb-4"><span className="font-semibold">Durée:</span> {film.duree}</p>
                        <p className="text-gray-400 mb-4"><span className="font-semibold">Réalisateur:</span> {film.realisateur}</p>
                        {film.genre && <p className="text-gray-400 mb-4"><span className="font-semibold">Genre:</span> {film.genre}</p>}
                        <div className="flex space-x-4">
                            <button onClick={() => { listManage("like") }} className="p-2 hover:scale-125 rounded-md">
                                <FontAwesomeIcon icon={faHeart} style={{ color: isLike ? "#74C0FC" : null }} size={'xl'} />
                            </button>
                            <button onClick={() => { listManage("watched") }} className="p-2 hover:scale-125 rounded-md">
                                <FontAwesomeIcon icon={faCheck} style={{ color: isWatched ? "#74C0FC" : null }} size={'xl'} />
                            </button>
                            <button onClick={() => { listManage("watchlist") }} className="p-2 hover:scale-125 rounded-md">
                                <FontAwesomeIcon icon={faBookmark} style={{ color: isWatchlist ? "#74C0FC" : null }} size={'xl'} />
                            </button>
                        </div>
                        {infoFilm && infoFilm.vote_average ? (
                            <div>
                                <h2 className="text-xl font-bold mt-8 mb-4">Note des spectateurs:</h2>
                                <div className="relative w-10 h-10">
                                    <div
                                        className={`absolute inset-0 rounded-full border-2 ${noteColor(infoFilm.vote_average)}`}
                                        style={{
                                            transition: "width 0.5s, height 0.5s"
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                                        {infoFilm.vote_average}
                                    </div>
                                </div>
                            </div>
                        ) : null
                        }
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Films similaires :</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filmsSimilaire.map((item, index) => (
                            <li key={index} className="bg-gray-700 rounded-md shadow-md overflow-hidden">
                                <Link to={`/pagefilm/${item._id}`} target='_blank'   className="block">
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{item.titre}</h3>
                                        <p className="text-gray-300">{item.synopsis}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    )
    }

export default Onefilm