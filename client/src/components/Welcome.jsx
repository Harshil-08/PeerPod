import { Link } from "react-router-dom";
export const Welcome = () => {
  return (
    <div>
      <p>Welcome to PeerPod</p>
      <Link className="underline" to={"/signup"}>
        Register
      </Link>
      <Link className="underline" to={"/chat"}>
        Chat
      </Link>
    </div>
  );
};
