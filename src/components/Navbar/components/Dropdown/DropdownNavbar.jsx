import { useEffect, useState } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DropdownHeader from "./DropdownHeader";
import jwt_decode from "jwt-decode";
import DropdownItem from "./DropdownItem";
import SignOutBtn from "../SignOutBtn";

const DropdownNavbar = (props) => {
  const token = useLocalStorage();
  const decodedTokenInfo = jwt_decode(token);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (decodedTokenInfo == null) setUsername(null);
    const username = decodedTokenInfo.UserInfo.userName;
    setUsername(username);
  }, []);

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

      {/* drop down content */}
      <ul className="dropdown-menu" aria-labelledby="Dropdown">
        <DropdownHeader header={username} />
        <DropdownItem title="Home" link="#" />
        <DropdownItem title="Profile" link="#" />
        <DropdownItem title="Team" link="#" />
        <li>
          <hr className="dropdown-divider" />
        </li>
        <DropdownItem title="Tasks" link="#" />
        <DropdownItem title="Bugs" link="#" />

        <li>
          <hr className="dropdown-divider" />
        </li>
        <SignOutBtn />
      </ul>
    </div>
  );
};

export default DropdownNavbar;
