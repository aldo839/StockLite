import Header from "../UI/Header"
import heroImg from "../../assets/stock-lite-home.png"
import { useEffect, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { Loader2 } from "lucide-react"
import Success from "../UI/Success"


const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_+\-\s]{3,49}$/;

function RegisterCategory () {

    const navigate = useNavigate();

    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const validName = NAME_REGEX.test(name);


    useEffect(() => {
        if (errMsg) {
            userRef.current?.focus();
        }
    }, [errMsg])

    useEffect(() => {
        errRef.current?.focus();
    })


    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        setLoading(true);
        setErrMsg("");

        if (!validName) {
            setErrMsg('Please fix the invalid field.');
        }        

        try {
            const response = await axiosPrivate.post(
                '/categories/',
                { name },
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            setSuccess(true);

            setTimeout(() => {
                navigate('/register-product')
            }, 1500);

            return response?.data;

        } catch (error) {
            
            if (isAxiosError(error)){
                
                if (error.response?.status === 400){
                    setErrMsg('Bad request');
                    navigate('/400');
                } 
                else if (error.response?.status === 401){
                    setErrMsg('Unauthorized');
                    navigate('/401');
                }
                else if (error.response?.status === 403){
                    setErrMsg('Forbidden');
                    navigate('/401');
                }
                else if (error.response?.status === 500){
                    setErrMsg('Internal Server Error');
                    navigate('/500');
                }

            } else {
                setErrMsg('Unknow error');
            }
            
        }
    }


    return (
        
        <div className="flex flex-col justify-between h-screen bg-gray-50">

            <Header link={"/products/"} linkText={"Retourner"} />

           <main className="flex mx-[12%] h-[85%] mb-[2%] items-center bg-white rounded-3xl">
            
                <div className="max-w-[50%] mr-auto h-full p-[3%] bg-indigo-50 rounded-l-3xl">

                    <p className="text-3xl font-bold pt-[6%]">Créer une catégorie</p>
                    <p className="text-lg text-gray-600 font-medium max-w-[90%] pt-[3%] pb-[5%]">
                        La catégorie créée sera etre alloué à une variété de produits spécifique.
                    </p>

                    <div className="flex items-center justify-center">
                        <img src={heroImg} alt="Hero-image"
                        className="max-w-[60%]" />
                    </div>

                    <div className="inline-flex flex-col items-start pt-[7%] pl-[15%]">
                        <p className="font-signature text-3xl font-semibold text-indigo-500 -rotate-3">
                            Ensemble pour une meilleure <br /> gestion commune !
                        </p>
                        <div className="ml-6 mt-1 h-0.5 w-40 -rotate-6 rounded-full bg-indigo-500" />
                    </div>

                </div>

                {success ? (

                    <Success action={"Catégorie créée"} />

                ) : (
                    
                    <div className="flex-1 px-[4%]">

                        <div className="flex flex-col gap-10 items-center mb-[5%]">
                            <h3 className="text-4xl font-bold">Créer une catégorie</h3>
                            <p className="text-lg text-gray-500 font-medium">Donnez un nom simple qui pourra etre facilement repérable et alloué à la catégorie du produit à la création.</p>
                        </div>

                        <p role="alert"
                            className={ errMsg
                                ? "text-sm text-red-500 font-medium bg-red-100 px-[2%] py-[1%] mb-[2%]"
                                : "hidden"
                            }
                        >
                            {errMsg}
                        </p>

                        <form onSubmit={handleSubmit}
                            className="flex flex-col"
                        >

                            <label htmlFor="username" className="text-lg font-medium">
                                Nom de la catégorie <span className="text-red-500">*</span>
                            </label>
                            <input type="text"
                                id="username"
                                name="username"
                                ref={userRef}
                                autoComplete="off"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg pl-5 py-1 mt-1 mb-[2%]"
                            />

                            <button type="submit"
                                disabled={!validName}
                                className="justify-center text-white text-xl font-medium bg-indigo-500 rounded-lg py-2 mt-[5%] hover:cursor-pointer hover:bg-indigo-600 transition"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                {loading ? 'Enregistrement...' : 'Créer la catégorie'}
                            </button>

                        </form>

                    </div>
                )}
                 
              
           </main>

        </div>
    )

}
export default RegisterCategory;