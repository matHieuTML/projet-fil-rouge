import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck, faBookmark } from '@fortawesome/free-solid-svg-icons'

const Profil = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [filmList, setFilmList] = useState(JSON.parse(localStorage.getItem("filmlist")));

    const [filmsLike, setFilmsLike] = useState([]);
    const [filmsWatched, setFilmsWatched] = useState([]);
    const [filmsWatchlist, setFilmsWatchlist] = useState([]);

    const getFilms = () => {
        const like = [];
        const watched = [];
        const watchlist = [];
        filmList.forEach((item) => {
            if(user) {
                if (user.like.includes(item._id)) {
                    like.push(item);
                }
                if (user.watched.includes(item._id)) {
                    watched.push(item);
                }
                if (user.watchlist.includes(item._id)) {
                    watchlist.push(item);
                }
            }
        });
        setFilmsLike(like);
        setFilmsWatched(watched);
        setFilmsWatchlist(watchlist);
    }


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setFilmList(JSON.parse(localStorage.getItem("filmlist")));
        getFilms();
    }, [localStorage.getItem("user"), localStorage.getItem("filmlist")]);

    return (
        <div className="min-h-screen">
            <Header />
            {user ? (

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Profil de {user.username}</h1>
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col items-center">
                        <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full mb-4" />
                        <p className="text-gray-400">Email: {user.email}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="bg-gray-700 p-4 rounded-md shadow-md mb-8">
                            <h2 className="flex items-center text-xl font-bold mb-4"><FontAwesomeIcon icon={faHeart} className="mr-2" /> Films likés: {user.like.length}</h2>
                            <ul className="list-disc pl-6">
                                {filmsLike.map((item, index) => (
                                    <li key={index}><Link to={`/pagefilm/${item._id}`} className="text-blue-500 hover:underline">{item.titre}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md shadow-md mb-8">
                            <h2 className="flex items-center text-xl font-bold mb-4"><FontAwesomeIcon icon={faCheck} className="mr-2" /> Films vus: {user.watched.length}</h2>
                            <ul className="list-disc pl-6">
                                {filmsWatched.map((item, index) => (
                                    <li key={index}><Link to={`/pagefilm/${item._id}`} className="text-blue-500 hover:underline">{item.titre}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-md shadow-md">
                            <h2 className="flex items-center text-xl font-bold mb-4"><FontAwesomeIcon icon={faBookmark} className="mr-2" /> Films à voir: {user.watchlist.length}</h2>
                            <ul className="list-disc pl-6">
                                {filmsWatchlist.map((item, index) => (
                                    <li key={index}><Link to={`/pagefilm/${item._id}`} className="text-blue-500 hover:underline">{item.titre}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            ): 
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Profil</h1>
                <p>Veuillez recharger la page en cliquant  </p>
                <Link to="/profil" className="text-blue-500 hover:underline">Ici</Link>
            </div> 
            }
            <Footer />
        </div>
    )
}

export default Profil;
