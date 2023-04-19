import React, { useEffect } from "react";
import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import WorkSpace from "@/components/workspace";
import { getProjects } from "@/firebase/database";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const projects = await getProjects();
      if (!projects) return;
      dispatch(action.projects.setProjects(projects));
    })();
  }, [dispatch]);

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
