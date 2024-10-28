import { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUserRole } from "../utils/user";
import { toaster } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getUsers("");
      setUsers(users);
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    };
    fetchAllUsers();
  }, []);

  const handleEsc = (e) =>
    e.key === "Escape" ? setShowUpdateModal(false) : "";

  const handleDeleteUser = async (id) => {
    const u = users.filter((user) => user._id !== id);
    setUsers(u);
    deleteUser(id);
  };

  const handleOpenUpdate = (user) => {
    setShowUpdateModal(!showUpdateModal);
    setUser(user);
    console.log(user);
  };

  if (role !== "FACULTY") {
    return (
      <div className="h-screen w-screen bg-gray-100 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold mb-2">Sorry!</div>
            <p className="text-2xl mb-4 md:text-3xl font-light">
              looks like you don't have access this page.{" "}
            </p>
            <p className="mb-4">
              But dont worry, you can find plenty of other things in your room!
            </p>
            <Link
              to={"/chat"}
              className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
            >
              back to my room
            </Link>
          </div>
          <div className="max-w-lg"></div>
          <img src="/cat.svg" alt="404 not found" />
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-4 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full border rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.role}</td>
                <td className="flex px-4 py-4 gap-2 bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-400 p-1 text-white rounded-md"
                  >
                    <img width={20} src="/bin.svg" alt="" />
                  </button>
                  <button
                    onClick={() => handleOpenUpdate(user)}
                    className="bg-blue-500 hover:bg-blue-400 p-1 text-white rounded-md"
                  >
                    <img width={20} src="/edit.svg" alt="" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showUpdateModal && (
        <UpadteModal
          user={user}
          onClose={() => setShowUpdateModal(!showUpdateModal)}
        />
      )}
    </div>
  );
};

const UpadteModal = ({ user, onClose, setUsers }) => {
  const ROLES = ["fy", "sy", "ty", "by", "alumni"];
  const [newRole, setNewRole] = useState("");

  const handleUpdateRole = async () => {
    console.log("updating user: ", user.username, "to", newRole);
    const { message, data, success } = await updateUserRole(user._id, newRole);
    if (success) {
      toaster.success({ message: `User role updated to ${newRole}` });
    } else {
      toaster.error({
        message: message,
      });
    }
    onClose();
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative md:m-auto mt-24 p-4 w-full max-w-md max-h-full">
        <div className="relative border bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update User Role
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="grid gap-4 mb-4">
              <div className="">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue>{user.role}</option>
                  {ROLES.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleUpdateRole}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Change Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
