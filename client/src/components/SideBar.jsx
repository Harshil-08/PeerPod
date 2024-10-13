import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const SideBar = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/chat" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="PeerPod Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  PeerPod
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <List name={"fy"} noti={1} />
            <List name={"sy"} noti={2} />
            <List name={"ty"} noti={3} />
            <List name={"by"} noti={3} />
            <List name={"alumni"} noti={4} />
            <List name={"Faculty"} noti={1} />
          </ul>
          <ul className="flex flex-col gap-2">
            <div className="bg-gray-400 w-full h-0.5"></div>
            <SettingsBtn name={"Profile"} />
          </ul>
        </div>
      </aside>
    </>
  );
};

const List = ({ name, noti }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(`/chat/${name}`);
  return (
    <li>
      <Link
        to={`/chat/${name}`}
        className={`flex justify-between items-center p-2 text-gray-900 rounded-lg ${
          isActive ? "bg-gray-100" : ""
        } dark:hover:bg-gray-100 group`}
      >
        <span className="ms-3">{name.toUpperCase()}</span>
        <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
          {noti}
        </div>
      </Link>
    </li>
  );
};

const SettingsBtn = ({ name }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(`/${name}`);
  return (
    <li>
      <Link
        to={`/${name.toLowerCase()}`}
        className={`flex justify-start items-center p-2 text-gray-900 border border-gray-500/50 rounded-lg ${
          isActive ? "bg-gray-100" : ""
        } dark:hover:bg-gray-100 group`}
      >
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
        <span className="ms-3">{name}</span>
      </Link>
    </li>
  );
};
