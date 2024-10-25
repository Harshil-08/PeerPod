import axios from "axios";

export const updateUserRole = async (id, role) => {
  try {
    const user = await axios.post(`/api/users/${id}`, role, {
      withCredentials: true,
    });
    console.log(user.data);

    return user.data;
  } catch (error) {
    console.log("error updating role", error);
  }
};

export const getUser = async (id) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    return res.data.data;
  } catch (error) {
    console.log("error fetching user", error);
  }
};

export const getUsers = async (room) => {
  try {
    const res = await axios.get(`/api/users/?role=${room}`);
    return res.data.data;
  } catch (error) {
    console.log("error fetching users", error);
  }
};

export const updateUser = async (id, updatedProfile) => {
  try {
    const res = await axios.post(`/api/users/${id}`, updatedProfile);
    return res.data.data;
  } catch (error) {
    console.log("error updating profile", error);
  }
};
