import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface User {
    userId: number,
    username: string,
    email: string,
    role: string
}

interface AuthState {
    user: User | null,
    accessToken: string | null
}

type AuthProviderProps = {
    children : ReactNode
}

interface AuthContextType {
    auth: AuthState,
    setAuth: Dispatch<SetStateAction<AuthState>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [auth, setAuth] = useState<AuthState>({user: null, accessToken: null});

    return (
        
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

    )
 
}
export default AuthContext