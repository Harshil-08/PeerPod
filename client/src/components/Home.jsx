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
    <div className="flex flex-col gap-10 p-12">
      <h1 className="text-2xl">
        Hello {user.username} from {userRole}!!!
      </h1>
      <p>
        We hope you use the platform wisely! Click on any of the room to chat
      </p>
      <button
        className="bg-red-400 hover:bg-red-500 p-2 w-fit rounded-md"
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
}
