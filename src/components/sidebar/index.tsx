import SidebarItem, { AddButton } from "./sidebar-item";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Oval } from "react-loader-spinner";
import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { action } from "@/redux";

const SideBar = () => {
  const { items } = useAppSelector((state) => state.projects);
  const { tabs } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const selectedTab = tabs.find((tab) => tab.id === pathname);
  return (
    <aside className="flex flex-col w-80 shrink-0 h-full overflow-clip p-4 bg-gray-50 font-Nunito">
      <h4 className="text-3xl uppercase tracking-wider">
        {selectedTab?.title}
      </h4>
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
            <AddButton
              title="Create Project"
              onClick={() => {
                setTimeout(() => {
                  dispatch(action.projects.addNewProject());
                }, 500);
              }}
            />
          </div>
        </>
      )}
    </aside>
  );
};

export const WorkSideBar = () => {
  const { works } = useAppSelector((state) => state.projects);
  const { pathname } = useLocation();
  const { tabs } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const selectedTab = tabs.find((tab) => tab.id === pathname);
  return (
    <aside className="flex flex-col w-80 shrink-0 h-full overflow-clip p-4 bg-gray-50 font-Nunito">
      <h4 className="text-3xl uppercase tracking-wider">
        {selectedTab?.title}
      </h4>
      {works.length === 0 ? (
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
              {works.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </ul>
          </nav>
          <div className="shrink-0">
            <AddButton
              title="Create Work"
              onClick={() => {
                setTimeout(() => {
                  dispatch(action.projects.addNewWork());
                }, 500);
              }}
            />
          </div>
        </>
      )}
    </aside>
  );
};

export const MainSideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { tabs } = useAppSelector((state) => state.app);

  return (
    <aside className="flex flex-col w-80 shrink-0 h-full overflow-clip p-4 bg-gray-50 font-Nunito">
      <nav className="overflow-scroll mb-2">
        <ul className="flex flex-col gap-2">
          {tabs.map((item) => (
            <li
              key={item.id}
              onClick={() => navigate(item.id)}
              className={cn(
                "flex flex-row items-center h-14 px-4 rounded-lg hover:bg-gray-100 border border-gray-200 duration-150",
                item.id === pathname
                  ? "bg-gray-500 hover:bg-gray-500/90"
                  : "hover:bg-gray-100"
              )}
            >
              <span
                className={cn("text-xl", {
                  "text-gray-200": item.id === pathname,
                })}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
