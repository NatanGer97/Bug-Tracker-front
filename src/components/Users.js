import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAxiosToken from "../hooks/useAxiosToken";
import useRefreshToken from "../hooks/useRefreshToken";


const Users = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosToken = useAxiosToken();
  


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosToken.get("/users", {
        // const response = await axiosPrivate.get("/users", {
        //   signal: controller.signal,
        });
        console.log(response.data);
         setUsers(response.data.users);
      } catch (err) {
        console.error(err);
        navigate('/login', {state: {from: location}, replace: true});
      }
    }
    getUser();
    // cleanup function
    /* return () => {
        isMounted = false;
        controller.abort();
    } */
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={()=> refresh()}>refresh</button>
      <br/>
    </article>
  );
};

export default Users;
