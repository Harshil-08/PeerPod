import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";

export const Layout = () => {
  return (
    <>
      <SideBar />
      <main className="mt-12 sm:ml-64">
        <Outlet />
      </main>
    </>
  );
};
