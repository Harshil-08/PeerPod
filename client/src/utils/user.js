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
