import Header from "../UI/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faHandPointer, faShieldHalved, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import api from "../../api/axios"
import { isAxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import Success from "../UI/Success"


const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_+\-\s]{4,49}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/;
const PHONE_REGEX = /^(\+?[1-9]\d{1,14})?$/;

function RegisterUser () {

    const navigate = useNavigate();

    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const validUsername = NAME_REGEX.test(username);

    const [email, setEmail] = useState("");
    const validEmail = EMAIL_REGEX.test(email);
    
    const [password, setPassword] = useState("");
    const validPassword = PWD_REGEX.test(password);

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const validPasswordConfirm = passwordConfirm.length > 0 && passwordConfirm === password;

    const [phone, setPhone] = useState("");
    const validPhone = PHONE_REGEX.test(phone) || phone === "";

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


    useEffect(() => {
        if (errMsg) {
            userRef.current?.focus();
        }
    }, [errMsg])

    useEffect(() => {
        errRef.current?.focus();
    })

    const validationError =
    !validUsername
        ? "Le nom d'utilisateur doit contenir entre 4 et 50 caractères (lettres, chiffres, underscores et espaces)."
        : !validPassword
            ? "Le mot de passe doit contenir au moins 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial (!@#$%^&*)."
            : !validPasswordConfirm
                ? "Les mots de passe ne correspondent pas."
                : !validEmail
                    ? "Veuillez entrer une adresse email valide."
                    : !validPhone
                        ? "Le numéro de téléphone est invalide (ex: +2376XXXXXXXX)."
                        : "";


    const displayedError = validationError || errMsg;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        setLoading(true);
        setErrMsg("");

        const payload = {
            username,
            email,
            password,
            phone
        }

        try {
            await api.post(
                '/auth/register',
                JSON.stringify(payload),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            setSuccess(true);

            setTimeout(() => {
                navigate('/activate');
            }, 1500);

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

            <Header 
                text="Vous avez déjà un compte ? "
                link={"/login"} 
                linkText={"Se connecter"} 
            />

           <main className="flex mx-[12%] h-[85%] mb-[2%] items-center bg-white rounded-3xl">
            
                <div className="max-w-[50%] mr-auto h-full p-[3%] bg-indigo-50 rounded-l-3xl">

                    <p className="text-3xl font-bold pt-[6%]">Rejoindre notre équipe</p>
                    <p className="text-lg text-gray-600 font-medium max-w-[90%] pt-[3%] pb-[5%]">
                        Créer un compte pour accéder à l'application et commencer avec les activités quotidiennes.
                    </p>

                    <div className="flex gap-3 mt-[4%]">
                        <FontAwesomeIcon icon={faShieldHalved} className="text-2xl text-indigo-400 px-2 py-3 bg-indigo-200 rounded-2xl" />
                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-semibold">Un accès sécurisé</h3>
                            <p className="text-gray-600 max-w-[80%]">Votre compte sera soumis à une validation par l'administrateur</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-[3%]">
                        <FontAwesomeIcon icon={faHandPointer} className="text-2xl text-indigo-400 px-2 py-3 bg-indigo-200 rounded-2xl" />
                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-semibold">Une gestion simplifiée</h3>
                            <p className="text-gray-600 max-w-[80%]">Accédez aux fonctionnalités qui vous sont attribiées</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-[3%]">
                        <FontAwesomeIcon icon={faBolt} className="text-2xl text-indigo-400 px-2 py-3 bg-indigo-200 rounded-2xl" />
                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-semibold">Environnement de travail efficace</h3>
                            <p className="text-gray-600 max-w-[80%]">Gérez les produits, les entrées et sorties de stock facilement.</p>
                        </div>
                    </div>

                    <div className="inline-flex flex-col items-start pt-[7%] pl-[15%]">
                        <p className="font-signature text-3xl font-semibold text-indigo-500 -rotate-3">
                            Ensemble pour une meilleure <br /> gestion commune !
                        </p>
                        <div className="ml-6 mt-1 h-0.5 w-40 -rotate-6 rounded-full bg-indigo-500" />
                    </div>

                </div>


                {success ? (

                    <Success action={"Compte créé"} />

                ) : (

                    <div className="flex-1 px-[4%]">

                        <div className="flex flex-col gap-3 items-center mb-[5%]">
                            <h3 className="text-4xl font-bold">Créer un compte</h3>
                            <p className="text-lg text-gray-500 font-medium">Remplissez les informations ci-dessous pour créer votre compte, il sera ensuite valider par l'administrateur.</p>
                        </div>

                        <p role="alert"
                            className={ displayedError
                                ? "text-sm text-red-500 font-medium bg-red-100 px-[2%] py-[1%] mb-[2%]"
                                : "hidden"
                            }
                        >
                            {displayedError}
                        </p>

                        <form onSubmit={handleSubmit}
                            className="flex flex-col"
                        >

                            <label htmlFor="username" className="text-lg font-medium">
                                Nom complet <span className="text-red-500">*</span>
                            </label>
                            <input type="text"
                                id="username"
                                name="username"
                                ref={userRef}
                                autoComplete="off"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg pl-5 py-1 mt-1 mb-[2%]"
                            />

                            <label htmlFor="email" className="text-lg font-medium">
                                Email Professionnel <span className="text-red-500">*</span>
                            </label>
                            <input type="email"
                                id="email"
                                name="email"
                                autoComplete="off"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg pl-5 py-1 mt-1 mb-[2%]"
                            />

                            <label htmlFor="password" className="text-lg font-medium">
                                Mot de passe <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center mt-1 mb-[2%]">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg pl-5 pr-12 py-1 outline-none focus:border-indigo-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((previous) => !previous)}
                                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                    aria-pressed={showPassword}
                                    className="absolute right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                </button>
                            </div>

                            <label htmlFor="password-confirm" className="text-lg font-medium">
                                Confirmer le mot de passe <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center mt-1 mb-[2%]">
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    id="password-confirm"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg pl-5 pr-12 py-1 outline-none focus:border-indigo-600"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirm((previous) => !previous)}
                                    aria-label={showPasswordConfirm ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                    aria-pressed={showPasswordConfirm}
                                    className="absolute right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <FontAwesomeIcon
                                        icon={showPasswordConfirm ? faEyeSlash : faEye}
                                    />
                                </button>
                            </div>

                            <label htmlFor="phone" className="text-lg font-medium">Numéro de téléphone</label>
                            <input type="tel" 
                                id="phone" 
                                name="phone" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg pl-5 py-1 mt-1 mb-[2%]"
                            /> 

                            <button type="submit"
                                disabled={!validUsername || !validPassword || !validPasswordConfirm}
                                className="justify-center text-white text-xl font-medium bg-indigo-500 rounded-lg py-2 mt-[5%] hover:cursor-pointer hover:bg-indigo-600 transition"
                            >
                                {loading && <Loader2 className="w-6 h-6 animate-spin" />}
                                {loading ? 'Enregistrement...' : 'Créer votre compte'}
                            </button>

                        </form>

                    </div> 
                )}
              
           </main>

        </div>
    )

}
export default RegisterUser