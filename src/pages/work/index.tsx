import React, { useEffect } from "react";
import { WorkSideBar } from "@/components/sidebar";
import { WorkWorkSpace } from "@/components/workspace";
import { getWorks } from "@/firebase/database";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";

const Work = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const works = await getWorks();
      if (!works) return;
      dispatch(action.projects.setWorks(works));
    })();
  }, [dispatch]);

  return (
    <>
      <WorkSideBar />
      <WorkWorkSpace />
    </>
  );
};

export default Work;
