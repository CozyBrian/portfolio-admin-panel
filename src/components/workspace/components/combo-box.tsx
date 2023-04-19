import React, { useRef, useState } from "react";
import cn from "classnames";
import useEventListener from "@/hooks/useEventListener";

interface ComboBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const ComboBox = ({ value, onChange }: ComboBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const tagItems = value.split(",");

  const inputRef = useRef<HTMLInputElement>(null);

  useEventListener(
    "blur",
    () => {
      setIsEditing(false);
    },
    inputRef
  );

  return (
    <div className="relative h-12 w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tags"
        className={cn(
          "absolute top-0 left-0 h-12 w-full flex-row gap-1 border-2",
          "border-gray-400 bg-white rounded-md focus:outline-none p-1 text-lg",
          !isEditing ? "hidden" : "flex"
        )}
      />

      <div
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }}
        className={cn(
          "absolute top-0 left-0 h-12 w-full flex-row gap-1 border-2 overflow-scroll",
          " border-gray-400 bg-white rounded-md focus:outline-none p-1 text-lg",
          !isEditing ? "flex" : "hidden"
        )}
      >
        {tagItems.map((item, i) => (
          <div
            key={`tag-${i}`}
            className="flex justify-center items-center bg-gray-500 px-2 text-gray-50 rounded-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboBox;
