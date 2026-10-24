import Logo from "../UI/Logo";
import Button from "../UI/Button";
import heroImg from "../../assets/stock-lite-home.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGaugeHigh, faShieldHalved, faFeather } from "@fortawesome/free-solid-svg-icons";

function Hero () {

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="px-[10%]">
                <div className="mb-[8%]">
                    <Logo 
                        logoStyle={"flex gap-2 items-center"}
                        imgSize={60}  
                        textStyle={"font-semibold text-black text-5xl"} 
                        secondTextColor={"text-indigo-700"} 
                    />
                </div>

                <div className="mb-[8%]">
                    <p className="text-4xl font-semibold text-gray-800">
                        Gérez vos stocks,<br />simplement et efficacement.
                    </p>
                </div>

                <div className="mb-[10%] max-w-[85%]">
                    <p className="font-medium text-xl text-gray-700">
                        StockLite vous permet de suivre vos produits,<br />
                        vos entrées et sorties, et de garder un historique complet de votre activité.
                    </p>
                </div>

                <div className="flex gap-10 mb-[5%] text-2xl justify-between max-w-[85%]">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faFeather} className="text-2xl text-indigo-500" />
                        <span>Simple</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faGaugeHigh} className="text-2xl text-indigo-500" />
                        <span>Rapide</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faShieldHalved} className="text-2xl text-indigo-500" />
                        <span>Sécurisé</span>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <Button 
                        content={"Se connecter"} 
                        link={"/login"} 
                        style={"text-xl py-3 bg-indigo-600 text-white rounded-sm max-w-[85%] hover:bg-indigo-700 transition"} 
                    />
                    <Button 
                        content={"Créer un compte"} 
                        link={"/register"} 
                        style={"text-xl py-3 text-indigo-700 bg-white border border-indigo-700 hover:border-indigo-700 hover:text-2xl hover:py-2 rounded-sm max-w-[85%] transition"} 
                    />
                </div>
            </div>

            <div className="flex items-center justify-center">
                <img src={heroImg} alt="Hero-image"
                className="max-w-[60%]" />
            </div>
        </div>
    )

}
export default Hero