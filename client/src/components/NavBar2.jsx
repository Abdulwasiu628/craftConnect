import React from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#004c00] p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-[430px]">
        <a
          href="/"
          className="font-semibold text-xl tracking-tight cursor-pointer"
        >
          Craft-connect
        </a>
      </div>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        {/* moved the following div to the end */}
        <div className="ml-auto">
          <a
            href="/register"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-[#004c00] hover:bg-white mt-4 lg:mt-0"
          >
            register
          </a>
          <a
            href="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-[#004c00] hover:bg-white mt-4 lg:mt-0 ml-2"
          >
            Login
          </a>
        </div>
      </div>
      {/* moved the following div to be right after the first div */}
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
