import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export const Welcome = () => {
	const { role } = useAuth();

	return (
		<div>
			<p>Welcome to PeerPod</p>
			<Link className="underline" to={"/signup"}>
				Register
			</Link>
			<Link className="underline" to={`/chat/${role.toLowerCase()}`}>
				Chat
			</Link>
		</div>
	);
};
