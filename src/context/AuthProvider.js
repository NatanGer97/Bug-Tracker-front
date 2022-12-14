import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [ auth, setAuth] = useState({});
    const [isLogin, setIsLogin] = useState(useLocalStorage() !== null);
    const [username, setUsername] = useState('');

    return (
        <AuthContext.Provider value={{auth, setAuth,isLogin, setIsLogin,username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;