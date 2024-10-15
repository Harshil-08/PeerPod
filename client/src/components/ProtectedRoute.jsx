import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
	const { user, loading } = useAuth();
	if (loading) return <div>Loading...</div>;

	return !user || Object.keys(user).length !== 0 ? (
		<Outlet />
	) : (
		<Navigate to={"/login"} />
	);
};
