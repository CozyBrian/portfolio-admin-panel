import { useAppSelector } from "@/hooks";
import ProjectDetails from "./project-details";
import { Oval } from "react-loader-spinner";

const WorkSpace = () => {
  const { items: projects, selectedProjectId } = useAppSelector(
    (state) => state.projects
  );

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <section className="flex flex-col w-full h-full bg-gray-100">
      <header className="flex flex-row items-center px-8 py-6">
        <h1 className="text-4xl font-medium tracking-wide font-SourceSansPro">
          {selectedProject?.title}
        </h1>
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
