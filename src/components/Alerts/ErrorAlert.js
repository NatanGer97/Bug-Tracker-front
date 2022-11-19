const ErrorAlert = (props) => {
  return (
    <p className="alert alert-danger" role="alert">
      {props.message}
    </p>
  );
};

export default ErrorAlert;
