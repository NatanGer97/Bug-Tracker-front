import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const useLocalStorage = () => {
    const[token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => 
    {
      if (token)
      {
        const decoded = jwt_decode(token);
        // test if token expires
        if (decoded.exp * 1000 < Date.now())
        {
          alert('token expires, please login again');
          localStorage.removeItem('token');
          navigate('/login');
        }
        
        
        // decodedTokenInfo = {roles: decoded.UserInfo.roles, username: decoded.UserInfo.username}
        
      }

    }, [])

    return token;
};

export default useLocalStorage;