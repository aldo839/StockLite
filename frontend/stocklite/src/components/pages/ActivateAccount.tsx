import Header from "../UI/Header"
import heroImg from "../../assets/stock-lite-home.png"
import { useEffect, useRef, useState } from "react"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import Success from "../UI/Success"
import api from "../../api/axios"

function ActivateAccount () {

    const navigate = useNavigate();

    const CODE_LENGTH = 6;

    const errRef = useRef<HTMLParagraphElement | null>(null);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const value = e.target.value;

        if (value !== "" && isNaN(Number(value))) {
            e.target.value = "";
            return;
        }

        if (value && currentIndex < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        
        if (e.key === "Backspace") {
            
            if (!inputRefs.current[index]?.value && currentIndex > 0) {

                inputRefs.current[index - 1]?.focus();

            } else if (inputRefs.current[index]) {
                inputRefs.current[index]!.value = "";
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {

        e.preventDefault();
        
        const paste = e.clipboardData.getData("text").trim();

        if (currentIndex === 0 && /^\d+$/.test(paste)) {

            for (let i = 0; i < paste.length; i++) {
                
                if (i < CODE_LENGTH && inputRefs.current[i]) {
                    inputRefs.current[i]!.value = paste[i];
                }
            }

            const lastIndex = Math.min(paste.length - 1, CODE_LENGTH- 1);
            inputRefs.current[lastIndex]?.focus();
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);
        setErrMsg("");
        
        let code = "";

        for (let i = 0; i < CODE_LENGTH; i++) {
            const inputVal = inputRefs.current[i]?.value;
            
            if (inputVal) {
                code += inputVal;
            } else {
                inputRefs.current[i]?.focus();
                break;
            }
        }

        if (code.length === CODE_LENGTH) {

            try {
                const response = await api.post(
                    '/auth/activate',
                    { code },
                    {
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                setSuccess(true);

                setTimeout(() => {
                    navigate('/home');
                }, 1500);

                console.log(response?.data);
                return response?.data;

            } catch (error) {

                setLoading(false);
                
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
        } else {
            setLoading(false);
            setErrMsg("Please complete all the fields");
        }
    };

    useEffect(() => {
        errRef.current?.focus();
    }, []);


    return (
        
        <div className="flex flex-col justify-between h-screen bg-gray-50">

            <Header link={"/products/"} linkText={"Retourner"} />

           <main className="flex mx-[12%] h-[85%] mb-[2%] items-center bg-white rounded-3xl">
            
                <div className="max-w-[50%] mr-auto h-full p-[3%] bg-indigo-50 rounded-l-3xl">

                    <p className="text-3xl font-bold pt-[6%]">Activez votre compte</p>
                    <p className="text-lg text-gray-600 font-medium max-w-[90%] pt-[3%] pb-[5%]">
                        Vous devez remplire le champ avec le code reçu dans votre 
                        email afin d'achever votre inscription et valider votre compte.
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

                    <Success action={"Compte activé"} />

                ) : (
                    
                    <div className="flex-1 px-[4%]">

                        <div className="flex flex-col gap-10 items-center mb-[5%]">
                            <h3 className="text-4xl font-bold">Vérifiez votre email</h3>
                            <p className="text-lg text-gray-500 font-medium">Veuillez saisir les 6 chiffres qui vous y ont été envoyés.</p>
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
                            className="flex flex-col items-center gap-[2vh]"
                        >

                            <div className="inputs-container flex gap-3">

                                {Array.from({ length: CODE_LENGTH }).map((_, i) => (

                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        ref={(el) => { inputRefs.current[i] = el; }}
                                        onFocus={() => setCurrentIndex(i)}
                                        onChange={(e) => inputChange(e, i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        onPaste={handlePaste}
                                        className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl border-gray-300 focus:border-blue-600 focus:outline-none shadow-sm"
                                    />

                                ))}

                            </div>


                            <button type="submit"
                                disabled={loading}
                                className="w-[80%] justify-center text-white text-xl font-medium bg-indigo-500 rounded-lg py-2 mt-[5%] hover:cursor-pointer hover:bg-indigo-600 transition"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                {loading ? 'Enregistrement...' : 'Confirmer'}
                            </button>

                        </form>

                    </div>
                )}
                 
              
           </main>

        </div>
    )

}
export default ActivateAccount;