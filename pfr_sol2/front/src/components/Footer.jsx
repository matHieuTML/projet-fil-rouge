
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="w-screen bg-gray-800 text-white py-4">
            <div className="w-screen max-w-screen-lg px-4 mx-auto flex items-center justify-between">
                <div>
                    <p>&copy; 2024 - Projet réalisé par <a href="https://github.com/matHieuTML" className="hover:underline">Mathieu</a></p>
                </div>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link to="/mentions-legales" className="hover:text-gray-300">Mentions légales</Link>
                        </li>
                        <li>
                            <Link to="https://github.com/matHieuTML" className="hover:text-gray-300">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
    }
export default Footer;