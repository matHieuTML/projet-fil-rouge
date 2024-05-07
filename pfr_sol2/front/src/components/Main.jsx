import { Outlet } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { URL } from "../../constants/api";

const Main = () => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [createPseudo, setCreatePseudo] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createAvatar, setCreateAvatar] = useState("");
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState(localStorage.getItem("user"));

    const createAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL.USER_SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: createPseudo, email: createEmail, password: createPassword, avatar: createAvatar })
            });
            if (response.ok) {
                getAccountInfo(createEmail);
                localStorage.setItem("isAuth", true);
                setIsAuth(localStorage.getItem("isAuth"));
                notify("success", "Creation de compte réussie");
            } else {
                console.log(response)
                throw new Error('Failed to sign in');
            }
        } catch (error) {
            notify("error", "Erreur lors de la création de compte");

        }
    };

    const notify = (type, message) => { 

        switch (type) {
            case "success":
                toast.success(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                break;
            case "error":
                toast.error(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                break;


            }
    }

    const checkAuthentication = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL.USER_SIGN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: pseudo, password: password })
            });
            if (response.ok) {
                getAccountInfo(pseudo);
                localStorage.setItem("isAuth", true);
                setIsAuth(localStorage.getItem("isAuth"));
            } else {
                throw new Error('Failed to sign in');
                
            }
        } catch (error) {
            notify("error", "Identifiants incorrects");
        }
    };

    const getAccountInfo = async (email) => {
        try {
            const response = await fetch(URL.USER_INFO, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                setUser(JSON.parse(localStorage.getItem("user")));
                notify( "success", "Bienvenue " + data.username);

            } else {
                throw new Error('Failed to fetch user');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to fetch user');
        }
    };



    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            {isAuth == "true" ? (
                <Outlet />
            ) : (
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center justify-center space-y-8 px-4">
                    <form onSubmit={checkAuthentication} className="w-full flex flex-col items-center justify-center space-y-4">
                        <img src={Logo} alt="" />
                        <h2>Connectez-vous pour accéder à nos archives</h2>
                        <input type="text" name="pseudo" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="w-full rounded-lg p-2 bg-gray-800 text-white" />
                        <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg p-2 bg-gray-800 text-white" />
                        <button type="submit" className="w-full btn-primary rounded-lg px-4 py-2 bg-blue-500 hover:bg-blue-600">Se connecter</button>
                    </form>
                    <form onSubmit={createAccount} className="w-full flex flex-col items-center justify-center space-y-4">
                        <h2>Inscription</h2>
                        <input type="text" name="username" placeholder="Pseudo" value={createPseudo} onChange={(e) => setCreatePseudo(e.target.value)} className="w-full rounded-lg p-2 bg-gray-800 text-white" />
                        <input type="email" name="email" placeholder="Email" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} className="w-full rounded-lg p-2 bg-gray-800 text-white" />
                        <input type="password" name="password" placeholder="Mot de passe" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} className="w-full rounded-lg p-2 bg-gray-800 text-white" />
                        <input type="text" name="avatar" placeholder="Avatar" value={createAvatar} onChange={(e) => setCreateAvatar(e.target.value)} className="w-full rounded-lg p-2 bg-gray-800 text-white" />
                        <button type="submit" className="w-full btn-primary rounded-lg px-4 py-2 bg-blue-500 hover:bg-blue-600">S'inscrire</button>
                    </form>
                </div>
            )}
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="dark"

/>
        </section>
    );
    
};

export default Main;
