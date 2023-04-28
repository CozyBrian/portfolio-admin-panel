import React, { useEffect } from "react";
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
    <>
      <SideBar />
      <WorkSpace />
    </>
  );
};

export default Home;
