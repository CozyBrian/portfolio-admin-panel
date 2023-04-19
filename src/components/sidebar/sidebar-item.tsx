import cn from "classnames";
import { Project } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";

interface SidebarItemProps {
  item: Project;
}

const SidebarItem = ({ item }: SidebarItemProps) => {
  const { selectedProjectId } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const isSelected = selectedProjectId === item.id;

  return (
    <li
      onClick={() => dispatch(action.app.setSelectedTabId(item.id))}
      className={cn(
        "flex flex-row items-center h-14 px-4 rounded-lg hover:bg-gray-100 border border-gray-200 duration-150",
        isSelected ? "bg-gray-500 hover:bg-gray-500/90" : "hover:bg-gray-100"
      )}
    >
      <span className={cn("text-xl", { "text-gray-200": isSelected })}>
        {item.title}
      </span>
    </li>
  );
};

export default SidebarItem;
