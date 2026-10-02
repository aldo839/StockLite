import Logo from "../UI/Logo";
import Button from "../UI/Button";
import heroImg from "../../assets/stock-lite-home.png"

function Hero () {

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="px-[10%]">
                <div className="mb-[7%]">
                    <Logo 
                        logoStyle={"flex gap-2 items-center"}
                        imgSize={60}  
                        textStyle={"font-semibold text-black text-5xl"} 
                        secondTextColor={"text-indigo-700"} 
                    />
                </div>
                <div className="mb-[6%]">
                    <p className="text-4xl font-semibold text-gray-800">
                        Gérez vos stocks,<br />simplement et efficacement.
                    </p>
                </div>
                <div className="mb-[5%] max-w-[85%]">
                    <p className="font-medium text-2xl text-gray-700">
                        StockLite vous permet de suivre vos produits,<br />
                        vos entrées et sorties, et de garder un historique complet de votre activité.
                    </p>
                </div>
                <div className="flex gap-10 mb-[5%]">
                    <div><span>Simple</span></div>
                    <div><span>Rapide</span></div>
                    <div><span>Sécurisé</span></div>
                </div>
                <div className="flex flex-col gap-5">
                    <Button 
                        content={"Se connecter"} 
                        link={"/login"} 
                        style={"py-2 bg-indigo-700 text-white rounded-sm max-w-[40%]"} 
                    />
                    <Button 
                        content={"Créer un compte"} 
                        link={"/register"} 
                        style={"py-2 text-indigo-700 bg-white border border-indigo-700 rounded-sm max-w-[40%]"} 
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