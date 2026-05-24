import axiosClient from "../client/axios";


// AUTHENTICATION
export const loginUser = async (credentials) => {
    const res = await axiosClient.post("/login/", credentials);
    return res.data;
};

export const registerUser = async (userData) => {
  const res = await axiosClient.post("/register/", userData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosClient.post("/logout/");
  return res.data;
};

export const getMe = async () => {
  const res = await axiosClient.get("/me/");
  return res.data;
};


// USERS 
export const getProfile = async () => {
  const res = await axiosClient.get("/profile/");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axiosClient.patch("/profile/", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await axiosClient.post("/change-password/", data);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await axiosClient.get("/my-orders/");
  return res.data;
};


// ADMIN
export const getUsers = async () => {
  const res = await axiosClient.get("/users/");
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axiosClient.get(`/users/${id}/`);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axiosClient.patch(`/users/${id}/`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axiosClient.delete(`/users/${id}/`);
  return res.data;
};