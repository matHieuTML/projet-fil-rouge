
import { useState, useEffect } from "react";
import { URL } from "../../constants/api";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from ".././/assets/logo.png";


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));


    const searching = (e) => {
        e.preventDefault();
        axios.get(URL.FILM_SEARCH + "/" + search).then((response) => {
            setSearchResult(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const logout = () => {
        localStorage.setItem("isAuth", false);
        setIsAuth(localStorage.getItem("isAuth"));
        localStorage.setItem("user", null);
        setUser(localStorage.getItem("user"));

        window.location.href = "/";
        
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    } , [localStorage.getItem("user")]);

    return (
        <header className="w-screen flex flex-col items-center justify-center py-4 bg-gray-800 text-white">
            <div className="w-screen max-w-screen-lg px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={Logo} alt="logo" className="h-12" />
                        <form onSubmit={searching} className="ml-4 flex items-center">
                            <input type="text" placeholder="Rechercher un film" name="search" id="search" onChange={(e) => setSearch(e.target.value)} className="rounded-l-lg p-2 bg-gray-700 text-white focus:outline-none" />
                            <button type="submit" className="rounded-r-lg px-4 py-2 bg-blue-500 hover:bg-blue-600">Rechercher</button>
                        </form>
                    </div>
                    <nav className="ml-auto">
                        <ul className="flex items-center space-x-4">
                            <li>
                                <Link to="/" className="hover:text-gray-300">Accueil</Link>
                            </li>
                            <li>
                                <Link to="/events" className="hover:text-gray-300">Évènements</Link>
                            </li>
                            <li>
                                <Link to="/profil" className="hover:text-gray-300">
                                    {user ? <img src={user.avatar} alt={user.username} className="rounded-full h-10 w-10" /> : null}
                                </Link>
                            </li>
                            <li>
                                {isAuth == "true" ? (
                                    <button onClick={logout} className=" btn-primary px-4 py-2 bg-blue-500 hover:bg-blue-600">Se déconnecter</button>
                                ) : null}
                            </li>
                        </ul>
                    </nav>
                </div>
                <ul className="mt-2 flex flex-col items-center space-y-2">
                    {searchResult ? searchResult.slice(0, 5).map((item, index) => (
                        <li key={index}>
                            <Link to={`/pagefilm/${item._id}`} className="hover:text-blue-300">{item.titre}</Link>
                        </li>
                    )) : null}
                </ul>
            </div>
        </header>
    );
    
    }


export default Header;