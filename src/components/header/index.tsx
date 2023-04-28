import React from "react";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full h-12 bg-gray-700 px-4 font-Nunito">
      <h1 className="text-2xl text-gray-100">My-Portfolio Admin Panel</h1>
      <div className="h-9 w-9 aspect-square bg-gray-400 rounded-full mr-4">
        <button className="text-gray-100 hover:text-gray-200"></button>
      </div>
    </header>
  );
};

export default Header;
