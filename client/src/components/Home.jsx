import { useAuth } from "../hooks/useAuth";

export default function Home() {
	const { user, role, loading, logout } = useAuth();

	return (
		<div className="flex flex-col gap-10 p-12">
			{!loading && (
				<h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-3xl xl:text-5xl">
					Hello {user.username} from {role}!!!
				</h1>
			)}
			<p className="leading-none tracking-tight">
				We hope you use the platform wisely! Click on any of the room to start
				chatting.
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
