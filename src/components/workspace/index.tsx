import { useAppDispatch, useAppSelector } from "@/hooks";
import ProjectDetails from "./project-details";
import { Oval } from "react-loader-spinner";
import MoreButton from "./More-button";
import { RotateCw, Trash2, LogOut } from "lucide-react";
import { getProfile, getProjects, onDelete } from "@/firebase/database";
import { action } from "@/redux";
import { toast } from "react-hot-toast";
import { signOutUser } from "@/firebase/authentication";
import ProfileDetails from "./profile-details";

const WorkSpace = () => {
  const { items: projects, selectedProjectId } = useAppSelector(
    (state) => state.projects
  );

  const dispatch = useAppDispatch();

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <section className="flex flex-col w-full h-full bg-gray-100">
      <header className="flex flex-row items-center justify-between px-8 py-6">
        <h1 className="text-4xl font-medium tracking-wide font-SourceSansPro">
          {selectedProject?.title}
        </h1>
        <MoreButton
          items={[
            {
              label: "Logout",
              callback: async () => {
                await signOutUser();
                dispatch(action.auth.setIsAuthenticated(false));
              },
              icon: () => <LogOut size={18} />,
            },
            {
              label: "Refresh",
              callback: async () => {
                const projects = await toast.promise(getProjects(), {
                  loading: "Loading",
                  success: "Got the data",
                  error: "Error when fetching",
                });
                if (!projects) return;
                dispatch(action.projects.setProjects(projects));
              },
              icon: () => <RotateCw size={18} />,
            },
            {
              label: "Delete",
              callback: async () => {
                await toast.promise(onDelete(selectedProject?.id!), {
                  loading: "Loading",
                  success: `${selectedProject?.title} deleted`,
                  error: "Error when deleting",
                });

                const projects = await getProjects();
                if (!projects) return;
                dispatch(action.projects.setProjects(projects));
              },
              icon: () => <Trash2 size={18} />,
            },
          ]}
        />
      </header>
      {selectedProject === undefined ? (
        <div className="w-full h-full flex justify-center items-center">
          <Oval
            width={64}
            height={64}
            color="rgb(107 114 128)"
            secondaryColor="slate-500"
            strokeWidth={4}
          />
        </div>
      ) : (
        <ProjectDetails project={selectedProject!} />
      )}
    </section>
  );
};

export const ProfileWorkSpace = () => {
  const { profile } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  return (
    <section className="flex flex-col w-full h-full bg-gray-100">
      <header className="flex flex-row items-center justify-between px-8 py-6">
        <h1 className="text-4xl font-medium tracking-wide font-SourceSansPro">
          Profile
        </h1>
        <MoreButton
          items={[
            {
              label: "Logout",
              callback: async () => {
                await signOutUser();
                dispatch(action.auth.setIsAuthenticated(false));
              },
              icon: () => <LogOut size={18} />,
            },
            {
              label: "Refresh",
              callback: async () => {
                const profile = await toast.promise(getProfile(), {
                  loading: "Loading",
                  success: "Got the data",
                  error: "Error when fetching",
                });
                if (!profile) return;
                dispatch(action.projects.setProfile(profile));
              },
              icon: () => <RotateCw size={18} />,
            },
          ]}
        />
      </header>
      {profile.profileImage === "" ? (
        <div className="w-full h-full flex justify-center items-center">
          <Oval
            width={64}
            height={64}
            color="rgb(107 114 128)"
            secondaryColor="slate-500"
            strokeWidth={4}
          />
        </div>
      ) : (
        <ProfileDetails profile={profile} />
      )}
    </section>
  );
};

export default WorkSpace;
