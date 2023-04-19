import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-row">
        <SideBar />
        <section className="flex flex-col w-full h-screen bg-gray-100"></section>
      </main>
    </div>
  );
};

export default Home;
