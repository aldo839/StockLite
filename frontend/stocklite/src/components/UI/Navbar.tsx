import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Navbar () {

    return (
        <div className="pt-[2%] bg-blue-950 text-white h-full">
            <Logo 
                logoStyle={"flex gap-2 mb-[1%]"} 
                imgSize={25} 
                textStyle={"text-2xl text-white font-semibold"} 
                secondTextColor={"text-indigo-500"} 
            />

            <div>
                <ul>
                    <li className="mb-3">
                        <NavLink to={"/dashboard"} 
                            className={({isActive}) => isActive ? "bg-indigo-500 py-1 rounded-sm" : ""}
                        >
                            Table de bord
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink 
                            to={"/products"}
                            className={({isActive}) => isActive ? "bg-indigo-500 py-1 rounded-sm" : ""}
                        >
                            Produits
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink to={"/add"}
                            className={({isActive}) => isActive ? "bg-indigo-500 py-1 rounded-sm" : ""}
                        >
                            Entrées
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink to={"/remove"}
                            className={({isActive}) => isActive ? "bg-indigo-500 py-1 rounded-sm" : ""}
                        >
                            Sorties
                        </NavLink>
                    </li>
                    <li className="mb-3">
                        <NavLink to={"/activities"}
                            className={({isActive}) => isActive ? "bg-indigo-500 py-1 rounded-sm" : ""}
                        >
                            Historiques
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )

}
export default Navbar