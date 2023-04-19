import SidebarItem from "./sidebar-item";
import { useAppSelector } from "@/hooks";

const SideBar = () => {
  const { items } = useAppSelector((state) => state.projects);
  return (
    <aside className="flex flex-col w-80 shrink-0 h-full p-4 bg-gray-50 font-Nunito">
      <h4 className="text-3xl uppercase tracking-wider">Projects</h4>
      <nav>
        <ul className="flex flex-col mt-4 gap-2">
          {items.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
