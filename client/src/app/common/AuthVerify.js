import { useEffect } from "react";
import { useLocation } from "react";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const AuthVerify = ({ logOut }) => {
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut]);
  return;
};

export default AuthVerify;
