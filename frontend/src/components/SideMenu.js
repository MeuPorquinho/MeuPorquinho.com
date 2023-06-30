import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from "react-router-dom";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const SideMenu = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen ">
            <div className="bg-[#252525] w-72 min-h-screen items-center justify-center">
                <img
                    src="https://i.imgur.com/gkAgCgk.png"
                    alt="Meu Porquinho logo"
                    className="h-[150px] pl-24 pt-2 pb-2 content-center"
                />
                <h1 className="text-2xl font-bold mb-2 text-center text-white">
                    Meu Porquinho.com
                </h1>
                <ul className="pt-10 flex flex-col space-y-6 text-center">
                    <li>
                        <div className={location.pathname === '/dashboard' ? "bg-[#3F3F3F] h-16 flex items-center justify-center" : "bg-[#252525] h-16 flex items-center justify-center"}>
                            <a href="/dashboard" className="text-gray-300 hover:text-white text-lg">
                                Dashboard
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className={location.pathname === '/noticias' ? "bg-[#3F3F3F] h-16 flex items-center justify-center" : "bg-[#252525] h-16 flex items-center justify-center"}>
                            <a href="/dashboard" className="text-gray-300 hover:text-white text-lg">
                                Notícias
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className={location.pathname === '/gerenciador' ? "bg-[#3F3F3F] h-16 flex items-center justify-center" : "bg-[#252525] h-16 flex items-center justify-center"}>
                            <a href="/manager" className="text-gray-300 hover:text-white text-lg">
                                Gerenciador
                            </a>
                        </div>
                    </li>
                </ul>

                <div className="absolute bottom-0 w-72 pb-10">
                    <div className="flex flex-col items-center justify-center">
                        <FontAwesomeIcon icon={icon({ name: 'user' })} style={{ color: 'white' }} />

                        <div className="pt-1">
                            <p className="text-gray-300 text-lg">{user.firstName + ' ' + user.lastName}</p>
                        </div>

                        <div className="pt-1">
                            <p className="text-gray-400 text-sm">{user.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;