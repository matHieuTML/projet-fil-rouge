import * as ACTION from '../redux/Film';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import { URL } from "../../constants/api";
import { Link } from 'react-router-dom';
import Header from './Header';
import Grid from './Grid';
import Footer from './Footer';

const Films = () => {
    const dispatch = useDispatch();
    const films = useSelector((state) => state.film.data);

    // save films in the filmsList locastorage

     

    useEffect(() => {
        axios.get(URL.FILM_GET)
        .then((response) => {
            dispatch(ACTION.FETCH_START());
            dispatch(ACTION.FETCH_SUCCESS(response.data));

            localStorage.setItem('filmlist', JSON.stringify(response.data));

        })
        .catch((error) => {
            console.log(error);
        });
    }, [dispatch]);

    return (
        <div className=" min-h-screen">
            <Header />
            <Grid/>



            <div className="container mx-auto px-4 py-8 -mt-40 " >
                <div className="mb-8">
                    <section className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
                        <h1 className="text-xl font-bold font-size-15rem text-white mb-2">Notre équipe de la cinémathèque Française vous souhaite la bienvenue !</h1>
                        <p className="text-gray-400">Nous sommes fiers de vous présenter une sélection de films soigneusement choisis pour votre plaisir de visionnage. Découvrez notre collection dès aujourd'hui !</p>
                    </section>

                    <section className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
                        <h2 className="text-xl font-semibold text-white mb-2">Les Dernières Sorties</h2>
                        <ul className="list-disc pl-6 text-gray-400">
                            {films && films.slice(0, 5).map((film, index) => (
                                <li key={index}>{film.titre}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-gray-900 rounded-lg shadow-md p-6 mb-4">
                        <h2 className="text-xl font-semibold text-white mb-2">Articles Récents</h2>
                        <ul className="list-disc pl-6 text-gray-400">
                            <li>Top 10 des films de l'année</li>
                            <li>Entretien exclusif avec le réalisateur primé Jean-Luc Bardot</li>
                            <li>Les tendances cinématographiques de la saison : Analyse approfondie</li>
                        </ul>
                    </section>
                </div>

                <h2 className="text-xl font-semibold mb-4">Explorez notre collection</h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {films && films.slice(0, 50).map((film, index) => (
                        <li key={index} className="bg-gray-700 rounded-lg shadow-md overflow-hidden">
                            <Link to={`/pagefilm/${film._id}`} className="block group">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{film.titre}</h2>
                                    <p className="text-gray-300">{film.synopsis}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default Films;
