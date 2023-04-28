import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { MainSideBar } from "./sidebar";

const AppLayout = () => {
  return (
    <div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-row h-[calc(100vh-3rem)]">
          <MainSideBar />
          <div className="h-full w-0.5 bg-gray-200"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
