import { useEffect, useState } from "react";

export const Notification = () => {
  const [openNotification, setOpenNotification] = useState(false);

  const toggleNotificationModal = () => setOpenNotification(!openNotification);

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  const handleEsc = (e) => e.key === "Escape" && setOpenNotification(false);

  return (
    <div className="leading-none">
      <button
        onClick={toggleNotificationModal}
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>

        <div className="absolute block w-3 h-3 bg-red-500 border-2 rounded-full -top-0.5 start-2.5 border-white dark:border-gray-900"></div>
      </button>

      {openNotification && (
        <div
          id="dropdownNotification"
          className="notification-container z-20 right-12 mt-1 border absolute w-4/5 md:w-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <NotificationMessage />
            <NotificationMessage />
            <NotificationMessage />
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationMessage = () => {
  return (
    <a
      href="#"
      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex-shrink-0">
        <img
          className="rounded-full w-11 h-11"
          src="/usericonhollow.svg"
          alt="Jese image"
        />
      </div>
      <div className="w-full ps-3">
        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            Jese Leos{" "}
          </span>
          Replied to you: "Hey, what's up? All set for the presentation?"
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-500">
          a few moments ago
        </div>
      </div>
    </a>
  );
};
