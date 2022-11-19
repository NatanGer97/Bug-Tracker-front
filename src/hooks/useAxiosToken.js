import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";
const BASE_URL = "http://localhost:3000";

const useAxiosToken = () => {
  const { auth } = useAuth();
  const axiosToken = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useLocalStorage()}`,
    },
  });
  

    return axiosToken;
};

export default useAxiosToken;
