const AuthButtons = (props) => {
  return (
    <div className="">
      {/* <button className="mx-2 btn btn-link">Login</button> */}
      <a className="btn btn-sm btn-outline-primary mx-2  " href="/login">
        <i className="fa-solid fa-right-to-bracket fa-sm"> Sign in</i>
      </a>
      <a className="btn btn-sm btn-outline-primary mx-2  " href="/register">
        <i className="fa-solid fa-user-pen fa-sm"> Register</i>{" "}
      </a>
    </div>
  );
};

export default AuthButtons;
