import React, { useState, createContext, useEffect } from "react";
import { User } from "../application/models/UserModel";
import useAuthState from "./AuthHeaderHook";

interface AuthProviderProps {
    children: any;
}

export interface Auth {
    loading: boolean;
    authenticated: boolean;
    user?: User;
}

interface AuthContextInterface {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const authState = useAuthState();
    const [auth, setAuth] = useState<Auth>({
        loading: false,
        authenticated: false,
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {authState.loading ? <div>Loading...</div> : <>{children}</>}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
