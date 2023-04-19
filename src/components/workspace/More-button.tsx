import React, { useState } from "react";
// import Image from "next/image";
import EllipsisIcon from "@/assets/icons/ellipsis-icon.svg";
import useMouseOverCallback from "@/hooks/useMouseOverCallback";
import { AnimatePresence, motion } from "framer-motion";

type MoreButtonProps = {
  itemId?: number;
  items: {
    label: string;
    callback: () => void;
    icon?: () => JSX.Element;
  }[];
};

const MoreButton = ({ items }: MoreButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = React.useRef(null);

  useMouseOverCallback(buttonRef, () => {
    setShowMenu(false);
  });

  const handleClick = (callback: () => void) => {
    setShowMenu(false);
    callback();
  };

  return (
    <motion.div ref={buttonRef} className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-full h-full p-2 flex items-center justify-center"
      >
        <img src={EllipsisIcon} alt="ellipsis-icon" />
      </button>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute w-36  flex flex-col items-start right-4 bg-white shadow-lg z-40 rounded-md p-1"
          >
            {items.map((item, key) => {
              const Icon = item.icon;
              return (
                <button
                  key={`menu-item-${key}`}
                  onClick={() => handleClick(item.callback)}
                  className="hover:bg-gray-100 w-full h-8 gap-2 flex items-center pl-2"
                >
                  {Icon && <Icon />}
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MoreButton;
