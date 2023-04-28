import cn from "classnames";
import { Project, Work } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";

interface SidebarItemProps {
  item: Project | Work;
}

const SidebarItem = ({ item }: SidebarItemProps) => {
  const { selectedProjectId, selectedWorkId } = useAppSelector(
    (state) => state.projects
  );
  const dispatch = useAppDispatch();

  const isProject = (item: Project | Work): item is Project => {
    return (item as Project).title !== undefined;
  };

  if (!isProject(item)) {
    const isSelected = selectedWorkId === item.id;
    return (
      <li
        onClick={() => dispatch(action.projects.setSelectedWorkId(item.id))}
        className={cn(
          "flex flex-row items-center h-14 px-4 rounded-lg hover:bg-gray-100 border border-gray-200 duration-150",
          isSelected ? "bg-gray-500 hover:bg-gray-500/90" : "hover:bg-gray-100"
        )}
      >
        <span className={cn("text-xl", { "text-gray-200": isSelected })}>
          {item.company}
        </span>
      </li>
    );
  } else {
    const isSelected = selectedProjectId === item.id;
    return (
      <li
        onClick={() => dispatch(action.projects.setSelectedTabId(item.id))}
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
  }
};

export default SidebarItem;

interface AddProjectButtonProps {
  title: string;
  onClick: () => void;
}

export const AddButton = ({ onClick, title }: AddProjectButtonProps) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={cn(
        "flex flex-row items-center h-14 w-full px-4 rounded-lg hover:bg-gray-100",
        "border border-gray-200 duration-300 active:bg-sky-500",
        "[&>span]:active:text-white"
      )}
    >
      <span className={cn("text-xl ")}>{title}</span>
    </button>
  );
};
