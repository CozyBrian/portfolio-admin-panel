import { useAppDispatch, useAppSelector } from "@/hooks";
import ProjectDetails from "./project-details";
import { Oval } from "react-loader-spinner";
import MoreButton from "./More-button";
import { RotateCw, Trash2 } from "lucide-react";
import { getProjects, onDelete } from "@/firebase/database";
import { action } from "@/redux";

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
              label: "Delete",
              callback: () => {
                onDelete(selectedProject?.id!).then(async () => {
                  const projects = await getProjects();
                  if (!projects) return;
                  dispatch(action.projects.setProjects(projects));
                });
              },
              icon: () => <Trash2 size={18} />,
            },
            {
              label: "Refresh",
              callback: async () => {
                const projects = await getProjects();
                if (!projects) return;
                dispatch(action.projects.setProjects(projects));
              },
              icon: () => <RotateCw size={18} />,
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

export default WorkSpace;
