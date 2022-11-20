import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import useLocalStorage from "./useLocalStorage";

const useDecodedToken = () => {

    const [token, setToken] = useState(useLocalStorage());

    useEffect(()=>
    {
        // setToken();
    },[])

    return token.UserInfo.name;
/*     const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState();

    const updateRoles = (roles) => 
    {
        console.log(roles);
        setRoles(roles)
    }

    useEffect(()=>
    {
        const decoded = jwt_decode(token);
        console.log(decoded);
        updateRoles(decoded.UserInfo.roles)
        setUsername(decoded.UserInfo.username);
    },[])

    return username; */
};

export default useDecodedToken;
