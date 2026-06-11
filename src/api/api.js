import axios from "axios";

const URL = import.meta.env.VITE_APP_URL;
console.log("API URL:", URL);
export const getUsers = () => {
  return axios.get(`${URL}/api/users`);
};

export const createUser = (userData) => {
  return axios.post(`${URL}/api/users`, userData);
};
export const editUser = (id, userData) => {
  return axios.put(`${URL}/api/users/${id}`, userData);
};
export const deleteUser = (id) => {
  return axios.delete(`${URL}/api/users/${id}`);
};