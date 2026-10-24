import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {

    const context = useContext(AuthContext);

    if (context === undefined){
        throw new Error("Login must been used inside AuthProvider");
    }

    return context;

}
export default useAuth;