import axios from "axios";

export const updateUserRole = async (id, role) => {
  try {
    const user = await axios.post(`/api/users/${id}`, role, {
      withCredentials: true,
    });
    return {
      message: user.data.message,
      data: user.data.data,
      success: user.data.success,
    };
  } catch (error) {
    console.log("error updating role", error);
    return {
      message:
        error.response?.data?.message ||
        "Failed to update role! Please try again.",
      success: false,
    };
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
    console.log(res.data);
    return {
      message: "Profile updated Successfully!",
      data: res.data.data,
      success: res.data.success,
    };
  } catch (error) {
    console.log("error updating profile", error);
    return {
      message:
        error.response?.data?.message || "Update Failed! Please try again.",
      success: false,
    };
  }
};
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/api/users/`, id);
    console.log(res.data);
    return {
      message: "Profile deleted Successfully!",
      data: res.data.data,
      success: res.data.success,
    };
  } catch (error) {
    console.log("error updating profile", error);
    return {
      message:
        error.response?.data?.message || "Update Failed! Please try again.",
      success: false,
    };
  }
};
