import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import { ProfileWorkSpace } from "@/components/workspace";
import { getProfile } from "@/firebase/database";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { ChevronLeft } from "lucide-react";
import cn from "classnames";
import useEventListener from "@/hooks/useEventListener";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-row h-[calc(100vh-3rem)]">
        <aside className="flex flex-col w-80 shrink-0 h-full overflow-clip p-4 bg-gray-50 font-Nunito">
          <BackButton />
        </aside>
        <ProfileWorkSpace />
      </main>
    </div>
  );
};

const BackButton = () => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEventListener(
    "mousedown",
    (e) => {
      setButtonPressed(true);
    },
    buttonRef
  );
  useEventListener(
    "mouseup",
    (e) => {
      setButtonPressed(false);
    },
    buttonRef
  );

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      ref={buttonRef}
      className={cn(
        "flex flex-row items-center h-14 w-full px-4 rounded-lg hover:bg-gray-100",
        "border border-gray-200 duration-300 active:bg-sky-500",
        "[&>span]:active:text-white"
      )}
    >
      <ChevronLeft size={32} color={buttonPressed ? "#fff" : "#000"} />
      <span className={cn("text-xl mx-2")}>Go back</span>
    </button>
  );
};

export default Profile;
