import api from "./api";

const getPublicContent = () => {
  return api.get("/all");
};

const getUserBoard = () => {
  return api.get("/user");
};

const getAdminBoard = () => {
  return api.get("/admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};

export default UserService;
