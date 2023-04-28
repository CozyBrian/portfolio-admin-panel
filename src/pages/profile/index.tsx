import React, { useEffect } from "react";
import { ProfileWorkSpace } from "@/components/workspace";
import { getProfile } from "@/firebase/database";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";

const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (!profile) return;
      dispatch(action.projects.setProfile(profile));
    })();
  }, [dispatch]);

  return (
    <>
      <ProfileWorkSpace />
    </>
  );
};

export default Profile;
