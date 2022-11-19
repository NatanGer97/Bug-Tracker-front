import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

import ErrorAlert from "../Alerts/ErrorAlert";
import SuccessAlert from "../Alerts/SuccessAlert";
import "./ActivationPanel.css";
const ActivationPanel = () => {
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState();
  const [successMsg, setSuccessMsg] = useState(false);

  const location = useLocation();
  const URL = "/register/activate";

  useEffect(()=>
  {
    setError(null);
    setSuccessMsg(null);
  },[code])
  const onCodeChange = (event) => {
    event.preventDefault();
    setCode(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(location.state.userId);
    // alert( String(location.state.userId));
    const activationBodyReq = JSON.stringify({
        code: code,
        userId: location.state.userId,
    });
    try {
        const response = await axios.post(URL, activationBodyReq, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.status === 200){
            setSuccessMsg(response.data);
            
          }
          else {throw response}
    } catch(error) {
        console.log(error);
        setError(error.message);
    }


  };

  return (
    <>
    <div className="container activation-panel m-auto shadow  ">
        {error && <ErrorAlert message={error} />}
        {successMsg && <SuccessAlert message={successMsg} />}
        {!successMsg ? ( <form onSubmit={onSubmitHandler}>
        {error && <ErrorAlert message={"Error"} />}
        <h1>Activation</h1>
        <input
          type="text"
          width={10}
          className="form-control form-control-sm text-center"
          placeholder="Activation Code"
          required
          onChange={onCodeChange}
        />

        <button type="submit" className="btn btn-primary">
          Activate
        </button>

        {/* TODO: create link for resend activation code" */}
        <a className="text-muted">send again</a>
      </form>) :
      (<a href="/login"> Please Login</a>) }
     
    </div>
    </>
  );
};

export default ActivationPanel;
