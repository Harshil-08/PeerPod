import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { token, user, logout, userRole } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    console.log("not logged in!");
    navigate("/login");
  }

  return (
    <div>
      <h1>
        Hello {user.username} from {userRole}!!!
      </h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
