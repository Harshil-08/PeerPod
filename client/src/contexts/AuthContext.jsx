import Cookies from "js-cookie";
import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

/**
 * AuthProvider is a component which wraps its children with AuthContext
 * and provides authToken, user details and login-logout functions.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // get token
    const authToken = Cookies.get("authToken");
    if (authToken) {
      setToken(authToken);
    }

    // get user details
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }

    let role = atob(localStorage.getItem("r"));
    if (role) {
      setUserRole(role);
    }

    setLoading(false);
  }, []);

  const saveUserInfo = (token, user, role) => {
    Cookies.set("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("r", btoa(role));
    setToken(token);
    setUser(user);
    setUserRole(role);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setToken(null);
    localStorage.clear();
    setUser(null);
    setUserRole("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, userRole, loading, saveUserInfo, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
