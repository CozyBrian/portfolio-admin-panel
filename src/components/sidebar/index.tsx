import SidebarItem, { AddProjectButton } from "./sidebar-item";
import { useAppSelector } from "@/hooks";
import { Oval } from "react-loader-spinner";

const SideBar = () => {
  const { items } = useAppSelector((state) => state.projects);
  return (
    <aside className="flex flex-col w-80 shrink-0 h-full overflow-clip p-4 bg-gray-50 font-Nunito">
      <h4 className="text-3xl uppercase tracking-wider">Projects</h4>
      {items.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <Oval
            width={48}
            height={48}
            color="rgb(107 114 128)"
            secondaryColor="slate-500"
            strokeWidth={4}
          />
        </div>
      ) : (
        <>
          <nav className="overflow-scroll mb-2">
            <ul className="flex flex-col mt-4 gap-2">
              {items.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </ul>
          </nav>
          <div className="shrink-0">
            <AddProjectButton />
          </div>
        </>
      )}
    </aside>
  );
};

export default SideBar;
