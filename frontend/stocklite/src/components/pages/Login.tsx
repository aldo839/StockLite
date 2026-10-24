import { useEffect, useRef, useState } from "react"
import Logo from "../UI/Logo"
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { isAxiosError } from "axios";
import useAuth from "../../hooks/useAuth";

function Login () {
    
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        errRef.current?.focus();
    }, [email, password])

    useEffect(() => {
        if (success) {
            navigate('/dashboard')
        }
    }, [navigate, success])

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const payload = {
            email,
            password
        }

        try {
            const response = await api.post(
                '/auth/login',
                JSON.stringify(payload),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data));
            const user = response.data?.user;
            const accessToken = response.data?.token;
            setAuth({user, accessToken});
            setEmail('');
            setPassword('');
            setSuccess(true);

        } catch (error) {

            if (isAxiosError(error)) {

                console.error("Error details :", error.response?.data);

                if (error.response?.status === 400){
                    setErrMsg('Missing username or password');
                }
                else if (error.response?.status === 401){
                    setErrMsg('Unauthorized');
                    navigate('/login');
                } else {
                    setErrMsg('Login Failed')
                }
            } else {
                setErrMsg('No Server Response');
            }
        }

    }


    return (

        <div className="flex items-center justify-center h-screen bg-indigo-50">

            <div className="flex flex-col w-[40%] h-[75%] bg-white rounded-2xl gap-[5%] p-[2%] ">

                <div className="flex flex-col items-center justify-center">
                    <Logo 
                        logoStyle={"flex items-center justify-center gap-2 mb-8"} 
                        imgSize={30} 
                        textStyle={"text-3xl font-bold"} 
                        secondTextColor={"text-indigo-700"} 
                    />

                    <p className="text-5xl font-semibold pb-[5%]">Connexion</p>

                    <p role="alert"
                        ref={errRef}
                        className={errMsg ? "bg-red-200 text-xl text-red-500 px-3 py-1" : "hidden"}
                    >
                        {errMsg}
                    </p>

                    <p className="text-2xl font-medium text-gray-700 pt-[4%]">Accedez à votre espace en toute sécurité</p>
                </div>

                <form onSubmit={handleLogin}
                    className="flex flex-col gap-5 px-[5%]"
                >
                    <input type="email"
                        id="email"
                        placeholder="Adresse email"
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-xl px-5 py-3 border-2 border-gray-300 rounded-lg"
                    />

                    <input type="password"
                        id="password"
                        placeholder="Mot de passe"
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        className="text-xl px-5 py-3 border-2 border-gray-300 rounded-lg"
                    />

                    <button type="submit"
                        className="text-xl text-white px-5 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg hover:cursor-pointer active:bg-indigo-500"
                    >
                        Se connecter
                    </button>

                    <Link to={'/reset-password'} 
                        className="text-indigo-500 right-0 hover:cursor-pointer hover:text-indigo-700 font-medium ml-auto underline"
                    >
                        Mot de passe oublié ?
                    </Link>

                </form>


                <div className="flex gap-2 justify-center text-lg">
                    <p>Vous n'avez pas encore de compte ?</p>
                    <Link to='/register' 
                        className="text-indigo-700 hover:cursor-pointer"
                    >
                        Créer un compte
                    </Link>
                </div>
            </div>

        </div>

    )

}
export default Login