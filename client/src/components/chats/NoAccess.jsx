import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";

export const NoAccess = ({ roomName }) => {
	const navigate = useNavigate();
	const { role } = useAuth();
	const {theme, toggleTheme} = useTheme();

	return (
		<>
			<div className={`${theme && "dark"} lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 dark:bg-neutral-900 h-screen`}>
				<div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
					<div className="relative">
						<div className="absolute">
							<h1 className="text-gray-800 dark:text-white font-bold text-2xl">
								Looks like you don't have access to {roomName} room!
							</h1>
							<button
								className="sm:w-full lg:w-auto my-2 border rounded md py-2 px-4 text-center bg-indigo-600 text-white hover:bg-indigo-700"
								onClick={() => navigate(`/chat/${role.toLowerCase()}`)}
								>
								Take me to my room!
							</button>
						</div>
					</div>
				</div>
				<div>
					<img src="https://i.ibb.co/ck1SGFJ/Group.png" />
				</div>
			</div>
		</>
	);
};
