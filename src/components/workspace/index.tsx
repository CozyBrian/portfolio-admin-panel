import { useAppSelector } from "@/hooks";
import cn from "classnames";

const WorkSpace = () => {
  const app = useAppSelector((state) => state.app);
  const projects = useAppSelector((state) => state.projects.items);

  const selectedProject = projects.find(
    (project) => project.id === app.selectedProjectId
  );

  // const dispatch = useAppDispatch();
  return (
    <section className="flex flex-col w-full h-full bg-gray-100">
      <header className="flex flex-row items-center px-8 py-6">
        <h1 className="text-4xl font-medium tracking-wide font-SourceSansPro">
          {selectedProject?.title}
        </h1>
      </header>
      <main className="flex flex-row w-full gap-2 h-full px-8 pb-8">
        <section className="w-[500px] h-full shrink-0 flex flex-col p-4">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="border border-gray-600 w-full aspect-[16/10]"></div>
            <div className="flex flex-row gap-2">
              <span className="w-4 aspect-square rounded-full bg-sky-700" />
              <span className="w-4 aspect-square rounded-full bg-sky-900" />
              <span className="w-4 aspect-square rounded-full bg-sky-900" />
              <span className="w-4 aspect-square rounded-full bg-sky-900" />
            </div>
            <button className="flex flex-row items-center justify-center px-10 py-2 bg-slate-700 text-gray-200">
              Add Image
            </button>
            <button className="flex flex-row items-center justify-center px-10 py-2 border border-slate-700 text-gray-800">
              Add Image
            </button>
          </div>
        </section>
        <section className="w-full h-full flex flex-col p-4">
          <h4 className="text-2xl font-medium tracking-wide font-Nunito mb-2">
            Metadata
          </h4>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="Title"
                className={cn(
                  "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
                )}
              />

              <div className="h-12 w-[200px] flex flex-row gap-1 border-2 border-gray-400 bg-white rounded-md p-1">
                <div
                  className={cn(
                    "w-1/2 h-full flex justify-center items-center rounded-sm",

                    true ? "bg-gray-400 text-white" : "text-gray-600"
                  )}
                >
                  Web
                </div>
                <div
                  className={cn(
                    "w-1/2 h-full flex justify-center items-center rounded-sm",

                    false ? "bg-gray-400 text-white" : "text-gray-600"
                  )}
                >
                  Mobile
                </div>
              </div>
            </div>
            <div className="w-full">
              <textarea
                placeholder="Description"
                draggable={false}
                rows={5}
                className={cn(
                  "w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 py-2 text-lg"
                )}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Image"
                className={cn(
                  "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
                )}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Tags"
                className={cn(
                  "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
                )}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Link"
                className={cn(
                  "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
                )}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Live"
                className={cn(
                  "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
                )}
              />
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default WorkSpace;
