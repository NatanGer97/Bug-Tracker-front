import NavbarLink from "./NavbarLink";

const NavbarLinks = (pros) => {
  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <NavbarLink link="/home" text="home" />
      </ul>
    </>
  );
};
export default NavbarLinks;
