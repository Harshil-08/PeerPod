import axios from "axios";
import Cookies from "js-cookie";
import { signInWithGooglePopup } from "./firebaseAuthProvider";

const API_URL = import.meta.env.VITE_BASE_URL;

export const signUp = async (credentials) => {
  try {
    const signUpResponse = await axios.post(
      `${API_URL}/auth/signup`,
      credentials
    );
    return {
      message: signUpResponse.data.message,
      success: signUpResponse.data.success,
    };
  } catch (error) {
    console.log("Error Signing up with Email: ", error);
    return {
      message:
        error.response?.data?.message || "Sign-up failed. Please try again.",
      success: false,
    };
  }
};

export const signIn = async (credentials) => {
  try {
    const loginResponse = await axios.post(
      `${API_URL}/auth/signin`,
      credentials
    );
    console.log(loginResponse.data);
    Cookies.set("authToken", loginResponse.data.data.accessToken);
    return {
      message: loginResponse.data.message,
      data: loginResponse.data.data,
      success: loginResponse.data.success,
    };
  } catch (error) {
    console.log("Error logging in with Email: ", error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const googleLoginResponse = await signInWithGooglePopup();
    const username = googleLoginResponse.user.displayName;
    const email = googleLoginResponse.user.email;

    const loginResponse = await axios.post(
      `${API_URL}/auth/signin-with-google`,
      {
        name: username,
        email: email,
      }
    );
    return loginResponse.data;
  } catch (error) {
    console.log("Error with google login: ", error);
  }
};
