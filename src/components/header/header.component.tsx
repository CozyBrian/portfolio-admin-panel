import React from "react";
import "./header.css";
import { FiEdit } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { AiFillCaretDown } from "react-icons/ai";

const Header = () => {
  return (
    <div className="Header">
      <div className="branding-container">
        <h3 className="branding">My-Portfolio Admin Panel</h3>
        <FiEdit />
        <input
          type="input"
          onChange={() => null}
          placeholder=" search"
          className="search-box"
        />
      </div>
      <div className="Header-links">
        <VscAccount size={30} />
        <button className="icon-button">
          <AiFillCaretDown style={{ padding: "2px" }} />
        </button>
      </div>
    </div>
  );
};

export default Header;