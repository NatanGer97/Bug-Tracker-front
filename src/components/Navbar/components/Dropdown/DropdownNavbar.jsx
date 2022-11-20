import { useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DropdownHeader from "./DropdownHeader";
import jwt_decode from 'jwt-decode'

const DropdownNavbar = (props) => {
  const token = useLocalStorage();
  const decodedTokenInfo = jwt_decode(token);
  const [username, setUsername] = useState('');

  useEffect(()=>
  {
    if (decodedTokenInfo == null) setUsername(null);
      const username = decodedTokenInfo.UserInfo.userName;
      setUsername(username);
  }, [])


  return (
    <div className="btn-group">
      <button
        className="btn btn-sm  mx-2 dropdown-toggle"
        type="button"
        id="Dropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
      >
        <i class="fa-regular fa-user"></i>
      </button>
      <ul className="dropdown-menu" aria-labelledby="Dropdown">
        
    <DropdownHeader header = {username} />
        <li>
          <a className="dropdown-item" href="#">
            Menu item
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Menu item
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Menu item
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownNavbar;
