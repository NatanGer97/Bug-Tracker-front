const NavbarLink = (props) => {
  return (
    <li className="nav-item">
      <a className="nav-link " aria-current="page" href={props.link}>
        {props.text}
      </a>
    </li>
  );
};

export default NavbarLink;
