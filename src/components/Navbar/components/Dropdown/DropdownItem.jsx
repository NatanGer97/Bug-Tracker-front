const DropdownItem = (props) => {
  return (
    <div>
      <li>
        <a className="dropdown-item" href={props.link}>
        {props.title}
        </a>
      </li>
      <li></li>
    </div>
  );
};
export default DropdownItem;
