import { useState } from "react";

export default function useToken() {
  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setToken] = useState(getToken());

  return {
    setToken: saveToken,
    token,
  };
}
