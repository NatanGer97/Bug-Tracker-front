const BrandTitle = (props) => {
  return (
    <a className="navbar-brand me-auto mb-2 mb-lg-0" href="#">
      <i className="fa-solid fa-bug fa-sm"> <span> {props.title}</span> </i>
    </a>
  );
};
export default BrandTitle;
