import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import WorkSpace from "@/components/workspace";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-row h-[calc(100vh-3rem)]">
        <SideBar />
        <WorkSpace />
      </main>
    </div>
  );
};

export default Home;
