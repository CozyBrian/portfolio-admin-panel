import React from "react";
import cn from "classnames";

interface TypeToggleProps {
  value: "web" | "mobile";
  onChange: (type: "web" | "mobile") => void;
}

const TypeToggle = ({ value, onChange }: TypeToggleProps) => {
  const isMobile = value === "mobile";
  return (
    <div className="h-12 w-[200px] flex flex-row gap-1 border-2 border-gray-400 bg-white rounded-md p-1">
      <button
        onClick={() => onChange("web")}
        className={cn(
          "w-1/2 h-full flex justify-center items-center rounded-sm",

          !isMobile ? "bg-gray-400 text-white" : "text-gray-600"
        )}
      >
        Web
      </button>
      <button
        onClick={() => onChange("mobile")}
        className={cn(
          "w-1/2 h-full flex justify-center items-center rounded-sm",

          isMobile ? "bg-gray-400 text-white" : "text-gray-600"
        )}
      >
        Mobile
      </button>
    </div>
  );
};

export default TypeToggle;
