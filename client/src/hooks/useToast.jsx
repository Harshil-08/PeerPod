import toast, { Toaster } from "react-hot-toast";

export const toaster = {
  success: ({ message, duration = 4000, position = "top-center" }) =>
    toast.success(message, {
      duration,
      position,
    }),

  error: ({ message, duration = 5000, position = "top-center" }) =>
    toast.error(message, {
      duration,
      position,
    }),

  loading: ({ message, duration, position = "top-center" }) =>
    toast.loading(message, {
      duration,
      position,
    }),

  custom: ({ message, duration = 4000, position = "top-center", icon }) =>
    toast(message, {
      duration,
      position,
      icon,
    }),

  dismiss: () => toast.dismiss(),
};

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          className:
            "bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700",
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white dark:bg-neutral-800",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white dark:bg-neutral-800",
            },
          },
        }}
      />
    </>
  );
};
