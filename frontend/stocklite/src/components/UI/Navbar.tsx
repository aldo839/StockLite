import { NavLink } from "react-router-dom";
import Logo from "./Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faGift, faArrowRightToBracket, faArrowRightFromBracket, faClockRotateLeft, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

function Navbar () {

    return (

        <aside className="w-70 shrink-0 min-h-screen bg-blue-950 text-white p-6">

            <Logo 
                logoStyle={"flex items-center justify-center gap-3 mb-8"} 
                imgSize={40} 
                textStyle={"text-3xl text-white font-semibold"} 
                secondTextColor={"text-indigo-500"} 
            />

            <nav className="text-xl">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex gap-2 items-center px-4 py-2 rounded-sm ${
                                    isActive
                                        ? "bg-indigo-500"
                                        : "hover:bg-blue-900"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faHouseChimney} />
                            Tableau de bord
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-sm ${
                                    isActive
                                        ? "bg-indigo-500"
                                        : "hover:bg-blue-900"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faGift} />
                            Produits
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/add-product"
                            className={({ isActive }) =>
                                `flex gap-2 items-center px-4 py-2 rounded-sm ${
                                    isActive
                                        ? "bg-indigo-500"
                                        : "hover:bg-blue-900"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            Entrées
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/remove-product"
                            className={({ isActive }) =>
                                `flex gap-2 items-center px-4 py-2 rounded-sm ${
                                    isActive
                                        ? "bg-indigo-500"
                                        : "hover:bg-blue-900"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            Sorties
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/added"
                            className={({ isActive }) =>
                                `flex gap-2 items-center px-4 py-2 rounded-sm ${
                                    isActive
                                        ? "bg-indigo-500"
                                        : "hover:bg-blue-900"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faCartArrowDown} />
                            Boutique
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                `flex gap-2 items-center px-4 py-2 rounded-sm ${
                                    isActive
                                        ? "bg-indigo-500"
                                        : "hover:bg-blue-900"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            Historiques
                        </NavLink>
                    </li>
                </ul>
            </nav>

        </aside>
    )
}
export default Navbar