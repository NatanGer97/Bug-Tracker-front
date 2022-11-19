import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";


const useLocalStorage = () => {
    const[token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => 
    {
      if (token)
      {
        var decoded = jwt_decode(token);
        console.log(Object.entries(decoded));
        console.log(decoded.UserInfo.roles);
        console.log(decoded.UserInfo.username);
        // decodedTokenInfo = {roles: decoded.UserInfo.roles, username: decoded.UserInfo.username}
        
      }

    }, [])

    return token;
};

export default useLocalStorage;