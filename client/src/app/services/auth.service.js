import api from "./api";
import TokenService from "./token.service";

const register = (name, email, password) => {
  return api.post("/auth/signup", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return api
    .post("/auth/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
        return response.data;
      }
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return TokenService.getUSer();
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
