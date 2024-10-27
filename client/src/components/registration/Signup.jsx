import { Link } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../../utils/authentication";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../hooks/useToast";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setUsernameError("username is necessary");
      return;
    }
    if (!email.trim()) {
      setEmailError("email is necessary");
      return;
    }
    if (!password.trim()) {
      setpasswordError("password is necessary");
      return;
    } else {
      console.log(username, email, password);

      const { message, success } = await signUp({
        username: username,
        email: email,
        password: password,
      });

      if (success) {
        toaster.success({
          message: message,
        });
        navigate("/login");
      } else {
        toaster.error({
          message: message,
        });
      }

      setUsernameError("");
      setEmailError("");
      setpasswordError("");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <img src="sideVector.svg" />
        </div>
      </div>

      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Sign Up
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <div className="">
            <div className="w-full mb-2 lg:mb-0">
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
              >
                <img className="" src="google.svg" alt="google" /> Sign Up with
                Google{" "}
              </button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form action="#" method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {usernameError && (
                <p className="text-xs mt-1 text-red-600">{usernameError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {emailError && (
                <p className="text-xs mt-1 text-red-600">{emailError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {passwordError && (
                <p className="text-xs mt-1 text-red-600">{passwordError}</p>
              )}
            </div>
            <div>
              <button
                onClick={handleEmailSignup}
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
