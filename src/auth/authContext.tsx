import {
    createContext,
    useContext,
    useState
} from 'react';

import type { ReactNode } from 'react';

interface AuthContextType {

    isAuthenticated: boolean;

    login: () => void;

    logout: () => void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [isAuthenticated, setAuthenticated] =
        useState(!!localStorage.getItem("token"));

    const login = () => {

        setAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("token_exp");

        setAuthenticated(false);

    };

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;

}