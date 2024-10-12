import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_URL;

export const updateUserRole = async (id, role) => {
  try {
    const updateRoleData = await axios.post(`${API_URL}/users/${id}`, role, {
      withCredentials: true,
    });
    console.log(updateRoleData.data);
  } catch (error) {
    console.log("error updating role", error);
  }
};
